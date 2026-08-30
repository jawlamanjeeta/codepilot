"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";

type ContestParticipationWithContest = {
  id: string;
  contestId: string;
  rank: number | null;
  ratingBefore: number | null;
  ratingAfter: number | null;
  ratingDelta: number | null;
  solvedCount: number | null;
  createdAt: Date;
  contest: {
    id: string;
    platform: string;
    contestKey: string;
    name: string;
    startTime: Date | null;
  };
};

type ContestsResponse = {
  contests: ContestParticipationWithContest[];
  totalContests: number;
  bestRank: number | null;
  totalRatingDelta: number;
};

export function useContests() {
  const [data, setData] = useState<ContestsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<ContestsResponse>("analytics/contests");
      setData(res);
    } catch (err: any) {
      setError(err.message || "Failed to load contest history");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContests();
  }, [fetchContests]);

  return {
    contests: data?.contests || [],
    totalContests: data?.totalContests || 0,
    bestRank: data?.bestRank || null,
    totalRatingDelta: data?.totalRatingDelta || 0,
    loading,
    error,
    refetch: fetchContests,
  };
}
