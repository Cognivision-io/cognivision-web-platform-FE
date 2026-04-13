import { AUTH_SESSION_COOKIE, AUTH_SESSION_MAX_AGE } from "@/constants/auth";

const buildCookieAttributes = (maxAge: number) => {
  const attributes = [`Path=/`, `Max-Age=${maxAge}`, `SameSite=Strict`];
  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    attributes.push("Secure");
  }
  return attributes.join("; ");
};

export const persistSessionToken = (token: string, maxAge: number = AUTH_SESSION_MAX_AGE) => {
  if (typeof document === "undefined") return;
  const attributes = buildCookieAttributes(maxAge);
  document.cookie = `${AUTH_SESSION_COOKIE}=${encodeURIComponent(token)}; ${attributes}`;
};

export const clearSessionToken = () => {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_SESSION_COOKIE}=; Path=/; Max-Age=0; SameSite=Strict`;
};

export const getBrowserSessionToken = (): string | null => {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === AUTH_SESSION_COOKIE) {
      return decodeURIComponent(value);
    }
  }
  return null;
};
