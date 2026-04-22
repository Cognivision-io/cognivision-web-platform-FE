import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { GetImagesResponse, Image } from "@/types/image.interface";
import type { AxiosError } from "axios";

export const UNANNOTATED_IMAGES_QUERY_KEY = ["project", "unannotated-images"] as const;
export const ANNOTATED_IMAGES_QUERY_KEY = ["project", "annotated-images"] as const;

export const useUnannotatedImagesQuery = (
  id: number,
  offset: number = 0,
  limit: number = 50,
  options?: Omit<UseQueryOptions<GetImagesResponse, AxiosError>, "queryKey" | "queryFn">,
) => {
  return useQuery({
    queryKey: [...UNANNOTATED_IMAGES_QUERY_KEY, id, offset, limit],
    queryFn: async (): Promise<GetImagesResponse> => ({
      results: [],
      total: 0,
      offset,
      limit,
    }),
    enabled: !!id,
    ...options,
  });
};

export const useAnnotatedImagesQuery = (
  id: number,
  offset: number = 0,
  limit: number = 50,
  options?: Omit<UseQueryOptions<GetImagesResponse, AxiosError>, "queryKey" | "queryFn">,
) => {
  return useQuery({
    queryKey: [...ANNOTATED_IMAGES_QUERY_KEY, id, offset, limit],
    queryFn: async (): Promise<GetImagesResponse> => ({
      results: [],
      total: 0,
      offset,
      limit,
    }),
    enabled: !!id,
    ...options,
  });
};

export const IMAGE_DETAIL_QUERY_KEY = ["project", "image-detail"] as const;

export type ImageDetailQueryData = { data: { image?: Image } };

export const useImageDetailQuery = (
  roboflowProjectId: string,
  imageId: string,
  options?: Omit<UseQueryOptions<ImageDetailQueryData, AxiosError>, "queryKey" | "queryFn">,
) => {
  return useQuery({
    queryKey: [...IMAGE_DETAIL_QUERY_KEY, roboflowProjectId, imageId],
    queryFn: async (): Promise<ImageDetailQueryData> => ({
      data: { image: undefined },
    }),
    enabled: !!roboflowProjectId && !!imageId,
    ...options,
  });
};
