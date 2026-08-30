import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getContestHistory } from "@codepilot/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const history = await getContestHistory(session.user.id);

    const totalContests = history.length;
    let bestRank: number | null = null;
    let totalRatingDelta = 0;

    for (const h of history) {
      if (h.rank != null) {
        bestRank = bestRank == null ? h.rank : Math.min(bestRank, h.rank);
      }
      if (h.ratingDelta != null) {
        totalRatingDelta += h.ratingDelta;
      }
    }

    return NextResponse.json({
      contests: history,
      totalContests,
      bestRank,
      totalRatingDelta,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch contest history" },
      { status: 500 }
    );
  }
}
