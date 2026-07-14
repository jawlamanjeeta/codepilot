import { NormalizedSubmission, PlatformAdapter } from "./types";

function mapVerdict(result: string): NormalizedSubmission["verdict"] {
  if (result === "AC") return "ACCEPTED";
  if (result === "WA") return "WRONG_ANSWER";
  if (result === "TLE") return "TLE";
  if (result === "RE") return "RUNTIME_ERROR";
  if (result === "CE") return "COMPILATION_ERROR";
  return "OTHER";
}

export const atcoderAdapter: PlatformAdapter = {
  async fetchSubmissions(handle: string) {
    const res = await fetch(
      `https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${encodeURIComponent(handle)}&from_second=0`
    );
    const data = await res.json();

    return data.map((s: any): NormalizedSubmission => ({
      externalSubmissionId: String(s.id),
      problemKey: s.problem_id,
      problemTitle: s.problem_id,
      tags: [],
      verdict: mapVerdict(s.result),
      language: s.language,
      submittedAt: new Date(s.epoch_second * 1000),
      contestKey: s.contest_id,
    }));
  },
};