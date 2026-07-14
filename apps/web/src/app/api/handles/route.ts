import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const accounts = await db.linkedAccount.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ accounts });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json();
  const { platform, handle } = body as { platform: string; handle: string };

  if (!platform || !handle) {
    return NextResponse.json({ error: "platform and handle are required" }, { status: 400 });
  }

  const account = await db.linkedAccount.upsert({
    where: { userId_platform: { userId: session.user.id, platform: platform as any } },
    update: { handle, status: "connected", lastError: null },
    create: { userId: session.user.id, platform: platform as any, handle },
  });

  return NextResponse.json({ account });
}