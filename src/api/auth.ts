import api from "@/lib/axios";
import type { LoginPayload, LoginResponse } from "@/interfaces/auth.interface";

// API methods template
export const authAPI = {
  login: async (payload: LoginPayload) => {
    const response = await api.post<LoginResponse>("/auth/login", payload);
    return response.data;
  },
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
    phone: string;
    dateOfBirth: string;
  }) => api.post("/auth/register", data),
  logout: () => api.post("/auth/logout"),
  refreshToken: () => api.post("/auth/refresh"),
  verifyOTP: (code: number) => api.post("/auth/verify-otp", { code }),
  resendOTP: (email: string) => api.post("/auth/send-otp", { email }),
};
