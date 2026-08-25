/**
 * Weights used in skill / topic scoring formulas.
 * Tweak these to re-balance how each factor influences scores.
 */
export const SCORE_WEIGHTS = {
  /**
   * Topic skill score (0–100):
   * score = (accuracy * W_ACCURACY) + (volume * W_VOLUME) + (recency * W_RECENCY)
   */
  TOPIC: {
    W_ACCURACY: 0.5,   // 50% — how often you solve vs attempt
    W_VOLUME:   0.25,  // 25% — how many problems you've solved in this topic
    W_RECENCY:  0.25,  // 25% — how recently you solved problems here
  },

  /**
   * Overall skill score: weighted average of per-topic scores.
   * Topics with more attempts carry more weight.
   */
  SKILL: {
    MIN_ATTEMPTS_FOR_WEIGHT: 3, // ignore topics with < 3 attempts in the weighted avg
  },

  /**
   * Consistency score (0–100):
   * score = (streak * W_STREAK) + (density * W_DENSITY)
   */
  CONSISTENCY: {
    W_STREAK:  0.6,  // current streak matters more
    W_DENSITY: 0.4,  // overall activity density
    LOOKBACK_DAYS: 90,
    TARGET_DAILY_PROBLEMS: 3, // problems/day considered "full effort"
  },

  /**
   * Recommendation priority score:
   * Higher = surfaced first in the daily plan.
   */
  RECOMMENDATION: {
    W_WEAK_TOPIC:   0.4,  // topic is below threshold
    W_RATING_GAP:   0.3,  // problem rating is reachable from current level
    W_RECENCY_BONUS:0.2,  // topic hasn't been practised recently
    W_VARIETY:      0.1,  // diversifies problem types in the plan

    WEAK_TOPIC_THRESHOLD: 50, // skill score below this = "weak"
    IDEAL_RATING_DELTA:   150, // target problems ~150 above current rating
    MAX_RATING_DELTA:     400, // don't recommend problems too far above
    PLAN_SIZE:            10,  // problems in a daily plan
  },
} as const;
