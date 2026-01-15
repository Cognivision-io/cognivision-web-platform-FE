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
import { Apple, Smartphone, TabletSmartphone } from "lucide-react";

interface PlatformSelectorProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PlatformSelector({ className }: PlatformSelectorProps) {
  const { platform, setPlatform } = useDocsStore();

  const platforms: { value: Platform; label: string; icon: React.ReactNode }[] =
    [
      {
        value: "react-native",
        label: "React Native",
        icon: <TabletSmartphone className="h-4 w-4" />,
      },
      { value: "swift", label: "Swift", icon: <Apple className="h-4 w-4" /> },
      {
        value: "kotlin",
        label: "Kotlin",
        icon: <Smartphone className="h-4 w-4" />,
      },
    ];

  const selectedPlatform = platforms.find((p) => p.value === platform);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="hidden text-xs font-semibold text-[#5b2fe8] sm:inline-block">
        Platform:
      </span>
      <Select
        value={platform}
        onValueChange={(val) => setPlatform(val as Platform)}
      >
        <SelectTrigger className="h-9 w-[155px] rounded-full border-[#c9bdf7] bg-white text-[13px] font-medium text-[#111827] shadow-none">
          <div className="flex items-center gap-2">
            <SelectValue placeholder="Select Platform" />
          </div>
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
