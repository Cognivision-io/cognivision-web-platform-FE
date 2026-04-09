"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  CreditCard,
  KeyRound,
  LayoutDashboard,
  LineChart,
  LogOut,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { useLogoutMutation } from "@/features/auth/mutations/auth.mutation";
import { useSubscriptionModalStore } from "@/stores/subscription-modal-store";
import CustomToast from "@/components/ui/sonner";

type NavLinkConfig = {
  title: string;
  href: string;
  icon: LucideIcon;
};

type NavSection = {
  label: string;
  items: NavLinkConfig[];
};

const NAV_SECTIONS: NavSection[] = [
  {
    label: "Main",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { title: "Monitoring", href: "/dashboard/monitoring", icon: LineChart },
    ],
  },
  {
    label: "Developer",
    items: [{ title: "API Keys", href: "/dashboard/api-keys", icon: KeyRound }],
  },
  {
    label: "Account",
    items: [
      { title: "Billing", href: "/dashboard/billing", icon: CreditCard },
      {
        title: "Settings",
        href: "/dashboard/settings/login-security",
        icon: Settings,
      },
    ],
  },
];

function routeIsActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinkRow({
  href,
  icon: Icon,
  title,
  active,
}: NavLinkConfig & { active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex h-9 items-center gap-2 rounded-[7px] px-2.5 transition-colors",
        active
          ? "bg-[#ede9fb] text-[#5925dc]"
          : "text-[#64748b] hover:bg-[#f8fafc]",
      )}
    >
      {active ? (
        <span
          className="absolute bottom-1.5 left-0 top-1.5 w-[3px] rounded-br-[3px] rounded-tr-[3px] bg-[#5925dc]"
          aria-hidden
        />
      ) : null}
      <Icon
        className={cn("size-[17px] shrink-0", active ? "text-[#5925dc]" : "text-[#64748b] opacity-70")}
        aria-hidden
      />
      <span
        className={cn(
          "min-w-0 flex-1 truncate text-left text-[13.5px] leading-tight",
          active ? "font-medium" : "font-normal",
        )}
      >
        {title}
      </span>
    </Link>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const openModal = useSubscriptionModalStore((state) => state.openModal);
  const { mutateAsync: triggerLogout, isPending: isLoggingOut } = useLogoutMutation();

  const handleLogout = async () => {
    if (isLoggingOut) return;
    try {
      await triggerLogout();
      logout();
      CustomToast.success("Signed out successfully");
      router.replace("/login");
    } catch (error) {
      console.error("Failed to sign out", error);
      CustomToast.error("Failed to sign out. Please try again.");
    }
  };

  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r border-[#e2e8f0] bg-white [&_[data-sidebar=sidebar]]:bg-white"
    >
      <SidebarContent className="flex h-full flex-col gap-0 overflow-hidden p-0">
        <div className="flex h-[73px] shrink-0 flex-col justify-center border-b border-[#e2e8f0] px-3">
          <Link href="/" className="flex items-center gap-3 px-1 py-1">
            <div className="flex size-[39px] shrink-0 items-center justify-center overflow-hidden rounded-[6.5px] bg-[#ecf0ff]">
              <img src="/logo.svg" alt="" className="size-7 object-contain" />
            </div>
            <div className="min-w-0 text-left leading-tight">
              <p className="truncate text-[15px] font-semibold tracking-[-0.3px] text-[#2b2b2b]">
                Cognivision
              </p>
              <p className="truncate text-[11px] font-normal text-[#94a3b8]">Developer Portal</p>
            </div>
          </Link>
        </div>

        <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 pb-4 pt-4">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label} className="mb-5 last:mb-0">
              <p className="mb-2.5 px-2 text-[10px] font-medium uppercase tracking-[0.8px] text-[#94a3b8]">
                {section.label}
              </p>
              <div className="flex flex-col gap-1">
                {section.items.map((item) => {
                  const active = routeIsActive(pathname, item.href);
                  return (
                    <NavLinkRow
                      key={item.href}
                      href={item.href}
                      icon={item.icon}
                      title={item.title}
                      active={active}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="shrink-0 border-t border-[#e2e8f0] px-3 pb-5 pt-3">
          <div className="rounded-[10px] bg-[#ede9fb] p-3.5 pt-3">
            <p className="text-[12px] font-semibold text-[#5925dc]">
              {user?.isSubscribed ? "Pro Plan" : "Free Plan"}
            </p>
            <p className="mt-1.5 text-[11.5px] font-normal leading-snug text-[#7c5dc9]">
              {user?.isSubscribed
                ? "Thank you for your subscription."
                : "5,000 sessions/month included"}
            </p>
            <button
              type="button"
              onClick={() => openModal("core")}
              className="mt-3 flex h-8 w-full items-center justify-center rounded-[7px] bg-[#5925dc] text-[12.5px] font-medium text-white transition-colors hover:bg-[#5925dc]/90"
            >
              Upgrade to Pro
            </button>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-[7px] text-[13.5px] font-normal text-[#ef4444] transition-colors hover:bg-red-50 disabled:opacity-50"
          >
            <LogOut className="size-4" aria-hidden />
            {isLoggingOut ? "Signing out…" : "Logout"}
          </button>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
