export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
};

/** Access tokens returned by auth endpoints */
export type AuthTokens = {
  access_token: string;
  refresh_token: string;
  type: string;
  expires_in: number;
};

/** User object returned by the API */
export type AuthUser = {
  id: string;
  email: string;
  name: string;
  active: boolean;
  verified: boolean;
  created_at: string;
  updated_at: string;
};

/**
 * Session user: API shape plus optional fields for UI/subscription until the API provides them.
 */
export type AuthenticatedUser = AuthUser & {
  isSubscribed?: boolean;
  subscriptionType?: string | null;
  workspaces?: number[];
};

export type RegisterResponse = {
  user: AuthUser;
  tokens: AuthTokens;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: AuthUser;
  tokens: AuthTokens;
};

export type AuthUserResponse = {
  user: AuthUser;
};

export type UpdateUserPayload = {
  email: string;
  name: string;
  active: boolean;
  /** Include when changing password */
  current_password?: string;
  new_password?: string;
};

export type UpdateUserResponse = AuthUser;

export type VerifyOtpPayload = {
  code: number;
};

export type VerifyOtpResponse = {
  tokens: AuthTokens;
};

export type ResendOtpPayload = {
  email: string;
};

export type ResendOtpResponse = {
  message?: string;
};
