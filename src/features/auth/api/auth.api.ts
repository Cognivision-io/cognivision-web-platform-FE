import api from "@/lib/axios";
import type {
  ForgetPasswordPayload,
  ForgetPasswordResponse,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  ResendOtpPayload,
  ResendOtpResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "@/interfaces/auth.interface";
import type { ApiEnvelope } from "@/lib/api-envelope";

import { authAdapter } from "./auth.adapter";

export const authApi = {
  register: async (payload: RegisterPayload): Promise<RegisterResponse> =>
    api
      .post<ApiEnvelope<RegisterResponse> | RegisterResponse>("/auth/register", payload)
      .then(authAdapter.toAuthSession),
  login: async (payload: LoginPayload): Promise<LoginResponse> =>
    api
      .post<ApiEnvelope<LoginResponse> | LoginResponse>("/auth/login", payload)
      .then(authAdapter.toAuthSession),
  verifyOtp: async (payload: VerifyOtpPayload) => {
    const response = await api.post<VerifyOtpResponse>(
      "/auth/verify-otp",
      payload
    );
    return response.data;
  },
  resendOtp: async (payload: ResendOtpPayload) => {
    const response = await api.post<ResendOtpResponse>(
      "/auth/send-otp",
      payload
    );
    return response.data;
  },
  forgetPassword: async (
    payload: ForgetPasswordPayload,
  ): Promise<ForgetPasswordResponse> => {
    return api
      .post<ApiEnvelope<null> | ForgetPasswordResponse>(
        "/auth/forget-password",
        payload,
      )
      .then(authAdapter.toForgetPasswordResponse);
  },
};
