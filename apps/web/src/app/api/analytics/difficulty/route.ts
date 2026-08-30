import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDifficultyDistribution } from "@codepilot/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const distribution = await getDifficultyDistribution(session.user.id);
    return NextResponse.json({ distribution });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch difficulty distribution" },
      { status: 500 }
    );
  }
}
