import { SCORE_WEIGHTS } from "../constants/score-weights";
import { toDateKey, daysAgo, calculateStreaks } from "../utils/dates";
import { clamp } from "../utils/ratings";

type DailyCount = {
  date: Date;
  solvedCount: number;
};

type ConsistencyScoreResult = {
  consistencyScore: number; // 0–100
  currentStreak: number;
  longestStreak: number;
  activeDays: number; // within lookback window
};

/**
 * Computes a consistency score (0–100) from daily activity.
 *
 * Formula (see SCORE_WEIGHTS.CONSISTENCY):
 *   score = (streakScore × 0.6) + (densityScore × 0.4)
 *
 * - streakScore: current streak normalised against a 30-day target
 * - densityScore: (active days / lookback days) × (avg daily solves / target)
 *
 * Lookback window: 90 days (configurable via SCORE_WEIGHTS).
 */
export function computeConsistencyScore(
  dailyActivity: DailyCount[]
): ConsistencyScoreResult {
  const { W_STREAK, W_DENSITY, LOOKBACK_DAYS, TARGET_DAILY_PROBLEMS } =
    SCORE_WEIGHTS.CONSISTENCY;

  const cutoff = daysAgo(LOOKBACK_DAYS);
  const window = dailyActivity.filter(
    (d) => d.date >= cutoff && d.solvedCount > 0
  );

  const activeDays = window.length;

  // Build a Set<string> of active date keys for streak calculation
  const activeDayKeys = new Set<string>(window.map((d) => toDateKey(d.date)));
  const { currentStreak, longestStreak } = calculateStreaks(activeDayKeys);

  // All-time streak for longestStreak (use the full history)
  const allKeys = new Set<string>(
    dailyActivity
      .filter((d) => d.solvedCount > 0)
      .map((d) => toDateKey(d.date))
  );
  const { longestStreak: allTimeLongest } = calculateStreaks(allKeys);

  // Streak score: current streak vs 30-day target (capped at 100)
  const TARGET_STREAK = 30;
  const streakScore = clamp((currentStreak / TARGET_STREAK) * 100, 0, 100);

  // Density score: how consistently active in the lookback window
  const densityRatio = activeDays / LOOKBACK_DAYS; // 0–1
  const avgSolvedPerActiveDay =
    activeDays > 0
      ? window.reduce((s, d) => s + d.solvedCount, 0) / activeDays
      : 0;
  const effortRatio = clamp(avgSolvedPerActiveDay / TARGET_DAILY_PROBLEMS, 0, 1);
  const densityScore = densityRatio * effortRatio * 100;

  const consistencyScore = clamp(
    Math.round(streakScore * W_STREAK + densityScore * W_DENSITY),
    0,
    100
  );

  return {
    consistencyScore,
    currentStreak,
    longestStreak: allTimeLongest,
    activeDays,
  };
}
