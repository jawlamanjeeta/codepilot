import { Worker, Queue } from "bullmq";
import { redisConnection } from "../lib/redis";
import { prisma } from "@codepilot/db";
import {
  QUEUE_NAMES,
  JOB_NAMES,
  computeRecommendations,
  SCORE_WEIGHTS,
} from "@codepilot/shared";

// ---------------------------------------------------------------------------
// Queue definition
// ---------------------------------------------------------------------------

export const recommendationQueue = new Queue(QUEUE_NAMES.RECOMMENDATION, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 2,
    backoff: { type: "fixed", delay: 15_000 },
    removeOnComplete: { count: 50 },
    removeOnFail:     { count: 100 },
  },
});

// ---------------------------------------------------------------------------
// Job data type
// ---------------------------------------------------------------------------

export type RecommendationJobData = {
  userId: string;
};

// ---------------------------------------------------------------------------
// Worker
// ---------------------------------------------------------------------------

export function startRecommendationWorker() {
  const worker = new Worker<RecommendationJobData>(
    QUEUE_NAMES.RECOMMENDATION,
    async (job) => {
      const { userId } = job.data;
      console.log(`[recommendation] Generating for user ${userId}`);

      // 1. Fetch topic stats for this user
      const topicStats = await prisma.topicStat.findMany({
        where: { userId },
      });

      // 2. Determine the user's best rating across all linked accounts
      const linkedAccounts = await prisma.linkedAccount.findMany({
        where: { userId, status: "connected" },
        select: { rating: true },
      });
      const userRating = linkedAccounts.reduce(
        (best, acc) => Math.max(best, acc.rating ?? 0),
        800 // default floor
      );

      // 3. Collect problem IDs the user has already solved (accepted)
      const solvedIds = await prisma.submission
        .findMany({
          where: { userId, verdict: "ACCEPTED" },
          select: { problemId: true },
          distinct: ["problemId"],
        })
        .then((rows) => new Set(rows.map((r) => r.problemId)));

      // 4. Find weak topics (below threshold with enough data)
      const weakTopics = topicStats
        .filter(
          (t) =>
            t.skillScore < SCORE_WEIGHTS.RECOMMENDATION.WEAK_TOPIC_THRESHOLD &&
            t.attemptCount >= SCORE_WEIGHTS.SKILL.MIN_ATTEMPTS_FOR_WEIGHT
        )
        .map((t) => t.topic);

      // 5. Fetch unsolved problems in weak topics + near the user's rating
      const ratingMin = Math.max(0, userRating - 100);
      const ratingMax = userRating + SCORE_WEIGHTS.RECOMMENDATION.MAX_RATING_DELTA;

      const candidateProblems = await prisma.problem.findMany({
        where: {
          id: { notIn: Array.from(solvedIds) },
          OR: [
            // Problems in weak topics
            ...(weakTopics.length > 0
              ? [{ tags: { hasSome: weakTopics } }]
              : []),
            // Or problems at the right rating regardless of topic
            { rating: { gte: ratingMin, lte: ratingMax } },
          ],
        },
        take: 200, // score a broad pool, then trim to plan size
      });

      if (candidateProblems.length === 0) {
        console.log(`[recommendation] No candidate problems found for user ${userId}`);
        return;
      }

      // 6. Score and rank candidates
      const ranked = computeRecommendations({
        topicStats: topicStats.map((t) => ({
          topic:        t.topic,
          skillScore:   t.skillScore,
          attemptCount: t.attemptCount,
          lastUpdatedAt: t.lastUpdatedAt,
        })),
        unsolved: candidateProblems.map((p) => ({
          id:         p.id,
          title:      p.title,
          problemKey: p.problemKey,
          platform:   p.platform,
          rating:     p.rating,
          tags:       p.tags,
        })),
        userRating,
      });

      // 7. Clear old pending recommendations and write fresh ones
      await prisma.recommendation.deleteMany({
        where: { userId, status: "pending" },
      });

      if (ranked.length > 0) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 3); // expire in 3 days

        await prisma.recommendation.createMany({
          data: ranked.map((r) => ({
            userId,
            problemId: r.problem.id,
            reason:    r.reason,
            priority:  r.priority,
            status:    "pending",
            expiresAt,
          })),
          skipDuplicates: true,
        });
      }

      console.log(
        `[recommendation] Created ${ranked.length} recommendations for user ${userId}`
      );
    },
    {
      connection: redisConnection,
      concurrency: 2,
    }
  );

  worker.on("failed", (job, err) => {
    console.error(`[recommendation] Job ${job?.id} failed:`, err.message);
  });

  worker.on("completed", (job) => {
    console.log(`[recommendation] Job ${job.id} completed`);
  });

  return worker;
}
