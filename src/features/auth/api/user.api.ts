import api from "@/lib/axios";
import type {
  AuthUser,
  AuthUserApiEnvelope,
  UpdateUserPayload,
} from "@/interfaces/auth.interface";

export const userAPI = {
  getUser: async (id: string) => {
    const response = await api.get<AuthUser | AuthUserApiEnvelope>(`/users/${id}`);
    const payload = response.data;
    const user =
      payload &&
      typeof payload === "object" &&
      "data" in payload &&
      payload.data &&
      typeof payload.data === "object" &&
      "id" in payload.data
        ? payload.data
        : payload;

    if (!user || typeof user !== "object" || !("id" in user) || !("email" in user)) {
      throw new Error("Invalid user response");
    }

    return user as AuthUser;
  },

  deleteUser: async (id: string) => {
    const { data } = await api.delete<{ statusCode: number; message: string }>(
      `/users/${id}`,
    );
    return data;
  },

  updateUser: async (id: string, payload: UpdateUserPayload) => {
    const response = await api.put<AuthUser | AuthUserApiEnvelope>(
      `/users/${id}`,
      payload,
    );
    const body = response.data;
    const user =
      body &&
      typeof body === "object" &&
      "data" in body &&
      body.data &&
      typeof body.data === "object" &&
      "id" in body.data
        ? body.data
        : body;

    if (!user || typeof user !== "object" || !("id" in user) || !("email" in user)) {
      throw new Error("Invalid update user response");
    }

    return user as AuthUser;
  },
};
