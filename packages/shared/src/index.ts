// Types
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

// Schemas / validators
export {
  validateHandle,
  validatePlatform,
  SUPPORTED_PLATFORMS,
  type SupportedPlatform,
} from "./schemas/handle";
export { validateSyncRequest } from "./schemas/sync";
export { validateAnalyticsQuery } from "./schemas/analytics";
export { validateRecommendationUpdate } from "./schemas/recommendation";