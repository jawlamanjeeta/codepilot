import { TAG_NORMALISATION_MAP } from "../constants/topics";
import type { Topic } from "../constants/topics";

/**
 * Normalises raw Codeforces tags to canonical Topic slugs.
 * Unknown tags are dropped.
 */
export function normaliseCodeforceTags(rawTags: string[]): Topic[] {
  const seen = new Set<Topic>();
  for (const tag of rawTags) {
    const normalised = TAG_NORMALISATION_MAP[tag.toLowerCase().trim()];
    if (normalised) seen.add(normalised);
  }
  return Array.from(seen);
}

/**
 * Maps a Codeforces verdict string to the canonical Verdict enum value.
 */
export function mapCodeforcesVerdict(v: string): string {
  const map: Record<string, string> = {
    OK:                  "ACCEPTED",
    WRONG_ANSWER:        "WRONG_ANSWER",
    TIME_LIMIT_EXCEEDED: "TLE",
    RUNTIME_ERROR:       "RUNTIME_ERROR",
    COMPILATION_ERROR:   "COMPILATION_ERROR",
  };
  return map[v] ?? "OTHER";
}
