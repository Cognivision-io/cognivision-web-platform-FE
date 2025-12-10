export interface Annotation {
  [key: string]: any;
}

export interface Image {
  id: string;
  name: string;
  url?: string;
  urls?: {
    original: string;
    thumb: string;
    annotation?: string | null;
  };
  annotations: Annotation;
  // Add other fields as necessary from the response
}

export interface GetImagesResponse {
  results: Image[];
  total: number;
  offset: number;
  limit: number;
}
