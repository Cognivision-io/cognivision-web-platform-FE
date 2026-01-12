"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DocsSidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function DocsSidebar({ className }: DocsSidebarProps) {
                    const pathname = usePathname();

                    const items = [
                                        {
                                                            title: "Getting Started",
                                                            items: [
                                                                                {
                                                                                                    title: "Introduction",
                                                                                                    href: "/help",
                                                                                },
                                                                                {
                                                                                                    title: "Quick Start",
                                                                                                    href: "/help#quick-start",
                                                                                }
                                                            ],
                                        },
                                        {
                                                            title: "API Reference",
                                                            items: [
                                                                                {
                                                                                                    title: "Overview",
                                                                                                    href: "/help/api",
                                                                                },
                                                                                {
                                                                                                    title: "Authentication",
                                                                                                    href: "/help/api#authentication",
                                                                                },
                                                                                {
                                                                                                    title: "Endpoints",
                                                                                                    href: "/help/api#endpoints",
                                                                                },
                                                            ],
                                        },
                                        {
                                                            title: "Examples",
                                                            items: [
                                                                                {
                                                                                                    title: "Basic Usage",
                                                                                                    href: "/help/examples",
                                                                                },
                                                                                {
                                                                                                    title: "Advanced Scenarios",
                                                                                                    href: "/help/examples#advanced",
                                                                                },
                                                            ],
                                        },
                    ];

                    return (
                                        <div className={cn("pb-12", className)}>
                                                            <div className="space-y-4 py-4">
                                                                                <div className="px-3 py-2">
                                                                                                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                                                                                                        Documentation
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
