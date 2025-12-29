"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import type { RoboflowInferenceStats, TimeRange } from "@/interfaces/monitoring.interface";

interface SummaryCardsProps {
    data?: RoboflowInferenceStats;
    isLoading: boolean;
    timeRange: TimeRange;
    onTimeRangeChange: (range: TimeRange) => void;
}

export default function SummaryCards({ data, isLoading, timeRange, onTimeRangeChange }: SummaryCardsProps) {
    const cards = [
        {
            id: "accuracy",
            label: "Accuracy",
            value: data?.avg_confidence ? `${(data.avg_confidence * 100).toFixed(1)}%` : "--",
            img: "/monitoring/accuracy.svg",
            bg: "from-primary to-primary/80",
            labelClass: "text-2xl font-semibold text-slate-900",
            valueClass: "text-2xl font-semibold text-slate-900",
        },
        {
            id: "predictions",
            label: "Predictions Count",
            value: data?.num_inferences?.toString() ?? "--",
            img: "/monitoring/predictions-count.svg",
            bg: "from-emerald-500 to-emerald-500/80",
            labelClass: "text-sm font-medium text-slate-700",
            valueClass: "mt-2 text-2xl font-semibold text-slate-900",
        },
        {
            id: "errors",
            label: "Errors",
            value: data?.num_errors?.toString() ?? "--",
            img: "/monitoring/error.svg",
            bg: "from-sky-400 to-sky-400/80",
            labelClass: "text-sm font-medium text-slate-700",
            valueClass: "mt-2 text-2xl font-semibold text-slate-900",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {cards.map((c) => (
                <Card key={c.id} className="rounded-2xl">
                    <CardHeader className="pb-0">
                        <div className="flex items-start gap-4">
                            <div className={`h-[42px] max-w-[42px] w-full rounded-[100%] bg-linear-to-br ${c.bg} text-white flex items-center justify-center`}>
                                <div className="h-[22px] w-[22px] relative">
                                    <Image src={c.img} alt={c.label} fill />
                                </div>
                            </div>

                            <div className="flex-1">
                                <p className={c.labelClass}>{c.label}</p>
                                <p className={c.valueClass}>
                                    {isLoading ? "Loading..." : c.value}
                                </p>
                            </div>

                            <div className="ml-auto flex items-end">
                                <div className="relative">
                                    <select
                                        value={timeRange}
                                        onChange={(e) => onTimeRangeChange(e.target.value as TimeRange)}
                                        className="appearance-none rounded-md bg-primary px-3 py-1 pr-8 text-sm text-white"
                                    >
                                        <option value="7">7 days</option>
                                        <option value="30">30 days</option>
                                        <option value="90">90 days</option>
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-white" />
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent />
                </Card>
            ))}
        </div>
    );
}
