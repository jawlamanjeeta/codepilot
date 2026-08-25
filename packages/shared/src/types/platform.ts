export type Platform = "CODEFORCES" | "LEETCODE" | "ATCODER";

export type Verdict =
  | "ACCEPTED"
  | "WRONG_ANSWER"
  | "TLE"
  | "RUNTIME_ERROR"
  | "COMPILATION_ERROR"
  | "OTHER";

export type LinkedAccountStatus = "connected" | "error" | "pending";

export type LinkedAccount = {
  id: string;
  userId: string;
  platform: Platform;
  handle: string;
  rating: number | null;
  maxRating: number | null;
  status: LinkedAccountStatus;
  lastSyncedAt: Date | null;
  lastError: string | null;
  createdAt: Date;
  updatedAt: Date;
};
