export interface CreateWorkspacePayload {
  name: string;
  status: boolean;
  order: number;
}

export type Workspace = {
  id: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  name: string;
  order: number;
  status: boolean;
  credits: string;
  remainingCredits: string;
  createdBy: number;
  projects: number[];
};

export type CreateWorkspaceResponse = {
  statusCode: number;
  data: Workspace;
  message: string;
};

export type GetWorkspacesResponse = {
  statusCode: number;
  data: {
    data: Workspace[];
    page: number;
    limit: number;
    totalCount: number;
  };
  message: string;
};

export type GetWorkspaceResponse = {
  statusCode: number;
  data: Workspace;
  message: string;
};

export type UpdateWorkspacePayload = CreateWorkspacePayload;

export type WorkspaceCreditsResponse = {
  statusCode: number;
  data: {
    workspaceId: number;
    credits: number;
  };
  message: string;
};

export type WorkspaceCreditHistoryEntry = {
  id: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  amount: string;
  transactionType: "addition" | "deduction" | string;
  task: string;
  balanceAfter: string;
  description: string | null;
  workspace?: {
    id: number;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    name: string;
    order?: number;
    status?: boolean;
    credits?: string;
    remainingCredits?: string;
  };
  project: unknown;
  user: unknown;
};

export type WorkspaceCreditHistoryResponse = {
  statusCode: number;
  data: {
    data: WorkspaceCreditHistoryEntry[];
    total: number;
    page: number;
    limit: number;
  };
  message: string;
};

export type GetWorkspaceApiKeyResponse = {
  statusCode: number;
  data: {
    apiKey: string;
    projects: unknown[];
  };
  message: string;
};
