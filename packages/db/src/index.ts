// Prisma client
export { prisma } from "./client";

// Re-export all Prisma generated types
export * from "@prisma/client";

// Query helpers
export * from "./queries/analytics";
export * from "./queries/contests";
export * from "./queries/platform-accounts";
export * from "./queries/recommendations";
export * from "./queries/submissions";
export * from "./queries/users";