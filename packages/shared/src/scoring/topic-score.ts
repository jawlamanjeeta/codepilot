import { SCORE_WEIGHTS } from "../constants/score-weights";
import { recencyDecay } from "../utils/dates";
import { normaliseVolume, clamp } from "../utils/ratings";

type Submission = {
  verdict: string;
  submittedAt: Date;
};

type TopicScoreInput = {
  /** All submissions (accepted + rejected) for this topic. */
  submissions: Submission[];
};

type TopicScoreResult = {
  attemptCount: number;
  solvedCount: number;
  wrongCount: number;
  avgRating: number | null;
  skillScore: number; // 0–100
};

/**
 * Computes a skill score for a single topic.
 *
 * Formula (see SCORE_WEIGHTS.TOPIC):
 *   score = (accuracy × 0.5) + (volume × 0.25) + (recency × 0.25)
 *
 * - accuracy: % of attempts that were accepted (0–100)
 * - volume:   log-normalised solved count (0–100, target = 50 solves)
 * - recency:  exponential decay from last-solved date (0–100, half-life = 90d)
 */
export function computeTopicScore(
  input: TopicScoreInput,
  ratings?: number[]
): TopicScoreResult {
  const { submissions } = input;
  const { W_ACCURACY, W_VOLUME, W_RECENCY } = SCORE_WEIGHTS.TOPIC;

  const attemptCount = submissions.length;
  const accepted = submissions.filter((s) => s.verdict === "ACCEPTED");
  const solvedCount = accepted.length;
  const wrongCount = attemptCount - solvedCount;

  if (attemptCount === 0) {
    return {
      attemptCount: 0,
      solvedCount: 0,
      wrongCount: 0,
      avgRating: null,
      skillScore: 0,
    };
  }

  // Accuracy component (0–100)
  const accuracy = (solvedCount / attemptCount) * 100;

  // Volume component — logarithmic, saturates at 50 solves
  const volume = normaliseVolume(solvedCount, 50);

  // Recency component — based on the most recent accepted submission
  let recency = 0;
  if (accepted.length > 0) {
    const lastSolvedAt = accepted.reduce((latest, s) =>
      s.submittedAt > latest.submittedAt ? s : latest
    ).submittedAt;
    recency = recencyDecay(lastSolvedAt, 90) * 100;
  }

  const rawScore =
    accuracy * W_ACCURACY +
    volume   * W_VOLUME   +
    recency  * W_RECENCY;

  // Average rating across accepted submissions with a known rating
  const ratingValues = (ratings ?? []).filter((r) => r > 0);
  const avgRating =
    ratingValues.length > 0
      ? ratingValues.reduce((s, r) => s + r, 0) / ratingValues.length
      : null;

  return {
    attemptCount,
    solvedCount,
    wrongCount,
    avgRating: avgRating ? Math.round(avgRating) : null,
    skillScore: clamp(Math.round(rawScore), 0, 100),
  };
}
