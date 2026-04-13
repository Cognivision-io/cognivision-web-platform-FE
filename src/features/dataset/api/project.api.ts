import api from "@/lib/axios";
import type {
  GetProjectResponse,
  GetProjectsResponse,
} from "@/interfaces/project.interface";

import { projectAdapter } from "./project.adapter";

export type ProjectListParams = {
  page?: number;
  limit?: number;
  search?: string;
  workspace?: number;
};

export type CreateVersionParams = {
  id: number;
  payload: Record<string, unknown>;
};

export const projectApi = {
  getAll: (params: ProjectListParams) =>
    api
      .get<GetProjectsResponse | GetProjectsResponse["data"]>("/project", { params })
      .then(projectAdapter.toProjectsResponse),
  getById: (id: number) =>
    api
      .get<GetProjectResponse | GetProjectResponse["data"]>(`/project/${id}`)
      .then(projectAdapter.toProjectResponse),
  delete: async (id: number | string) => {
    const response = await api.delete<{ statusCode?: number; message?: string }>(
      `/project/${id}`,
    );
    return {
      statusCode: response.data?.statusCode ?? 200,
      message: response.data?.message ?? "Project deleted successfully",
    };
  },
  createVersion: async ({ id, payload }: CreateVersionParams) => {
    const response = await api.post(`/project/${id}/version`, payload);
    return response.data;
  },
};
