import { NormalizedSubmission, PlatformAdapter } from "./types";

function mapVerdict(status: string): NormalizedSubmission["verdict"] {
  if (status === "Accepted") return "ACCEPTED";
  if (status === "Wrong Answer") return "WRONG_ANSWER";
  if (status === "Time Limit Exceeded") return "TLE";
  if (status === "Runtime Error") return "RUNTIME_ERROR";
  if (status === "Compile Error") return "COMPILATION_ERROR";
  return "OTHER";
}

export const leetcodeAdapter: PlatformAdapter = {
  async fetchSubmissions(handle: string) {
    const query = `
      query recentSubmissions($username: String!) {
        recentSubmissionList(username: $username, limit: 20) {
          title
          titleSlug
          timestamp
          statusDisplay
          lang
        }
      }
    `;

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { username: handle } }),
    });

    const { data } = await res.json();

    return (data?.recentSubmissionList ?? []).map((s: any): NormalizedSubmission => ({
      externalSubmissionId: `${s.titleSlug}-${s.timestamp}`,
      problemKey: s.titleSlug,
      problemTitle: s.title,
      tags: [],
      verdict: mapVerdict(s.statusDisplay),
      language: s.lang,
      submittedAt: new Date(Number(s.timestamp) * 1000),
    }));
  },
};