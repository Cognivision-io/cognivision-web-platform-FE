import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import type {
  ContactUsPayload,
  ContactUsResponse,
} from "@/interfaces/contact.interface";
import { handleMutationError } from "@/lib/handle-error";

export type ContactError = AxiosError<{ message?: string | string[] }>;

export const CONTACT_US_MUTATION_KEY = ["contact", "contact-us"] as const;

async function rejectMutation(..._args: unknown[]): Promise<never> {
  void _args;
  throw new Error("Non-auth API is disabled.");
}

export const useContactUsMutation = (
  options?: UseMutationOptions<ContactUsResponse, ContactError, ContactUsPayload>,
) => {
  const { onError, ...rest } = options ?? {};
  return useMutation({
    mutationKey: CONTACT_US_MUTATION_KEY,
    mutationFn: rejectMutation,
    ...rest,
    onError: (error, variables, onMutateResult, context) => {
      handleMutationError(error);
      onError?.(error, variables, onMutateResult, context);
    },
  });
};
