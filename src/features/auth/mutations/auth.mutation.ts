import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { authApi } from "@/features/auth/api/auth.api";
import { userAPI } from "@/features/auth/api/user.api";
import type {
  ForgetPasswordPayload,
  ForgetPasswordResponse,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  ResendOtpPayload,
  ResendOtpResponse,
  UpdateUserPayload,
  UpdateUserResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "@/interfaces/auth.interface";
import { handleMutationError } from "@/lib/handle-error";

type AuthError = AxiosError<{ message?: string | string[] }>;

export const REGISTER_MUTATION_KEY = ["auth", "register"] as const;
export const LOGIN_MUTATION_KEY = ["auth", "login"] as const;
export const VERIFY_OTP_MUTATION_KEY = ["auth", "verify-otp"] as const;
export const RESEND_OTP_MUTATION_KEY = ["auth", "resend-otp"] as const;
export const FORGET_PASSWORD_MUTATION_KEY = ["auth", "forget-password"] as const;
export const DELETE_USER_MUTATION_KEY = ["user", "delete"] as const;
export const UPDATE_USER_MUTATION_KEY = ["user", "update"] as const;

export const useRegisterMutation = (
  options?: UseMutationOptions<RegisterResponse, AuthError, RegisterPayload>
) => {
  const { onError, ...rest } = options ?? {};
  return useMutation({
    mutationKey: REGISTER_MUTATION_KEY,
    mutationFn: authApi.register,
    ...rest,
    onError: (error, variables, onMutateResult, context) => {
      handleMutationError(error);
      onError?.(error, variables, onMutateResult, context);
    },
  });
};

export const useLoginMutation = (
  options?: UseMutationOptions<LoginResponse, AuthError, LoginPayload>
) => {
  const { onError, ...rest } = options ?? {};
  return useMutation({
    mutationKey: LOGIN_MUTATION_KEY,
    mutationFn: authApi.login,
    ...rest,
    onError: (error, variables, onMutateResult, context) => {
      handleMutationError(error);
      onError?.(error, variables, onMutateResult, context);
    },
  });
};

export const useVerifyOtpMutation = (
  options?: UseMutationOptions<VerifyOtpResponse, AuthError, VerifyOtpPayload>
) => {
  const { onError, ...rest } = options ?? {};
  return useMutation({
    mutationKey: VERIFY_OTP_MUTATION_KEY,
    mutationFn: authApi.verifyOtp,
    ...rest,
    onError: (error, variables, onMutateResult, context) => {
      handleMutationError(error);
      onError?.(error, variables, onMutateResult, context);
    },
  });
};

export const useResendOtpMutation = (
  options?: UseMutationOptions<ResendOtpResponse, AuthError, ResendOtpPayload>
) => {
  const { onError, ...rest } = options ?? {};
  return useMutation({
    mutationKey: RESEND_OTP_MUTATION_KEY,
    mutationFn: authApi.resendOtp,
    ...rest,
    onError: (error, variables, onMutateResult, context) => {
      handleMutationError(error);
      onError?.(error, variables, onMutateResult, context);
    },
  });
};

export const useForgetPasswordMutation = (
  options?: UseMutationOptions<
    ForgetPasswordResponse,
    AuthError,
    ForgetPasswordPayload
  >,
) => {
  const { onError, ...rest } = options ?? {};
  return useMutation({
    mutationKey: FORGET_PASSWORD_MUTATION_KEY,
    mutationFn: authApi.forgetPassword,
    ...rest,
    onError: (error, variables, onMutateResult, context) => {
      handleMutationError(error);
      onError?.(error, variables, onMutateResult, context);
    },
  });
};

export const useDeleteUserMutation = (
  options?: UseMutationOptions<
    { statusCode: number; message: string },
    AuthError,
    string
  >
) => {
  const { onError, ...rest } = options ?? {};
  return useMutation({
    mutationKey: DELETE_USER_MUTATION_KEY,
    mutationFn: (id: string) => userAPI.deleteUser(id),
    ...rest,
    onError: (error, variables, onMutateResult, context) => {
      handleMutationError(error);
      onError?.(error, variables, onMutateResult, context);
    },
  });
};

export const useUpdateUserMutation = (
  options?: UseMutationOptions<
    UpdateUserResponse,
    AuthError,
    { id: string; payload: UpdateUserPayload }
  >
) => {
  const { onError, ...rest } = options ?? {};
  return useMutation({
    mutationKey: UPDATE_USER_MUTATION_KEY,
    mutationFn: ({ id, payload }) => userAPI.updateUser(id, payload),
    ...rest,
    onError: (error, variables, onMutateResult, context) => {
      handleMutationError(error);
      onError?.(error, variables, onMutateResult, context);
    },
  });
};
