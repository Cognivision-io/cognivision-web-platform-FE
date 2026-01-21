import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { apiUsageApi } from "@/features/monitoring/api/api-usage.api";
import type { ApiUsageDetailedLogsResponse } from "@/interfaces/api-usage.interface";

type ApiUsageError = AxiosError<{ message?: string | string[] }>;

export const API_USAGE_DETAILED_LOGS_QUERY_KEY = [
  "api-usage",
  "workspace",
  "detailed-logs",
] as const;

export const useApiUsageDetailedLogsQuery = (
  params: {
    workspaceId?: number;
    projectId?: string;
    page?: number;
    limit?: number;
  },
  options?: Omit<
    UseQueryOptions<ApiUsageDetailedLogsResponse, ApiUsageError>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: [...API_USAGE_DETAILED_LOGS_QUERY_KEY, params],
    queryFn: () =>
      apiUsageApi.getWorkspaceDetailedLogs({
        workspaceId: params.workspaceId as number,
        projectId: params.projectId,
        page: params.page,
        limit: params.limit,
      }),
    enabled: !!params.workspaceId && !!params.projectId,
    ...options,
  });
};
