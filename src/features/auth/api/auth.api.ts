import api from "@/lib/axios";
import type { RegisterPayload, RegisterResponse } from "@/interfaces/auth.interface";

export const authApi = {
  register: async (payload: RegisterPayload) => {
    const response = await api.post<RegisterResponse>("/auth/register", payload);
    return response.data;
  },
};
