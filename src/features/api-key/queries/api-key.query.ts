import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { apiKeyApi } from "@/features/api-key/api/api-key.api";
import type {
  GetProjectApiKeysResponse,
  GetProjectApiKeyValueResponse,
} from "@/interfaces/api-key.interface";

type ApiKeyError = AxiosError<{ message?: string | string[] }>;

export const PROJECT_API_KEYS_QUERY_KEY = ["apiKey", "all"] as const;
export const PROJECT_API_KEY_VALUE_QUERY_KEY = ["apiKey", "value"] as const;

export const useProjectApiKeyQuery = (
  params: {
    workspaceId?: number;
    projectId?: number;
    page?: number;
    limit?: number;
  },
  options?: Omit<
    UseQueryOptions<GetProjectApiKeysResponse, ApiKeyError>,
    "queryKey" | "queryFn"
  >
) => {
  const { workspaceId, projectId, page = 1, limit = 10 } = params;

  return useQuery({
    queryKey: [...PROJECT_API_KEYS_QUERY_KEY, { workspaceId, projectId, page, limit }],
    queryFn: () =>
      apiKeyApi.getAll({
        page,
        limit,
        project: projectId,
        workspace: workspaceId,
      }),
    enabled: !!workspaceId,
    ...options,
  });
};

export const useProjectApiKeyValueQuery = (
  params: { apiKeyId?: number },
  options?: Omit<
    UseQueryOptions<GetProjectApiKeyValueResponse, ApiKeyError>,
    "queryKey" | "queryFn"
  >,
) => {
  const { apiKeyId } = params;

  return useQuery({
    queryKey: [...PROJECT_API_KEY_VALUE_QUERY_KEY, { apiKeyId }],
    queryFn: () => apiKeyApi.getValue(apiKeyId as number),
    enabled: !!apiKeyId,
    ...options,
  });
};
