"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";
import {
  USAGE_TREND_DAILY,
  USAGE_TREND_MONTHLY,
} from "@/features/monitoring/lib/usage-trend-data";

type Granularity = "daily" | "monthly";

const ERROR_COUNT = 247;

export function UsageTrendChart() {
  const [granularity, setGranularity] = useState<Granularity>("monthly");

  const data = useMemo(
    () => (granularity === "monthly" ? USAGE_TREND_MONTHLY : USAGE_TREND_DAILY),
    [granularity],
  );

  return (
    <div className="rounded-[14px] border border-[#e2e8f0] bg-white p-6 pb-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h2 className="text-[14px] font-medium leading-tight text-[#2b2b2b]">Usage trend</h2>
          <p className="text-[12px] font-normal leading-tight text-[#94a3b8]">
            API requests and errors over time
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#fecaca] bg-[#fef2f2] px-3 py-1.5">
            <span className="size-1.5 shrink-0 rounded-[3px] bg-[#dc2626]" aria-hidden />
            <span className="text-[12px] font-medium text-[#dc2626]">
              {ERROR_COUNT} errors this month
            </span>
          </div>
          <div className="flex items-center gap-0.5 rounded-lg bg-[#f1f5f9] p-0.5">
            <button
              type="button"
              onClick={() => setGranularity("daily")}
              className={cn(
                "rounded-md px-4 py-1.5 text-center text-[12px] font-medium transition-colors",
                granularity === "daily"
                  ? "bg-[#5925dc] text-white shadow-sm"
                  : "text-[#94a3b8] hover:text-[#64748b]",
              )}
            >
              Daily
            </button>
            <button
              type="button"
              onClick={() => setGranularity("monthly")}
              className={cn(
                "rounded-md px-4 py-1.5 text-center text-[12px] font-medium transition-colors",
                granularity === "monthly"
                  ? "bg-[#5925dc] text-white shadow-sm"
                  : "text-[#94a3b8] hover:text-[#64748b]",
              )}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-6 border-b border-[#f1f5f9] pb-3">
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-8 rounded-sm bg-[#5925dc]" aria-hidden />
          <span className="text-[11.5px] font-normal text-[#94a3b8]">API calls</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="h-0 w-8 shrink-0 border-t-2 border-dashed border-[#ef4444]"
            aria-hidden
          />
          <span className="text-[11.5px] font-normal text-[#94a3b8]">Errors</span>
        </div>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              dy={6}
            />
            <YAxis
              yAxisId="api"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) =>
                granularity === "monthly" && v >= 1000 ? `${v / 1000}k` : `${v}`
              }
              domain={
                granularity === "monthly"
                  ? ["dataMin - 5000", "dataMax + 2000"]
                  : ["auto", "auto"]
              }
              width={44}
            />
            <YAxis
              yAxisId="errors"
              orientation="right"
              tick={{ fill: "#fca5a5", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              domain={granularity === "monthly" ? [0, 300] : [0, "auto"]}
              width={36}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                fontSize: 12,
              }}
              formatter={(value: number, name: string) => {
                const label = name === "api" ? "API calls" : "Errors";
                const formatted =
                  name === "api" ? value.toLocaleString() : String(value);
                return [formatted, label];
              }}
              labelStyle={{ color: "#64748b" }}
            />
            <Line
              yAxisId="api"
              type="monotone"
              dataKey="api"
              name="api"
              stroke="#5925dc"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#5925dc", stroke: "#fff", strokeWidth: 2 }}
            />
            <Line
              yAxisId="errors"
              type="monotone"
              dataKey="errors"
              name="errors"
              stroke="#ef4444"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{ r: 4, fill: "#ef4444", stroke: "#fff", strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
