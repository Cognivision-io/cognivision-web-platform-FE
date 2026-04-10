import api from "@/lib/axios";
import type {
  AuthSessionApiEnvelope,
  ForgetPasswordApiEnvelope,
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

export const authApi = {
  register: async (payload: RegisterPayload): Promise<RegisterResponse> => {
    const response = await api.post<AuthSessionApiEnvelope>(
      "/auth/register",
      payload,
    );
    const { user, tokens } = response.data.data ?? {};
    if (!user || !tokens?.access_token) {
      throw new Error("Invalid register response");
    }
    return { user, tokens };
  },
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post<AuthSessionApiEnvelope>("/auth/login", payload);
    const { user, tokens } = response.data.data ?? {};
    if (!user || !tokens?.access_token) {
      throw new Error("Invalid login response");
    }
    return { user, tokens };
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
  forgetPassword: async (
    payload: ForgetPasswordPayload,
  ): Promise<ForgetPasswordResponse> => {
    const response = await api.post<
      ForgetPasswordResponse | ForgetPasswordApiEnvelope
    >("/auth/forget-password", payload);
    const body = response.data;

    if (
      body &&
      typeof body === "object" &&
      "message" in body &&
      typeof body.message === "string"
    ) {
      return { message: body.message };
    }

    throw new Error("Invalid forget password response");
  },
};
