import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { workspaceApi } from "@/features/workspace/api/workspace.api";
import type {
  CreateWorkspacePayload,
  CreateWorkspaceResponse,
  UpdateWorkspacePayload,
} from "@/interfaces/workspace.interface";

type WorkspaceError = AxiosError<{ message?: string | string[] }>;

export const CREATE_WORKSPACE_MUTATION_KEY = ["workspace", "create"] as const;

export const useCreateWorkspaceMutation = (
  options?: UseMutationOptions<
    CreateWorkspaceResponse,
    WorkspaceError,
    CreateWorkspacePayload
  >,
) => {
  return useMutation({
    mutationKey: CREATE_WORKSPACE_MUTATION_KEY,
    mutationFn: workspaceApi.create,
    ...options,
  });
};

export const UPDATE_WORKSPACE_MUTATION_KEY = ["workspace", "update"] as const;

export const useUpdateWorkspaceMutation = (
  options?: UseMutationOptions<
    import("@/interfaces/workspace.interface").GetWorkspaceResponse,
    WorkspaceError,
    { workspaceId: number; payload: UpdateWorkspacePayload }
  >,
) => {
  return useMutation({
    mutationKey: UPDATE_WORKSPACE_MUTATION_KEY,
    mutationFn: ({ workspaceId, payload }) =>
      workspaceApi.update(workspaceId, payload),
    ...options,
  });
};

export const DELETE_WORKSPACE_MUTATION_KEY = ["workspace", "delete"] as const;

export const useDeleteWorkspaceMutation = (
  options?: UseMutationOptions<
    { statusCode: number; message: string },
    WorkspaceError,
    number
  >,
) => {
  return useMutation({
    mutationKey: DELETE_WORKSPACE_MUTATION_KEY,
    mutationFn: (workspaceId) => workspaceApi.delete(workspaceId),
    ...options,
  });
};
