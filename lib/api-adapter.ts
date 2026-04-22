import type { AxiosResponse } from "axios";

import type { ApiEnvelope } from "@/lib/api-envelope";

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const isApiEnvelope = <T>(value: unknown): value is ApiEnvelope<T> =>
  isObject(value) && "data" in value && ("status" in value || "statusCode" in value);

export const unwrapEnvelope = <T>(
  response: AxiosResponse<ApiEnvelope<T> | T>,
  validate: (data: unknown) => data is T,
  errorMessage = "Unexpected response shape",
): T => {
  const body = response.data as unknown;
  const payload = isApiEnvelope<T>(body) ? body.data : body;

  if (validate(payload)) {
    return payload;
  }

  throw new Error(errorMessage);
};
