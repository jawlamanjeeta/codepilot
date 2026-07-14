import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  await db.linkedAccount.deleteMany({
    where: { id: params.id, userId: session.user.id },
  });

  return NextResponse.json({ ok: true });
}