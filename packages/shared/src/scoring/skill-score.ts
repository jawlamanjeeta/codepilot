import { SCORE_WEIGHTS } from "../constants/score-weights";
import { clamp } from "../utils/ratings";

type TopicWeight = {
  topic: string;
  skillScore: number;
  attemptCount: number;
};

type SkillScoreResult = {
  skillScore: number; // 0–100 overall
  dominantTopics: string[]; // top 3 by weighted contribution
  weakTopics: string[];     // below WEAK_TOPIC_THRESHOLD
};

/**
 * Computes a single overall skill score (0–100) from all per-topic scores.
 *
 * Method: attempt-count-weighted average of topic skill scores.
 * Topics with fewer than MIN_ATTEMPTS_FOR_WEIGHT are excluded from the
 * weighted average (not enough data to be meaningful) but still appear
 * in weak-topic detection if their score is low.
 */
export function computeSkillScore(topics: TopicWeight[]): SkillScoreResult {
  const { MIN_ATTEMPTS_FOR_WEIGHT } = SCORE_WEIGHTS.SKILL;
  const { WEAK_TOPIC_THRESHOLD } = SCORE_WEIGHTS.RECOMMENDATION;

  // Topics with enough data to include in weighted average
  const qualified = topics.filter(
    (t) => t.attemptCount >= MIN_ATTEMPTS_FOR_WEIGHT
  );

  let skillScore = 0;
  if (qualified.length > 0) {
    const totalWeight = qualified.reduce((s, t) => s + t.attemptCount, 0);
    skillScore = qualified.reduce(
      (s, t) => s + (t.skillScore * t.attemptCount) / totalWeight,
      0
    );
  }

  // Dominant topics: top 3 by (skillScore × attemptCount)
  const dominantTopics = [...qualified]
    .sort((a, b) => b.skillScore * b.attemptCount - a.skillScore * a.attemptCount)
    .slice(0, 3)
    .map((t) => t.topic);

  // Weak topics: score below threshold AND at least MIN_ATTEMPTS attempted
  const weakTopics = topics
    .filter(
      (t) =>
        t.skillScore < WEAK_TOPIC_THRESHOLD &&
        t.attemptCount >= MIN_ATTEMPTS_FOR_WEIGHT
    )
    .sort((a, b) => a.skillScore - b.skillScore)
    .map((t) => t.topic);

  return {
    skillScore: clamp(Math.round(skillScore), 0, 100),
    dominantTopics,
    weakTopics,
  };
}
