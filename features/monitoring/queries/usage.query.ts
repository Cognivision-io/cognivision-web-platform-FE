import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { usageApi } from "@/features/monitoring/api/usage.api";
import type { CurrentUsage } from "@/types/usage.interface";

type UsageError = AxiosError<{
  detail?: string | unknown[];
  message?: string | string[];
}>;

export const CURRENT_USAGE_QUERY_KEY = ["usage", "current"] as const;

export const useCurrentUsageQuery = (
  options?: Omit<
    UseQueryOptions<CurrentUsage, UsageError>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: CURRENT_USAGE_QUERY_KEY,
    queryFn: () => usageApi.getCurrent(),
    ...options,
  });
};
