/**
 * Worker environment variables — validated at startup so the process
 * crashes early with a clear message if something is missing.
 */
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`[worker] Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  DATABASE_URL: requireEnv("DATABASE_URL"),
  REDIS_URL:    process.env.REDIS_URL ?? "redis://localhost:6379",
  NODE_ENV:     process.env.NODE_ENV ?? "development",
} as const;
