import { prisma } from "../client";
import type { Platform } from "@prisma/client";

// ---------------------------------------------------------------------------
// Recent submissions (for the "Recent Activity" table)
// ---------------------------------------------------------------------------

export async function getRecentSubmissions(
  userId: string,
  opts: { limit?: number; platform?: Platform } = {}
) {
  return prisma.submission.findMany({
    where: {
      userId,
      ...(opts.platform ? { platform: opts.platform } : {}),
    },
    include: {
      problem: {
        select: { id: true, title: true, problemKey: true, rating: true, tags: true },
      },
    },
    orderBy: { submittedAt: "desc" },
    take: opts.limit ?? 20,
  });
}

// ---------------------------------------------------------------------------
// Accepted-only submissions (for analytics)
// ---------------------------------------------------------------------------

export async function getAcceptedSubmissions(userId: string) {
  return prisma.submission.findMany({
    where: { userId, verdict: "ACCEPTED" },
    include: {
      problem: {
        select: { id: true, rating: true, tags: true, platform: true },
      },
    },
    orderBy: { submittedAt: "desc" },
  });
}

// ---------------------------------------------------------------------------
// All submissions in a date range (for heatmap / daily activity computation)
// ---------------------------------------------------------------------------

export async function getSubmissionsInRange(
  userId: string,
  from: Date,
  to: Date
) {
  return prisma.submission.findMany({
    where: {
      userId,
      submittedAt: { gte: from, lte: to },
    },
    select: {
      id: true,
      submittedAt: true,
      verdict: true,
      platform: true,
      problem: { select: { rating: true, tags: true } },
    },
    orderBy: { submittedAt: "asc" },
  });
}

// ---------------------------------------------------------------------------
// Unique accepted problem count
// ---------------------------------------------------------------------------

export async function countUniqueSolved(userId: string): Promise<number> {
  const result = await prisma.submission.groupBy({
    by: ["problemId"],
    where: { userId, verdict: "ACCEPTED" },
  });
  return result.length;
}
