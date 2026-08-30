import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getRecommendations, updateRecommendationStatus } from "@codepilot/db";
import { validateRecommendationUpdate } from "@codepilot/shared";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const statusParam = searchParams.get("status") as any;
  const limitParam = Number(searchParams.get("limit") || 10);

  try {
    const recommendations = await getRecommendations(session.user.id, {
      status: statusParam || "pending",
      limit: limitParam,
    });

    return NextResponse.json({ recommendations });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch recommendations" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { status } = validateRecommendationUpdate(body);
    const id = body.id;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Recommendation id is required" }, { status: 400 });
    }

    await updateRecommendationStatus(id, session.user.id, status);

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update recommendation" },
      { status: 400 }
    );
  }
}
