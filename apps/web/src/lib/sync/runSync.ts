import { prisma } from "@codepilot/db";
import { platformAdapters } from "@/lib/platforms";
import type { Platform } from "@codepilot/db";

export async function runSync(userId: string, platform: Platform, handle: string) {
  // Find the linked account to get its id
  const linkedAccount = await prisma.linkedAccount.findUnique({
    where: { userId_platform: { userId, platform } },
  });

  // Create a sync job record
  const job = await prisma.syncJob.create({
    data: {
      userId,
      platform,
      linkedAccountId: linkedAccount?.id,
      status: "RUNNING",
    },
  });

  try {
    const adapter = platformAdapters[platform];
    if (!adapter) throw new Error(`No adapter registered for platform: ${platform}`);

    const submissions = await adapter.fetchSubmissions(handle);
    let processed = 0;

    for (const s of submissions) {
      // 1. Upsert the problem catalogue entry
      const problem = await prisma.problem.upsert({
        where: { platform_problemKey: { platform, problemKey: s.problemKey } },
        update: { title: s.problemTitle, rating: s.rating, tags: s.tags },
        create: {
          platform,
          problemKey: s.problemKey,
          title: s.problemTitle,
          rating: s.rating ?? null,
          tags: s.tags,
        },
      });

      // 2. Optionally upsert the contest
      let contestId: string | undefined;
      if (s.contestKey) {
        const contest = await prisma.contest.upsert({
          where: { platform_contestKey: { platform, contestKey: s.contestKey } },
          update: {},
          create: { platform, contestKey: s.contestKey, name: s.contestKey },
        });
        contestId = contest.id;
      }

      // 3. Upsert the submission (idempotent on externalSubmissionId)
      await prisma.submission.upsert({
        where: {
          platform_externalSubmissionId: {
            platform,
            externalSubmissionId: s.externalSubmissionId,
          },
        },
        update: {},
        create: {
          userId,
          platform,
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

    // Mark job as succeeded
    await prisma.syncJob.update({
      where: { id: job.id },
      data: { status: "SUCCESS", finishedAt: new Date(), itemsProcessed: processed },
    });

    // Update linked account status
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