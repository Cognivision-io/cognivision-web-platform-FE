"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useScrollSpy } from "@/hooks/use-scrollspy";
import { useDocsStore } from "@/store/docs-store";

interface DocsSidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function DocsSidebar({ className }: DocsSidebarProps) {
  const pathname = usePathname();
  const { platform } = useDocsStore();

  const { hrefBase, items } = useMemo(() => {
    if (pathname.startsWith("/help/api")) {
      if (platform === "swift") {
        return {
          hrefBase: "/help/api",
          items: [
            { id: "overview", title: "Overview" },
            { id: "raycasting", title: "Raycasting" },
            { id: "distance", title: "Distance" },
            { id: "rendering", title: "Rendering" },
          ],
        };
      }

      if (platform === "react-native") {
        return {
          hrefBase: "/help/api",
          items: [
            { id: "overview", title: "Overview" },
            { id: "authentication", title: "Authentication" },
            { id: "roboflow", title: "Roboflow" },
            { id: "ar-viewer", title: "ArViewerView" },
            { id: "types", title: "Types" },
            { id: "errors", title: "Troubleshooting" },
          ],
        };
      }

      return {
        hrefBase: "/help/api",
        items: [
          { id: "overview", title: "Overview" },
          { id: "authentication", title: "Authentication" },
          { id: "endpoints", title: "Methods" },
        ],
      };
    }

    if (pathname.startsWith("/help/examples")) {
      if (platform === "swift") {
        return {
          hrefBase: "/help/examples",
          items: [
            { id: "overview", title: "Overview" },
            { id: "full-measurement", title: "Full Measurement" },
            { id: "management", title: "Entity Management" },
          ],
        };
      }

      if (platform === "react-native") {
        return {
          hrefBase: "/help/examples",
          items: [
            { id: "overview", title: "Overview" },
            { id: "full-example", title: "Full Example" },
            { id: "notes", title: "Notes" },
          ],
        };
      }

      return {
        hrefBase: "/help/examples",
        items: [
          { id: "overview", title: "Overview" },
          { id: "basic", title: "Basic" },
          { id: "advanced", title: "Advanced" },
        ],
      };
    }

    return {
      hrefBase: "/help",
      items: [
        { id: "introduction", title: "Introduction" },
        { id: "quick-start", title: "Quick Start" },
        { id: "overview", title: "Overview" },
        { id: "authentication", title: "Authentication" },
        { id: "endpoints", title: "Endpoints" },
        { id: "basic", title: "Basic Usage" },
        { id: "advanced", title: "Advanced Scenarios" },
      ],
    };
  }, [pathname, platform]);

  const activeId = useScrollSpy(items.map((item) => item.id));

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
              href={`${hrefBase}#${item.id}`}
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
