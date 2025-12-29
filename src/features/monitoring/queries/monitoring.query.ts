import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { monitoringApi } from "@/features/monitoring/api/monitoring.api";
import type { RoboflowInferenceStats } from "@/interfaces/monitoring.interface";

type MonitoringError = AxiosError<{ message?: string | string[] }>;

export const MONITORING_QUERY_KEY = ["monitoring", "inference-stats"] as const;

export const useMonitoringStats = (
  params?: {
    startTime?: string;
    endTime?: string;
  },
  options?: Omit<UseQueryOptions<RoboflowInferenceStats, MonitoringError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: [...MONITORING_QUERY_KEY, params],
    queryFn: () => monitoringApi.getInferenceStats(params),
    ...options,
  });
};
