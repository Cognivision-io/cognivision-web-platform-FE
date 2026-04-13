import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import type {
  CreateWorkspacePayload,
  CreateWorkspaceResponse,
} from "@/types/workspace.interface";
import { handleMutationError } from "@/lib/handle-error";

type WorkspaceError = AxiosError<{ message?: string | string[] }>;

async function rejectMutation(..._args: unknown[]): Promise<never> {
  void _args;
  throw new Error("Non-auth API is disabled.");
}

export const CREATE_WORKSPACE_MUTATION_KEY = ["workspace", "create"] as const;

export const useCreateWorkspaceMutation = (
  options?: UseMutationOptions<
    CreateWorkspaceResponse,
    WorkspaceError,
    CreateWorkspacePayload
  >,
) => {
  const { onError, ...rest } = options ?? {};
  return useMutation({
    mutationKey: CREATE_WORKSPACE_MUTATION_KEY,
    mutationFn: rejectMutation,
    ...rest,
    onError: (error, variables, onMutateResult, context) => {
      handleMutationError(error);
      onError?.(error, variables, onMutateResult, context);
    },
  });
};
