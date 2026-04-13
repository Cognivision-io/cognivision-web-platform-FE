import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { userApiKeyApi } from "@/features/api-key/api/user-api-key.api";
import { USER_API_KEY_QUERY_KEY } from "@/features/api-key/queries/api-key.query";
import type { ResetUserApiKeyResponse } from "@/types/api-key.interface";
import { handleMutationError } from "@/lib/handle-error";

type ResetApiKeyError = AxiosError<{
  detail?: string | unknown[];
  message?: string | string[];
}>;

export const RESET_USER_API_KEY_MUTATION_KEY = [
  "apiKey",
  "user",
  "reset",
] as const;

export const useResetUserApiKeyMutation = (
  options?: Omit<
    UseMutationOptions<ResetUserApiKeyResponse, ResetApiKeyError, void>,
    "mutationKey" | "mutationFn"
  >,
) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...rest } = options ?? {};

  return useMutation({
    mutationKey: RESET_USER_API_KEY_MUTATION_KEY,
    mutationFn: () => userApiKeyApi.reset(),
    ...rest,
    onError: (error, variables, onMutateResult, context) => {
      handleMutationError(error);
      onError?.(error, variables, onMutateResult, context);
    },
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: USER_API_KEY_QUERY_KEY });
      await onSuccess?.(data, variables, onMutateResult, context);
    },
  });
};
