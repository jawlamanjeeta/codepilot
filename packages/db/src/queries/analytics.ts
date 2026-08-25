import { prisma } from "../client";
import type { Platform } from "@prisma/client";

// ---------------------------------------------------------------------------
// Topic stats (read)
// ---------------------------------------------------------------------------

export async function getTopicStats(userId: string) {
  return prisma.topicStat.findMany({
    where: { userId },
    orderBy: { skillScore: "desc" },
  });
}

export async function getWeakTopics(userId: string, limit = 5) {
  return prisma.topicStat.findMany({
    where: { userId, attemptCount: { gte: 3 } }, // only topics with enough data
    orderBy: { skillScore: "asc" },
    take: limit,
  });
}

export async function getStrongTopics(userId: string, limit = 5) {
  return prisma.topicStat.findMany({
    where: { userId, solvedCount: { gte: 3 } },
    orderBy: { skillScore: "desc" },
    take: limit,
  });
}

// ---------------------------------------------------------------------------
// Daily activity (read)
// ---------------------------------------------------------------------------

export async function getDailyActivity(userId: string, days = 365) {
  const from = new Date();
  from.setDate(from.getDate() - days);
  return prisma.dailyActivity.findMany({
    where: { userId, date: { gte: from } },
    orderBy: { date: "asc" },
  });
}

// ---------------------------------------------------------------------------
// Overview KPI aggregates (read)
// ---------------------------------------------------------------------------

export async function getOverviewKpis(userId: string) {
  const [totalAttempts, uniqueSolved, platformCounts, topicStats, dailyActs] =
    await Promise.all([
      prisma.submission.count({ where: { userId } }),
      prisma.submission.groupBy({
        by: ["problemId"],
        where: { userId, verdict: "ACCEPTED" },
      }),
      prisma.submission.groupBy({
        by: ["platform", "verdict"],
        where: { userId },
        _count: { id: true },
      }),
      prisma.topicStat.findMany({ where: { userId } }),
      prisma.dailyActivity.findMany({
        where: { userId },
        orderBy: { date: "asc" },
      }),
    ]);

  const totalSolved = uniqueSolved.length;
  const acceptanceRate =
    totalAttempts > 0 ? Math.round((totalSolved / totalAttempts) * 100) : 0;

  // Skill score: average across all topics, weighted by attempt count
  const totalWeight = topicStats.reduce((s, t) => s + t.attemptCount, 0);
  const skillScore =
    totalWeight > 0
      ? Math.round(
          topicStats.reduce((s, t) => s + t.skillScore * t.attemptCount, 0) /
            totalWeight
        )
      : 0;

  // Platform breakdown
  const platformMap: Record<string, { solved: number; attempted: number }> = {};
  for (const row of platformCounts) {
    const key = row.platform;
    if (!platformMap[key]) platformMap[key] = { solved: 0, attempted: 0 };
    platformMap[key].attempted += (row._count as any).id;
    if (row.verdict === "ACCEPTED") platformMap[key].solved += (row._count as any).id;
  }
  const platformBreakdown = Object.entries(platformMap).map(([platform, v]) => ({
    platform,
    ...v,
  }));

  // Streak calculation from daily activity
  const sortedDays = dailyActs
    .filter((d) => d.solvedCount > 0)
    .map((d) => d.date.toISOString().slice(0, 10))
    .sort();

  let currentStreak = 0;
  let longestStreak = 0;
  let streak = 0;
  const today = new Date().toISOString().slice(0, 10);

  for (let i = sortedDays.length - 1; i >= 0; i--) {
    const expected = new Date();
    expected.setDate(expected.getDate() - (sortedDays.length - 1 - i));
    if (sortedDays[i] === expected.toISOString().slice(0, 10)) {
      streak++;
      if (i === sortedDays.length - 1 && (sortedDays[i] === today)) {
        currentStreak = streak;
      }
    } else {
      streak = 0;
    }
    if (streak > longestStreak) longestStreak = streak;
  }

  return {
    totalSolved,
    totalAttempts,
    acceptanceRate,
    currentStreak,
    longestStreak,
    skillScore,
    platformBreakdown,
  };
}

// ---------------------------------------------------------------------------
// Difficulty distribution (read)
// ---------------------------------------------------------------------------

export async function getDifficultyDistribution(userId: string) {
  const subs = await prisma.submission.findMany({
    where: { userId, verdict: "ACCEPTED" },
    include: { problem: { select: { rating: true } } },
    distinct: ["problemId"],
  });

  const buckets = [
    { label: "< 1200",    ratingMin: 0,    ratingMax: 1199 },
    { label: "1200–1599", ratingMin: 1200, ratingMax: 1599 },
    { label: "1600–1899", ratingMin: 1600, ratingMax: 1899 },
    { label: "1900–2199", ratingMin: 1900, ratingMax: 2199 },
    { label: "2200–2499", ratingMin: 2200, ratingMax: 2499 },
    { label: "2500+",     ratingMin: 2500, ratingMax: Infinity },
  ];

  return buckets.map((b) => ({
    ...b,
    count: subs.filter((s) => {
      const r = s.problem.rating ?? 0;
      return r >= b.ratingMin && r <= b.ratingMax;
    }).length,
  }));
}

// ---------------------------------------------------------------------------
// Topic stats upsert (write — called by analytics worker)
// ---------------------------------------------------------------------------

export async function upsertTopicStat(
  userId: string,
  topic: string,
  data: {
    attemptCount: number;
    solvedCount: number;
    wrongCount: number;
    avgRating: number | null;
    skillScore: number;
  }
) {
  return prisma.topicStat.upsert({
    where: { userId_topic: { userId, topic } },
    create: { userId, topic, ...data },
    update: data,
  });
}

// ---------------------------------------------------------------------------
// Daily activity upsert (write — called by analytics worker)
// ---------------------------------------------------------------------------

export async function upsertDailyActivity(
  userId: string,
  date: Date,
  data: { solvedCount: number; attemptCount: number }
) {
  // Truncate to date-only for the unique key
  const day = new Date(date);
  day.setUTCHours(0, 0, 0, 0);

  return prisma.dailyActivity.upsert({
    where: { userId_date: { userId, date: day } },
    create: { userId, date: day, ...data },
    update: data,
  });
}
