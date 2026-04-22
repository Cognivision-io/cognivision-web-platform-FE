"use client";

import { AlertCircle, Clock } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { UsageTrendChart } from "@/features/monitoring/components/monitoring-page/usage-trend-chart";
import { cn } from "@/lib/utils";

type MonitoringPageViewProps = {
  monoClassName: string;
  plansLoading: boolean;
  planLabel: string;
  usageLoading: boolean;
  usageError: boolean;
  resetLabel: string;
  daysUntilReset: number;
  usageReady: boolean;
  monthlyUsed: number;
  monthlyLimit: number;
  monthlyPct: number;
  hasDailyCap: boolean;
  dailyUsed: number;
  dailyLimit: number | null;
  dailyPct: number;
  hasFailedCallsMetric: boolean;
  failedCalls: number | null;
};

export function MonitoringPageView({
  monoClassName,
  plansLoading,
  planLabel,
  usageLoading,
  usageError,
  resetLabel,
  daysUntilReset,
  usageReady,
  monthlyUsed,
  monthlyLimit,
  monthlyPct,
  hasDailyCap,
  dailyUsed,
  dailyLimit,
  dailyPct,
  hasFailedCallsMetric,
  failedCalls,
}: MonitoringPageViewProps) {
  return (
    <div className="bg-[#f4f7fe] px-4 py-6 md:px-7 md:py-8">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] font-medium uppercase tracking-[0.7px] text-[#94a3b8]">
            Current plan
          </p>
          <div className="flex items-center gap-2 text-[12px] font-normal text-[#94a3b8]">
            <Clock className="size-[13px] shrink-0 opacity-80" aria-hidden />
            <span>
              {usageLoading
                ? "Loading usage…"
                : usageError
                  ? "Usage unavailable"
                  : "Usage up to date"}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-1 rounded-[14px] border border-[#e2e8f0] bg-white px-6 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[13px] font-medium text-[#2b2b2b]">
              {plansLoading ? "Loading plan…" : planLabel}
            </p>
            <p className="text-[12px] font-normal text-[#94a3b8]">
              Resets on {resetLabel} · Billing cycle: monthly
            </p>
          </div>
          <div className="mt-2 inline-flex h-[26px] shrink-0 items-center gap-2 self-start rounded-full bg-[#ede9fb] px-3.5 sm:mt-0 sm:self-center">
            <span className="size-1.5 shrink-0 rounded-[3px] bg-[#5925dc]" aria-hidden />
            <span className="text-[12px] font-semibold text-[#5925dc]">Active</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-[14px] border border-[#e2e8f0] bg-white shadow-sm">
          <div className="px-6 pb-5 pt-5">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-[13.5px] font-medium text-[#2b2b2b]">API calls — this month</h3>
                <p className="text-[12px] font-normal text-[#94a3b8]">
                  Monthly · Resets in {Math.max(0, daysUntilReset)} days
                </p>
              </div>
              <div className="text-right sm:mt-0">
                <p
                  className={cn(
                    "text-[13px] font-medium tabular-nums text-[#2b2b2b]",
                    monoClassName,
                  )}
                >
                  {usageLoading ? (
                    <span className="text-[#94a3b8]">…</span>
                  ) : usageError ? (
                    <span className="text-[#94a3b8]">—</span>
                  ) : (
                    <>
                      {monthlyUsed.toLocaleString()} /{" "}
                      {monthlyLimit > 0 ? monthlyLimit.toLocaleString() : "—"}
                    </>
                  )}
                </p>
                <p className="text-[11.5px] font-normal text-[#94a3b8]">
                  {usageReady ? `${monthlyPct}% used` : "—"}
                </p>
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#f4f7fe]">
              <div
                className="h-full rounded-full bg-[#5925dc]"
                style={{
                  width: `${usageReady && monthlyLimit > 0 ? monthlyPct : 0}%`,
                }}
              />
            </div>
            <div className="mt-3 flex justify-between text-[11.5px]">
              <span className={cn("font-normal text-[#64748b]", monoClassName)}>
                {usageReady ? `${monthlyUsed.toLocaleString()} used` : "—"}
              </span>
              <span className={cn("font-normal text-[#94a3b8]", monoClassName)}>
                {usageReady && monthlyLimit > 0
                  ? `${monthlyLimit.toLocaleString()} limit`
                  : "—"}
              </span>
            </div>
          </div>

          <div className="border-t border-[#f1f5f9] bg-[#fafbfe] px-6 pb-5 pt-5">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[12.5px] font-normal text-[#64748b]">API calls — today</p>
                <p className="text-[11px] font-normal text-[#94a3b8]">Resets at midnight UTC</p>
              </div>
              <p
                className={cn(
                  "text-right text-[12px] font-medium tabular-nums text-[#64748b] sm:mt-0",
                  monoClassName,
                )}
              >
                {usageLoading ? (
                  <span className="font-normal text-[#94a3b8]">…</span>
                ) : usageError ? (
                  <span className="font-normal text-[#94a3b8]">—</span>
                ) : hasDailyCap ? (
                  <>
                    {dailyUsed.toLocaleString()} / {dailyLimit?.toLocaleString()}
                    <span className="font-normal text-[#94a3b8]"> · </span>
                    <span>{dailyPct}% used</span>
                  </>
                ) : (
                  <span className="font-normal text-[#94a3b8]">No daily cap</span>
                )}
              </p>
            </div>
            {!usageLoading && !usageError ? (
              <>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#f4f7fe]">
                  <div
                    className="h-full rounded-full bg-[#f59e0b]"
                    style={{ width: `${dailyPct}%` }}
                  />
                </div>
                <div className="mt-3 flex justify-between text-[11px]">
                  <span className={cn("font-normal text-[#64748b]", monoClassName)}>
                    {dailyUsed.toLocaleString()} used today
                  </span>
                  <span className={cn("font-normal text-[#94a3b8]", monoClassName)}>
                    {hasDailyCap ? `${dailyLimit?.toLocaleString()} daily limit` : "No daily limit"}
                  </span>
                </div>
              </>
            ) : null}
          </div>

          <div className="flex items-center gap-4 border-t border-[#f1f5f9] px-6 py-4">
            <div className="flex size-[34px] shrink-0 items-center justify-center rounded-[9px] bg-[#fef2f2]">
              <AlertCircle className="size-[15px] text-[#dc2626]" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-medium text-[#2b2b2b]">Failed API calls</p>
              <p className="text-[12px] font-normal text-[#94a3b8]">This month</p>
            </div>
            <p
              className={cn(
                "shrink-0 text-[22px] font-medium tracking-[-0.4px] text-[#dc2626]",
                monoClassName,
              )}
            >
              {hasFailedCallsMetric ? (
                failedCalls?.toLocaleString()
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-help text-[#94a3b8]">—</span>
                  </TooltipTrigger>
                  <TooltipContent>Coming soon</TooltipContent>
                </Tooltip>
              )}
            </p>
          </div>
        </div>

        <UsageTrendChart />
      </div>
    </div>
  );
}
