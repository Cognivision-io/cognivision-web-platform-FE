import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { contactApi } from "@/features/contact/api/contact.api";
import type {
  ContactUsPayload,
  ContactUsResponse,
} from "@/interfaces/contact.interface";

export type ContactError = AxiosError<{ message?: string | string[] }>;

export const CONTACT_US_MUTATION_KEY = ["contact", "contact-us"] as const;

export const useContactUsMutation = (
  options?: UseMutationOptions<ContactUsResponse, ContactError, ContactUsPayload>
) => {
  return useMutation({
    mutationKey: CONTACT_US_MUTATION_KEY,
    mutationFn: contactApi.submitContactUs,
    ...options,
  });
};

