import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  console.log("Models on db:");

  for (const key of Object.keys(db)) {
    console.log(key);
  }

  return NextResponse.json({ ok: true });
}