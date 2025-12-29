import api from "@/lib/axios";
import type { RoboflowInferenceStats } from "@/interfaces/monitoring.interface";

export const monitoringApi = {
  getInferenceStats: async (params?: {
    startTime?: string;
    endTime?: string;
  }) => {
    const response = await api.get<{ statusCode: number; data: RoboflowInferenceStats; message: string }>(
      "/roboflow/inference-stats",
      { params }
    );
    return response.data.data;
  },
};
