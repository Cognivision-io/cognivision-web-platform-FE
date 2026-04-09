"use client";

import { create } from "zustand";
import type { AuthenticatedUser } from "@/interfaces/auth.interface";
import { clearSessionToken, persistSessionToken } from "@/lib/session";

type AuthStore = {
  user: AuthenticatedUser | null;
  token: string | null;
  isHydrated: boolean;
  hydrate: () => Promise<void>;
  setUser: (user: AuthenticatedUser | null) => void;
  setToken: (token: string | null) => void;
  login: (
    accessToken: string,
    user: AuthenticatedUser,
    refreshToken?: string | null
  ) => Promise<void>;
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
  login: async (accessToken, user, refreshToken) => {
    const { setToken, setUser } = get();
    setToken(accessToken);
    setUser(user);
    if (typeof window !== "undefined") {
      if (refreshToken) {
        window.localStorage.setItem("authRefreshToken", refreshToken);
      } else {
        window.localStorage.removeItem("authRefreshToken");
      }
    }
    set({ isHydrated: true });
  },
  logout: () => {
    const { setToken, setUser } = get();
    setToken(null);
    setUser(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("authRefreshToken");
    }
    set({ isHydrated: true });
  },
  refreshUserFromSession: async () => {
    if (typeof window !== "undefined") {
      const storedUser = window.localStorage.getItem("authUser");
      let parsedUser: AuthenticatedUser | null = null;
      if (storedUser) {
        try {
          parsedUser = JSON.parse(storedUser) as AuthenticatedUser;
        } catch (error) {
          console.warn("Failed to parse stored auth user", error);
        }
      }
      set({ user: parsedUser });
    }
    set({ isHydrated: true });
  },
}));
