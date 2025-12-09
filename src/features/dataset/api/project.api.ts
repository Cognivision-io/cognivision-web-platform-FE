import api from "@/lib/axios";
import type {
  CreateProjectPayload,
  CreateProjectResponse,
  GetProjectsResponse,
} from "@/interfaces/project.interface";

export const projectApi = {
  createProject: async (payload: CreateProjectPayload) => {
    const response = await api.post<CreateProjectResponse>(
      "/project/create",
      payload
    );
    return response.data;
  },

  getProjects: async (params: {
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    const response = await api.get<GetProjectsResponse>("/project/all", {
      params,
    });
    return response.data;
  },
};
