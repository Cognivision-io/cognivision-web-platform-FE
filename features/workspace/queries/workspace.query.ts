import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type {
  GetWorkspaceApiKeyResponse,
  GetWorkspaceResponse,
  Workspace,
  WorkspaceCreditHistoryResponse,
  WorkspaceCreditsResponse,
} from "@/types/workspace.interface";

type WorkspaceError = AxiosError<{ message?: string | string[] }>;

function emptyWorkspace(id: number): Workspace {
  return {
    id,
    deletedAt: null,
    createdAt: "",
    updatedAt: "",
    name: "—",
    order: 0,
    status: true,
    credits: "0",
    remainingCredits: "0",
    createdBy: 0,
    projects: [],
  };
}

export const WORKSPACE_CREDITS_QUERY_KEY = ["workspace", "credits"] as const;
export const WORKSPACES_QUERY_KEY = ["workspace", "all"] as const;
export const WORKSPACE_QUERY_KEY = ["workspace"] as const;
export const WORKSPACE_CREDITS_HISTORY_QUERY_KEY = [
  "workspace",
  "credits-history",
] as const;
export const WORKSPACE_API_KEY_QUERY_KEY = ["workspace", "api-key"] as const;

export const useWorkspaceQuery = (
  workspaceId?: number,
  options?: Omit<
    UseQueryOptions<GetWorkspaceResponse, WorkspaceError>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: [...WORKSPACE_QUERY_KEY, workspaceId],
    queryFn: async (): Promise<GetWorkspaceResponse> => ({
      statusCode: 200,
      message: "",
      data: emptyWorkspace(workspaceId as number),
    }),
    enabled: !!workspaceId,
    ...options,
  });
};

export const useWorkspaceCreditsQuery = (
  workspaceId?: number,
  options?: Omit<
    UseQueryOptions<WorkspaceCreditsResponse, WorkspaceError>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: [...WORKSPACE_CREDITS_QUERY_KEY, workspaceId],
    queryFn: async (): Promise<WorkspaceCreditsResponse> => ({
      statusCode: 200,
      message: "",
      data: { workspaceId: workspaceId as number, credits: 0 },
    }),
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
  >,
) => {
  return useQuery({
    queryKey: [...WORKSPACE_CREDITS_HISTORY_QUERY_KEY, params],
    queryFn: async (): Promise<WorkspaceCreditHistoryResponse> => ({
      statusCode: 200,
      message: "",
      data: { data: [], total: 0, page: 1, limit: 10 },
    }),
    enabled: !!params.workspaceId,
    ...options,
  });
};

export const useWorkspaceApiKeyQuery = (
  workspaceId?: number,
  options?: Omit<
    UseQueryOptions<GetWorkspaceApiKeyResponse, WorkspaceError>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: [...WORKSPACE_API_KEY_QUERY_KEY, workspaceId],
    queryFn: async (): Promise<GetWorkspaceApiKeyResponse> => ({
      statusCode: 200,
      message: "",
      data: { apiKey: "", projects: [] },
    }),
    enabled: !!workspaceId,
    ...options,
  });
};
