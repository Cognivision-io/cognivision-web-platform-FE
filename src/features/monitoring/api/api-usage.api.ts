import api from "@/lib/axios";
import type {
  ApiUsageDetailedLogsResponse,
  ApiUsageSummaryResponse,
} from "@/interfaces/api-usage.interface";

export const apiUsageApi = {
  getWorkspaceDetailedLogs: async (params: {
    workspaceId: number;
    projectId?: string;
    page?: number;
    limit?: number;
  }) => {
    const { workspaceId, projectId, ...query } = params;
    const response = await api.get<ApiUsageDetailedLogsResponse>(
      `/api-usage/workspace/${workspaceId}/detailed-logs`,
      { params: { ...query, project: projectId } }
    );
    return response.data;
  },

  getWorkspaceSummary: async (params: {
    workspaceId: number;
    projectId?: string;
    startDate: string;
    endDate: string;
  }) => {
    const { workspaceId, projectId, ...query } = params;
    const response = await api.get<ApiUsageSummaryResponse>(
      `/api-usage/workspace/${workspaceId}/summary`,
      { params: { ...query, project: projectId } }
    );
    return response.data;
  },
};
