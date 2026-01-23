import api from "@/lib/axios";
import type {
  CreateSubscriptionPayload,
  CreateSubscriptionResponse,
  GetSubscriptionResponse,
} from "@/interfaces/subscription.interface";

export const subscriptionApi = {
  createSubscription: async (payload: CreateSubscriptionPayload) => {
    const response = await api.post<CreateSubscriptionResponse>(
      "/subscription",
      payload
    );
    return response.data;
  },
  getSubscription: async (id: number) => {
    const response = await api.get<GetSubscriptionResponse>(`/subscription/${id}`);
    return response.data;
  },
};
