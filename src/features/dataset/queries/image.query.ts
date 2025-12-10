import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { projectApi } from "@/features/dataset/api/project.api";
import type { GetImagesResponse } from "@/interfaces/image.interface";
import type { AxiosError } from "axios";

export const UNANNOTATED_IMAGES_QUERY_KEY = ["project", "unannotated-images"] as const;

export const useUnannotatedImagesQuery = (
  id: number,
  offset: number = 0,
  options?: UseQueryOptions<GetImagesResponse, AxiosError>
) => {
  return useQuery({
    queryKey: [...UNANNOTATED_IMAGES_QUERY_KEY, id, offset],
    queryFn: () => projectApi.getUnannotatedImages(id, offset),
    enabled: !!id,
    ...options,
  });
};
