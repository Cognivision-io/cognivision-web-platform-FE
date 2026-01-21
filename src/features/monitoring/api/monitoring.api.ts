import api from "@/lib/axios";
import type { RoboflowInferenceStats } from "@/interfaces/monitoring.interface";

export const monitoringApi = {
  getInferenceStats: async (params?: {
    projectId?: string;
    startTime?: string;
    endTime?: string;
  }) => {
    const { projectId, ...query } = params ?? {};
    const response = await api.get<{ statusCode: number; data: RoboflowInferenceStats; message: string }>(
      "/roboflow/inference-stats",
      { params: { ...query, project: projectId } }
    );
    return response.data.data;
  },
};
