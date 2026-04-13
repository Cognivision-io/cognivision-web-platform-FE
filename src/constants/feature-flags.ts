export const FEATURE_FLAGS = {
  PROJECT_API_ENABLED: process.env.NEXT_PUBLIC_FF_PROJECT_API === "true",
} as const;
