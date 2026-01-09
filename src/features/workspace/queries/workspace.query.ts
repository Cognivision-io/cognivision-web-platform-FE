import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { workspaceApi } from "@/features/workspace/api/workspace.api";
import type {
  GetWorkspaceResponse,
  GetWorkspacesResponse,
  WorkspaceCreditHistoryResponse,
  WorkspaceCreditsResponse,
} from "@/interfaces/workspace.interface";

type WorkspaceError = AxiosError<{ message?: string | string[] }>;

export const WORKSPACE_CREDITS_QUERY_KEY = ["workspace", "credits"] as const;
export const WORKSPACES_QUERY_KEY = ["workspace", "all"] as const;
export const WORKSPACE_QUERY_KEY = ["workspace"] as const;
export const WORKSPACE_CREDITS_HISTORY_QUERY_KEY = [
  "workspace",
  "credits-history",
] as const;

export const useWorkspacesQuery = (
  params: { page?: number; limit?: number; search?: string },
  options?: Omit<
    UseQueryOptions<GetWorkspacesResponse, WorkspaceError>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: [...WORKSPACES_QUERY_KEY, params],
    queryFn: () => workspaceApi.getAll(params),
    ...options,
  });
};

export const useWorkspaceQuery = (
  workspaceId?: number,
  options?: Omit<
    UseQueryOptions<GetWorkspaceResponse, WorkspaceError>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: [...WORKSPACE_QUERY_KEY, workspaceId],
    queryFn: () => workspaceApi.getById(workspaceId as number),
    enabled: !!workspaceId,
    ...options,
  });
};

export const useWorkspaceCreditsQuery = (
  workspaceId?: number,
  options?: Omit<
    UseQueryOptions<WorkspaceCreditsResponse, WorkspaceError>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: [...WORKSPACE_CREDITS_QUERY_KEY, workspaceId],
    queryFn: () => workspaceApi.getCredits(workspaceId as number),
    enabled: !!workspaceId,
    ...options,
  });
};

export const useWorkspaceCreditsHistoryQuery = (
  params: {
    workspaceId?: number;
    page?: number;
    limit?: number;
  },
  options?: Omit<
    UseQueryOptions<WorkspaceCreditHistoryResponse, WorkspaceError>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: [...WORKSPACE_CREDITS_HISTORY_QUERY_KEY, params],
    queryFn: () =>
      workspaceApi.getCreditHistory({
        workspaceId: params.workspaceId as number,
        page: params.page,
        limit: params.limit,
      }),
    enabled: !!params.workspaceId,
    ...options,
  });
};
