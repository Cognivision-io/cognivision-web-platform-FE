"use client";

import { ArrowUpRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useDashboardMonoClass } from "@/features/dashboard/context/dashboard-mono-font";
import { usePlansQuery } from "@/features/monitoring/queries/plan.query";
import { useCurrentUsageQuery } from "@/features/monitoring/queries/usage.query";
import { useSubscriptionModalStore } from "@/stores/subscription-modal-store";
import { cn } from "@/lib/utils";

export default function BillingPage() {
  const monoClassName = useDashboardMonoClass();
  const openModal = useSubscriptionModalStore((state) => state.openModal);
  const { data: plans = [], isLoading, isError } = usePlansQuery();
  const {
    data: usage,
    isLoading: usageLoading,
    isError: usageError,
  } = useCurrentUsageQuery();

  const plan = plans.find((p) => p.active) ?? plans[0];
  const isFreeTier = plan?.name.toLowerCase() === "free";

  const monthlyUsed = usage?.current_monthly_used ?? 0;
  const tokenLimit = usage?.monthly_limit ?? 0;
  const tokenPct = Math.min(
    100,
    Math.round(
      usage?.usage_percentage_monthly ??
        (tokenLimit > 0 ? (monthlyUsed / tokenLimit) * 100 : 0),
    ),
  );

  return (
    <div className="bg-[#f4f7fe] px-4 py-6 md:px-8 md:py-6">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6">
        <section className="rounded-[14px] border border-[#e2e8f0] bg-white shadow-sm">
          <div className="border-b border-[#f1f5f9] px-8 pb-8 pt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-[12px] font-medium uppercase tracking-[0.5px] text-[#94a3b8]">
                  Current Plan
                </p>
                <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.5px] text-[#2b2b2b]">
                  {isLoading
                    ? "Loading…"
                    : isError
                      ? "Could not load plan"
                      : (plan?.display_name ?? "No plan")}
                </h1>
                <p className="mt-1 max-w-xl text-[14px] font-normal leading-[1.55] text-[#94a3b8]">
                  {isError
                    ? "Try again later."
                    : (plan?.description ?? "No description from API.")}
                </p>
              </div>
              {plan ? (
                <span
                  className={cn(
                    "inline-flex h-[26.4px] shrink-0 items-center justify-center self-start rounded-full px-3 text-[11px] font-medium uppercase tracking-[0.3px] text-white sm:self-auto",
                    plan.active ? "bg-[#5925dc]" : "bg-[#94a3b8]",
                  )}
                >
                  {plan.active ? "Active" : "Inactive"}
                </span>
              ) : null}
            </div>
          </div>

          {plan ? (
            <div className="px-8 pb-6 pt-2">
              <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                {[
                  `${plan.monthly_token_limit.toLocaleString()} tokens per month`,
                  ...(plan.daily_token_limit != null && plan.daily_token_limit > 0
                    ? [
                        `${plan.daily_token_limit.toLocaleString()} tokens per day`,
                      ]
                    : []),
                  ...(plan.features.max_conversations != null
                    ? [
                        `Up to ${plan.features.max_conversations} conversations`,
                      ]
                    : []),
                  plan.features.priority_support
                    ? "Priority support"
                    : "Standard support",
                ].map((label) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[#ede9fb] text-[#5925dc]">
                      <Check className="size-3.5 stroke-[2.5]" aria-hidden />
                    </span>
                    <span className="text-[13.5px] font-normal leading-snug text-[#2b2b2b]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : !isLoading && !isError ? (
            <div className="px-8 pb-8 pt-2 text-[13px] text-[#94a3b8]">
              No plans returned from the API.
            </div>
          ) : null}

          {plan && isFreeTier ? (
            <div className="mx-8 mb-8 rounded-[10px] border border-[#d8ccf5] bg-[#ede9fb] px-5 py-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-[#5925dc]">Ready for more?</p>
                  <p className="mt-1 max-w-xl text-[13px] font-normal leading-relaxed text-[#7c5dc9]">
                    Unlock unlimited sessions, priority support, and advanced features with Pro
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => openModal("core")}
                  className="h-[36.4px] shrink-0 gap-2 rounded-[7px] bg-[#5925dc] px-5 text-[13px] font-medium text-white hover:bg-[#5925dc]/90"
                >
                  <ArrowUpRight className="size-[15px]" aria-hidden />
                  Upgrade to Pro
                </Button>
              </div>
            </div>
          ) : null}
        </section>

        <section className="rounded-[14px] border border-[#e2e8f0] bg-white shadow-sm">
          <div className="border-b border-[#f1f5f9] px-8 pb-5 pt-8">
            <h2 className="text-[18px] font-semibold tracking-[-0.3px] text-[#2b2b2b]">
              Usage vs Limits
            </h2>
            <p className="mt-1 text-[13px] font-normal text-[#94a3b8]">
              Current month usage against your plan limits
            </p>
          </div>

          <div className="px-8 pb-8 pt-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-[14px] font-medium text-[#2b2b2b]">Token Usage</span>
              <p className={cn("text-right text-[13px] tabular-nums", monoClassName)}>
                {usageLoading ? (
                  <span className="font-normal text-[#94a3b8]">Loading…</span>
                ) : usageError ? (
                  <span className="font-normal text-[#94a3b8]">Could not load usage</span>
                ) : (
                  <>
                    <span className="font-medium text-[#2b2b2b]">
                      {monthlyUsed.toLocaleString()}
                    </span>
                    <span className="font-normal text-[#94a3b8]">
                      {" "}
                      / {tokenLimit > 0 ? tokenLimit.toLocaleString() : "—"}
                    </span>
                  </>
                )}
              </p>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-xl bg-[#f1f5f9]">
              <div
                className="h-full rounded-xl bg-gradient-to-r from-[#5925dc] to-[#7c5dc9]"
                style={{
                  width: `${
                    !usageLoading && !usageError && tokenLimit > 0
                      ? Math.min(100, tokenPct)
                      : 0
                  }%`,
                }}
              />
            </div>
            <p className="mt-2 text-[11px] font-medium text-[#94a3b8]">
              {!usageLoading && !usageError && tokenLimit > 0
                ? `${tokenPct}% of limit used`
                : usageError
                  ? "—"
                  : usageLoading
                    ? "…"
                    : "—"}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
