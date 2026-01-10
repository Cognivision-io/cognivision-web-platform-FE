"use client";

import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsNavbar } from "@/components/docs/DocsNavbar";
import { ReferencesSidebar } from "@/components/docs/ReferencesSidebar";
import { ChangelogSidebar } from "@/components/docs/ChangelogSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";

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
                                        <div className="flex flex-col min-h-screen">
                                                            <DocsNavbar />
                                                            <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 pt-8 pb-8">
                                                                                <aside className="fixed top-28 z-30 -ml-2 hidden h-[calc(100vh-8rem)] w-full shrink-0 md:sticky md:block">
                                                                                                    <ScrollArea className="h-full py-6 pr-6 lg:py-8">
                                                                                                                        <SidebarComponent />
                                                                                                    </ScrollArea>
                                                                                </aside>
                                                                                <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
                                                                                                    <div className="mx-auto w-full min-w-0">
                                                                                                                        {children}
                                                                                                    </div>
                                                                                </main>
                                                            </div>
                                        </div>
                    );
}
