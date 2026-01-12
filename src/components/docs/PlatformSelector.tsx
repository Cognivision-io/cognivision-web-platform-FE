"use client";

import { useDocsStore, Platform } from "@/stores/docs-store";
import {
                    Select,
                    SelectContent,
                    SelectItem,
                    SelectTrigger,
                    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Check, Apple, Smartphone, TabletSmartphone } from "lucide-react";

interface PlatformSelectorProps extends React.HTMLAttributes<HTMLDivElement> { }

export function PlatformSelector({ className }: PlatformSelectorProps) {
                    const { platform, setPlatform } = useDocsStore();

                    const platforms: { value: Platform; label: string; icon: React.ReactNode }[] = [
                                        { value: "react-native", label: "React Native", icon: <TabletSmartphone className="h-4 w-4" /> },
                                        { value: "swift", label: "Swift", icon: <Apple className="h-4 w-4" /> },
                                        { value: "kotlin", label: "Kotlin", icon: <Smartphone className="h-4 w-4" /> },
                    ];

                    return (
                                        <div className={cn("flex items-center gap-2", className)}>
                                                            <span className="text-sm text-muted-foreground hidden sm:inline-block">Platform:</span>
                                                            <Select value={platform} onValueChange={(val) => setPlatform(val as Platform)}>
                                                                                <SelectTrigger className="w-[160px]">
                                                                                                    <SelectValue placeholder="Select Platform" />
                                                                                </SelectTrigger>
                                                                                <SelectContent>
                                                                                                    {platforms.map((p) => (
                                                                                                                        <SelectItem key={p.value} value={p.value}>
                                                                                                                                            <div className="flex items-center gap-2">
                                                                                                                                                                {p.icon}
                                                                                                                                                                <span>{p.label}</span>
                                                                                                                                            </div>
                                                                                                                        </SelectItem>
                                                                                                    ))}
                                                                                </SelectContent>
                                                            </Select>
                                        </div>
                    );
}
