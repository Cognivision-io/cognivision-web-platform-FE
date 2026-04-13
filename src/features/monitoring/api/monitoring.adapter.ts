import type { AxiosResponse } from "axios";

import { unwrapEnvelope } from "@/lib/api-adapter";
import type { ApiEnvelope } from "@/lib/api-envelope";
import type { Plan } from "@/interfaces/plan.interface";
import type { CurrentUsage } from "@/interfaces/usage.interface";

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isPlan = (value: unknown): value is Plan =>
  isObject(value) && "id" in value && "name" in value;

const isPlanList = (value: unknown): value is Plan[] =>
  Array.isArray(value) && value.every(isPlan);

const isCurrentUsage = (value: unknown): value is CurrentUsage =>
  isObject(value) && "current_monthly_used" in value && "monthly_limit" in value;

export const monitoringAdapter = {
  toPlanList: (response: AxiosResponse<ApiEnvelope<Plan[]> | Plan[]>) =>
    unwrapEnvelope(response, isPlanList, "Invalid plans response"),
  toCurrentUsage: (
    response: AxiosResponse<ApiEnvelope<CurrentUsage> | CurrentUsage>,
  ) => unwrapEnvelope(response, isCurrentUsage, "Invalid usage response"),
};
