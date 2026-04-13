"use client";

import { useMemo } from "react";
import type { AuthenticatedUser } from "@/types/auth.interface";
import { useAuthStore } from "@/store/auth-store";

export const getWorkspaceIdFromUser = (
  user: AuthenticatedUser | null | undefined,
): number | undefined => {
  const direct = (user as { workspaceId?: unknown } | null)?.workspaceId;
  const directNumber = typeof direct === "number" ? direct : Number(direct);
  if (Number.isFinite(directNumber) && directNumber > 0) return directNumber;

  const workspaces = user?.workspaces;
  if (!Array.isArray(workspaces) || workspaces.length === 0) return undefined;

  const firstWorkspace = workspaces[0];
  const firstNumber =
    typeof firstWorkspace === "number" ? firstWorkspace : Number(firstWorkspace);

  return Number.isFinite(firstNumber) && firstNumber > 0 ? firstNumber : undefined;
};

export const useCurrentWorkspaceId = (): number | undefined => {
  const user = useAuthStore((state) => state.user);
  return useMemo(() => getWorkspaceIdFromUser(user), [user]);
};
