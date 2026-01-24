"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuthStore } from "@/stores/auth-store";
import { useSubscriptionModalStore } from "@/stores/subscription-modal-store";
import {
  isSubscriptionPlanKey,
  SubscriptionPlanKey,
} from "@/features/subscription/types";
import SubscriptionModal from "@/features/subscription/components/SubscriptionModal";

function PrivateLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const openModal = useSubscriptionModalStore((state) => state.openModal);
  const upgradePlanParam = searchParams.get("upgradePlan");

  const isHydrated = useAuthStore((state) => state.isHydrated);
  const isAuthenticated = useAuthStore((state) => Boolean(state.user));

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isHydrated, router]);

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

  if (!isHydrated || !isAuthenticated) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-foreground">
        <p className="text-sm text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 border-b bg-background">
            <div className="flex h-14 items-center px-6">
              <SidebarTrigger />
            </div>
          </header>
          <main className="min-w-0 flex-1 overflow-auto bg-[#f5f7ff]">
            {children}
          </main>
        </div>
      </div>
      <SubscriptionModal />
    </SidebarProvider>
  );
}

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center bg-background text-foreground">
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      }
    >
      <PrivateLayoutInner>{children}</PrivateLayoutInner>
    </Suspense>
  );
}
