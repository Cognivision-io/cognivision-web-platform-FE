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
