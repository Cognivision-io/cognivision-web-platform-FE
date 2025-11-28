'use client';

import { create } from "zustand";

import type { AuthenticatedUser } from "@/interfaces/auth.interface";
import { clearSessionToken, persistSessionToken } from "@/lib/session";

type AuthStore = {
  user: AuthenticatedUser | null;
  token: string | null;
  isHydrated: boolean;
  hydrate: () => void;
  setUser: (user: AuthenticatedUser | null) => void;
  setToken: (token: string | null) => void;
  login: (token: string, user: AuthenticatedUser) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isHydrated: false,
  hydrate: () => {
    if (typeof window === "undefined" || get().isHydrated) return;
    const storedToken = window.localStorage.getItem("authToken");
    const storedUser = window.localStorage.getItem("authUser");
    set({
      token: storedToken,
      user: storedUser ? (JSON.parse(storedUser) as AuthenticatedUser) : null,
      isHydrated: true,
    });

    if (storedToken) {
      persistSessionToken(storedToken);
    } else {
      clearSessionToken();
    }
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
  },
  logout: () => {
    const { setToken, setUser } = get();
    setToken(null);
    setUser(null);
  },
}));

