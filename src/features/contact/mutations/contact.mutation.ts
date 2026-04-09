import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import type {
  ContactUsPayload,
  ContactUsResponse,
} from "@/interfaces/contact.interface";

export type ContactError = AxiosError<{ message?: string | string[] }>;

export const CONTACT_US_MUTATION_KEY = ["contact", "contact-us"] as const;

async function rejectMutation(..._args: unknown[]): Promise<never> {
  void _args;
  throw new Error("Non-auth API is disabled.");
}

export const useContactUsMutation = (
  options?: UseMutationOptions<ContactUsResponse, ContactError, ContactUsPayload>,
) => {
  return useMutation({
    mutationKey: CONTACT_US_MUTATION_KEY,
    mutationFn: rejectMutation,
    ...options,
  });
};
