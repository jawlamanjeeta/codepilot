import { TAG_NORMALISATION_MAP } from "../constants/topics";
import type { Topic } from "../constants/topics";
import { LEETCODE_DIFFICULTY_MAP } from "../constants/difficulty-buckets";

/**
 * Normalises raw LeetCode tags to canonical Topic slugs.
 */
export function normaliseLeetCodeTags(rawTags: string[]): Topic[] {
  const seen = new Set<Topic>();
  for (const tag of rawTags) {
    const normalised = TAG_NORMALISATION_MAP[tag.toLowerCase().trim()];
    if (normalised) seen.add(normalised);
  }
  return Array.from(seen);
}

/**
 * Converts a LeetCode difficulty string ("Easy" | "Medium" | "Hard")
 * to an approximate numeric rating compatible with Codeforces scale.
 */
export function leetcodeDifficultyToRating(difficulty: string): number {
  return LEETCODE_DIFFICULTY_MAP[difficulty] ?? 1200;
}

/**
 * Maps a LeetCode status string to the canonical Verdict.
 */
export function mapLeetCodeVerdict(status: string): string {
  const map: Record<string, string> = {
    Accepted:            "ACCEPTED",
    "Wrong Answer":      "WRONG_ANSWER",
    "Time Limit Exceeded": "TLE",
    "Runtime Error":     "RUNTIME_ERROR",
    "Compile Error":     "COMPILATION_ERROR",
  };
  return map[status] ?? "OTHER";
}
