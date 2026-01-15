"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useScrollSpy } from "@/hooks/use-scrollspy";

interface ChangelogSidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function ChangelogSidebar({ className }: ChangelogSidebarProps) {
  const pathname = usePathname();

  const items = [
    {
      title: "2026",
      items: [{ title: "v1.2.0 - Jan 10", href: "/help/changelog#v.1.2.0" }],
    },
    {
      title: "2025",
      items: [
        { title: "v1.1.0 - Dec 25", href: "/help/changelog#v.1.1.0" },
        { title: "v1.0.0 - Dec 01", href: "/help/changelog#v1.0.0" },
      ],
    },
    {
      title: "Archive",
      items: [
        { title: "Beta Releases", href: "/help/changelog#beta" },
        { title: "Migration Guide", href: "/help/changelog#migration" },
      ],
    },
  ];

  const flatItems = items.flatMap((section) => section.items);
  const activeItems = flatItems.filter((item) => {
    const [path] = item.href.split("#");
    return path === pathname;
  });
  const activeIds = activeItems
    .map((item) => item.href.split("#")[1])
    .filter((id): id is string => Boolean(id));
  const activeId = useScrollSpy(activeIds);

  const isActive = (href: string) => {
    const [path, hash] = href.split("#");
    if (path !== pathname) {
      return false;
    }
    if (!hash) {
      return false;
    }
    return activeId === hash;
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="px-2 text-[15px] font-semibold text-[#111827]">
        Changelog
      </h2>
      {items.map((section) => (
        <div key={section.title} className="space-y-2">
          <h3 className="px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9aa1b2]">
            {section.title}
          </h3>
          <div className="space-y-1">
            {section.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
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
      ))}
    </div>
  );
}
