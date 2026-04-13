"use client";

import { Suspense, useEffect, type CSSProperties } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DM_Sans, DM_Mono } from "next/font/google";

import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { ErrorBoundary } from "@/components/providers/ErrorBoundary";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { DashboardMonoClassProvider } from "@/features/dashboard/context/dashboard-mono-font";
import { useAuthStore } from "@/stores/auth-store";
import { useSubscriptionModalStore } from "@/stores/subscription-modal-store";
import {
  isSubscriptionPlanKey,
  SubscriptionPlanKey,
} from "@/features/subscription/types";
import SubscriptionModal from "@/features/subscription/components/SubscriptionModal";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const sidebarLayoutStyle = {
  "--sidebar-width": "232px",
  "--sidebar-width-mobile": "min(100vw, 280px)",
} as CSSProperties;

function DashboardErrorFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#f4f7fe] px-6">
      <div className="max-w-md rounded-xl border border-[#e2e8f0] bg-white p-6 text-center shadow-sm">
        <h2 className="text-base font-semibold text-[#2b2b2b]">Something went wrong</h2>
        <p className="mt-2 text-sm text-[#64748b]">
          An unexpected dashboard error occurred. Please refresh the page and try again.
        </p>
      </div>
    </div>
  );
}

function UpgradePlanFromQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const openModal = useSubscriptionModalStore((state) => state.openModal);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const upgradePlanParam = searchParams.get("upgradePlan");

  useEffect(() => {
    if (!isHydrated || !upgradePlanParam) return;
    if (!isSubscriptionPlanKey(upgradePlanParam)) return;

    openModal(upgradePlanParam as SubscriptionPlanKey);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("upgradePlan");
    const query = params.toString();
    const targetPath = `${pathname}${query ? `?${query}` : ""}`;
    router.replace(targetPath, { scroll: false });
  }, [isHydrated, upgradePlanParam, openModal, pathname, router, searchParams]);

  return null;
}

function PrivateLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = Boolean(user) || Boolean(token);

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isHydrated, router]);

  if (!isHydrated || !isAuthenticated) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-foreground">
        <p className="text-sm text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className={`${dmSans.className} min-h-svh text-[#2b2b2b] antialiased`}>
      <DashboardMonoClassProvider monoClassName={dmMono.className}>
        <SidebarProvider
          defaultOpen
          style={sidebarLayoutStyle}
          className="h-svh min-h-0 overflow-hidden"
        >
          <AppSidebar />
          <SidebarInset className="flex h-svh min-h-0 min-w-0 flex-1 flex-col overflow-hidden border-0 bg-[#f4f7fe] p-0 shadow-none md:peer-data-[variant=inset]:m-0 md:peer-data-[variant=inset]:rounded-none">
            <DashboardHeader />
            <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
              <Suspense fallback={null}>
                <UpgradePlanFromQuery />
              </Suspense>
              {children}
            </div>
            <SubscriptionModal />
          </SidebarInset>
        </SidebarProvider>
      </DashboardMonoClassProvider>
    </div>
  );
}

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary fallback={<DashboardErrorFallback />}>
      <PrivateLayoutInner>{children}</PrivateLayoutInner>
    </ErrorBoundary>
  );
}
