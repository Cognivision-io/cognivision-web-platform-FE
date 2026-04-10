import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (text: string) =>
  text?.charAt(0)?.toUpperCase() + text?.slice(1);

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export const isValidEmail = (email: string) => emailRegex.test(email.trim());

/**
 * Reads common API error shapes: FastAPI `detail` (string or validation array),
 * or legacy `message` (string | string[]).
 */
export function getApiErrorMessage(
  data: unknown,
): string | string[] | undefined {
  if (data == null || typeof data !== "object") return undefined;
  const o = data as Record<string, unknown>;

  if (typeof o.detail === "string") return o.detail;
  if (
    o.detail !== null &&
    typeof o.detail === "object" &&
    !Array.isArray(o.detail)
  ) {
    const inner = o.detail as Record<string, unknown>;
    if (typeof inner.message === "string") return inner.message;
  }
  if (Array.isArray(o.detail)) {
    const msgs = o.detail
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object" && "msg" in item) {
          const msg = (item as { msg?: unknown }).msg;
          return typeof msg === "string" ? msg : "";
        }
        return "";
      })
      .filter(Boolean);
    if (msgs.length === 1) return msgs[0];
    if (msgs.length > 1) return msgs;
  }

  if (typeof o.message === "string") return o.message;
  if (Array.isArray(o.message)) return o.message as string[];
  return undefined;
}

/** Two-letter initials from a full name (e.g. "Sameer" → "SA", "Ada Lovelace" → "AL"). */
export function initialsFromFullName(name: string | null | undefined): string {
  const trimmed = name?.trim() ?? "";
  if (!trimmed) return "U";
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    const w = parts[0];
    if (w.length === 1) return w.toUpperCase();
    return `${w.charAt(0)}${w.charAt(w.length - 1)}`.toUpperCase();
  }
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
}
