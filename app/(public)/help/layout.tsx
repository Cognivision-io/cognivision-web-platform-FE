"use client";

import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsNavbar } from "@/components/docs/DocsNavbar";
import { ReferencesSidebar } from "@/components/docs/ReferencesSidebar";
import { ChangelogSidebar } from "@/components/docs/ChangelogSidebar";
import { GlowSection } from "@/components/layout/GlowLayout";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  let SidebarComponent = DocsSidebar;
  if (pathname.startsWith("/help/references"))
    SidebarComponent = ReferencesSidebar;
  else if (pathname.startsWith("/help/changelog"))
    SidebarComponent = ChangelogSidebar;

  // ✅ Match your header container settings
  const CONTAINER_W = "72rem"; // max-w-6xl = 72rem (change to 80rem if header uses max-w-7xl)
  const PAGE_PAD = "-1.5rem"; // px-6 = 1.5rem

  // Sidebar sizing
  const SIDEBAR_W = "310px";
  const SIDEBAR_GAP = "24px"; // space between sidebar & content

  // ✅ This aligns sidebar with the header container’s left edge:
  // left = max(pagePadding, (viewport - containerWidth)/2 + pagePadding)
  const SIDEBAR_LEFT = `max(${PAGE_PAD}, calc((100vw - ${CONTAINER_W}) / 2 + ${PAGE_PAD}))`;

  return (
    <GlowSection
      bgClassName="bg-white"
      className="min-h-screen"
      allowGlowBleed
      randomizeGlows
      glowCount={3}
      glowSeed="docs"
    >
      <div className="min-h-screen">
        <Header />
        <DocsNavbar />

        <div className="relative pb-16">
          {/* ✅ Sidebar: only show on lg+ */}
          <aside className="hidden lg:block">
            <div
              className="
                fixed
                top-[140px]
                h-[calc(100vh-180px)]
                w-[304px]
                overflow-y-auto
                rounded-2xl
                border border-[#ececf5]
                bg-[#f6f7fb]
                px-5 py-6
              "
              style={
                {
                  left: SIDEBAR_LEFT,
                  width: SIDEBAR_W,
                  willChange: "transform",
                } as React.CSSProperties
              }
            >
              <SidebarComponent />
            </div>
          </aside>

          {/* ✅ Main content: offset uses the SAME computed left */}
          <main
            className="
              w-full min-w-0 px-6 pt-6
              lg:pl-[calc(var(--sidebar-left)+var(--sidebar-w)+var(--sidebar-gap))]
            "
            style={
              {
                "--sidebar-left": SIDEBAR_LEFT,
                "--sidebar-w": SIDEBAR_W,
                "--sidebar-gap": SIDEBAR_GAP,
              } as React.CSSProperties
            }
          >
            {/* keep your readable line length (adjust if you want wider content) */}
            <div className="w-full max-w-4xl">{children}</div>
          </main>
        </div>
      </div>
    </GlowSection>
  );
}
