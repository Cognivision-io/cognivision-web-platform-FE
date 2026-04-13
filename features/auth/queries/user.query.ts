import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { userAPI } from "@/features/auth/api/user.api";
import type { AuthUser } from "@/types/auth.interface";

type UserQueryError = AxiosError<{
  detail?: string | unknown[];
  message?: string | string[];
}>;

export const USER_QUERY_KEY = ["user"] as const;

export const useUserQuery = (
  userId: string | undefined,
  options?: Omit<
    UseQueryOptions<AuthUser, UserQueryError>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: [...USER_QUERY_KEY, userId],
    queryFn: () => userAPI.getUser(userId as string),
    enabled: Boolean(userId),
    ...options,
  });
};
