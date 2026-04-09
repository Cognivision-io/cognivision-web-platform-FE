import api from "@/lib/axios";
import type {
  ResetUserApiKeyResponse,
  UserApiKey,
} from "@/interfaces/api-key.interface";

export const userApiKeyApi = {
  get: async () => {
    const { data } = await api.get<UserApiKey>("/apikey");
    return data;
  },

  reset: async () => {
    const { data } = await api.post<ResetUserApiKeyResponse>("/apikey/reset");
    return data;
  },
};
