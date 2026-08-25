/** Difficulty rating buckets for the distribution chart. */
export const DIFFICULTY_BUCKETS = [
  { label: "< 1200",    ratingMin: 0,    ratingMax: 1199  },
  { label: "1200–1599", ratingMin: 1200, ratingMax: 1599  },
  { label: "1600–1899", ratingMin: 1600, ratingMax: 1899  },
  { label: "1900–2199", ratingMin: 1900, ratingMax: 2199  },
  { label: "2200–2499", ratingMin: 2200, ratingMax: 2499  },
  { label: "2500+",     ratingMin: 2500, ratingMax: Infinity },
] as const;

export type DifficultyBucket = (typeof DIFFICULTY_BUCKETS)[number];

/** LeetCode difficulty bands mapped to approximate Codeforces ratings. */
export const LEETCODE_DIFFICULTY_MAP: Record<string, number> = {
  Easy:   1000,
  Medium: 1600,
  Hard:   2200,
};
