export interface Image {
  id: string;
  name?: string;
  url?: string;
  urls?: {
    original: string;
    thumb: string;
    annotation?: string | null;
  };
  annotations?: unknown;
  labels?: string[];
  split?: string;
  owner?: string;
}

export interface GetImagesResponse {
  results: Image[];
  total: number;
  offset: number;
  limit?: number;
}
