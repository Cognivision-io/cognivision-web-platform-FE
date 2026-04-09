import { useQuery, type UseQueryOptions, useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type {
  GetProjectResponse,
  GetProjectsResponse,
} from "@/interfaces/project.interface";
import CustomToast from "@/components/ui/sonner";

type ProjectError = AxiosError<{ message?: string | string[] }>;

async function rejectMutation(..._args: unknown[]): Promise<never> {
  void _args;
  throw new Error("Non-auth API is disabled.");
}

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
    queryFn: async (): Promise<GetProjectsResponse> => ({
      statusCode: 200,
      message: "",
      data: {
        data: [],
        meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
      },
    }),
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
    queryFn: async (): Promise<GetProjectResponse> => {
      const sid = String(id);
      return {
        statusCode: 200,
        message: "",
        data: {
          workspace: { name: "—", url: "", members: 0 },
          project: {
            id: sid,
            type: "stub",
            name: "Offline",
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
      };
    },
    enabled: !!id,
    ...options,
  });
};

export const useDeleteProjectMutation = () => {
  return useMutation({
    mutationFn: rejectMutation,
    onError: (error: unknown) => {
      CustomToast.error(
        error instanceof Error ? error.message : "Failed to delete project",
      );
    },
  });
};

export const useCreateVersionMutation = () => {
  return useMutation({
    mutationFn: rejectMutation,
    onError: (error: unknown) => {
      CustomToast.error(
        error instanceof Error ? error.message : "Could not create version",
      );
    },
  });
};
