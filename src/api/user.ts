import api from "@/lib/axios";
import type { AuthUserResponse } from "@/interfaces/auth.interface";

export const userAPI = {
  getCurrentUser: async () => {
    const response = await api.get<AuthUserResponse>("/auth/user");
    return response.data;
  },
};

