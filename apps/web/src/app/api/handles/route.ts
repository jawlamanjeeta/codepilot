import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getLinkedAccounts } from "@codepilot/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const accounts = await getLinkedAccounts(session.user.id);
    return NextResponse.json({ accounts });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch linked handles" },
      { status: 500 }
    );
  }
}