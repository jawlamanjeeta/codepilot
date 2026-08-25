/**
 * CodePilot Worker Process
 *
 * Starts all BullMQ workers:
 *   1. sync         — fetches submissions from platform APIs
 *   2. analytics    — computes TopicStat + DailyActivity from submissions
 *   3. recommendation — generates prioritised daily problem plans
 *
 * Pipeline: API → sync queue → analytics queue → recommendation queue
 */

import "./lib/env"; // Validate env vars at startup

import { startSyncWorker }           from "./queues/sync.queue";
import { startAnalyticsWorker }      from "./queues/analytics.queue";
import { startRecommendationWorker } from "./queues/recommendation.queue";

console.log("[worker] Booting CodePilot worker process...");

const syncWorker           = startSyncWorker();
const analyticsWorker      = startAnalyticsWorker();
const recommendationWorker = startRecommendationWorker();

console.log("[worker] All workers started. Waiting for jobs...");

// Graceful shutdown
const shutdown = async () => {
  console.log("[worker] Shutting down gracefully...");
  await Promise.all([
    syncWorker.close(),
    analyticsWorker.close(),
    recommendationWorker.close(),
  ]);
  process.exit(0);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT",  shutdown);