import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type {
  UploadImagesPayload,
  UploadFolderPayload,
  UploadResponse,
} from "@/types/upload.interface";
import { handleMutationError } from "@/lib/handle-error";

type UploadError = AxiosError<{ message?: string | string[] }>;

async function rejectMutation(..._args: unknown[]): Promise<never> {
  void _args;
  throw new Error("Non-auth API is disabled.");
}

export const UPLOAD_IMAGES_MUTATION_KEY = ["project", "upload-images"] as const;
export const UPLOAD_FOLDER_MUTATION_KEY = ["project", "upload-folder"] as const;

export const useUploadImagesMutation = (
  options?: UseMutationOptions<UploadResponse, UploadError, UploadImagesPayload>,
) => {
  const { onError, ...rest } = options ?? {};
  return useMutation({
    mutationKey: UPLOAD_IMAGES_MUTATION_KEY,
    mutationFn: rejectMutation,
    ...rest,
    onError: (error, variables, onMutateResult, context) => {
      handleMutationError(error);
      onError?.(error, variables, onMutateResult, context);
    },
  });
};

export const useUploadFolderMutation = (
  options?: UseMutationOptions<UploadResponse, UploadError, UploadFolderPayload>,
) => {
  const { onError, ...rest } = options ?? {};
  return useMutation({
    mutationKey: UPLOAD_FOLDER_MUTATION_KEY,
    mutationFn: rejectMutation,
    ...rest,
    onError: (error, variables, onMutateResult, context) => {
      handleMutationError(error);
      onError?.(error, variables, onMutateResult, context);
    },
  });
};
