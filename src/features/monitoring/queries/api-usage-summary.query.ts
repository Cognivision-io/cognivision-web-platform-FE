import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { apiUsageApi } from "@/features/monitoring/api/api-usage.api";
import type { ApiUsageSummaryResponse } from "@/interfaces/api-usage.interface";

type ApiUsageError = AxiosError<{ message?: string | string[] }>;

export const API_USAGE_SUMMARY_QUERY_KEY = [
  "api-usage",
  "workspace",
  "summary",
] as const;

export const useApiUsageSummaryQuery = (
  params: {
    workspaceId?: number;
    projectId?: string;
    startDate?: string;
    endDate?: string;
  },
  options?: Omit<
    UseQueryOptions<ApiUsageSummaryResponse, ApiUsageError>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: [...API_USAGE_SUMMARY_QUERY_KEY, params],
    queryFn: () =>
      apiUsageApi.getWorkspaceSummary({
        workspaceId: params.workspaceId as number,
        projectId: params.projectId,
        startDate: params.startDate as string,
        endDate: params.endDate as string,
      }),
    enabled:
      !!params.workspaceId &&
      !!params.projectId &&
      !!params.startDate &&
      !!params.endDate,
    ...options,
  });
};
