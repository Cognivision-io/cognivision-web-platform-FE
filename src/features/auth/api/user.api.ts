import api from "@/lib/axios";
import type {
  AuthUserResponse,
  UpdateUserPayload,
  UpdateUserResponse,
} from "@/interfaces/auth.interface";

export const userAPI = {
  getCurrentUser: async () => {
    const response = await api.get<AuthUserResponse>("/auth/user");
    return response.data;
  },
  deleteUser: async (id: number) => {
    const response = await api.delete<{ statusCode: number; message: string }>(
      `/user/${id}`
    );
    return response.data;
  },
  updateUser: async (id: number, payload: UpdateUserPayload) => {
    const response = await api.patch<UpdateUserResponse>(
      `/user/${id}`,
      payload
    );
    return response.data;
  },
};
