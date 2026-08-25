export type TopicStat = {
  id: string;
  userId: string;
  topic: string;
  attemptCount: number;
  solvedCount: number;
  wrongCount: number;
  avgRating: number | null;
  skillScore: number;
  lastUpdatedAt: Date;
};

export type DailyActivity = {
  id: string;
  userId: string;
  date: Date;
  solvedCount: number;
  attemptCount: number;
};

export type OverviewStats = {
  totalSolved: number;
  totalAttempts: number;
  acceptanceRate: number;
  currentStreak: number;
  longestStreak: number;
  skillScore: number;
  platformBreakdown: {
    platform: string;
    solved: number;
    attempted: number;
  }[];
};

export type DifficultyBucket = {
  label: string;       // e.g. "< 1200", "1200–1599", …
  ratingMin: number;
  ratingMax: number;
  count: number;
};

export type HeatmapEntry = {
  date: string;        // "YYYY-MM-DD"
  count: number;
};
