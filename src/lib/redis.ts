import { Redis } from "@upstash/redis";
export const redis = Redis.fromEnv();

// Redis key utilities for consistent key construction
export const RedisKeys = {
  students: (studentClass: string) => `students:${studentClass}`,
} as const;
