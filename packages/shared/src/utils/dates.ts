/**
 * Truncates a Date to midnight UTC (YYYY-MM-DD boundary).
 * Used to group submissions by day for heatmap + DailyActivity.
 */
export function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

/**
 * Parses a "YYYY-MM-DD" string back to a Date at midnight UTC.
 */
export function fromDateKey(key: string): Date {
  return new Date(`${key}T00:00:00.000Z`);
}

/**
 * Returns a Date set to N days ago from now (midnight UTC).
 */
export function daysAgo(n: number): Date {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

/**
 * Computes a recency decay factor in [0, 1].
 * 1.0 = solved today, decays to 0.0 at `halfLifeDays` (default 90 days).
 */
export function recencyDecay(lastSolvedAt: Date, halfLifeDays = 90): number {
  const daysDiff =
    (Date.now() - lastSolvedAt.getTime()) / (1000 * 60 * 60 * 24);
  // Exponential decay: factor = 2^(-t / halfLife)
  return Math.pow(2, -daysDiff / halfLifeDays);
}

/**
 * Fills in missing date keys in a map with 0, from `startDate` to today.
 * Used to produce a complete 365-day heatmap with no gaps.
 */
export function fillDateRange(
  map: Map<string, number>,
  startDate: Date,
  endDate: Date = new Date()
): Map<string, number> {
  const result = new Map<string, number>();
  const current = new Date(startDate);
  current.setUTCHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setUTCHours(0, 0, 0, 0);

  while (current <= end) {
    const key = toDateKey(current);
    result.set(key, map.get(key) ?? 0);
    current.setUTCDate(current.getUTCDate() + 1);
  }
  return result;
}

/**
 * Calculates current and longest streaks from a set of active date keys.
 */
export function calculateStreaks(activeDays: Set<string>): {
  currentStreak: number;
  longestStreak: number;
} {
  const today = toDateKey(new Date());
  const yesterday = toDateKey(daysAgo(1));

  // Sort descending
  const sorted = Array.from(activeDays).sort().reverse();

  let currentStreak = 0;
  let longestStreak = 0;
  let streak = 0;
  let prev: string | null = null;

  // Start streak only if solved today or yesterday
  const streakActive = activeDays.has(today) || activeDays.has(yesterday);

  for (const day of sorted) {
    if (prev === null) {
      streak = 1;
    } else {
      const prevDate = fromDateKey(prev);
      const currDate = fromDateKey(day);
      const diff =
        (prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        streak++;
      } else {
        streak = 1;
      }
    }
    prev = day;
    if (streak > longestStreak) longestStreak = streak;
  }

  if (streakActive && sorted.length > 0) {
    // Re-calculate current streak from today/yesterday
    currentStreak = 0;
    const check = activeDays.has(today) ? today : yesterday;
    const checkDate = fromDateKey(check);
    let cursor = new Date(checkDate);
    while (activeDays.has(toDateKey(cursor))) {
      currentStreak++;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    }
  }

  return { currentStreak, longestStreak };
}
