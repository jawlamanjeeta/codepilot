import { db } from "@/lib/db";
import { platformAdapters } from "@/lib/platforms";

export async function runSync(userId: string, platform: string, handle: string) {
  const job = await db.syncJob.create({
    data: { userId, platform: platform as any, status: "RUNNING" },
  });

  try {
    const adapter = platformAdapters[platform];
    if (!adapter) throw new Error(`no adapter for platform ${platform}`);

    const submissions = await adapter.fetchSubmissions(handle);
    let processed = 0;

    for (const s of submissions) {
      const problem = await db.problem.upsert({
        where: { platform_problemKey: { platform: platform as any, problemKey: s.problemKey } },
        update: { title: s.problemTitle, rating: s.rating, tags: s.tags },
        create: {
          platform: platform as any,
          problemKey: s.problemKey,
          title: s.problemTitle,
          rating: s.rating,
          tags: s.tags,
        },
      });

      let contestId: string | undefined;
      if (s.contestKey) {
        const contest = await db.contest.upsert({
          where: { platform_contestKey: { platform: platform as any, contestKey: s.contestKey } },
          update: {},
          create: { platform: platform as any, contestKey: s.contestKey, name: s.contestKey },
        });
        contestId = contest.id;
      }

      await db.submission.upsert({
        where: {
          platform_externalSubmissionId: {
            platform: platform as any,
            externalSubmissionId: s.externalSubmissionId,
          },
        },
        update: {},
        create: {
          userId,
          platform: platform as any,
          externalSubmissionId: s.externalSubmissionId,
          problemId: problem.id,
          contestId,
          verdict: s.verdict as any,
          language: s.language,
          submittedAt: s.submittedAt,
        },
      });

      processed++;
    }

    await db.syncJob.update({
      where: { id: job.id },
      data: { status: "SUCCESS", finishedAt: new Date(), itemsProcessed: processed },
    });

    await db.linkedAccount.updateMany({
      where: { userId, platform: platform as any },
      data: { lastSyncedAt: new Date(), status: "connected", lastError: null },
    });
  } catch (err: any) {
    await db.syncJob.update({
      where: { id: job.id },
      data: { status: "FAILED", finishedAt: new Date(), errorMessage: err.message },
    });

    await db.linkedAccount.updateMany({
      where: { userId, platform: platform as any },
      data: { status: "error", lastError: err.message },
    });

    throw err;
  }
}