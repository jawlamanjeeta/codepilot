import type { Platform, Verdict } from "./platform";

export type Submission = {
  id: string;
  userId: string;
  platform: Platform;
  externalSubmissionId: string;
  problemId: string;
  contestId: string | null;
  verdict: Verdict;
  language: string | null;
  submittedAt: Date;
  createdAt: Date;
};

export type SubmissionWithProblem = Submission & {
  problem: {
    id: string;
    title: string;
    problemKey: string;
    rating: number | null;
    tags: string[];
  };
};

export type NormalizedSubmission = {
  externalSubmissionId: string;
  problemKey: string;
  problemTitle: string;
  rating?: number;
  tags: string[];
  verdict: Verdict;
  language?: string;
  submittedAt: Date;
  contestKey?: string;
};
