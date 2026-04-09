export type RegisterPayload = {
  firstName: string;
  email: string;
  password: string;
  useCase: string;
};

export type RegisterResponse = {
  statusCode: number;
  data: {
    otpCode: number;
    otpExpireAt: string;
  };
  message: string;
};
export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthTokens = {
  token: string;
  refreshToken?: string;
};

export type AuthenticatedUser = {
  id: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string | null;
  username: string | null;
  email: string;
  phone: string | null;
  dateOfBirth: string | null;
  country: string | null;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  otpCode: string | null;
  otpExpireAt: string | null;
  subscriptionType: string | null;
  useCase: string | null;
  subscriptionStartDate: string | null;
  subscriptionEndDate: string | null;
  isSubscribed: boolean;
  lastLoginAt: string | null;
  providerId: string | null;
  provider: string | null;
  profilePicture: string | null;
  hasReceivedSignupCredits: boolean;
  role: string | null;
  workspaces: number[];
  projects: number[];
  apiKeys: number[];
  subscriptionPlans: number[];
};

export type LoginResponse = {
  statusCode: number;
  data: {
    tokens: AuthTokens;
    user: AuthenticatedUser;
  };
  message: string;
};
export type AuthUserResponse = {
  statusCode: number;
  data: AuthenticatedUser;
  message: string;
};
export type UpdateUserPayload = {
  email: string;
  firstName?: string;
  lastName?: string | null;
};

export type UpdateUserResponse = AuthUserResponse;
export type VerifyOtpPayload = {
  code: number;
};

export type VerifyOtpResponse = {
  statusCode: number;
  data: {
    tokens: AuthTokens;
  };
  message: string;
};

export type ResendOtpPayload = {
  email: string;
};

export type ResendOtpResponse = {
  statusCode: number;
  message: string;
};
