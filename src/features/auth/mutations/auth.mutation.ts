import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { authApi } from "@/features/auth/api/auth.api";
import { userAPI } from "@/features/auth/api/user.api";
import type {
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

type AuthError = AxiosError<{ message?: string | string[] }>;

export const REGISTER_MUTATION_KEY = ["auth", "register"] as const;
export const LOGIN_MUTATION_KEY = ["auth", "login"] as const;
export const VERIFY_OTP_MUTATION_KEY = ["auth", "verify-otp"] as const;
export const RESEND_OTP_MUTATION_KEY = ["auth", "resend-otp"] as const;
export const DELETE_USER_MUTATION_KEY = ["user", "delete"] as const;
export const UPDATE_USER_MUTATION_KEY = ["user", "update"] as const;

export const useRegisterMutation = (
  options?: UseMutationOptions<RegisterResponse, AuthError, RegisterPayload>
) => {
  return useMutation({
    mutationKey: REGISTER_MUTATION_KEY,
    mutationFn: authApi.register,
    ...options,
  });
};

export const useLoginMutation = (
  options?: UseMutationOptions<LoginResponse, AuthError, LoginPayload>
) => {
  return useMutation({
    mutationKey: LOGIN_MUTATION_KEY,
    mutationFn: authApi.login,
    ...options,
  });
};

export const useVerifyOtpMutation = (
  options?: UseMutationOptions<VerifyOtpResponse, AuthError, VerifyOtpPayload>
) => {
  return useMutation({
    mutationKey: VERIFY_OTP_MUTATION_KEY,
    mutationFn: authApi.verifyOtp,
    ...options,
  });
};

export const useResendOtpMutation = (
  options?: UseMutationOptions<ResendOtpResponse, AuthError, ResendOtpPayload>
) => {
  return useMutation({
    mutationKey: RESEND_OTP_MUTATION_KEY,
    mutationFn: authApi.resendOtp,
    ...options,
  });
};

export const useDeleteUserMutation = (
  options?: UseMutationOptions<
    { statusCode: number; message: string },
    AuthError,
    string
  >
) => {
  return useMutation({
    mutationKey: DELETE_USER_MUTATION_KEY,
    mutationFn: (id: string) => userAPI.deleteUser(id),
    ...options,
  });
};

export const useUpdateUserMutation = (
  options?: UseMutationOptions<
    UpdateUserResponse,
    AuthError,
    { id: string; payload: UpdateUserPayload }
  >
) => {
  return useMutation({
    mutationKey: UPDATE_USER_MUTATION_KEY,
    mutationFn: ({ id, payload }) => userAPI.updateUser(id, payload),
    ...options,
  });
};
