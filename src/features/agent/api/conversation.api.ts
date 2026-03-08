import api from "@/lib/axios";
import type {
  CreateConversationPayload,
  CreateConversationResponse,
  ConversationListResponse,
} from "@/features/agent/types";

export const conversationApi = {
  create: async (payload: CreateConversationPayload) => {
    const response = await api.post<CreateConversationResponse>(
      "/conversation",
      payload
    );
    return response.data;
  },

  list: async (page = 1, limit = 10) => {
    const response = await api.get<ConversationListResponse>(
      `/conversation?page=${page}&limit=${limit}`
    );
    return response.data;
  },
};
