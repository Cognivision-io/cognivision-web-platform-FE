"use client";

import { format } from "date-fns";
import { Activity, ChevronDown, CreditCard, TrendingUp } from "lucide-react";

import { DashboardStatCard } from "@/features/dashboard/components/dashboard-page/stat-card";
import { TokenUsageChart } from "@/features/dashboard/components/dashboard-page/token-usage-chart";
import { useDashboardMonoClass } from "@/features/dashboard/context/dashboard-mono-font";
import { useCurrentUsageQuery } from "@/features/monitoring/queries/usage.query";
import { usePlansQuery } from "@/features/monitoring/queries/plan.query";
import { useSubscriptionModalStore } from "@/store/subscription-modal-store";
import { cn } from "@/lib/utils";

const MODEL_ROWS = [
  {
    id: "1",
    name: "cogni-model-1",
    count: "32,145",
    pct: 67,
    barClass: "bg-gradient-to-r from-[#5925dc] to-[#7c5dc9]",
    caption: "67% of total usage",
  },
  {
    id: "2",
    name: "cogni-advanced-model-2",
    count: "16,146",
    pct: 33,
    barClass: "bg-gradient-to-r from-[#64748b] to-[#94a3b8]",
    caption: "33% of total usage",
  },
] as const;

const ACTIVITY = [
  { id: "a1", dot: "bg-[#5925dc]", label: "API request processed", time: "2 min ago" },
  { id: "a2", dot: "bg-[#10b981]", label: "Session initialized", time: "5 min ago" },
  { id: "a3", dot: "bg-[#3b82f6]", label: "Model inference completed", time: "12 min ago" },
  { id: "a4", dot: "bg-[#f59e0b]", label: "Data processed", time: "18 min ago" },
] as const;

export default function DashboardPage() {
  const monoClassName = useDashboardMonoClass();
  const { data: plans = [], isLoading: plansLoading } = usePlansQuery();
  const { data: usage, isLoading: usageLoading, isError: usageError } =
    useCurrentUsageQuery();
  const openModal = useSubscriptionModalStore((state) => state.openModal);

  const primaryPlan = plans.find((plan) => plan.active) ?? plans[0];
  const planLabel = primaryPlan?.display_name ?? "Free";

  const monthLabel = format(new Date(), "MMMM yyyy");
  const monthlyUsed = usage?.current_monthly_used ?? null;
  const dailyUsed = usage?.current_daily_used ?? null;

  return (
    <div className="bg-[#f4f7fe] px-4 py-6 md:px-7 md:py-8">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] font-medium uppercase tracking-[0.7px] text-[#94a3b8]">
            Overview
          </p>
          <button
            type="button"
            className="flex items-center gap-1.5 self-start text-[12px] font-normal text-[#94a3b8] sm:self-auto"
          >
            {monthLabel}
            <ChevronDown className="size-[13px] opacity-70" aria-hidden />
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <DashboardStatCard
            icon={<Activity className="size-[18px] text-[#5925dc]" aria-hidden />}
            label="Total API calls this month"
            value={
              usageLoading
                ? "…"
                : usageError || monthlyUsed == null
                  ? "—"
                  : monthlyUsed.toLocaleString()
            }
            monoClassName={monoClassName}
            trend={
              <span className="inline-flex items-center gap-1.5">
                <span className="text-[12px] font-normal text-[#94a3b8]">
                  {usageLoading
                    ? "Loading from usage API…"
                    : usageError
                      ? "Usage unavailable"
                      : "Live usage API"}
                </span>
              </span>
            }
          />
          <DashboardStatCard
            icon={<TrendingUp className="size-[18px] text-[#5925dc]" aria-hidden />}
            label="Total API calls today"
            value={
              usageLoading
                ? "…"
                : usageError || dailyUsed == null
                  ? "—"
                  : dailyUsed.toLocaleString()
            }
            monoClassName={monoClassName}
            trend={
              <span className="inline-flex items-center gap-1.5">
                <span className="text-[12px] font-normal text-[#94a3b8]">
                  {usageLoading
                    ? "Loading from usage API…"
                    : usageError
                      ? "Usage unavailable"
                      : "Live usage API"}
                </span>
              </span>
            }
          />
          <DashboardStatCard
            icon={<CreditCard className="size-[18px] text-[#5925dc]" aria-hidden />}
            label="Current plan"
            value={planLabel}
            valueSize="lg"
            monoClassName={monoClassName}
            trend={
              <span className="flex flex-wrap items-center gap-2">
                <span className="inline-flex h-[22px] items-center rounded-full bg-[#ede9fb] px-2.5 text-[12px] font-medium text-[#5925dc]">
                  {plansLoading ? "Loading…" : "Active"}
                </span>
                <button
                  type="button"
                  onClick={() => openModal("core")}
                  className="text-[12px] font-medium text-[#5925dc] hover:underline"
                >
                  Upgrade →
                </button>
              </span>
            }
          />
        </div>

        <TokenUsageChart />

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-[10px] border border-[#e2e8f0] bg-white p-5 shadow-sm lg:rounded-[7.68px]">
            <h3 className="text-[14px] font-semibold text-[#2b2b2b]">Model Usage</h3>
            <p className="mt-0.5 text-[10.5px] font-normal leading-snug text-[#94a3b8]">
              Most used AI models this month
            </p>
            <ul className="mt-5 space-y-8">
              {MODEL_ROWS.map((row) => (
                <li key={row.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span
                      className={cn(
                        "text-[11.8px] font-medium leading-none text-[#2b2b2b]",
                        monoClassName,
                      )}
                    >
                      {row.name}
                    </span>
                    <span
                      className={cn(
                        "text-[11.4px] font-normal leading-none text-[#94a3b8]",
                        monoClassName,
                      )}
                    >
                      {row.count}
                    </span>
                  </div>
                  <div className="mt-2 h-[6.8px] overflow-hidden rounded-[7px] bg-[#f1f5f9]">
                    <div
                      className={cn("h-full rounded-[7px]", row.barClass)}
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                  <p className="mt-2 text-[9.6px] font-normal text-[#94a3b8]">{row.caption}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[10px] border border-[#e2e8f0] bg-white p-5 shadow-sm lg:rounded-[7.68px]">
            <h3 className="text-[14px] font-semibold text-[#2b2b2b]">Recent Activity</h3>
            <p className="mt-0.5 text-[9.2px] font-normal leading-snug text-[#94a3b8]">
              Latest SDK interactions
            </p>
            <ul className="mt-6 space-y-5">
              {ACTIVITY.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  <span
                    className={cn("mt-1.5 h-[6px] w-[6px] shrink-0 rounded-full", item.dot)}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10.4px] font-normal leading-tight text-[#2b2b2b]">
                      {item.label}
                    </p>
                  </div>
                  <span className="shrink-0 text-[10px] font-normal text-[#94a3b8]">
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
