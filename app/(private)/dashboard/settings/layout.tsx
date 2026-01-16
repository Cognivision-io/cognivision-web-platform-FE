"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const settingsSections = [
  { href: "/dashboard/settings/login-security", label: "Login & Security" },
  { href: "/dashboard/settings/support", label: "Support" },
] as const;

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col lg:flex-row">
        <aside className="w-full lg:w-64">
          <SidebarGroup className="flex min-h-[calc(100vh)] flex-col p-4">
            <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#9aa1c5]">
              Account
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-4">
              <SidebarMenu className="gap-2">
                {settingsSections.map((section) => {
                  const isActive =
                    pathname === section.href ||
                    pathname?.startsWith(`${section.href}/`);
                  return (
                    <SidebarMenuItem key={section.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={cn(
                          "h-11 w-full rounded-lg border border-transparent px-4 text-sm font-semibold text-[#7d84a9] transition-all duration-200 hover:bg-white hover:text-[#1b2559]",
                          isActive
                            ? "bg-white text-[#1b2559] shadow-[0_14px_32px_rgba(15,23,42,0.08)] border-[#d5dbf5]"
                            : "bg-transparent"
                        )}
                      >
                        <Link
                          href={section.href}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {section.label}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </aside>

        <div
          className="hidden w-px self-stretch rounded-full bg-[#dfe3f9] lg:block"
          aria-hidden="true"
        />

        <section className="flex-1 rounded-3xl border border-transparent bg-white/0 p-5">
          {children}
        </section>
      </div>
    </div>
  );
};

export default SettingsLayout;
