'use client';

import type { AxiosError } from "axios";
import { create } from "zustand";

import { userAPI } from "@/api/user";
import type { AuthenticatedUser } from "@/interfaces/auth.interface";
import { clearSessionToken, persistSessionToken } from "@/lib/session";

type AuthStore = {
  user: AuthenticatedUser | null;
  token: string | null;
  isHydrated: boolean;
  hydrate: () => Promise<void>;
  setUser: (user: AuthenticatedUser | null) => void;
  setToken: (token: string | null) => void;
  login: (token: string, user: AuthenticatedUser) => Promise<void>;
  logout: () => void;
  refreshUserFromSession: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isHydrated: false,
  hydrate: async () => {
    if (typeof window === "undefined" || get().isHydrated) return;
    const storedToken = window.localStorage.getItem("authToken");
    const storedUser = window.localStorage.getItem("authUser");

    if (storedToken) {
      persistSessionToken(storedToken);
    } else {
      clearSessionToken();
    }

    if (storedToken || storedUser) {
      let parsedUser: AuthenticatedUser | null = null;
      if (storedUser) {
        try {
          parsedUser = JSON.parse(storedUser) as AuthenticatedUser;
        } catch (error) {
          parsedUser = null;
          console.warn("Failed to parse stored auth user", error);
        }
      }
      set({
        token: storedToken,
        user: parsedUser,
      });
    }

    await get().refreshUserFromSession();
  },
  setToken: (token) => {
    if (typeof window !== "undefined") {
      if (token) {
        window.localStorage.setItem("authToken", token);
      } else {
        window.localStorage.removeItem("authToken");
      }
    }

    if (token) {
      persistSessionToken(token);
    } else {
      clearSessionToken();
    }

    set({ token });
  },
  setUser: (user) => {
    if (typeof window !== "undefined") {
      if (user) {
        window.localStorage.setItem("authUser", JSON.stringify(user));
      } else {
        window.localStorage.removeItem("authUser");
      }
    }

    set({ user });
  },
  login: async (token, user) => {
    const { setToken, setUser } = get();
    setToken(token);
    setUser(user);
    set({ isHydrated: true });
  },
  logout: () => {
    const { setToken, setUser } = get();
    setToken(null);
    setUser(null);
    set({ isHydrated: true });
  },
  refreshUserFromSession: async () => {
    try {
      const response = await userAPI.getCurrentUser();
      set({ user: response.data });
    } catch (error) {
      const status = (error as AxiosError | undefined)?.response?.status;
      if (status === 401) {
        get().logout();
      }
    } finally {
      set({ isHydrated: true });
    }
  },
}));
