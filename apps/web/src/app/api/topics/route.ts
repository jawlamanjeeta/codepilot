import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getTopicStats, getWeakTopics, getStrongTopics } from "@codepilot/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [allTopics, weakTopics, strongTopics] = await Promise.all([
      getTopicStats(session.user.id),
      getWeakTopics(session.user.id, 10),
      getStrongTopics(session.user.id, 10),
    ]);

    return NextResponse.json({
      topics: allTopics,
      weakTopics,
      strongTopics,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch topics" },
      { status: 500 }
    );
  }
}