import api from "@/lib/axios";
import type { AuthUser, UpdateUserPayload } from "@/interfaces/auth.interface";

export const userAPI = {
  getUser: async (id: string) => {
    const { data } = await api.get<AuthUser>(`/users/${id}`);
    return data;
  },

  deleteUser: async (id: string) => {
    const { data } = await api.delete<{ statusCode: number; message: string }>(
      `/users/${id}`,
    );
    return data;
  },

  updateUser: async (id: string, payload: UpdateUserPayload) => {
    const { data } = await api.put<AuthUser>(`/users/${id}`, payload);
    return data;
  },
};
