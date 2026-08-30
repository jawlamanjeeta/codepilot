import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getTopicStats, getWeakTopics, getStrongTopics } from "@codepilot/db";
import { computeSkillScore } from "@codepilot/shared";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [allTopics, weakTopics, strongTopics] = await Promise.all([
      getTopicStats(session.user.id),
      getWeakTopics(session.user.id, 6),
      getStrongTopics(session.user.id, 6),
    ]);

    const skillResult = computeSkillScore(
      allTopics.map((t) => ({
        topic: t.topic,
        skillScore: t.skillScore,
        attemptCount: t.attemptCount,
      }))
    );

    return NextResponse.json({
      topics: allTopics,
      weakTopics,
      strongTopics,
      dominantTopics: skillResult.dominantTopics,
      overallSkillScore: skillResult.skillScore,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch topic stats" },
      { status: 500 }
    );
  }
}
