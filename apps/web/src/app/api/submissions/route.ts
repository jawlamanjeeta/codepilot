import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const platform = searchParams.get("platform");
  const verdict = searchParams.get("verdict");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = 20;

  const where: any = { userId: session.user.id };
  if (platform) where.platform = platform;
  if (verdict) where.verdict = verdict;
  if (from || to) {
    where.submittedAt = {};
    if (from) where.submittedAt.gte = new Date(from);
    if (to) where.submittedAt.lte = new Date(to);
  }

  const [items, total] = await Promise.all([
    db.submission.findMany({
      where,
      include: { problem: true },
      orderBy: { submittedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.submission.count({ where }),
  ]);

  return NextResponse.json({ items, total, page, pageSize });
}