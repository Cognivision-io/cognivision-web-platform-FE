export type SubscriptionPlanKey = "public" | "core" | "enterprise";

export const SUBSCRIPTION_PLAN_KEYS: SubscriptionPlanKey[] = [
  "public",
  "core",
  "enterprise",
];

export const isSubscriptionPlanKey = (
  value: string | null
): value is SubscriptionPlanKey => {
  return value !== null && SUBSCRIPTION_PLAN_KEYS.includes(value as SubscriptionPlanKey);
};
