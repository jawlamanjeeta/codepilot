import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { runSync } from "@/lib/sync/runSync";

export async function POST(_req: Request, { params }: { params: { platform: string } }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const account = await db.linkedAccount.findUnique({
    where: { userId_platform: { userId: session.user.id, platform: params.platform as any } },
  });

  if (!account) return NextResponse.json({ error: "no linked handle for platform" }, { status: 404 });

  try {
    await runSync(session.user.id, params.platform, account.handle);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}