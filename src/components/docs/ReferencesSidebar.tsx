"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ReferencesSidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function ReferencesSidebar({ className }: ReferencesSidebarProps) {
                    const pathname = usePathname();

                    const items = [
                                        {
                                                            title: "General",
                                                            items: [
                                                                                { title: "Status Dashboard", href: "/help/references#status" },
                                                                                { title: "Support", href: "/help/references#support" },
                                                            ],
                                        },
                                        {
                                                            title: "API",
                                                            items: [
                                                                                { title: "Error Codes", href: "/help/references#error-codes" },
                                                                                { title: "Rate Limits", href: "/help/references#limits" },
                                                                                { title: "Versioning", href: "/help/references#versioning" },
                                                            ],
                                        },
                                        {
                                                            title: "Integrations",
                                                            items: [
                                                                                { title: "Webhooks", href: "/help/references#webhooks" },
                                                                                { title: "SDKS", href: "/help/references#sdks" },
                                                            ],
                                        },
                    ];

                    return (
                                        <div className={cn("pb-12", className)}>
                                                            <div className="space-y-4 py-4">
                                                                                <div className="px-3 py-2">
                                                                                                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                                                                                                        References
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
