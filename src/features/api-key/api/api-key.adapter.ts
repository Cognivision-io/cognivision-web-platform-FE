import type { AxiosResponse } from "axios";

import type { ApiEnvelope } from "@/lib/api-envelope";
import { unwrapEnvelope } from "@/lib/api-adapter";
import type { ResetUserApiKeyResponse, UserApiKey } from "@/interfaces/api-key.interface";

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isUserApiKey = (data: unknown): data is UserApiKey =>
  isObject(data) && "id" in data && "key" in data;

const isResetUserApiKeyResponse = (data: unknown): data is ResetUserApiKeyResponse =>
  isObject(data) && "message" in data && "new_key" in data;

export const apiKeyAdapter = {
  toUserApiKey: (response: AxiosResponse<ApiEnvelope<UserApiKey> | UserApiKey>) =>
    unwrapEnvelope(response, isUserApiKey, "Invalid API key response"),
  toResetUserApiKeyResponse: (
    response: AxiosResponse<ApiEnvelope<ResetUserApiKeyResponse> | ResetUserApiKeyResponse>,
  ) => unwrapEnvelope(response, isResetUserApiKeyResponse, "Invalid API key reset response"),
};
