"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useScrollSpy } from "@/hooks/use-scrollspy";

interface ReferencesSidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function ReferencesSidebar({ className }: ReferencesSidebarProps) {
  const items = [
    { id: "general", title: "General" },
    { id: "status", title: "Status Dashboard" },
    { id: "support", title: "Support" },
    { id: "api", title: "API" },
    { id: "error-codes", title: "Error Codes" },
    { id: "limits", title: "Rate Limits" },
    { id: "versioning", title: "Versioning" },
    { id: "integrations", title: "Integrations" },
    { id: "webhooks", title: "Webhooks" },
    { id: "sdks", title: "SDKs" },
  ];

  const activeId = useScrollSpy(items.map((item) => item.id));

  return (
    <div className={cn("space-y-3", className)}>
      <h2 className="px-2 text-[15px] font-semibold text-[#5b2fe8]">
        References
      </h2>
      <div className="space-y-1">
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <Link
              key={item.id}
              href={`/help/references#${item.id}`}
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
