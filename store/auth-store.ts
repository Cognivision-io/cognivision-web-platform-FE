"use client";

import { create } from "zustand";
import type { AuthenticatedUser } from "@/types/auth.interface";
import { clearSessionToken, persistSessionToken } from "@/lib/session";

type AuthStore = {
  user: AuthenticatedUser | null;
  token: string | null;
  refreshToken: string | null;
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
  refreshToken: null,
  isHydrated: false,
  hydrate: async () => {
    if (typeof window === "undefined" || get().isHydrated) return;
    const storedUser = window.localStorage.getItem("authUser");

    if (storedUser) {
      let parsedUser: AuthenticatedUser | null = null;
      try {
        parsedUser = JSON.parse(storedUser) as AuthenticatedUser;
      } catch (error) {
        parsedUser = null;
        console.warn("Failed to parse stored auth user", error);
      }
      set({
        user: parsedUser,
      });
    }

    await get().refreshUserFromSession();
  },
  setToken: (token) => {
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
    set({ refreshToken: refreshToken ?? null, isHydrated: true });
  },
  logout: () => {
    const { setToken, setUser } = get();
    setToken(null);
    setUser(null);
    set({ refreshToken: null, isHydrated: true });
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
