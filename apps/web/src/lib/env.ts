/**
 * Web application environment variable definitions and fallbacks.
 */
export const env = {
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  DATABASE_URL: process.env.DATABASE_URL || "",
  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
  NODE_ENV: process.env.NODE_ENV || "development",
  AUTH_SECRET: process.env.AUTH_SECRET || "",
  AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID || process.env.GITHUB_ID || "",
  AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET || process.env.GITHUB_SECRET || "",
} as const;
