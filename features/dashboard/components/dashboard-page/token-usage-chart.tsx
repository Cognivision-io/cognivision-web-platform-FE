"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";
import {
  TOKEN_USAGE_30D,
  TOKEN_USAGE_7D,
  TOKEN_USAGE_90D,
} from "@/features/dashboard/lib/token-usage-data";

type RangeKey = "7d" | "30d" | "90d";

const RANGE_LABEL: Record<RangeKey, string> = {
  "7d": "7d",
  "30d": "30d",
  "90d": "90d",
};

export function TokenUsageChart() {
  const [range, setRange] = useState<RangeKey>("30d");

  const data = useMemo(() => {
    if (range === "7d") return TOKEN_USAGE_7D;
    if (range === "90d") return TOKEN_USAGE_90D;
    return TOKEN_USAGE_30D;
  }, [range]);

  return (
    <div className="rounded-[14px] border border-[#e2e8f0] bg-white p-6 pb-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-[14px] font-medium leading-tight text-[#2b2b2b]">
            Token usage over time
          </h2>
          <p className="text-[12px] font-normal leading-tight text-[#94a3b8]">
            Monthly SDK requests — current billing cycle
          </p>
        </div>
        <div className="flex items-center gap-0.5 rounded-lg bg-[#f1f5f9] p-0.5 sm:mt-0">
          {(["7d", "30d", "90d"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setRange(key)}
              className={cn(
                "min-w-[44px] rounded-md px-3 py-1.5 text-center text-[12px] font-medium transition-colors",
                range === key
                  ? "bg-[#5925dc] text-white shadow-sm"
                  : "text-[#94a3b8] hover:text-[#64748b]",
              )}
            >
              {RANGE_LABEL[key]}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[238px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="tokenUsageFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5925dc" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#5925dc" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              dy={6}
            />
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v >= 1000 ? `${v / 1000}k` : v}`}
              width={36}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                fontSize: 12,
              }}
              labelStyle={{ color: "#64748b" }}
              formatter={(value: number | string) => [
                typeof value === "number" ? value.toLocaleString() : value,
                "Requests",
              ]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#5925dc"
              strokeWidth={2}
              fill="url(#tokenUsageFill)"
              dot={false}
              activeDot={{
                r: 4,
                fill: "#5925dc",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
