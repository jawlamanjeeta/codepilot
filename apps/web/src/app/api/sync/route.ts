import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getLinkedAccounts } from "@codepilot/db";
import { runSync } from "@/lib/sync/runSync";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const accounts = await getLinkedAccounts(session.user.id);
    if (accounts.length === 0) {
      return NextResponse.json(
        { error: "No platform accounts linked. Link a handle first." },
        { status: 400 }
      );
    }

    const results = await Promise.allSettled(
      accounts.map((acc) => runSync(session.user.id, acc.platform, acc.handle))
    );

    const successful = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    return NextResponse.json({
      message: `Sync completed: ${successful} succeeded, ${failed} failed.`,
      successful,
      failed,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to trigger sync" },
      { status: 500 }
    );
  }
}
