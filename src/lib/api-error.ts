import axios from "axios";

type BackendErrorPayload =
  | {
      error?: unknown;
      message?: unknown;
      detail?: unknown;
      success?: unknown;
    }
  | unknown;

const toMessage = (value: unknown): string | null => {
  if (typeof value === "string" && value.trim()) return value;
  if (Array.isArray(value)) {
    const parts = value
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean);
    return parts.length ? parts.join(", ") : null;
  }
  return null;
};

export const getApiErrorMessage = (
  error: unknown,
  fallback: string = "Request failed"
): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as BackendErrorPayload;
    if (data && typeof data === "object") {
      const messageFromError = toMessage((data as any).error);
      if (messageFromError) return messageFromError;

      const messageFromMessage = toMessage((data as any).message);
      if (messageFromMessage) return messageFromMessage;

      const messageFromDetail = toMessage((data as any).detail);
      if (messageFromDetail) return messageFromDetail;
    }

    return toMessage(error.message) ?? fallback;
  }

  if (error instanceof Error) return toMessage(error.message) ?? fallback;
  return fallback;
};

