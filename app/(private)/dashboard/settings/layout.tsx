"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const settingsSections = [
  { href: "/dashboard/settings/login-security", label: "Login & Security" },
  { href: "/dashboard/settings/api-keys", label: "API Keys" },
  { href: "/dashboard/settings/support", label: "Support" },
] as const;

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#f5f7ff] px-1 py-8 sm:px-6 lg:px-7">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row">
        <aside className="lg:w-64">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#9aa1c5]">
            Account
          </p>
          <div className="mt-6 flex flex-wrap gap-3 rounded-2xl bg-white/20 p-2 lg:flex-col lg:gap-2 lg:bg-transparent lg:p-0">
            {settingsSections.map((section) => {
              const isActive =
                pathname === section.href ||
                pathname?.startsWith(`${section.href}/`);
              return (
                <Link
                  key={section.href}
                  href={section.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-semibold text-[#7d84a9] transition-all duration-200 hover:bg-white hover:text-[#1b2559] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9cff1]",
                    isActive
                      ? "bg-white text-[#1b2559] shadow-[0_14px_32px_rgba(15,23,42,0.08)] ring-1 ring-[#d5dbf5]"
                      : "bg-transparent"
                  )}
                >
                  <span>{section.label}</span>
                </Link>
              );
            })}
          </div>
        </aside>

        <section className="flex-1 rounded-3xl border border-transparent bg-white/0 px-0">
          {children}
        </section>
      </div>
    </div>
  );
};

export default SettingsLayout;
