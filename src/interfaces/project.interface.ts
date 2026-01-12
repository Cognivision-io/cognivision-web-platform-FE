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
  roboflowProjectId?: string;
  images?: number;
  models?: number;
};

export type CreateProjectResponse = {
  statusCode: number;
  data: Project;
  message: string;
};

export interface RoboflowWorkspace {
  id?: number;
  name: string;
  url: string;
  members: number;
}

export interface RoboflowProjectMetadata {
  id: string;
  type: string;
  name: string;
  created: number;
  updated: number;
  images: number;
  unannotated: number;
  annotation: string;
  versions: number;
  public: boolean;
  multilabel: boolean;
  license: string;
  workspaceId?: number;
  splits: Record<string, number>;
  colors: Record<string, string>;
  classes: Record<string, number>;
  icon?: {
    original: string;
    thumb: string;
    annotation: string | null;
  };
  preprocessing: any;
  augmentation: any;
}

export interface RoboflowVersion {
  id: string;
  name: string;
  created: number;
  images: number;
  splits: Record<string, number>;
  preprocessing: any;
  augmentation: any;
  exports: string[];
  model?: any;
}

export interface ProjectDetails {
  workspace: RoboflowWorkspace;
  project: RoboflowProjectMetadata;
  versions: RoboflowVersion[];
}

export type GetProjectResponse = {
  statusCode: number;
  data: ProjectDetails;
  message: string;
  // Helper to access nested project fields if needed, but structure is strictly typed above
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

export type AutoAnnotationDirectPayload = {
  imageId: string;
  pointX: number;
  pointY: number;
  imageUrl: string;
  projectId: string; // roboflowProjectId
};

export type AutoAnnotationBatchDirectPayload = {
  imageId: string;
  points: { x: number; y: number }[];
  imageUrl: string;
  projectId: string; // roboflowProjectId
};

export interface AnnotationItem {
  class?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  confidence?: number;
  // New fields for polygon
  polygon?: [number, number][];
  imageWidth?: number;
  imageHeight?: number;
  bbox?: number[];
  maskArea?: number;
}

export type AutoAnnotationResponse = {
  statusCode: number;
  data: {
    result?: AnnotationItem[]; // Old format
    // New format fields directly in data or in a wrapper?
    // User JSON shows: data: { success: true, bbox: ..., polygon: ... }
    success?: boolean;
    bbox?: number[];
    imageHeight?: number;
    imageWidth?: number;
    mask_area?: number;
    polygon?: [number, number][];
    saved_images?: any;
    // Batch format with multiple objects
    objects?: Array<{
      bbox?: number[];
      mask_area?: number;
      point?: { x: number; y: number };
      polygon?: [number, number][];
    }>;
  };
  message: string;
};

export interface AnnotateStepProps {
  onNext: () => void;
  uploadedData?: { roboflowProjectId: string; imageIds: string[] } | null;
}


export interface RoboflowPrediction {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  class: string;
  class_id: number;
  detection_id: string;
}

export interface RoboflowInferenceResponse {
  time: number;
  image: {
    width: number;
    height: number;
  };
  predictions: RoboflowPrediction[];
}
