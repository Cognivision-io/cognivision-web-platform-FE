import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { authApi, type RegisterPayload, type RegisterResponse } from "@/features/auth/api/auth.api";

export const REGISTER_MUTATION_KEY = ["auth", "register"] as const;

type RegisterError = AxiosError<{ message?: string | string[] }>;

export const useRegisterMutation = (
  options?: UseMutationOptions<RegisterResponse, RegisterError, RegisterPayload>,
) => {
  return useMutation({
    mutationKey: REGISTER_MUTATION_KEY,
    mutationFn: authApi.register,
    ...options,
  });
};
