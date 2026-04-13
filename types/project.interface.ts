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

export interface PreprocessingResizeConfig extends Record<string, unknown> {
  format?: string;
  width?: number;
  height?: number;
}

export interface PreprocessingConfig extends Record<string, unknown> {
  resize?: PreprocessingResizeConfig;
  "auto-orient"?: boolean;
}

export interface AugmentationImageConfig extends Record<string, unknown> {
  versions?: number;
}

export interface AugmentationFlipConfig extends Record<string, unknown> {
  horizontal?: boolean;
  vertical?: boolean;
}

export interface AugmentationBrightnessConfig extends Record<string, unknown> {
  percent?: number;
}

export interface AugmentationConfig extends Record<string, unknown> {
  image?: AugmentationImageConfig;
  flip?: AugmentationFlipConfig;
  brightness?: AugmentationBrightnessConfig;
}

export interface RoboflowModelMetadata extends Record<string, unknown> {
  id?: string;
  map?: number | string;
  precision?: number | string;
  recall?: number | string;
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
  preprocessing: PreprocessingConfig;
  augmentation: AugmentationConfig;
}

export interface RoboflowVersion {
  id: string;
  name: string;
  created: number;
  images: number;
  splits: Record<string, number>;
  preprocessing: PreprocessingConfig;
  augmentation: AugmentationConfig;
  exports: string[];
  model?: RoboflowModelMetadata;
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
    saved_images?: unknown;
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
  initialImageId?: string;
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
