import api from "@/lib/axios";
import type {
  AuthUser,
  UpdateUserPayload,
} from "@/interfaces/auth.interface";
import type { ApiEnvelope } from "@/lib/api-envelope";

import { authAdapter } from "./auth.adapter";

export const userAPI = {
  getUser: async (id: string) =>
    api.get<ApiEnvelope<AuthUser> | AuthUser>(`/users/${id}`).then(authAdapter.toAuthUser),

  deleteUser: async (id: string) => {
    const { data } = await api.delete<{ statusCode: number; message: string }>(
      `/users/${id}`,
    );
    return data;
  },

  updateUser: async (id: string, payload: UpdateUserPayload) =>
    api
      .put<ApiEnvelope<AuthUser> | AuthUser>(`/users/${id}`, payload)
      .then(authAdapter.toAuthUser),
};
