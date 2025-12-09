export type CreateProjectPayload = {
  name: string;
  annotation: string;
  description: string;
  license: string;
  type: string;
  workspace: number;
};

export type Project = {
  id: string;
  name: string;
  annotation: string;
  description: string;
  license: string;
  type: string;
  workspaceId: number;
  createdAt: string;
  updatedAt: string;
  // Add other fields as needed based on the response
  images?: number;
  models?: number;
};

export type CreateProjectResponse = {
  statusCode: number;
  data: Project;
  message: string;
};

export type GetProjectsResponse = {
  statusCode: number;
  data: {
    data: Project[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  message: string;
};
