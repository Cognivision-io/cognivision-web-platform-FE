import { useMutation, useQuery, type UseMutationOptions, type UseQueryOptions } from "@tanstack/react-query";
import { subscriptionApi } from "@/features/subscription/api/subscription.api";
import type {
  CreateSubscriptionPayload,
  CreateSubscriptionResponse,
  GetSubscriptionResponse,
} from "@/interfaces/subscription.interface";

export const CREATE_SUBSCRIPTION_KEY = ["subscription", "create"] as const;
export const GET_SUBSCRIPTION_KEY = ["subscription", "get"] as const;

export const useCreateSubscriptionMutation = (
  options?: UseMutationOptions<
    CreateSubscriptionResponse,
    unknown,
    CreateSubscriptionPayload
  >
) => {
  return useMutation({
    mutationKey: CREATE_SUBSCRIPTION_KEY,
    mutationFn: subscriptionApi.createSubscription,
    ...options,
  });
};

export const useGetSubscriptionQuery = (
  id?: number,
  options?: UseQueryOptions<GetSubscriptionResponse, unknown>
) => {
  const queryKey = id ? [...GET_SUBSCRIPTION_KEY, id] : [...GET_SUBSCRIPTION_KEY, "idle"];
  return useQuery({
    queryKey,
    queryFn: () => {
      if (!id) {
        return Promise.reject(new Error("Subscription id is required"));
      }
      return subscriptionApi.getSubscription(id);
    },
    enabled: Boolean(id),
    ...options,
  });
};
