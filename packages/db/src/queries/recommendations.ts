import { prisma } from "../client";
import type { RecommendationStatus } from "@prisma/client";

// ---------------------------------------------------------------------------
// Read recommendations
// ---------------------------------------------------------------------------

export async function getRecommendations(
  userId: string,
  opts: { status?: RecommendationStatus; limit?: number } = {}
) {
  return prisma.recommendation.findMany({
    where: {
      userId,
      ...(opts.status ? { status: opts.status } : {}),
      OR: [{ expiresAt: null }, { expiresAt: { gte: new Date() } }],
    },
    include: {
      problem: {
        select: {
          id: true,
          title: true,
          problemKey: true,
          platform: true,
          rating: true,
          tags: true,
        },
      },
    },
    orderBy: { priority: "desc" },
    take: opts.limit ?? 20,
  });
}

// ---------------------------------------------------------------------------
// Write recommendations (called by recommendation worker)
// ---------------------------------------------------------------------------

export async function createRecommendations(
  userId: string,
  items: {
    problemId: string;
    reason: string;
    priority: number;
    expiresAt?: Date;
  }[]
) {
  return prisma.recommendation.createMany({
    data: items.map((item) => ({ userId, status: "pending", ...item })),
    skipDuplicates: true,
  });
}

export async function clearPendingRecommendations(userId: string) {
  return prisma.recommendation.deleteMany({
    where: { userId, status: "pending" },
  });
}

// ---------------------------------------------------------------------------
// Update status (user action: mark as solved / skipped)
// ---------------------------------------------------------------------------

export async function updateRecommendationStatus(
  id: string,
  userId: string,
  status: RecommendationStatus
) {
  return prisma.recommendation.updateMany({
    where: { id, userId },
    data: { status },
  });
}
