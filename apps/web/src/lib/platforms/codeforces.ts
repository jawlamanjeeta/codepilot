import { NormalizedSubmission, PlatformAdapter } from "./types";

function mapVerdict(v: string): NormalizedSubmission["verdict"] {
  if (v === "OK") return "ACCEPTED";
  if (v === "WRONG_ANSWER") return "WRONG_ANSWER";
  if (v === "TIME_LIMIT_EXCEEDED") return "TLE";
  if (v === "RUNTIME_ERROR") return "RUNTIME_ERROR";
  if (v === "COMPILATION_ERROR") return "COMPILATION_ERROR";
  return "OTHER";
}

export const codeforcesAdapter: PlatformAdapter = {
  async fetchSubmissions(handle: string) {
    const res = await fetch(
      `https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}&from=1&count=500`
    );
    const data = await res.json();

    if (data.status !== "OK") {
      throw new Error(data.comment ?? "codeforces fetch failed");
    }

    return data.result.map((s: any): NormalizedSubmission => ({
      externalSubmissionId: String(s.id),
      problemKey: `${s.problem.contestId}${s.problem.index}`,
      problemTitle: s.problem.name,
      rating: s.problem.rating,
      tags: s.problem.tags ?? [],
      verdict: mapVerdict(s.verdict),
      language: s.programmingLanguage,
      submittedAt: new Date(s.creationTimeSeconds * 1000),
      contestKey: s.problem.contestId ? String(s.problem.contestId) : undefined,
    }));
  },
};