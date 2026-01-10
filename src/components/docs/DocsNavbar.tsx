"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function DocsNavbar() {
                    const pathname = usePathname();

                    const items = [
                                        {
                                                            title: "Documentation",
                                                            href: "/help",
                                                            isActive: (path: string) => path === "/help" || path.startsWith("/help/api") || path.startsWith("/help/examples"),
                                        },
                                        {
                                                            title: "Developer References",
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
                                        <div className="border-b">
                                                            <div className="flex h-14 items-center px-4 md:px-6">
                                                                                <nav className="flex items-center space-x-6 text-sm font-medium">
                                                                                                    {items.map((item) => (
                                                                                                                        <Link
                                                                                                                                            key={item.href}
                                                                                                                                            href={item.href}
                                                                                                                                            className={cn(
                                                                                                                                                                "transition-colors hover:text-foreground/80",
                                                                                                                                                                item.isActive(pathname) ? "text-foreground" : "text-foreground/60"
                                                                                                                                            )}
                                                                                                                        >
                                                                                                                                            {item.title}
                                                                                                                        </Link>
                                                                                                    ))}
                                                                                </nav>
                                                            </div>
                                        </div>
                    );
}
