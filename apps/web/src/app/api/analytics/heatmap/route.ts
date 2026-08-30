import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDailyActivity } from "@codepilot/db";
import { toDateKey, daysAgo, fillDateRange } from "@codepilot/shared";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const days = Math.min(Math.max(Number(searchParams.get("days") || 365), 30), 730);

  try {
    const activities = await getDailyActivity(session.user.id, days);

    const map = new Map<string, number>();
    for (const act of activities) {
      map.set(toDateKey(act.date), act.solvedCount);
    }

    const startDate = daysAgo(days);
    const filledMap = fillDateRange(map, startDate, new Date());

    const entries = Array.from(filledMap.entries()).map(([date, count]) => ({
      date,
      count,
    }));

    const totalSolvedInPeriod = entries.reduce((sum, item) => sum + item.count, 0);

    return NextResponse.json({
      entries,
      totalSolvedInPeriod,
      days,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch heatmap data" },
      { status: 500 }
    );
  }
}
