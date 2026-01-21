import api from "@/lib/axios";
import type { GetProjectApiKeysResponse } from "@/interfaces/api-key.interface";

export const apiKeyApi = {
  getAll: async (params: {
    page: number;
    limit: number;
    project: number;
    workspace: number;
  }) => {
    const response = await api.get<GetProjectApiKeysResponse>("/apiKey/all", {
      params,
    });
    return response.data;
  },
};

