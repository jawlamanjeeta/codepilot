import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { upsertLinkedAccount } from "@codepilot/db";
import { validateHandle, validatePlatform } from "@codepilot/shared";
import { runSync } from "@/lib/sync/runSync";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const handle = validateHandle(body.handle);
    const platform = validatePlatform(body.platform);

    const account = await upsertLinkedAccount(session.user.id, platform, handle);

    // Trigger initial sync in background (non-blocking for fast UI response)
    runSync(session.user.id, platform, handle).catch((err) => {
      console.error(`[initial-sync-error] ${platform}/${handle}:`, err.message);
    });

    return NextResponse.json({
      account,
      message: `Connected ${platform} account "${handle}". Sync started.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to connect handle" },
      { status: 400 }
    );
  }
}
