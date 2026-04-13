export interface UploadImagesPayload {
  projectId: string; // The roboflowProjectId or equivalent internal ID map
  batch?: string;
  files: File[];
  id?: string;
}

export interface UploadFolderPayload {
  projectId: string;
  batch?: string;
  files: File[];
  id: string;
}

export interface UploadResponse {
  success: boolean;
  sessionId: string;
  projectId: string;
  batch: string | null;
  totalProcessed: number;
  successful: number;
  failed: number;
  results: {
    successful: any[];
    failed: any[];
  } | null;
  folderStructure?: Record<string, number>;
  uploadDuration?: string;
  error?: string;
}
