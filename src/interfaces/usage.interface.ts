/** GET /usage/current */
export type CurrentUsage = {
  user_id: string;
  current_monthly_used: number;
  current_daily_used: number;
  monthly_limit: number;
  daily_limit: number | null;
  month_start: string;
  day_start: string;
  usage_percentage_monthly: number;
  usage_percentage_daily: number | null;
};
