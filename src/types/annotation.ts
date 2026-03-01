export interface Point {
  x: number;
  y: number;
}

export interface Polygon {
  id: string;
  points: Point[];
  classId: string;
  className: string;
  confidence?: number;
  accepted: boolean;
}

export interface AnnotationClass {
  id: string;
  name: string;
  color: string;
  prompt?: string;
}

export interface ImageItem {
  id: string;
  url: string;
  name: string;
  width?: number;
  height?: number;
}

export interface SAM3Prediction {
  width: number;
  height: number;
  x: number;
  y: number;
  confidence: number;
  class_id: number;
  points: Point[];
  class: string;
  detection_id: string;
  parent_id: string;
}

export interface SAM3Response {
  outputs: Array<{
    label_visualization: {
      type: string;
      value: string;
    };
    model_predictions: {
      image: {
        width: number;
        height: number;
      };
      predictions: SAM3Prediction[];
    };
  }>;
}
