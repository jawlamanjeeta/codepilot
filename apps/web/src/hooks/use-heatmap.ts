"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import type { HeatmapEntry } from "@codepilot/shared";

type HeatmapResponse = {
  entries: HeatmapEntry[];
  totalSolvedInPeriod: number;
  days: number;
};

export function useHeatmap(days: number = 365) {
  const [data, setData] = useState<HeatmapResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHeatmap = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<HeatmapResponse>(`analytics/heatmap?days=${days}`);
      setData(res);
    } catch (err: any) {
      setError(err.message || "Failed to load heatmap data");
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    fetchHeatmap();
  }, [fetchHeatmap]);

  return {
    entries: data?.entries || [],
    totalSolved: data?.totalSolvedInPeriod || 0,
    loading,
    error,
    refetch: fetchHeatmap,
  };
}
