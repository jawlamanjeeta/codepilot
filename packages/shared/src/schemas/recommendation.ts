/**
 * Validates a recommendation status update body.
 */
export function validateRecommendationUpdate(body: unknown): {
  status: "solved" | "skipped" | "pending";
} {
  if (!body || typeof body !== "object") {
    throw new Error("Request body must be a JSON object.");
  }
  const b = body as Record<string, unknown>;
  const allowed = ["solved", "skipped", "pending"] as const;
  if (!allowed.includes(b.status as (typeof allowed)[number])) {
    throw new Error(`'status' must be one of: ${allowed.join(", ")}.`);
  }
  return { status: b.status as "solved" | "skipped" | "pending" };
}
