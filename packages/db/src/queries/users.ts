import { prisma } from "../client";

// ---------------------------------------------------------------------------
// User profile
// ---------------------------------------------------------------------------

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, image: true, createdAt: true },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    select: { id: true, name: true, email: true, image: true, createdAt: true },
  });
}

// ---------------------------------------------------------------------------
// Sync jobs
// ---------------------------------------------------------------------------

export async function createSyncJob(
  userId: string,
  platform: string,
  linkedAccountId?: string
) {
  return prisma.syncJob.create({
    data: {
      userId,
      platform: platform as any,
      linkedAccountId,
      status: "RUNNING",
    },
  });
}

export async function completeSyncJob(
  id: string,
  opts: { success: boolean; itemsProcessed?: number; errorMessage?: string }
) {
  return prisma.syncJob.update({
    where: { id },
    data: {
      status: opts.success ? "SUCCESS" : "FAILED",
      finishedAt: new Date(),
      itemsProcessed: opts.itemsProcessed ?? 0,
      errorMessage: opts.errorMessage ?? null,
    },
  });
}

export async function getRecentSyncJobs(userId: string, limit = 10) {
  return prisma.syncJob.findMany({
    where: { userId },
    orderBy: { startedAt: "desc" },
    take: limit,
  });
}

export async function getLatestSyncJob(userId: string, platform: string) {
  return prisma.syncJob.findFirst({
    where: { userId, platform: platform as any },
    orderBy: { startedAt: "desc" },
  });
}
