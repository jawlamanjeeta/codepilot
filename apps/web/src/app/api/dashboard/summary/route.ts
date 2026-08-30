import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getOverviewKpis,
  getWeakTopics,
  getStrongTopics,
  getRecentSubmissions,
  getRecommendations,
  getLinkedAccounts,
} from "@codepilot/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const [overview, weakTopics, strongTopics, recentSubmissions, recommendations, linkedAccounts] =
      await Promise.all([
        getOverviewKpis(userId),
        getWeakTopics(userId, 5),
        getStrongTopics(userId, 5),
        getRecentSubmissions(userId, { limit: 10 }),
        getRecommendations(userId, { status: "pending", limit: 5 }),
        getLinkedAccounts(userId),
      ]);

    return NextResponse.json({
      overview,
      weakTopics,
      strongTopics,
      recentSubmissions,
      recommendations,
      linkedAccounts,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch dashboard summary" },
      { status: 500 }
    );
  }
}