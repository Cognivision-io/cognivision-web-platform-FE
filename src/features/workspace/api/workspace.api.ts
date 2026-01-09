import api from "@/lib/axios";
import {
  CreateWorkspacePayload,
  CreateWorkspaceResponse,
  GetWorkspaceResponse,
  GetWorkspacesResponse,
  UpdateWorkspacePayload,
  WorkspaceCreditHistoryResponse,
  WorkspaceCreditsResponse,
} from "@/interfaces/workspace.interface";

export const workspaceApi = {
  create: async (payload: CreateWorkspacePayload) => {
    const response = await api.post<CreateWorkspaceResponse>(
      "/workspace",
      payload
    );
    return response.data;
  },
  getAll: async (params: { page?: number; limit?: number; search?: string }) => {
    const response = await api.get<GetWorkspacesResponse>("/workspace/all", {
      params,
    });
    return response.data;
  },
  getById: async (workspaceId: number) => {
    const response = await api.get<GetWorkspaceResponse>(
      `/workspace/${workspaceId}`
    );
    return response.data;
  },
  update: async (workspaceId: number, payload: UpdateWorkspacePayload) => {
    const response = await api.patch<GetWorkspaceResponse>(
      `/workspace/${workspaceId}`,
      payload
    );
    return response.data;
  },
  delete: async (workspaceId: number) => {
    const response = await api.delete<{ statusCode: number; message: string }>(
      `/workspace/${workspaceId}`
    );
    return response.data;
  },
  getCredits: async (workspaceId: number) => {
    const response = await api.get<WorkspaceCreditsResponse>(
      `/workspace/${workspaceId}/credits`
    );
    return response.data;
  },
  getCreditHistory: async (params: {
    workspaceId: number;
    page?: number;
    limit?: number;
  }) => {
    const { workspaceId, ...query } = params;
    const response = await api.get<WorkspaceCreditHistoryResponse>(
      `/workspace/${workspaceId}/credits/history`,
      { params: query }
    );
    return response.data;
  },
};
