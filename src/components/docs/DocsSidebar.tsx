"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useScrollSpy } from "@/hooks/use-scrollspy";

interface DocsSidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function DocsSidebar({ className }: DocsSidebarProps) {
  const pathname = usePathname();

  const items = [
    { id: "introduction", title: "Introduction" },
    { id: "quick-start", title: "Quick Start" },
    { id: "overview", title: "Overview" },
    { id: "authentication", title: "Authentication" },
    { id: "endpoints", title: "Endpoints" },
    { id: "basic", title: "Basic Usage" },
    { id: "advanced", title: "Advanced Scenarios" },
  ];

  const activeId = useScrollSpy(
    pathname === "/help" ? items.map((item) => item.id) : []
  );

  return (
    <div className={cn("space-y-3", className)}>
      <h2 className="px-2 text-[15px] font-semibold text-[#5b2fe8]">
        Documentation
      </h2>
      <div className="space-y-1">
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <Link
              key={item.id}
              href={`/help#${item.id}`}
              className={cn(
                "flex w-full items-center rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
                active
                  ? "bg-[#5b2fe8] text-white shadow-[0_10px_20px_rgba(91,47,232,0.2)]"
                  : "text-[#1f2937] hover:bg-white/70"
              )}
              aria-current={active ? "page" : undefined}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
