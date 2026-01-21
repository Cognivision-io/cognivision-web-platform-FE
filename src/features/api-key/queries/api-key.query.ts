import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { apiKeyApi } from "@/features/api-key/api/api-key.api";
import type { GetProjectApiKeysResponse } from "@/interfaces/api-key.interface";

type ApiKeyError = AxiosError<{ message?: string | string[] }>;

export const PROJECT_API_KEYS_QUERY_KEY = ["apiKey", "all"] as const;

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
  const { workspaceId, projectId, page = 1, limit = 1 } = params;

  return useQuery({
    queryKey: [...PROJECT_API_KEYS_QUERY_KEY, { workspaceId, projectId, page, limit }],
    queryFn: () =>
      apiKeyApi.getAll({
        page,
        limit,
        project: projectId as number,
        workspace: workspaceId as number,
      }),
    enabled: !!workspaceId && !!projectId,
    ...options,
  });
};

