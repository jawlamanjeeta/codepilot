import { prisma } from "../client";
import type { Platform } from "@prisma/client";

// ---------------------------------------------------------------------------
// Linked account CRUD
// ---------------------------------------------------------------------------

export async function getLinkedAccounts(userId: string) {
  return prisma.linkedAccount.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });
}

export async function getLinkedAccount(userId: string, platform: Platform) {
  return prisma.linkedAccount.findUnique({
    where: { userId_platform: { userId, platform } },
  });
}

export async function upsertLinkedAccount(
  userId: string,
  platform: Platform,
  handle: string
) {
  return prisma.linkedAccount.upsert({
    where: { userId_platform: { userId, platform } },
    create: { userId, platform, handle, status: "pending" },
    update: { handle, status: "pending", lastError: null },
  });
}

export async function updateLinkedAccountSync(
  userId: string,
  platform: Platform,
  opts: { success: boolean; error?: string; rating?: number; maxRating?: number }
) {
  return prisma.linkedAccount.update({
    where: { userId_platform: { userId, platform } },
    data: {
      status: opts.success ? "connected" : "error",
      lastSyncedAt: opts.success ? new Date() : undefined,
      lastError: opts.error ?? null,
      rating: opts.rating,
      maxRating: opts.maxRating,
    },
  });
}

export async function deleteLinkedAccount(userId: string, platform: Platform) {
  return prisma.linkedAccount.delete({
    where: { userId_platform: { userId, platform } },
  });
}
