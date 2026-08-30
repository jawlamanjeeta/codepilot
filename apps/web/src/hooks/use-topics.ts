"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import type { TopicStat } from "@codepilot/shared";

type TopicsResponse = {
  topics: TopicStat[];
  weakTopics: TopicStat[];
  strongTopics: TopicStat[];
  dominantTopics: string[];
  overallSkillScore: number;
};

export function useTopics() {
  const [data, setData] = useState<TopicsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<TopicsResponse>("analytics/topics");
      setData(res);
    } catch (err: any) {
      setError(err.message || "Failed to load topics data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  return {
    topics: data?.topics || [],
    weakTopics: data?.weakTopics || [],
    strongTopics: data?.strongTopics || [],
    dominantTopics: data?.dominantTopics || [],
    overallSkillScore: data?.overallSkillScore || 0,
    loading,
    error,
    refetch: fetchTopics,
  };
}
