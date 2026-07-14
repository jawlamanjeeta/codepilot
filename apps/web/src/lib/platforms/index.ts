import { PlatformAdapter } from "./types";
import { codeforcesAdapter } from "./codeforces";
import { atcoderAdapter } from "./atcoder";
import { leetcodeAdapter } from "./leetcode";

export const platformAdapters: Record<string, PlatformAdapter> = {
  CODEFORCES: codeforcesAdapter,
  ATCODER: atcoderAdapter,
  LEETCODE: leetcodeAdapter,
};