import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { projectApi } from "@/features/dataset/api/project.api";
import type {
  UploadImagesPayload,
  UploadFolderPayload,
  UploadResponse,
} from "@/interfaces/upload.interface";

type UploadError = AxiosError<{ message?: string | string[] }>;
export const UPLOAD_IMAGES_MUTATION_KEY = ["project", "upload-images"] as const;
export const UPLOAD_FOLDER_MUTATION_KEY = ["project", "upload-folder"] as const;

export const useUploadImagesMutation = (
  options?: UseMutationOptions<
    UploadResponse,
    UploadError,
    UploadImagesPayload
  >
) => {
  return useMutation({
    mutationKey: UPLOAD_IMAGES_MUTATION_KEY,
    mutationFn: projectApi.uploadImages,
    ...options,
  });
};

export const useUploadFolderMutation = (
  options?: UseMutationOptions<
    UploadResponse,
    UploadError,
    UploadFolderPayload
  >
) => {
  return useMutation({
    mutationKey: UPLOAD_FOLDER_MUTATION_KEY,
    mutationFn: projectApi.uploadFolder,
    ...options,
  });
};
