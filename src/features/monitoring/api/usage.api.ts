import api from "@/lib/axios";
import type { CurrentUsage, UsageApiEnvelope } from "@/interfaces/usage.interface";

export const usageApi = {
  getCurrent: async () => {
    const response = await api.get<CurrentUsage | UsageApiEnvelope>("/usage/current");
    const payload = response.data;

    const usage =
      payload &&
      typeof payload === "object" &&
      "data" in payload &&
      payload.data &&
      typeof payload.data === "object" &&
      "current_monthly_used" in payload.data
        ? payload.data
        : payload;

    if (
      !usage ||
      typeof usage !== "object" ||
      !("current_monthly_used" in usage) ||
      !("monthly_limit" in usage)
    ) {
      throw new Error("Invalid usage response");
    }

    return usage as CurrentUsage;
  },
};
