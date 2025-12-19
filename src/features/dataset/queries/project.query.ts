import {
  useQuery,
  type UseQueryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { projectApi } from "@/features/dataset/api/project.api";
import type { GetProjectsResponse } from "@/interfaces/project.interface";

type ProjectError = AxiosError<{ message?: string | string[] }>;

export const PROJECTS_QUERY_KEY = ["project", "all"] as const;

export const useProjectsQuery = (
  params: {
    page?: number;
    limit?: number;
    search?: string;
  },
  options?: UseQueryOptions<GetProjectsResponse, ProjectError>
) => {
  return useQuery({
    queryKey: [...PROJECTS_QUERY_KEY, params],
    queryFn: () => projectApi.getProjects(params),
    ...options,
  });
};

export const PROJECT_QUERY_KEY = ["project"] as const;

export const useProjectQuery = (
  id: number,
  options?: UseQueryOptions<import("@/interfaces/project.interface").GetProjectResponse, ProjectError>
) => {
  return useQuery({
    queryKey: [...PROJECT_QUERY_KEY, id],
    queryFn: () => projectApi.getProject(id),
    enabled: !!id,
    ...options,
  });
};


export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectApi.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
};

export const useCreateVersionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) => 
      projectApi.createVersion(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [...PROJECT_QUERY_KEY, id] });
    },
  });
};
