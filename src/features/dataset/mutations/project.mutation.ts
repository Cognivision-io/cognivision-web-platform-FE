import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { projectApi } from "@/features/dataset/api/project.api";
import type {
  CreateProjectPayload,
  CreateProjectResponse,
} from "@/interfaces/project.interface";

type ProjectError = AxiosError<{ message?: string | string[] }>;

export const CREATE_PROJECT_MUTATION_KEY = ["project", "create"] as const;

export const useCreateProjectMutation = (
  options?: UseMutationOptions<
    CreateProjectResponse,
    ProjectError,
    CreateProjectPayload
  >
) => {
  return useMutation({
    mutationKey: CREATE_PROJECT_MUTATION_KEY,
    mutationFn: projectApi.createProject,
    ...options,
  });
};

export const AUTO_ANNOTATION_DIRECT_MUTATION_KEY = ["project", "autoAnnotation", "direct"] as const;

export const useAutoAnnotationDirectMutation = (
  options?: UseMutationOptions<
    import("@/interfaces/project.interface").AutoAnnotationResponse,
    ProjectError,
    import("@/interfaces/project.interface").AutoAnnotationDirectPayload
  >
) => {
  return useMutation({
    mutationKey: AUTO_ANNOTATION_DIRECT_MUTATION_KEY,
    mutationFn: projectApi.autoAnnotationDirect,
    ...options,
  });
};

export const AUTO_ANNOTATION_BATCH_DIRECT_MUTATION_KEY = ["project", "autoAnnotation", "batch", "direct"] as const;

export const useAutoAnnotationBatchDirectMutation = (
  options?: UseMutationOptions<
    import("@/interfaces/project.interface").AutoAnnotationResponse,
    ProjectError,
    import("@/interfaces/project.interface").AutoAnnotationBatchDirectPayload
  >
) => {
  return useMutation({
    mutationKey: AUTO_ANNOTATION_BATCH_DIRECT_MUTATION_KEY,
    mutationFn: projectApi.autoAnnotationBatchDirect,
    ...options,
  });
};

export const UPLOAD_ANNOTATION_MUTATION_KEY = ["project", "uploadAnnotation"] as const;

export const useUploadAnnotationMutation = (
  options?: UseMutationOptions<
    any,
    ProjectError,
    { projectId: number; imageId: string; file: File; labelMap?: Record<string, string> }
  >
) => {
  return useMutation({
    mutationKey: UPLOAD_ANNOTATION_MUTATION_KEY,
    mutationFn: projectApi.uploadAnnotation,
    ...options,
  });
};

export const TRAIN_MODEL_MUTATION_KEY = ["project", "trainModel"] as const;

export const useTrainModelMutation = (
  options?: UseMutationOptions<
    any,
    ProjectError,
    { projectId: number; versionNumber: string; modelType: string }
  >
) => {
  return useMutation({
    mutationKey: TRAIN_MODEL_MUTATION_KEY,
    mutationFn: projectApi.trainModel,
    ...options,
  });
};
