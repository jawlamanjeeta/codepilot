import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const solved = await db.submission.findMany({
    where: { userId: session.user.id, verdict: "ACCEPTED" },
    include: { problem: true },
  });

  const attemptCounts: Record<string, { solved: number; attempts: number }> = {};

  for (const s of solved) {
    for (const tag of s.problem.tags) {
      attemptCounts[tag] ??= { solved: 0, attempts: 0 };
      attemptCounts[tag].solved += 1;
    }
  }

  return NextResponse.json({ topics: attemptCounts });
}