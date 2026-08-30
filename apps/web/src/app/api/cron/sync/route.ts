import { NextResponse } from "next/server";
import { prisma } from "@codepilot/db";
import { runSync } from "@/lib/sync/runSync";

/**
 * Automated Cron sync endpoint.
 * Syncs accounts that haven't been refreshed in 24 hours.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  // Protect cron in production if CRON_SECRET is configured
  if (cronSecret && authHeader !== `Bearer ${cronSecret}` && searchParams.get("key") !== cronSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const staleAccounts = await prisma.linkedAccount.findMany({
      where: {
        OR: [{ lastSyncedAt: null }, { lastSyncedAt: { lt: oneDayAgo } }],
      },
      take: 25, // batch size per cron run
    });

    const results = await Promise.allSettled(
      staleAccounts.map((acc) => runSync(acc.userId, acc.platform, acc.handle))
    );

    const successful = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    return NextResponse.json({
      message: `Cron sync executed: ${successful} accounts synced, ${failed} failed.`,
      totalChecked: staleAccounts.length,
      successful,
      failed,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Cron sync failed" },
      { status: 500 }
    );
  }
}
