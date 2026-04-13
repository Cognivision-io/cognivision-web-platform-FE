import api from "@/lib/axios";
import type { CurrentUsage } from "@/interfaces/usage.interface";
import type { ApiEnvelope } from "@/lib/api-envelope";

import { monitoringAdapter } from "./monitoring.adapter";

export const usageApi = {
  getCurrent: async () =>
    api
      .get<ApiEnvelope<CurrentUsage> | CurrentUsage>("/usage/current")
      .then(monitoringAdapter.toCurrentUsage),
};
