export type ContactUsPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type ContactUsResponse = {
  message?: string;
};

