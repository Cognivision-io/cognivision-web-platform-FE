"use client";

import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsNavbar } from "@/components/docs/DocsNavbar";
import { ReferencesSidebar } from "@/components/docs/ReferencesSidebar";
import { ChangelogSidebar } from "@/components/docs/ChangelogSidebar";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  let SidebarComponent = DocsSidebar;

  if (pathname.startsWith("/help/references")) {
    SidebarComponent = ReferencesSidebar;
  } else if (pathname.startsWith("/help/changelog")) {
    SidebarComponent = ChangelogSidebar;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <DocsNavbar />
      <div className="mx-auto flex w-full max-w-6xl items-start gap-10 pb-16">
        <aside className="relative hidden w-64 shrink-0 md:block">
          <div className="md:fixed md:left-[max(1.5rem,calc(50%-36rem+1.5rem))] md:h-[calc(100vh-160px)] md:w-64 md:overflow-y-auto rounded-2xl border border-[#ececf5] bg-[#f6f7fb] px-4 py-5">
            <SidebarComponent />
          </div>
        </aside>
        <main className="min-w-0 flex-1 pt-6">{children}</main>
      </div>
    </div>
  );
}
