import api from "@/lib/axios";
import type { UpdateUserPayload, UpdateUserResponse } from "@/interfaces/auth.interface";

export const userAPI = {
  // getCurrentUser: async () => {
  //   const response = await api.get<AuthUserResponse>("/auth/user");
  //   return response.data;
  // },
  deleteUser: async (id: string) => {
    const response = await api.delete<{ statusCode: number; message: string }>(
      `/user/${id}`
    );
    return response.data;
  },
  updateUser: async (id: string, payload: UpdateUserPayload) => {
    const response = await api.patch<UpdateUserResponse>(
      `/user/${id}`,
      payload
    );
    return response.data;
  },
};
