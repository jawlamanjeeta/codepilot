/**
 * Validates query params for analytics endpoints.
 */
export function validateAnalyticsQuery(params: unknown): {
  days: number;
} {
  const p = (params ?? {}) as Record<string, unknown>;
  const days = Number(p.days ?? 365);
  if (!Number.isInteger(days) || days < 7 || days > 730) {
    throw new Error("'days' must be an integer between 7 and 730.");
  }
  return { days };
}
