"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import type { OverviewStats } from "@codepilot/shared";

export function useOverview() {
  const [data, setData] = useState<OverviewStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOverview = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<{ overview: OverviewStats }>("analytics/overview");
      setData(res.overview);
    } catch (err: any) {
      setError(err.message || "Failed to load overview data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  return {
    overview: data,
    loading,
    error,
    refetch: fetchOverview,
  };
}
