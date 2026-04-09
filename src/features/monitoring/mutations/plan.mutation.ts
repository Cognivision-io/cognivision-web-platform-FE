import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";

import { PLANS_QUERY_KEY } from "@/features/monitoring/queries/plan.query";

export const REFRESH_PLANS_MUTATION_KEY = ["plans", "refresh"] as const;

/**
 * Invalidates the plans query so GET /plans runs again. Use when there is no
 * dedicated write endpoint but the list should be refetched.
 */
export const useRefreshPlansMutation = (
  options?: Omit<
    UseMutationOptions<void, Error, void>,
    "mutationKey" | "mutationFn"
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: REFRESH_PLANS_MUTATION_KEY,
    mutationFn: async () => {
      await queryClient.invalidateQueries({ queryKey: PLANS_QUERY_KEY });
    },
    ...options,
  });
};
