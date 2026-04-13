import { useQuery, type UseQueryOptions, useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type {
  GetProjectResponse,
  GetProjectsResponse,
} from "@/interfaces/project.interface";
import { FEATURE_FLAGS } from "@/constants/feature-flags";
import { handleMutationError } from "@/lib/handle-error";

import { projectApi, type CreateVersionParams } from "../api/project.api";

type ProjectError = AxiosError<{ message?: string | string[] }>;

const PROJECT_API_DISABLED_MESSAGE =
  "Project API is disabled. Set NEXT_PUBLIC_FF_PROJECT_API=true to enable it.";

const EMPTY_PROJECTS_RESPONSE: GetProjectsResponse = {
  statusCode: 200,
  message: "Project API is disabled by feature flag.",
  data: {
    data: [],
    meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
  },
};

const createEmptyProjectResponse = (id: number): GetProjectResponse => ({
  statusCode: 200,
  message: "Project API is disabled by feature flag.",
  data: {
    workspace: { name: "—", url: "", members: 0 },
    project: {
      id: String(id),
      type: "stub",
      name: "Project API disabled",
      created: Date.now(),
      updated: Date.now(),
      images: 0,
      unannotated: 0,
      annotation: "",
      versions: 0,
      public: false,
      multilabel: false,
      license: "",
      splits: {},
      colors: {},
      classes: {},
      preprocessing: {},
      augmentation: {},
    },
    versions: [],
  },
});

const rejectProjectApiDisabled = async (): Promise<never> => {
  throw new Error(PROJECT_API_DISABLED_MESSAGE);
};

export const PROJECTS_QUERY_KEY = ["project", "all"] as const;

export const useProjectsQuery = (
  params: {
    page?: number;
    limit?: number;
    search?: string;
    workspace?: number;
  },
  options?: Omit<
    UseQueryOptions<GetProjectsResponse, ProjectError>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: [...PROJECTS_QUERY_KEY, params],
    queryFn: FEATURE_FLAGS.PROJECT_API_ENABLED
      ? () => projectApi.getAll(params)
      : () => Promise.resolve(EMPTY_PROJECTS_RESPONSE),
    ...options,
  });
};

export const PROJECT_QUERY_KEY = ["project"] as const;

export const useProjectQuery = (
  id: number,
  options?: UseQueryOptions<GetProjectResponse, ProjectError>,
) => {
  return useQuery({
    queryKey: [...PROJECT_QUERY_KEY, id],
    queryFn: FEATURE_FLAGS.PROJECT_API_ENABLED
      ? () => projectApi.getById(id)
      : () => Promise.resolve(createEmptyProjectResponse(id)),
    enabled: !!id,
    ...options,
  });
};

export const useDeleteProjectMutation = () => {
  return useMutation({
    mutationFn: FEATURE_FLAGS.PROJECT_API_ENABLED
      ? (id: number | string) => projectApi.delete(id)
      : rejectProjectApiDisabled,
    onError: handleMutationError,
  });
};

export const useCreateVersionMutation = () => {
  return useMutation({
    mutationFn: FEATURE_FLAGS.PROJECT_API_ENABLED
      ? (variables: CreateVersionParams) => projectApi.createVersion(variables)
      : rejectProjectApiDisabled,
    onError: handleMutationError,
  });
};
