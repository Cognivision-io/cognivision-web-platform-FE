"use client";

import { useState, useMemo } from "react";
import { BarChart3, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { AnnotationData, MisclassifiedItem } from "@/interfaces/monitoring.interface";


export default function AnnotationCard() {
    const [filterType, setFilterType] = useState("all");
    const [dateRange, setDateRange] = useState("7");

    // Mock data - replace with actual API data
    const annotationData: AnnotationData[] = [
        { date: "Sep 30", count: 0 },
        { date: "Oct 1", count: 2 },
        { date: "Oct 2", count: 1 },
        { date: "Oct 3", count: 0 },
        { date: "Oct 4", count: 3 },
        { date: "Oct 5", count: 2 },
        { date: "Oct 6", count: 4 },
    ];

    const misclassifiedItems: MisclassifiedItem[] = [
        { type: "Audio", count: 0, color: "bg-sky-100" },
        { type: "DICOM", count: 0, color: "bg-sky-200" },
        { type: "Image", count: 4, color: "bg-sky-400" },
        { type: "PDF", count: 0, color: "bg-sky-500" },
        { type: "Text", count: 0, color: "bg-sky-600" },
        { type: "Video", count: 0, color: "bg-sky-700" },
    ];

    const totalMisclassified = useMemo(() => {
        return misclassifiedItems.reduce((sum, item) => sum + item.count, 0);
    }, [misclassifiedItems]);

    // Filter data based on selection
    const filteredData = useMemo(() => {
        if (filterType === "all") return annotationData;
        return annotationData.filter((item) => {
            if (filterType === "human") return Math.random() > 0.5;
            if (filterType === "imported") return Math.random() > 0.5;
            return true;
        });
    }, [filterType]);

    const handleFilterChange = (type: string) => {
        setFilterType(type);
    };

    const handleDateRangeChange = (range: string) => {
        setDateRange(range);
    };

    return (
        <Card className="w-full">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold text-slate-900">
                            Annotation
                        </h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleFilterChange("all")}
                            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${filterType === "all"
                                ? "bg-primary text-white"
                                : "border border-slate-200 text-slate-700 hover:border-slate-300"
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => handleFilterChange("human")}
                            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${filterType === "human"
                                ? "bg-primary text-white"
                                : "border border-slate-200 text-slate-700 hover:border-slate-300"
                                }`}
                        >
                            Human
                        </button>
                        <button
                            onClick={() => handleFilterChange("imported")}
                            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${filterType === "imported"
                                ? "bg-primary text-white"
                                : "border border-slate-200 text-slate-700 hover:border-slate-300"
                                }`}
                        >
                            Imported
                        </button>
                        <div className="relative ml-2">
                            <select
                                value={dateRange}
                                onChange={(e) => handleDateRangeChange(e.target.value)}
                                className="appearance-none rounded-md border border-slate-200 bg-white px-3 py-1.5 pr-8 text-xs font-medium text-slate-700 hover:border-slate-300"
                            >
                                <option value="7">Last 7 days</option>
                                <option value="30">Last 30 days</option>
                                <option value="90">Last 90 days</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex gap-6">
                    {/* Chart Section */}
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={filteredData}
                                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#e2e8f0"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="date"
                                    stroke="#64748b"
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "500",
                                    }}
                                />
                                <YAxis
                                    stroke="#64748b"
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "500",
                                    }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#ffffff",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "8px",
                                        boxShadow:
                                            "0 4px 6px rgba(0, 0, 0, 0.1)",
                                    }}
                                    formatter={(value) => [
                                        `${value} annotations`,
                                        "Count",
                                    ]}
                                    labelStyle={{ color: "#334155" }}
                                />
                                <Bar
                                    dataKey="count"
                                    fill="#7c3aed"
                                    radius={[8, 8, 0, 0]}
                                    isAnimationActive={true}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Sidebar - Misclassified Data */}
                    <aside className="w-56 border-l border-slate-200 pl-6">
                        <div className="mb-6">
                            <div className="mb-4 flex items-center justify-between">
                                <p className="text-sm font-semibold text-slate-900">
                                    Misclassified Data
                                </p>
                                <p className="text-sm font-semibold text-slate-900">
                                    {totalMisclassified}
                                </p>
                            </div>

                            <ul className="space-y-3">
                                {misclassifiedItems.map((item) => (
                                    <li
                                        key={item.type}
                                        className="flex items-center justify-between transition-colors hover:bg-slate-50 -mx-2 px-2 py-1 rounded"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`h-3 w-3 rounded-sm ${item.color} shrink-0`}
                                            />
                                            <span className="text-sm text-slate-700">
                                                {item.type}
                                            </span>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-900">
                                            {item.count}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-4 border-t border-slate-200 pt-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-slate-900">
                                        Total
                                    </span>
                                    <span className="text-sm font-semibold text-slate-900">
                                        {totalMisclassified}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </CardContent>
        </Card>
    );
}
