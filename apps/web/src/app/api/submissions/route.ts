import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@codepilot/db";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const platform = searchParams.get("platform") as any;
  const verdict = searchParams.get("verdict") as any;
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const page = Math.max(1, Number(searchParams.get("page") || "1"));
  const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize") || "20")));

  const where: any = { userId: session.user.id };
  if (platform) where.platform = platform;
  if (verdict) where.verdict = verdict;
  if (from || to) {
    where.submittedAt = {};
    if (from) where.submittedAt.gte = new Date(from);
    if (to) where.submittedAt.lte = new Date(to);
  }

  try {
    const [items, total] = await Promise.all([
      prisma.submission.findMany({
        where,
        include: { problem: true, contest: true },
        orderBy: { submittedAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.submission.count({ where }),
    ]);

    return NextResponse.json({ items, total, page, pageSize });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}