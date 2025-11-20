import api from "@/lib/axios";

// API methods template
export const userAPI = {
  getUser: () =>
    api.get("/auth/user"),
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
  resendOTP: (email: string, phone: string) =>
    api.post("/auth/send-otp", { email, phone }),
};
