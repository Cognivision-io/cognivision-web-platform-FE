import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type {
  CreateSubscriptionPayload,
  CreateSubscriptionResponse,
} from "@/interfaces/subscription.interface";
import { handleMutationError } from "@/lib/handle-error";

async function rejectMutation(..._args: unknown[]): Promise<never> {
  void _args;
  throw new Error("Non-auth API is disabled.");
}

export const CREATE_SUBSCRIPTION_KEY = ["subscription", "create"] as const;

export const useCreateSubscriptionMutation = (
  options?: UseMutationOptions<
    CreateSubscriptionResponse,
    unknown,
    CreateSubscriptionPayload
  >,
) => {
  const { onError, ...rest } = options ?? {};
  return useMutation({
    mutationKey: CREATE_SUBSCRIPTION_KEY,
    mutationFn: rejectMutation,
    ...rest,
    onError: (error, variables, onMutateResult, context) => {
      handleMutationError(error);
      onError?.(error, variables, onMutateResult, context);
    },
  });
};
