import api from "@/lib/axios";
import type {
  ResetUserApiKeyResponse,
  UserApiKey,
} from "@/types/api-key.interface";
import type { ApiEnvelope } from "@/lib/api-envelope";

import { apiKeyAdapter } from "./api-key.adapter";

export const userApiKeyApi = {
  get: async () =>
    api
      .get<ApiEnvelope<UserApiKey> | UserApiKey>("/apikey")
      .then(apiKeyAdapter.toUserApiKey),

  reset: async () =>
    api
      .post<ApiEnvelope<ResetUserApiKeyResponse> | ResetUserApiKeyResponse>(
        "/apikey/reset",
      )
      .then(apiKeyAdapter.toResetUserApiKeyResponse),
};
