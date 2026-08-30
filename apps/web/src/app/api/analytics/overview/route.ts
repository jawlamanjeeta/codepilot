import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getOverviewKpis } from "@codepilot/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const overview = await getOverviewKpis(session.user.id);
    return NextResponse.json({ overview });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch overview analytics" },
      { status: 500 }
    );
  }
}
