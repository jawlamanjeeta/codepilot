"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import type { RecommendationWithProblem, RecommendationStatus } from "@codepilot/shared";

type RecommendationsResponse = {
  recommendations: RecommendationWithProblem[];
};

export function useRecommendations() {
  const [items, setItems] = useState<RecommendationWithProblem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<RecommendationsResponse>("recommendations?status=pending&limit=10");
      setItems(res.recommendations);
    } catch (err: any) {
      setError(err.message || "Failed to load recommendations");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStatus = async (id: string, status: RecommendationStatus) => {
    try {
      await api.patch("recommendations", { id, status });
      // Optimistic update
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to update recommendation");
    }
  };

  const markSolved = (id: string) => updateStatus(id, "solved");
  const skip = (id: string) => updateStatus(id, "skipped");

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return {
    recommendations: items,
    loading,
    error,
    refetch: fetchRecommendations,
    markSolved,
    skip,
  };
}
