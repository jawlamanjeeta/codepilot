/**
 * Validates a sync trigger request body.
 */
export function validateSyncRequest(body: unknown): {
  platform: string;
  handle: string;
} {
  if (!body || typeof body !== "object") {
    throw new Error("Request body must be a JSON object.");
  }
  const b = body as Record<string, unknown>;

  if (typeof b.platform !== "string" || b.platform.trim() === "") {
    throw new Error("Field 'platform' is required.");
  }
  if (typeof b.handle !== "string" || b.handle.trim() === "") {
    throw new Error("Field 'handle' is required.");
  }

  return { platform: b.platform.trim().toUpperCase(), handle: b.handle.trim() };
}
