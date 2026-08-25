import { SCORE_WEIGHTS } from "../constants/score-weights";
import { recencyDecay } from "../utils/dates";
import { ratingProximityScore, clamp } from "../utils/ratings";

type TopicStat = {
  topic: string;
  skillScore: number;
  attemptCount: number;
  lastUpdatedAt: Date;
};

type Problem = {
  id: string;
  title: string;
  problemKey: string;
  platform: string;
  rating: number | null;
  tags: string[];
};

type RecommendationCandidate = {
  problem: Problem;
  priority: number; // 0–100
  reason: string;
};

type RecommendationInput = {
  topicStats: TopicStat[];
  unsolved: Problem[];       // problems user has NOT solved yet
  userRating: number;        // best rating across all platforms
};

/**
 * Scores and ranks unsolved problems to generate a prioritised recommendation list.
 *
 * Priority formula (see SCORE_WEIGHTS.RECOMMENDATION):
 *   priority = (weakTopicScore × 0.4)
 *            + (ratingProximity  × 0.3)
 *            + (recencyBonus     × 0.2)
 *            + (varietyBonus     × 0.1)
 *
 * Returns the top PLAN_SIZE recommendations sorted by priority desc.
 */
export function computeRecommendations(
  input: RecommendationInput
): RecommendationCandidate[] {
  const { W_WEAK_TOPIC, W_RATING_GAP, W_RECENCY_BONUS, W_VARIETY, PLAN_SIZE } =
    SCORE_WEIGHTS.RECOMMENDATION;

  const { topicStats, unsolved, userRating } = input;

  // Build a quick-lookup of topic → stat
  const topicMap = new Map<string, TopicStat>(
    topicStats.map((t) => [t.topic, t])
  );

  // Track which topics are already in the candidate list (for variety)
  const topicsInPlan = new Map<string, number>();

  const candidates: RecommendationCandidate[] = unsolved.map((problem) => {
    const problemTags = problem.tags;

    // --- Weak-topic score ---
    // Pick the weakest topic this problem belongs to
    let weakTopicScore = 0;
    let weakestTopic = "";
    for (const tag of problemTags) {
      const stat = topicMap.get(tag);
      if (stat) {
        const contribution = 100 - stat.skillScore; // higher = weaker
        if (contribution > weakTopicScore) {
          weakTopicScore = contribution;
          weakestTopic = tag;
        }
      }
    }

    // --- Rating proximity score ---
    const ratingScore =
      problem.rating != null
        ? ratingProximityScore(userRating, problem.rating)
        : 50; // unknown rating → neutral score

    // --- Recency bonus ---
    // Penalise topics the user practised very recently (avoid repetition)
    let recencyBonus = 50; // default: neutral
    for (const tag of problemTags) {
      const stat = topicMap.get(tag);
      if (stat) {
        // If practised very recently, recency bonus is LOW (don't repeat)
        // If not practised in a while, recency bonus is HIGH (re-engage)
        const decay = recencyDecay(stat.lastUpdatedAt, 14); // 14-day half-life
        recencyBonus = Math.max(recencyBonus, (1 - decay) * 100);
      }
    }

    // --- Variety bonus ---
    // Penalise if this topic already has many entries in the plan
    const topicCount = topicsInPlan.get(weakestTopic) ?? 0;
    const varietyBonus = clamp(100 - topicCount * 30, 0, 100);
    topicsInPlan.set(weakestTopic, topicCount + 1);

    const priority =
      weakTopicScore * W_WEAK_TOPIC +
      ratingScore    * W_RATING_GAP +
      recencyBonus   * W_RECENCY_BONUS +
      varietyBonus   * W_VARIETY;

    // Build a human-readable reason
    let reason = "Recommended for balanced practice";
    if (weakestTopic && weakTopicScore > 40) {
      reason = `Weak topic: ${weakestTopic.replace(/-/g, " ")}`;
    } else if (problem.rating && Math.abs(problem.rating - userRating) <= 200) {
      reason = `At your level (${problem.rating ?? "?"})`;
    }

    return { problem, priority: clamp(Math.round(priority), 0, 100), reason };
  });

  // Sort by priority desc and return top PLAN_SIZE
  return candidates
    .sort((a, b) => b.priority - a.priority)
    .slice(0, PLAN_SIZE);
}
