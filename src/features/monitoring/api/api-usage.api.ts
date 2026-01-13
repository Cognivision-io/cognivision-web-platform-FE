import api from "@/lib/axios";
import type {
  ApiUsageDetailedLogsResponse,
  ApiUsageSummaryResponse,
} from "@/interfaces/api-usage.interface";

export const apiUsageApi = {
  getWorkspaceDetailedLogs: async (params: {
    workspaceId: number;
    page?: number;
    limit?: number;
  }) => {
    const { workspaceId, ...query } = params;
    const response = await api.get<ApiUsageDetailedLogsResponse>(
      `/api-usage/workspace/${workspaceId}/detailed-logs`,
      { params: query }
    );
    return response.data;
  },

  getWorkspaceSummary: async (params: {
    workspaceId: number;
    startDate: string;
    endDate: string;
  }) => {
    const { workspaceId, ...query } = params;
    const response = await api.get<ApiUsageSummaryResponse>(
      `/api-usage/workspace/${workspaceId}/summary`,
      { params: query }
    );
    return response.data;
  },
};
