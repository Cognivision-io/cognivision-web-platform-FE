import { AxiosError } from "axios";

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const extractMessageFromPayload = (payload: unknown): string | string[] | null => {
  if (!isObject(payload)) {
    return null;
  }

  if (Array.isArray(payload.detail)) {
    const details = payload.detail
      .map((item) => {
        if (typeof item === "string") return item;
        if (isObject(item) && typeof item.msg === "string") return item.msg;
        return null;
      })
      .filter((item): item is string => Boolean(item?.trim()));

    if (details.length === 1) return details[0];
    if (details.length > 1) return details;
  }

  if (typeof payload.detail === "string") {
    return payload.detail;
  }

  if (isObject(payload.detail) && typeof payload.detail.message === "string") {
    return payload.detail.message;
  }

  if (typeof payload.message === "string") {
    return payload.message;
  }

  if (Array.isArray(payload.message)) {
    const messages = payload.message.filter(
      (message): message is string => typeof message === "string" && message.trim().length > 0,
    );
    if (messages.length === 1) return messages[0];
    if (messages.length > 1) return messages;
  }

  return null;
};

export function normaliseApiError(
  error: unknown,
  fallback = "An unexpected error occurred.",
): string | string[] {
  if (error instanceof AxiosError) {
    const fromResponse = extractMessageFromPayload(error.response?.data);
    if (fromResponse) return fromResponse;
    return error.message || fallback;
  }

  const fromPayload = extractMessageFromPayload(error);
  if (fromPayload) return fromPayload;

  if (error instanceof Error) {
    return error.message || fallback;
  }

  return fallback;
}

