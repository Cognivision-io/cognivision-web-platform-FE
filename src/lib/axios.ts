import axios, { AxiosHeaders } from "axios";

const apiOrigin = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

// Create axios instance with default config
const api = axios.create({
  baseURL: `${apiOrigin}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("authToken");
      if (token) {
        const headers = AxiosHeaders.from(config.headers ?? {});
        const value = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
        headers.set("Authorization", value);
        config.headers = headers;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401 && typeof window !== "undefined") {
      window.localStorage.removeItem("authToken");
      window.localStorage.removeItem("authRefreshToken");
      window.localStorage.removeItem("authUser");
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
  }
);

export default api;
