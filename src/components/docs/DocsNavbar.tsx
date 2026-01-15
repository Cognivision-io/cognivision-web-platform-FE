"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PlatformSelector } from "@/components/docs/PlatformSelector";

export function DocsNavbar() {
  const pathname = usePathname();

  const items = [
    {
      title: "Product Documentation",
      href: "/help",
      isActive: (path: string) =>
        path === "/help" ||
        path.startsWith("/help/api") ||
        path.startsWith("/help/examples"),
    },
    {
      title: "Developer Reference",
      href: "/help/references",
      isActive: (path: string) => path.startsWith("/help/references"),
    },
    {
      title: "Changelog",
      href: "/help/changelog",
      isActive: (path: string) => path.startsWith("/help/changelog"),
    },
  ];

  return (
    <div className="border-b border-[#ececf5] bg-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center">
        <nav className="flex items-center gap-8 text-[13px] font-medium">
          {items.map((item) => {
            const active = item.isActive(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "border-b-2 pb-3 transition-colors",
                  active
                    ? "border-[#5b2fe8] text-[#5b2fe8] font-semibold"
                    : "border-transparent text-[#6b7280] hover:text-[#111827]"
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto">
          <PlatformSelector />
        </div>
      </div>
    </div>
  );
}
