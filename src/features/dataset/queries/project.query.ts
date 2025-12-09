import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
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
