"use client";

import { cn } from "@/lib/utils";

export function DashboardStatCard({
  icon,
  label,
  value,
  trend,
  valueSize = "md",
  monoClassName,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: React.ReactNode;
  valueSize?: "md" | "lg";
  monoClassName?: string;
}) {
  return (
    <div className="rounded-[14px] border border-[#e2e8f0] bg-white p-5 shadow-sm">
      <div className="flex size-[38px] items-center justify-center rounded-[10px] bg-[#ede9fb]">
        {icon}
      </div>
      <p className="mt-5 text-[12px] font-normal leading-tight text-[#94a3b8]">{label}</p>
      <p
        className={cn(
          "mt-1 font-medium leading-tight tracking-[-0.8px] text-[#2b2b2b]",
          valueSize === "lg" ? "text-[26px] leading-[26px]" : "text-[28px] leading-7",
          monoClassName,
        )}
      >
        {value}
      </p>
      <div className="mt-3">{trend}</div>
    </div>
  );
}
