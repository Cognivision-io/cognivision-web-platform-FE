/** POST /apikey/reset */
export type ResetUserApiKeyResponse = {
  message: string;
  new_key: string;
};

/** GET /apikey — current user’s API key */
export type UserApiKey = {
  id: string;
  user_id: string;
  key: string;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type ProjectApiKey = {
  id: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  description: string;
  status: boolean;
  createdBy: number;
  project: number;
  workspace: number;
  apiKey?: string;
  key?: string;
  token?: string;
  value?: string;
};

export type GetProjectApiKeysResponse = {
  statusCode: number;
  data: {
    data: ProjectApiKey[];
    page: number;
    limit: number;
    totalCount: number;
  };
  message: string;
};

export type GetProjectApiKeyValueResponse = {
  statusCode: number;
  data: {
    apiKey: string;
  };
  message: string;
};
