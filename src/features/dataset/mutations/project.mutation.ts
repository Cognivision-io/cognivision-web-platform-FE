import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type {
  CreateProjectPayload,
  CreateProjectResponse,
} from "@/interfaces/project.interface";
import { handleMutationError } from "@/lib/handle-error";

type ProjectError = AxiosError<{ message?: string | string[] }>;

async function rejectMutation(..._args: unknown[]): Promise<never> {
  void _args;
  throw new Error("Non-auth API is disabled.");
}

export const CREATE_PROJECT_MUTATION_KEY = ["project", "create"] as const;

export const useCreateProjectMutation = (
  options?: UseMutationOptions<
    CreateProjectResponse,
    ProjectError,
    CreateProjectPayload
  >,
) => {
  const { onError, ...rest } = options ?? {};
  return useMutation({
    mutationKey: CREATE_PROJECT_MUTATION_KEY,
    mutationFn: rejectMutation,
    ...rest,
    onError: (error, variables, onMutateResult, context) => {
      handleMutationError(error);
      onError?.(error, variables, onMutateResult, context);
    },
  });
};

export const AUTO_ANNOTATION_BATCH_DIRECT_MUTATION_KEY = [
  "project",
  "autoAnnotation",
  "batch",
  "direct",
] as const;

export const useAutoAnnotationBatchDirectMutation = (
  options?: UseMutationOptions<
    import("@/interfaces/project.interface").AutoAnnotationResponse,
    ProjectError,
    import("@/interfaces/project.interface").AutoAnnotationBatchDirectPayload
  >,
) => {
  const { onError, ...rest } = options ?? {};
  return useMutation({
    mutationKey: AUTO_ANNOTATION_BATCH_DIRECT_MUTATION_KEY,
    mutationFn: rejectMutation,
    ...rest,
    onError: (error, variables, onMutateResult, context) => {
      handleMutationError(error);
      onError?.(error, variables, onMutateResult, context);
    },
  });
};

export const UPLOAD_ANNOTATION_MUTATION_KEY = ["project", "uploadAnnotation"] as const;

export const useUploadAnnotationMutation = (
  options?: UseMutationOptions<
    unknown,
    ProjectError,
    { projectId: number; imageId: string; file: File; labelMap?: Record<string, string> }
  >,
) => {
  const { onError, ...rest } = options ?? {};
  return useMutation({
    mutationKey: UPLOAD_ANNOTATION_MUTATION_KEY,
    mutationFn: rejectMutation,
    ...rest,
    onError: (error, variables, onMutateResult, context) => {
      handleMutationError(error);
      onError?.(error, variables, onMutateResult, context);
    },
  });
};

export const TRAIN_MODEL_MUTATION_KEY = ["project", "trainModel"] as const;

export const useTrainModelMutation = (
  options?: UseMutationOptions<
    unknown,
    ProjectError,
    { projectId: number; versionNumber: string; modelType: string }
  >,
) => {
  const { onError, ...rest } = options ?? {};
  return useMutation({
    mutationKey: TRAIN_MODEL_MUTATION_KEY,
    mutationFn: rejectMutation,
    ...rest,
    onError: (error, variables, onMutateResult, context) => {
      handleMutationError(error);
      onError?.(error, variables, onMutateResult, context);
    },
  });
};
