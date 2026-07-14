export type NormalizedSubmission = {
  externalSubmissionId: string;
  problemKey: string;
  problemTitle: string;
  rating?: number;
  tags: string[];
  verdict: "ACCEPTED" | "WRONG_ANSWER" | "TLE" | "RUNTIME_ERROR" | "COMPILATION_ERROR" | "OTHER";
  language?: string;
  submittedAt: Date;
  contestKey?: string;
};

export interface PlatformAdapter {
  fetchSubmissions(handle: string): Promise<NormalizedSubmission[]>;
}