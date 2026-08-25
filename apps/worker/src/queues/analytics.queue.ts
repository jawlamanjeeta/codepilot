import { Worker, Queue } from "bullmq";
import { redisConnection } from "../lib/redis";
import { prisma } from "@codepilot/db";
import {
  QUEUE_NAMES,
  JOB_NAMES,
  computeTopicScore,
  TAG_NORMALISATION_MAP,
  toDateKey,
  groupBy,
} from "@codepilot/shared";

// ---------------------------------------------------------------------------
// Queue definition
// ---------------------------------------------------------------------------

export const analyticsQueue = new Queue(QUEUE_NAMES.ANALYTICS, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 2,
    backoff: { type: "fixed", delay: 10_000 },
    removeOnComplete: { count: 50 },
    removeOnFail:     { count: 100 },
  },
});

// ---------------------------------------------------------------------------
// Job data type
// ---------------------------------------------------------------------------

export type AnalyticsJobData = {
  userId: string;
};

// ---------------------------------------------------------------------------
// Worker
// ---------------------------------------------------------------------------

export function startAnalyticsWorker() {
  const worker = new Worker<AnalyticsJobData>(
    QUEUE_NAMES.ANALYTICS,
    async (job) => {
      const { userId } = job.data;
      console.log(`[analytics] Computing analytics for user ${userId}`);

      // 1. Fetch all submissions with problem tags + rating
      const submissions = await prisma.submission.findMany({
        where: { userId },
        include: {
          problem: { select: { tags: true, rating: true } },
        },
      });

      // 2. Group submissions by normalised topic tag
      const topicSubmissionsMap: Record<
        string,
        { verdict: string; submittedAt: Date; rating?: number }[]
      > = {};

      for (const sub of submissions) {
        const rawTags = sub.problem.tags;
        for (const rawTag of rawTags) {
          const topic = TAG_NORMALISATION_MAP[rawTag.toLowerCase().trim()];
          if (!topic) continue;
          if (!topicSubmissionsMap[topic]) topicSubmissionsMap[topic] = [];
          topicSubmissionsMap[topic].push({
            verdict:     sub.verdict,
            submittedAt: sub.submittedAt,
            rating:      sub.problem.rating ?? undefined,
          });
        }
      }

      // 3. Compute and upsert TopicStat for each topic
      await Promise.all(
        Object.entries(topicSubmissionsMap).map(async ([topic, subs]) => {
          const ratings = subs
            .filter((s) => s.verdict === "ACCEPTED" && s.rating != null)
            .map((s) => s.rating!);

          const result = computeTopicScore({ submissions: subs }, ratings);

          await prisma.topicStat.upsert({
            where: { userId_topic: { userId, topic } },
            create: { userId, topic, ...result },
            update: result,
          });
        })
      );

      // 4. Compute and upsert DailyActivity
      const byDay = groupBy(submissions, (s) => toDateKey(s.submittedAt));

      await Promise.all(
        Object.entries(byDay).map(async ([dateKey, subs]) => {
          const date = new Date(`${dateKey}T00:00:00.000Z`);
          const solvedCount  = subs.filter((s) => s.verdict === "ACCEPTED").length;
          const attemptCount = subs.length;

          await prisma.dailyActivity.upsert({
            where: { userId_date: { userId, date } },
            create: { userId, date, solvedCount, attemptCount },
            update: { solvedCount, attemptCount },
          });
        })
      );

      // 5. Enqueue recommendation generation
      const { recommendationQueue } = await import("./recommendation.queue");
      await recommendationQueue.add(
        JOB_NAMES.GENERATE_RECOMMENDATIONS,
        { userId }
      );

      console.log(`[analytics] Done for user ${userId} — ${Object.keys(topicSubmissionsMap).length} topics, ${Object.keys(byDay).length} active days`);
    },
    {
      connection: redisConnection,
      concurrency: 3,
    }
  );

  worker.on("failed", (job, err) => {
    console.error(`[analytics] Job ${job?.id} failed:`, err.message);
  });

  worker.on("completed", (job) => {
    console.log(`[analytics] Job ${job.id} completed`);
  });

  return worker;
}
