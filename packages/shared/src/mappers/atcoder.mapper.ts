import { TAG_NORMALISATION_MAP } from "../constants/topics";
import type { Topic } from "../constants/topics";

/**
 * Normalises raw AtCoder tags to canonical Topic slugs.
 * Note: AtCoder API (kenkoooo) doesn't return tags directly; this is used
 * when problem metadata is enriched from the AtCoder Problems API.
 */
export function normaliseAtCoderTags(rawTags: string[]): Topic[] {
  const seen = new Set<Topic>();
  for (const tag of rawTags) {
    const normalised = TAG_NORMALISATION_MAP[tag.toLowerCase().trim()];
    if (normalised) seen.add(normalised);
  }
  return Array.from(seen);
}

/**
 * Maps an AtCoder result string to the canonical Verdict.
 */
export function mapAtCoderVerdict(result: string): string {
  const map: Record<string, string> = {
    AC:  "ACCEPTED",
    WA:  "WRONG_ANSWER",
    TLE: "TLE",
    RE:  "RUNTIME_ERROR",
    CE:  "COMPILATION_ERROR",
    MLE: "OTHER",
    OLE: "OTHER",
  };
  return map[result] ?? "OTHER";
}
