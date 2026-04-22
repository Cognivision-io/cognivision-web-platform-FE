import axios, { AxiosHeaders } from "axios";

import { env } from "@/lib/env";
import { clearSessionToken, getBrowserSessionToken } from "@/lib/session";

const apiOrigin = env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");

// Create axios instance with default config
const api = axios.create({
  baseURL: `${apiOrigin}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor - use session cookie token as temporary bearer fallback.
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = getBrowserSessionToken();
      if (token) {
        const headers = AxiosHeaders.from(config.headers ?? {});
        const value = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
        headers.set("Authorization", value);
        // headers.set("ngrok-skip-browser-warning", true);
        config.headers = headers;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - clear client-side session cookie mirror.
    if (error.response?.status === 401 && typeof window !== "undefined") {
      window.localStorage.removeItem("authUser");
      clearSessionToken();
      const isAuthRoute = [
        "/login",
        "/register",
        "/forget-password",
        "/verify-otp",
      ].some((route) => window.location.pathname.startsWith(route));
      if (!isAuthRoute) {
        window.location.replace("/login?reason=session_expired");
      }
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error("Access forbidden");
    }

    // Handle network errors
    if (!error.response) {
      console.error("Network error - please check your connection");
    }

    return Promise.reject(error);
  },
);

export default api;
