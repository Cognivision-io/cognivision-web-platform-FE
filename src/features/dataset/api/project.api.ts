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

  getProject: async (id: number) => {
    const response = await api.get<import("@/interfaces/project.interface").GetProjectResponse>(`/project/${id}`);
    return response.data;
  },

  uploadImages: async (payload: { projectId: string; batch?: string; files: File[] }) => {
    const formData = new FormData();
    payload.files.forEach((file) => {
      formData.append("file", file);
    });

    const response = await api.post("/project/upload-images", formData, {
      params: {
        roboflowProjectId: payload.projectId,
        batch: payload.batch,
        concurrency: 10,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  uploadFolder: async (payload: { projectId: string; batch?: string; files: File[] }) => {
    const formData = new FormData();
    payload.files.forEach((file) => {
      // Use webkitRelativePath to preserve folder structure for upload-folder endpoint
      const path = (file as any).webkitRelativePath || file.name;
      formData.append("files", file, path);
    });

    const response = await api.post("/project/upload-folder", formData, {
      params: {
        roboflowProjectId: payload.projectId,
        batch: payload.batch,
        concurrency: 10,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getUnannotatedImages: async (id: number, offset: number = 0) => {
    const response = await api.get(`/project/${id}/unannotated-images`, {
      params: {
        offset,
      },
    });
    return response.data as import("@/interfaces/image.interface").GetImagesResponse;
  },

  deleteProject: async (id: string) => {
    const response = await api.delete(`/project/${id}`);
    return response.data;
  },

  getImageDetail: async (roboflowProjectId: string, imageId: string) => {
    const response = await api.get(`/project/image-detail/${encodeURIComponent(roboflowProjectId)}/${imageId}`);
    return response.data;
  },
};
