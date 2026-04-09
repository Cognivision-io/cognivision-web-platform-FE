import api from "@/lib/axios";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  ResendOtpPayload,
  ResendOtpResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "@/interfaces/auth.interface";

export const authApi = {
  register: async (payload: RegisterPayload) => {
    const response = await api.post<RegisterResponse>(
      "/auth/register",
      payload
    );
    return response.data;
  },
  login: async (payload: LoginPayload) => {
    const response = await api.post<LoginResponse>("/auth/login", payload);
    return response.data;
  },
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
};
