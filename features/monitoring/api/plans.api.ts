import api from "@/lib/axios";
import type { Plan } from "@/types/plan.interface";
import type { ApiEnvelope } from "@/lib/api-envelope";

import { monitoringAdapter } from "./monitoring.adapter";

export const plansApi = {
  list: async () =>
    api.get<ApiEnvelope<Plan[]> | Plan[]>("/plans").then(monitoringAdapter.toPlanList),
};
