export type PlanFeatures = {
  max_conversations?: number;
  priority_support?: boolean;
};

export type Plan = {
  id: string;
  name: string;
  display_name: string;
  description: string;
  monthly_token_limit: number;
  daily_token_limit: number | null;
  price_monthly: number;
  price_yearly: number | null;
  features: PlanFeatures;
  active: boolean;
  created_at: string;
  updated_at: string;
};
