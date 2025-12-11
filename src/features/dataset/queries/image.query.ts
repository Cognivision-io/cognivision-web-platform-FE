import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { projectApi } from "@/features/dataset/api/project.api";
import type { GetImagesResponse } from "@/interfaces/image.interface";
import type { AxiosError } from "axios";

export const UNANNOTATED_IMAGES_QUERY_KEY = ["project", "unannotated-images"] as const;

export const useUnannotatedImagesQuery = (
  id: number,
  offset: number = 0,
  limit: number = 50,
  options?: Omit<UseQueryOptions<GetImagesResponse, AxiosError>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: [...UNANNOTATED_IMAGES_QUERY_KEY, id, offset, limit],
    queryFn: () => projectApi.getUnannotatedImages(id, offset, limit),
    enabled: !!id,
    ...options,
  });
};

export const IMAGE_DETAIL_QUERY_KEY = ["project", "image-detail"] as const;

export const useImageDetailQuery = (
  roboflowProjectId: string,
  imageId: string,
  options?: Omit<UseQueryOptions<any, AxiosError>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: [...IMAGE_DETAIL_QUERY_KEY, roboflowProjectId, imageId],
    queryFn: () => projectApi.getImageDetail(roboflowProjectId, imageId),
    enabled: !!roboflowProjectId && !!imageId,
    ...options,
  });
};
