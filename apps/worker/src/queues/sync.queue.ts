import { Worker, Queue } from "bullmq";
import { redisConnection } from "../lib/redis";
import { prisma } from "@codepilot/db";
import type { Platform, Verdict } from "@codepilot/db";
import { QUEUE_NAMES, JOB_NAMES } from "@codepilot/shared";

// ---------------------------------------------------------------------------
// Queue definition (exported so the web API can enqueue jobs)
// ---------------------------------------------------------------------------

export const syncQueue = new Queue(QUEUE_NAMES.SYNC, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: { count: 100 },
    removeOnFail:     { count: 200 },
  },
});

// ---------------------------------------------------------------------------
// Job data type
// ---------------------------------------------------------------------------

export type SyncJobData = {
  userId: string;
  platform: Platform;
  handle: string;
};

// ---------------------------------------------------------------------------
// Platform fetch helpers (self-contained in the worker)
// ---------------------------------------------------------------------------

type RawSubmission = {
  externalSubmissionId: string;
  problemKey: string;
  problemTitle: string;
  rating?: number;
  tags: string[];
  verdict: Verdict;
  language?: string;
  submittedAt: Date;
  contestKey?: string;
};

async function fetchCodforces(handle: string): Promise<RawSubmission[]> {
  const res = await fetch(
    `https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}&from=1&count=500`
  );
  const data = (await res.json()) as any;
  if (data.status !== "OK") throw new Error(data.comment ?? "Codeforces fetch failed");

  const verdictMap: Record<string, Verdict> = {
    OK: "ACCEPTED", WRONG_ANSWER: "WRONG_ANSWER",
    TIME_LIMIT_EXCEEDED: "TLE", RUNTIME_ERROR: "RUNTIME_ERROR",
    COMPILATION_ERROR: "COMPILATION_ERROR",
  };

  return data.result.map((s: any): RawSubmission => ({
    externalSubmissionId: String(s.id),
    problemKey:  `${s.problem.contestId}${s.problem.index}`,
    problemTitle: s.problem.name,
    rating:      s.problem.rating,
    tags:        s.problem.tags ?? [],
    verdict:     verdictMap[s.verdict] ?? "OTHER",
    language:    s.programmingLanguage,
    submittedAt: new Date(s.creationTimeSeconds * 1000),
    contestKey:  s.problem.contestId ? String(s.problem.contestId) : undefined,
  }));
}

async function fetchLeetCode(handle: string): Promise<RawSubmission[]> {
  const query = `query recentSubmissions($username: String!) {
    recentSubmissionList(username: $username, limit: 20) {
      title titleSlug timestamp statusDisplay lang
    }
  }`;
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { username: handle } }),
  });
  const data = (await res.json()) as any;

  const verdictMap: Record<string, Verdict> = {
    Accepted: "ACCEPTED", "Wrong Answer": "WRONG_ANSWER",
    "Time Limit Exceeded": "TLE", "Runtime Error": "RUNTIME_ERROR",
    "Compile Error": "COMPILATION_ERROR",
  };

  return (data?.data?.recentSubmissionList ?? []).map((s: any): RawSubmission => ({
    externalSubmissionId: `${s.titleSlug}-${s.timestamp}`,
    problemKey:  s.titleSlug,
    problemTitle: s.title,
    tags:        [],
    verdict:     verdictMap[s.statusDisplay] ?? "OTHER",
    language:    s.lang,
    submittedAt: new Date(Number(s.timestamp) * 1000),
  }));
}

async function fetchAtCoder(handle: string): Promise<RawSubmission[]> {
  const res = await fetch(
    `https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${encodeURIComponent(handle)}&from_second=0`
  );
  const data = (await res.json()) as any;

  const verdictMap: Record<string, Verdict> = {
    AC: "ACCEPTED", WA: "WRONG_ANSWER", TLE: "TLE",
    RE: "RUNTIME_ERROR", CE: "COMPILATION_ERROR",
  };

  return (Array.isArray(data) ? data : []).map((s: any): RawSubmission => ({
    externalSubmissionId: String(s.id),
    problemKey:  s.problem_id,
    problemTitle: s.problem_id,
    tags:        [],
    verdict:     verdictMap[s.result] ?? "OTHER",
    language:    s.language,
    submittedAt: new Date(s.epoch_second * 1000),
    contestKey:  s.contest_id,
  }));
}

