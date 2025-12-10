import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { workspaceApi } from "@/features/workspace/api/workspace.api";
import type {
  CreateWorkspacePayload,
  CreateWorkspaceResponse,
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
