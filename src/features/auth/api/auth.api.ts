import api from "@/lib/axios";

export type RegisterPayload = {
  firstName: string;
  email: string;
  password: string;
  useCase: string;
};

export type RegisterResponse = {
  message: string;
};

export const authApi = {
  register: async (payload: RegisterPayload) => {
    const response = await api.post<RegisterResponse>("/auth/register", payload);
    return response.data;
  },
};
