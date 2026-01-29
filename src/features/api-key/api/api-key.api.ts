import api from "@/lib/axios";
import type {
  GetProjectApiKeysResponse,
  GetProjectApiKeyValueResponse,
} from "@/interfaces/api-key.interface";

export const apiKeyApi = {
  getAll: async (params: {
    page: number;
    limit: number;
    project?: number;
    workspace?: number;
  }) => {
    const response = await api.get<GetProjectApiKeysResponse>("/apiKey/all", {
      params,
    });
    return response.data;
  },

  getValue: async (apiKeyId: number) => {
    const response = await api.get<GetProjectApiKeyValueResponse>(
      `/apiKey/${apiKeyId}/api-key`,
    );
    return response.data;
  },
};
