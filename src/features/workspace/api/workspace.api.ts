import api from "@/lib/axios";
import {
  CreateWorkspacePayload,
  CreateWorkspaceResponse,
} from "@/interfaces/workspace.interface";

export const workspaceApi = {
  create: async (payload: CreateWorkspacePayload) => {
    const response = await api.post<CreateWorkspaceResponse>(
      "/workspace",
      payload
    );
    return response.data;
  },
};
