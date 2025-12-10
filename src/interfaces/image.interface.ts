export interface Annotation {
  [key: string]: any;
}

export interface Image {
  id: string; // or number, based on backend. typically string in roboflow, but maybe number in this backend? The prompt used number for id param.
  name: string;
  url: string; // or something similar
  annotations: Annotation;
  // Add other fields as necessary from the response
}

export interface GetImagesResponse {
  results: Image[];
  total: number;
  offset: number;
  limit: number;
}
