import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { plansApi } from "@/features/monitoring/api/plans.api";
import type { Plan } from "@/types/plan.interface";

type PlansError = AxiosError<{
  detail?: string | unknown[];
  message?: string | string[];
}>;

export const PLANS_QUERY_KEY = ["plans", "all"] as const;

export const usePlansQuery = (
  options?: Omit<
    UseQueryOptions<Plan[], PlansError>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: PLANS_QUERY_KEY,
    queryFn: () => plansApi.list(),
    ...options,
  });
};
