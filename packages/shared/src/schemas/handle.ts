/**
 * Validates a platform handle string.
 * Handles can contain letters, digits, hyphens, underscores, and dots.
 */
export function validateHandle(handle: unknown): string {
  if (typeof handle !== "string" || handle.trim().length === 0) {
    throw new Error("Handle must be a non-empty string.");
  }
  const trimmed = handle.trim();
  if (trimmed.length > 64) {
    throw new Error("Handle must be 64 characters or fewer.");
  }
  if (!/^[a-zA-Z0-9._\-]+$/.test(trimmed)) {
    throw new Error(
      "Handle can only contain letters, digits, dots, underscores, and hyphens."
    );
  }
  return trimmed;
}

export const SUPPORTED_PLATFORMS = ["CODEFORCES", "LEETCODE", "ATCODER"] as const;
export type SupportedPlatform = (typeof SUPPORTED_PLATFORMS)[number];

export function validatePlatform(platform: unknown): SupportedPlatform {
  if (!SUPPORTED_PLATFORMS.includes(platform as SupportedPlatform)) {
    throw new Error(
      `Platform must be one of: ${SUPPORTED_PLATFORMS.join(", ")}.`
    );
  }
  return platform as SupportedPlatform;
}
