"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { Bell, Mail, Search } from "lucide-react";
import { format } from "date-fns";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuthStore } from "@/stores/auth-store";
import { cn } from "@/lib/utils";
import { useDashboardMonoClass } from "@/features/dashboard/context/dashboard-mono-font";

type DashboardHeaderProps = {
  monoClassName?: string;
};

export function DashboardHeader({ monoClassName: monoProp }: DashboardHeaderProps) {
  const pathname = usePathname();
  const monoFromCtx = useDashboardMonoClass();
  const monoClassName = monoProp ?? monoFromCtx;
  const user = useAuthStore((state) => state.user);
  const searchRef = useRef<HTMLInputElement>(null);
  const isMonitoring = pathname.startsWith("/dashboard/monitoring");
  const isApiKeys = pathname.startsWith("/dashboard/api-keys");
  const isBilling = pathname.startsWith("/dashboard/billing");
  const isSettings = pathname.startsWith("/dashboard/settings");
  const isContextHeader = isMonitoring || isApiKeys || isBilling || isSettings;
  const isCompactSearch = isApiKeys || isBilling || isSettings;

  const displayName = user?.firstName?.trim() || "there";
  const initials = useMemo(() => {
    const first = user?.firstName?.charAt(0) ?? "";
    const last = user?.lastName?.charAt(0) ?? "";
    const pair = `${first}${last}`.toUpperCase();
    if (pair.length >= 2) return pair.slice(0, 2);
    if (first) return `${first}${first}`.toUpperCase().slice(0, 2);
    return "U";
  }, [user?.firstName, user?.lastName]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const todayLabel = format(new Date(), "EEEE, MMMM dd, yyyy");

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex shrink-0 items-center justify-between gap-4 border-b border-[#e2e8f0] bg-white px-4 md:px-7",
        isContextHeader ? "h-[73px]" : "h-[69px]",
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <SidebarTrigger className="md:hidden" />
        <div className="min-w-0">
          {isMonitoring ? (
            <>
              <p className="truncate text-[17px] font-semibold leading-tight tracking-[-0.3px] text-[#2b2b2b]">
                Monitoring
              </p>
              <p className="truncate text-[12px] font-normal leading-tight text-[#94a3b8]">
                Usage & error tracking
              </p>
            </>
          ) : isApiKeys ? (
            <>
              <p className="truncate text-[18px] font-semibold leading-tight tracking-[-0.3px] text-[#2b2b2b]">
                API Keys
              </p>
              <p className="truncate text-[13px] font-normal leading-tight text-[#94a3b8]">
                Manage your SDK credentials
              </p>
            </>
          ) : isBilling ? (
            <>
              <p className="truncate text-[17px] font-semibold leading-tight tracking-[-0.3px] text-[#2b2b2b]">
                Billing
              </p>
              <p className="truncate text-[12px] font-normal leading-tight text-[#94a3b8]">
                Plan and payment details
              </p>
            </>
          ) : isSettings ? (
            <>
              <p className="truncate text-[18px] font-semibold leading-tight tracking-[-0.3px] text-[#2b2b2b]">
                Settings
              </p>
              <p className="truncate text-[13px] font-normal leading-tight text-[#94a3b8]">
                Account preferences
              </p>
            </>
          ) : (
            <>
              <p className="truncate text-[17px] font-semibold leading-tight tracking-[-0.3px] text-[#2b2b2b]">
                Welcome back, {displayName}{" "}
                <span className="inline-block" aria-hidden>
                  👋
                </span>
              </p>
              <p className="truncate text-[12px] font-normal leading-tight text-[#94a3b8]">
                {todayLabel}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative hidden h-[34px] w-[210px] items-center rounded-lg border border-[#e2e8f0] bg-[#f4f7fe] sm:flex">
          <Search
            className="pointer-events-none absolute left-3 size-[14px] text-[#94a3b8]"
            aria-hidden
          />
          <input
            ref={searchRef}
            type="search"
            placeholder={isCompactSearch ? "Search" : "Search…"}
            className="h-full w-full rounded-lg bg-transparent pl-[33px] pr-[52px] text-[13px] text-[#2b2b2b] placeholder:text-[#94a3b8] outline-none focus-visible:ring-2 focus-visible:ring-[#5925dc]/25"
            aria-label={
              isMonitoring
                ? "Search monitoring"
                : isCompactSearch
                  ? "Search"
                  : "Search dashboard"
            }
          />
          <kbd
            className={cn(
              "pointer-events-none absolute right-2 top-1/2 hidden h-[18.4px] w-7 -translate-y-1/2 items-center justify-center rounded border border-[#e2e8f0] bg-white font-mono text-[10px] text-[#94a3b8] md:inline-flex",
              monoClassName,
            )}
          >
            {isCompactSearch ? "⌘K" : "⌘ K"}
          </kbd>
        </div>

        <button
          type="button"
          className="relative flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#64748b] transition-colors hover:bg-[#f8fafc]"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          <span className="absolute right-1 top-1 size-[7px] rounded-[3.5px] border border-white bg-[#ef4444]" />
        </button>

        {!isCompactSearch ? (
          <button
            type="button"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#64748b] transition-colors hover:bg-[#f8fafc]"
            aria-label="Messages"
          >
            <Mail className="size-4" />
          </button>
        ) : null}

        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full bg-[#5925dc] text-[13px] font-semibold text-white",
          )}
          aria-hidden
        >
          {initials}
        </div>
      </div>
    </header>
  );
}
