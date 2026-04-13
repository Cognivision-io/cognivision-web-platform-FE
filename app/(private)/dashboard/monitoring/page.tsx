"use client";

import { useMemo } from "react";
import {
  addMonths,
  differenceInCalendarDays,
  format,
  parseISO,
  startOfMonth,
} from "date-fns";

import { useDashboardMonoClass } from "@/features/dashboard/context/dashboard-mono-font";
import { MonitoringPageView } from "@/features/monitoring/components/monitoring-page/monitoring-page-view";
import { usePlansQuery } from "@/features/monitoring/queries/plan.query";
import { useCurrentUsageQuery } from "@/features/monitoring/queries/usage.query";

export default function MonitoringPage() {
  const monoClassName = useDashboardMonoClass();
  const { data: plans = [], isLoading: plansLoading } = usePlansQuery();
  const { data: usage, isLoading: usageLoading, isError: usageError } =
    useCurrentUsageQuery();

  const primaryPlan = useMemo(() => {
    const active = plans.filter((p) => p.active);
    return active.find((p) => p.name === "free") ?? active[0] ?? plans[0];
  }, [plans]);

  const planLabel = primaryPlan?.display_name ?? "Plan";

  const monthlyUsed = usage?.current_monthly_used ?? 0;
  const monthlyLimit = usage?.monthly_limit ?? 0;
  const monthlyPct = Math.min(
    100,
    Math.round(
      usage?.usage_percentage_monthly ??
        (monthlyLimit > 0 ? (monthlyUsed / monthlyLimit) * 100 : 0),
    ),
  );

  const dailyUsed = usage?.current_daily_used ?? 0;
  const dailyLimit = usage?.daily_limit ?? null;
  const hasDailyCap = dailyLimit != null && dailyLimit > 0;
  const dailyPct =
    usage?.usage_percentage_daily != null
      ? Math.min(100, Math.round(usage.usage_percentage_daily))
      : hasDailyCap
        ? Math.min(100, Math.round((dailyUsed / dailyLimit) * 100))
        : 0;

  const nextReset = useMemo(() => {
    if (usage?.month_start) {
      try {
        return addMonths(parseISO(usage.month_start), 1);
      } catch {
        /* fall through */
      }
    }
    return startOfMonth(addMonths(new Date(), 1));
  }, [usage?.month_start]);

  const resetLabel = format(nextReset, "MMMM d, yyyy");
  const daysUntilReset = differenceInCalendarDays(nextReset, new Date());

  const usageReady = !usageLoading && !usageError && usage;
  const failedCalls =
    usage?.failed_api_calls ?? usage?.failed_calls ?? usage?.monthly_failed_calls ?? null;
  const hasFailedCallsMetric = typeof failedCalls === "number" && Number.isFinite(failedCalls);

  return (
    <MonitoringPageView
      monoClassName={monoClassName}
      plansLoading={plansLoading}
      planLabel={planLabel}
      usageLoading={usageLoading}
      usageError={usageError}
      resetLabel={resetLabel}
      daysUntilReset={daysUntilReset}
      usageReady={Boolean(usageReady)}
      monthlyUsed={monthlyUsed}
      monthlyLimit={monthlyLimit}
      monthlyPct={monthlyPct}
      hasDailyCap={hasDailyCap}
      dailyUsed={dailyUsed}
      dailyLimit={dailyLimit}
      dailyPct={dailyPct}
      hasFailedCallsMetric={hasFailedCallsMetric}
      failedCalls={failedCalls}
    />
  );
}
