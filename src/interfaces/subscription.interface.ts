export type BillingCycle = "monthly" | "annual";

export type CreateSubscriptionPayload = {
  name: string;
  description: string;
  price: number;
  billingCycle: BillingCycle;
  status: boolean;
  order: number;
};

export type SubscriptionPlan = {
  id: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  price: string;
  currency: string;
  billingCycle: BillingCycle;
  order: number;
  status: boolean;
  createdBy: number;
};

export type CreateSubscriptionResponse = {
  statusCode: number;
  data: SubscriptionPlan;
  message: string;
};

export type GetSubscriptionResponse = CreateSubscriptionResponse;
