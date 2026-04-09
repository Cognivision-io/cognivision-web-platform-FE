import api from "@/lib/axios";
import type { Plan } from "@/interfaces/plan.interface";

export const plansApi = {
  list: async () => {
    const { data } = await api.get<Plan[]>("/plans");
    return data;
  },
};
