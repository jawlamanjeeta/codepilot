import { prisma } from "../client";
import type { Platform } from "@prisma/client";

// ---------------------------------------------------------------------------
// Contest history
// ---------------------------------------------------------------------------

export async function getContestHistory(userId: string) {
  return prisma.contestParticipation.findMany({
    where: { userId },
    include: {
      contest: {
        select: {
          id: true,
          platform: true,
          contestKey: true,
          name: true,
          startTime: true,
        },
      },
    },
    orderBy: { contest: { startTime: "desc" } },
  });
}

export async function getContestsByPlatform(userId: string, platform: Platform) {
  return prisma.contestParticipation.findMany({
    where: { userId, contest: { platform } },
    include: {
      contest: {
        select: {
          id: true,
          platform: true,
          contestKey: true,
          name: true,
          startTime: true,
        },
      },
    },
    orderBy: { contest: { startTime: "desc" } },
  });
}

// ---------------------------------------------------------------------------
// Upsert contest participation (called by sync runner)
// ---------------------------------------------------------------------------

export async function upsertContestParticipation(
  userId: string,
  contestId: string,
  data: {
    rank?: number;
    ratingBefore?: number;
    ratingAfter?: number;
    ratingDelta?: number;
    solvedCount?: number;
  }
) {
  return prisma.contestParticipation.upsert({
    where: { userId_contestId: { userId, contestId } },
    create: { userId, contestId, ...data },
    update: data,
  });
}
