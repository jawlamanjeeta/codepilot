import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getRecentSyncJobs } from "@codepilot/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const jobs = await getRecentSyncJobs(session.user.id, 20);
    return NextResponse.json({ jobs });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch sync jobs" },
      { status: 500 }
    );
  }
}