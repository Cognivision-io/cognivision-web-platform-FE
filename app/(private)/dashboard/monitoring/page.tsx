"use client";

import { addMonths, differenceInCalendarDays, format, startOfMonth } from "date-fns";
import { AlertCircle, Clock } from "lucide-react";

import { useDashboardMonoClass } from "@/features/dashboard/context/dashboard-mono-font";
import { UsageTrendChart } from "@/features/monitoring/components/monitoring-page/usage-trend-chart";
import { useAuthStore } from "@/stores/auth-store";
import { cn } from "@/lib/utils";

const MONTHLY_USED = 48_291;
const MONTHLY_LIMIT = 75_000;
const DAILY_USED = 1_630;
const DAILY_LIMIT = 2_500;
const FAILED_CALLS = 247;
const MONTHLY_PCT = Math.round((MONTHLY_USED / MONTHLY_LIMIT) * 100);
const DAILY_PCT = Math.round((DAILY_USED / DAILY_LIMIT) * 100);

export default function MonitoringPage() {
  const monoClassName = useDashboardMonoClass();
  const user = useAuthStore((state) => state.user);

  const planName = user?.isSubscribed ? "Pro" : "Free";
  const nextReset = startOfMonth(addMonths(new Date(), 1));
  const resetLabel = format(nextReset, "MMMM d, yyyy");
  const daysUntilReset = differenceInCalendarDays(nextReset, new Date());

  return (
    <div className="bg-[#f4f7fe] px-4 py-6 md:px-7 md:py-8">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] font-medium uppercase tracking-[0.7px] text-[#94a3b8]">
            Plan usage limits
          </p>
          <div className="flex items-center gap-2 text-[12px] font-normal text-[#94a3b8]">
            <Clock className="size-[13px] shrink-0 opacity-80" aria-hidden />
            <span>Last updated: less than a minute ago</span>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-1 rounded-[14px] border border-[#e2e8f0] bg-white px-6 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[13px] font-medium text-[#2b2b2b]">
              {planName} Plan — usage limits
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
                <h3 className="text-[13.5px] font-medium text-[#2b2b2b]">Token Usage</h3>
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
                  {MONTHLY_USED.toLocaleString()} / {MONTHLY_LIMIT.toLocaleString()}
                </p>
                <p className="text-[11.5px] font-normal text-[#94a3b8]">{MONTHLY_PCT}% used</p>
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#f4f7fe]">
              <div
                className="h-full rounded-full bg-[#5925dc]"
                style={{ width: `${MONTHLY_PCT}%` }}
              />
            </div>
            <div className="mt-3 flex justify-between text-[11.5px]">
              <span className={cn("font-normal text-[#64748b]", monoClassName)}>
                {MONTHLY_USED.toLocaleString()} requests
              </span>
              <span className={cn("font-normal text-[#94a3b8]", monoClassName)}>
                {MONTHLY_LIMIT.toLocaleString()} limit
              </span>
            </div>
          </div>

          <div className="border-t border-[#f1f5f9] bg-[#fafbfe] px-6 pb-5 pt-5">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[12.5px] font-normal text-[#64748b]">Token usage — today</p>
                <p className="text-[11px] font-normal text-[#94a3b8]">Resets at midnight UTC</p>
              </div>
              <p
                className={cn(
                  "text-right text-[12px] font-medium tabular-nums text-[#64748b] sm:mt-0",
                  monoClassName,
                )}
              >
                {DAILY_USED.toLocaleString()} / {DAILY_LIMIT.toLocaleString()}
                <span className="font-normal text-[#94a3b8]"> · </span>
                <span>{DAILY_PCT}% used</span>
              </p>
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#f4f7fe]">
              <div
                className="h-full rounded-full bg-[#f59e0b]"
                style={{ width: `${DAILY_PCT}%` }}
              />
            </div>
            <div className="mt-3 flex justify-between text-[11px]">
              <span className={cn("font-normal text-[#64748b]", monoClassName)}>
                {DAILY_USED.toLocaleString()} used today
              </span>
              <span className={cn("font-normal text-[#94a3b8]", monoClassName)}>
                {DAILY_LIMIT.toLocaleString()} daily limit
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t border-[#f1f5f9] px-6 py-4">
            <div className="flex size-[34px] shrink-0 items-center justify-center rounded-[9px] bg-[#fef2f2]">
              <AlertCircle className="size-[15px] text-[#dc2626]" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-medium text-[#2b2b2b]">Failed API calls</p>
              <p className="text-[12px] font-normal text-[#94a3b8]">
                This month · last error 12 min ago
              </p>
            </div>
            <p
              className={cn(
                "shrink-0 text-[22px] font-medium tracking-[-0.4px] text-[#dc2626]",
                monoClassName,
              )}
            >
              {FAILED_CALLS.toLocaleString()}
            </p>
          </div>
        </div>

        <UsageTrendChart />
      </div>
    </div>
  );
}
