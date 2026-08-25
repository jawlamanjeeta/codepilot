export const PLATFORM_LABELS: Record<string, string> = {
  CODEFORCES: "Codeforces",
  LEETCODE:   "LeetCode",
  ATCODER:    "AtCoder",
};

export const PLATFORM_COLORS: Record<string, string> = {
  CODEFORCES: "#1890ff",
  LEETCODE:   "#ffa116",
  ATCODER:    "#222222",
};

/** BullMQ queue names — single source of truth used by both API and worker. */
export const QUEUE_NAMES = {
  SYNC:           "sync",
  ANALYTICS:      "analytics",
  RECOMMENDATION: "recommendation",
} as const;

/** Job name constants within each queue. */
export const JOB_NAMES = {
  RUN_SYNC:             "run-sync",
  COMPUTE_ANALYTICS:    "compute-analytics",
  GENERATE_RECOMMENDATIONS: "generate-recommendations",
} as const;
