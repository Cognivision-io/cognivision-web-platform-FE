import api from "@/lib/axios";
import type {
  ResetUserApiKeyApiEnvelope,
  ResetUserApiKeyResponse,
  UserApiKey,
  UserApiKeyApiEnvelope,
} from "@/interfaces/api-key.interface";

export const userApiKeyApi = {
  get: async () => {
    const response = await api.get<UserApiKey | UserApiKeyApiEnvelope>("/apikey");
    const payload = response.data;

    const userApiKey =
      payload &&
      typeof payload === "object" &&
      "data" in payload &&
      payload.data &&
      typeof payload.data === "object" &&
      "key" in payload.data
        ? payload.data
        : payload;

    if (
      !userApiKey ||
      typeof userApiKey !== "object" ||
      !("id" in userApiKey) ||
      !("key" in userApiKey)
    ) {
      throw new Error("Invalid API key response");
    }

    return userApiKey as UserApiKey;
  },

  reset: async () => {
    const response = await api.post<
      ResetUserApiKeyResponse | ResetUserApiKeyApiEnvelope
    >("/apikey/reset");
    const payload = response.data;

    const resetResult =
      payload &&
      typeof payload === "object" &&
      "data" in payload &&
      payload.data &&
      typeof payload.data === "object" &&
      "new_key" in payload.data
        ? payload.data
        : payload;

    if (
      !resetResult ||
      typeof resetResult !== "object" ||
      !("message" in resetResult) ||
      !("new_key" in resetResult)
    ) {
      throw new Error("Invalid API key reset response");
    }

    return resetResult as ResetUserApiKeyResponse;
  },
};
