"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ChangelogSidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function ChangelogSidebar({ className }: ChangelogSidebarProps) {
                    const pathname = usePathname();

                    const items = [
                                        {
                                                            title: "2026",
                                                            items: [
                                                                                { title: "v1.2.0 - Jan 10", href: "/help/changelog#v.1.2.0" },
                                                            ],
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

                    return (
                                        <div className={cn("pb-12", className)}>
                                                            <div className="space-y-4 py-4">
                                                                                <div className="px-3 py-2">
                                                                                                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                                                                                                        Changelog
                                                                                                    </h2>
                                                                                                    <div className="space-y-1">
                                                                                                                        {items.map((section, i) => (
                                                                                                                                            <div key={i} className="mb-4">
                                                                                                                                                                <h3 className="mb-2 px-4 text-sm font-medium text-muted-foreground">
                                                                                                                                                                                    {section.title}
                                                                                                                                                                </h3>
                                                                                                                                                                {section.items.map((item) => (
                                                                                                                                                                                    <Button
                                                                                                                                                                                                        key={item.href}
                                                                                                                                                                                                        variant={pathname === item.href ? "secondary" : "ghost"}
                                                                                                                                                                                                        className="w-full justify-start font-normal"
                                                                                                                                                                                                        asChild
                                                                                                                                                                                    >
                                                                                                                                                                                                        <Link href={item.href}>{item.title}</Link>
                                                                                                                                                                                    </Button>
                                                                                                                                                                ))}
                                                                                                                                            </div>
                                                                                                                        ))}
                                                                                                    </div>
                                                                                </div>
                                                            </div>
                                        </div>
                    );
}
