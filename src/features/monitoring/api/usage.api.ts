import api from "@/lib/axios";
import type { CurrentUsage } from "@/interfaces/usage.interface";

export const usageApi = {
  getCurrent: async () => {
    const { data } = await api.get<CurrentUsage>("/usage/current");
    return data;
  },
};
