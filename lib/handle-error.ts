import CustomToast from "@/components/ui/sonner";

import { normaliseApiError } from "@/lib/api-error";

export function handleMutationError(error: unknown): void {
  const message = normaliseApiError(error);

  if (Array.isArray(message)) {
    message.forEach((item) => CustomToast.error(item));
    return;
  }

  CustomToast.error(message);
}
