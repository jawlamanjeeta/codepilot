export type RecommendationStatus = "pending" | "solved" | "skipped";

export type Recommendation = {
  id: string;
  userId: string;
  problemId: string;
  reason: string;
  priority: number;
  status: RecommendationStatus;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type RecommendationWithProblem = Recommendation & {
  problem: {
    id: string;
    title: string;
    problemKey: string;
    platform: string;
    rating: number | null;
    tags: string[];
  };
};
