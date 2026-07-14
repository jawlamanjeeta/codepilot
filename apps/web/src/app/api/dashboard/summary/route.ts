import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const userId = session.user.id;

  const [totalSolved, byPlatform, recent, topicRows] = await Promise.all([
    db.submission.count({ where: { userId, verdict: "ACCEPTED" } }),
    db.submission.groupBy({
      by: ["platform"],
      where: { userId, verdict: "ACCEPTED" },
      _count: { _all: true },
    }),
    db.submission.findMany({
      where: { userId },
      orderBy: { submittedAt: "desc" },
      take: 10,
      include: { problem: true },
    }),
    db.submission.findMany({
      where: { userId, verdict: "ACCEPTED" },
      include: { problem: true },
    }),
  ]);

  const topicCounts: Record<string, number> = {};
  for (const row of topicRows) {
    for (const tag of row.problem.tags) {
      topicCounts[tag] = (topicCounts[tag] ?? 0) + 1;
    }
  }

  return NextResponse.json({
    totalSolved,
    byPlatform,
    recent,
    topicCounts,
  });
}