const fetchers: Record<Platform, (handle: string) => Promise<RawSubmission[]>> = {
  CODEFORCES: fetchCodforces,
  LEETCODE:   fetchLeetCode,
  ATCODER:    fetchAtCoder,
};

// ---------------------------------------------------------------------------
// Core sync logic
// ---------------------------------------------------------------------------

async function runSync(userId: string, platform: Platform, handle: string) {
  const linkedAccount = await prisma.linkedAccount.findUnique({
    where: { userId_platform: { userId, platform } },
  });

  const job = await prisma.syncJob.create({
    data: { userId, platform, linkedAccountId: linkedAccount?.id, status: "RUNNING" },
  });

  try {
    const fetch = fetchers[platform];
    if (!fetch) throw new Error(`No fetcher for platform: ${platform}`);

    const submissions = await fetch(handle);
    let processed = 0;

    for (const s of submissions) {
      const problem = await prisma.problem.upsert({
        where: { platform_problemKey: { platform, problemKey: s.problemKey } },
        update: { title: s.problemTitle, rating: s.rating ?? null, tags: s.tags },
        create: { platform, problemKey: s.problemKey, title: s.problemTitle, rating: s.rating ?? null, tags: s.tags },
      });

      let contestId: string | undefined;
      if (s.contestKey) {
        const contest = await prisma.contest.upsert({
          where: { platform_contestKey: { platform, contestKey: s.contestKey } },
          update: {},
          create: { platform, contestKey: s.contestKey, name: s.contestKey },
        });
        contestId = contest.id;
      }

      await prisma.submission.upsert({
        where: { platform_externalSubmissionId: { platform, externalSubmissionId: s.externalSubmissionId } },
        update: {},
        create: {
          userId, platform,
          externalSubmissionId: s.externalSubmissionId,
          problemId: problem.id,
          contestId: contestId ?? null,
          verdict: s.verdict,
          language: s.language ?? null,
          submittedAt: s.submittedAt,
        },
      });
      processed++;
    }

    await prisma.syncJob.update({
      where: { id: job.id },
      data: { status: "SUCCESS", finishedAt: new Date(), itemsProcessed: processed },
    });

    await prisma.linkedAccount.update({
      where: { userId_platform: { userId, platform } },
      data: { status: "connected", lastSyncedAt: new Date(), lastError: null },
    });

    return { processed };
  } catch (err: any) {
    await prisma.syncJob.update({
      where: { id: job.id },
      data: { status: "FAILED", finishedAt: new Date(), errorMessage: err.message },
    });
    await prisma.linkedAccount.update({
      where: { userId_platform: { userId, platform } },
      data: { status: "error", lastError: err.message },
    });
    throw err;
  }
}

// ---------------------------------------------------------------------------
// Worker
// ---------------------------------------------------------------------------

export function startSyncWorker() {
  const worker = new Worker<SyncJobData>(
    QUEUE_NAMES.SYNC,
    async (job) => {
      const { userId, platform, handle } = job.data;
      console.log(`[sync] Starting ${platform}/${handle} for user ${userId}`);

      await runSync(userId, platform, handle);

      // Chain to analytics queue
      const { analyticsQueue } = await import("./analytics.queue");
      await analyticsQueue.add(JOB_NAMES.COMPUTE_ANALYTICS, { userId });

      console.log(`[sync] Done ${platform}/${handle} — analytics job enqueued`);
    },
    { connection: redisConnection, concurrency: 5 }
  );

  worker.on("failed", (job, err) =>
    console.error(`[sync] Job ${job?.id} failed:`, err.message)
  );
  worker.on("completed", (job) =>
    console.log(`[sync] Job ${job.id} completed`)
  );

  return worker;
}
