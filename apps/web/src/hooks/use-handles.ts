"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import type { LinkedAccount, Platform } from "@codepilot/shared";

type HandlesResponse = {
  accounts: LinkedAccount[];
};

export function useHandles() {
  const [accounts, setAccounts] = useState<LinkedAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHandles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<HandlesResponse>("handles");
      setAccounts(res.accounts);
    } catch (err: any) {
      setError(err.message || "Failed to load linked handles");
    } finally {
      setLoading(false);
    }
  }, []);

  const validateHandle = async (platform: Platform, handle: string) => {
    return api.post<{ valid: boolean; rating?: number; maxRating?: number; error?: string }>(
      "handles/validate",
      { platform, handle }
    );
  };

  const connectHandle = async (platform: Platform, handle: string) => {
    const res = await api.post<{ account: LinkedAccount; message: string }>("handles/connect", {
      platform,
      handle,
    });
    await fetchHandles();
    return res;
  };

  const disconnectHandle = async (id: string) => {
    await api.delete(`handles/${id}`);
    setAccounts((prev) => prev.filter((acc) => acc.id !== id));
  };

  const triggerSyncAll = async () => {
    setSyncing(true);
    try {
      const res = await api.post<{ message: string }>("sync");
      await fetchHandles();
      return res;
    } finally {
      setSyncing(false);
    }
  };

  const triggerSyncPlatform = async (platform: Platform) => {
    setSyncing(true);
    try {
      const res = await api.post<{ ok: boolean }>(`sync/${platform.toLowerCase()}`);
      await fetchHandles();
      return res;
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    fetchHandles();
  }, [fetchHandles]);

  return {
    accounts,
    loading,
    syncing,
    error,
    refetch: fetchHandles,
    validateHandle,
    connectHandle,
    disconnectHandle,
    triggerSyncAll,
    triggerSyncPlatform,
  };
}
