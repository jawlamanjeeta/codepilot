import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@codepilot/db";

export async function DELETE(
  _req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await props.params;

  try {
    await prisma.linkedAccount.deleteMany({
      where: { id, userId: session.user.id },
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete linked account" },
      { status: 500 }
    );
  }
}