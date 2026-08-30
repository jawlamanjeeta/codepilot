"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import type { SubmissionWithProblem } from "@codepilot/shared";

type SubmissionsParams = {
  platform?: string;
  verdict?: string;
  page?: number;
  pageSize?: number;
};

type SubmissionsResponse = {
  items: SubmissionWithProblem[];
  total: number;
  page: number;
  pageSize: number;
};

export function useSubmissions(params: SubmissionsParams = {}) {
  const { platform, verdict, page = 1, pageSize = 20 } = params;
  const [data, setData] = useState<SubmissionsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams();
      if (platform) query.set("platform", platform);
      if (verdict) query.set("verdict", verdict);
      query.set("page", page.toString());
      query.set("pageSize", pageSize.toString());

      const res = await api.get<SubmissionsResponse>(`submissions?${query.toString()}`);
      setData(res);
    } catch (err: any) {
      setError(err.message || "Failed to load submissions");
    } finally {
      setLoading(false);
    }
  }, [platform, verdict, page, pageSize]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  return {
    submissions: data?.items || [],
    total: data?.total || 0,
    page: data?.page || page,
    pageSize: data?.pageSize || pageSize,
    loading,
    error,
    refetch: fetchSubmissions,
  };
}
