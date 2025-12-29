export interface MisclassifiedItem {
    type: string;
    count: number;
    color: string;
}

export interface AnnotationData {
    date: string;
    count: number;
}

export interface ModelInferenceStats {
    model_name: string;
    predicted_class: string;
    num_inferences: number | null;
    prev_num_inferences: number | null;
    num_errors: number | null;
    prev_num_errors: number | null;
    avg_confidence: number | null;
    prev_avg_confidence: number | null;
    avg_response_time: number | null;
    prev_avg_response_time: number | null;
    median_confidence: number | null;
    class_count: number | null;
    deployment_types: string;
    inference_server_versions: string;
    model_num_inferences: number | null;
    prev_model_num_inferences: number | null;
}

export interface RoboflowInferenceStats {
    num_inferences: number;
    prev_num_inferences: number;
    num_errors: number;
    prev_num_errors: number;
    avg_confidence: number;
    prev_avg_confidence: number;
    avg_response_time: number;
    prev_avg_response_time: number;
    inference_stats: ModelInferenceStats[];
}

export type TimeRange = "7" | "30" | "90";
