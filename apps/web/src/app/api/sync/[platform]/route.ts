import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getLinkedAccount } from "@codepilot/db";
import { validatePlatform } from "@codepilot/shared";
import { runSync } from "@/lib/sync/runSync";

export async function POST(
  _req: Request,
  props: { params: Promise<{ platform: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { platform: rawPlatform } = await props.params;

  try {
    const platform = validatePlatform(rawPlatform.toUpperCase());

    const account = await getLinkedAccount(session.user.id, platform);
    if (!account) {
      return NextResponse.json(
        { error: `No linked handle found for ${platform}` },
        { status: 404 }
      );
    }

    const result = await runSync(session.user.id, platform, account.handle);

    return NextResponse.json({
      ok: true,
      platform,
      itemsProcessed: result.processed,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || `Failed to sync ${rawPlatform}` },
      { status: 500 }
    );
  }
}