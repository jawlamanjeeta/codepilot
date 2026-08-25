// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type { Platform, Verdict, LinkedAccountStatus, LinkedAccount } from "./types/platform";
export type { Submission, SubmissionWithProblem, NormalizedSubmission } from "./types/submission";
export type {
  TopicStat,
  DailyActivity,
  OverviewStats,
  DifficultyBucket,
  HeatmapEntry,
} from "./types/analytics";
export type { Recommendation, RecommendationWithProblem, RecommendationStatus } from "./types/recommendation";
export type { UserProfile } from "./types/user";
export type { Problem } from "./types/problem";

// ---------------------------------------------------------------------------
// Schemas / validators
// ---------------------------------------------------------------------------
export {
  validateHandle,
  validatePlatform,
  SUPPORTED_PLATFORMS,
  type SupportedPlatform,
} from "./schemas/handle";
export { validateSyncRequest } from "./schemas/sync";
export { validateAnalyticsQuery } from "./schemas/analytics";
export { validateRecommendationUpdate } from "./schemas/recommendation";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
export {
  TOPICS,
  BEGINNER_TOPICS,
  ADVANCED_TOPICS,
  TAG_NORMALISATION_MAP,
  type Topic,
} from "./constants/topics";
export { SCORE_WEIGHTS } from "./constants/score-weights";
export { DIFFICULTY_BUCKETS, LEETCODE_DIFFICULTY_MAP } from "./constants/difficulty-buckets";
export { PLATFORM_LABELS, PLATFORM_COLORS, QUEUE_NAMES, JOB_NAMES } from "./constants/platforms";

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------
export {
  toDateKey,
  fromDateKey,
  daysAgo,
  recencyDecay,
  fillDateRange,
  calculateStreaks,
} from "./utils/dates";
export {
  clamp,
  normaliseVolume,
  getRatingBracket,
  ratingProximityScore,
} from "./utils/ratings";
export { groupBy, mean, deduplicateByKey, chunk } from "./utils/arrays";

// ---------------------------------------------------------------------------
// Mappers
// ---------------------------------------------------------------------------
export { normaliseCodeforceTags, mapCodeforcesVerdict } from "./mappers/codeforces.mapper";
export { normaliseLeetCodeTags, leetcodeDifficultyToRating, mapLeetCodeVerdict } from "./mappers/leetcode.mapper";
export { normaliseAtCoderTags, mapAtCoderVerdict } from "./mappers/atcoder.mapper";

// ---------------------------------------------------------------------------
// Scoring algorithms
// ---------------------------------------------------------------------------
export { computeTopicScore } from "./scoring/topic-score";
export { computeSkillScore } from "./scoring/skill-score";
export { computeConsistencyScore } from "./scoring/consistency-score";
export { computeRecommendations } from "./scoring/recommendation-score";