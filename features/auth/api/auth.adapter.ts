import type { AxiosResponse } from "axios";

import { isApiEnvelope, unwrapEnvelope } from "@/lib/api-adapter";
import type { ApiEnvelope } from "@/lib/api-envelope";
import type {
  AuthTokens,
  AuthUser,
  ForgetPasswordResponse,
  LoginResponse,
  RegisterResponse,
} from "@/types/auth.interface";

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isAuthUser = (value: unknown): value is AuthUser =>
  isObject(value) && "id" in value && "email" in value;

const isAuthTokens = (value: unknown): value is AuthTokens =>
  isObject(value) && "access_token" in value && "refresh_token" in value;

const isAuthSession = (value: unknown): value is LoginResponse | RegisterResponse =>
  isObject(value) &&
  "user" in value &&
  "tokens" in value &&
  isAuthUser(value.user) &&
  isAuthTokens(value.tokens);

const hasMessage = (value: unknown): value is { message: string } =>
  isObject(value) && "message" in value && typeof value.message === "string";

export const authAdapter = {
  toAuthSession: (
    response: AxiosResponse<
      ApiEnvelope<LoginResponse | RegisterResponse> | LoginResponse | RegisterResponse
    >,
  ) => unwrapEnvelope(response, isAuthSession, "Invalid auth session response"),
  toAuthUser: (response: AxiosResponse<ApiEnvelope<AuthUser> | AuthUser>) =>
    unwrapEnvelope(response, isAuthUser, "Invalid user response"),
  toForgetPasswordResponse: (
    response: AxiosResponse<ApiEnvelope<null> | ForgetPasswordResponse>,
  ): ForgetPasswordResponse => {
    const body = response.data as unknown;

    if (hasMessage(body)) {
      return { message: body.message };
    }

    if (isApiEnvelope<null>(body) && typeof body.message === "string") {
      return { message: body.message };
    }

    throw new Error("Invalid forget password response");
  },
};
