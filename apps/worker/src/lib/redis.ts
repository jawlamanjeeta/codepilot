import IORedis from "ioredis";
import { env } from "./env";

/**
 * Shared IORedis connection for all BullMQ workers and queues.
 *
 * BullMQ requires `maxRetriesPerRequest: null` on the Redis connection
 * it uses — otherwise it will throw when the queue tries to block.
 */
export const redisConnection = new IORedis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

redisConnection.on("error", (err) => {
  console.error("[redis] Connection error:", err.message);
});

redisConnection.on("connect", () => {
  console.log("[redis] Connected to", env.REDIS_URL);
});
