export interface CreateWorkspacePayload {
  name: string;
  status: boolean;
  order: number;
}

export interface CreateWorkspaceResponse {
  _id: string;
  name: string;
  status: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}
