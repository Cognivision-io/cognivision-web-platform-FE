import api from "@/lib/axios";
import type { Plan, PlansApiEnvelope } from "@/interfaces/plan.interface";

export const plansApi = {
  list: async () => {
    const response = await api.get<Plan[] | PlansApiEnvelope>("/plans");
    const payload = response.data;

    const plans =
      payload &&
      typeof payload === "object" &&
      "data" in payload &&
      Array.isArray(payload.data)
        ? payload.data
        : payload;

    if (!Array.isArray(plans)) {
      throw new Error("Invalid plans response");
    }

    return plans;
  },
};
