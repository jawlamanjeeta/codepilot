import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { validateHandle, validatePlatform } from "@codepilot/shared";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const handle = validateHandle(body.handle);
    const platform = validatePlatform(body.platform);

    let exists = false;
    let rating: number | null = null;
    let maxRating: number | null = null;

    if (platform === "CODEFORCES") {
      const res = await fetch(
        `https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`
      );
      const data = await res.json();
      if (data.status === "OK" && data.result?.length > 0) {
        exists = true;
        rating = data.result[0].rating ?? null;
        maxRating = data.result[0].maxRating ?? null;
      }
    } else if (platform === "LEETCODE") {
      const query = `query userPublicProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            ranking
            reputation
          }
        }
      }`;
      const res = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables: { username: handle } }),
      });
      const data = await res.json();
      if (data?.data?.matchedUser?.username) {
        exists = true;
      }
    } else if (platform === "ATCODER") {
      const res = await fetch(
        `https://kenkoooo.com/atcoder/atcoder-api/v3/user/info?user=${encodeURIComponent(handle)}`
      );
      if (res.ok) {
        const data = await res.json();
        if (data?.user_id) {
          exists = true;
          rating = data.rating ?? null;
        }
      }
    }

    if (!exists) {
      return NextResponse.json(
        { valid: false, error: `Handle "${handle}" not found on ${platform}` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      valid: true,
      platform,
      handle,
      rating,
      maxRating,
    });
  } catch (error: any) {
    return NextResponse.json(
      { valid: false, error: error.message || "Failed to validate handle" },
      { status: 400 }
    );
  }
}
