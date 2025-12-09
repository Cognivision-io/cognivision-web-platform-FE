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
