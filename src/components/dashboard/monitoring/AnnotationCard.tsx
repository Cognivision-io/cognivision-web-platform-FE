"use client";

import { useMemo } from "react";
import { BarChart3 } from "lucide-react";
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
import type { RoboflowInferenceStats } from "@/interfaces/monitoring.interface";

interface AnnotationCardProps {
    data?: RoboflowInferenceStats;
    isLoading: boolean;
}

export default function AnnotationCard({ data, isLoading }: AnnotationCardProps) {
    // Transform inference_stats to class-based data
    const classData = useMemo(() => {
        if (!data?.inference_stats) return [];
        
        const classMap = new Map<string, { class: string; inferences: number; confidence: number }>();
        
        data.inference_stats.forEach((stat) => {
            if (stat.predicted_class && stat.num_inferences) {
                const existing = classMap.get(stat.predicted_class);
                if (existing) {
                    existing.inferences += stat.num_inferences;
                    existing.confidence = (existing.confidence + (stat.avg_confidence || 0)) / 2;
                } else {
                    classMap.set(stat.predicted_class, {
                        class: stat.predicted_class,
                        inferences: stat.num_inferences,
                        confidence: stat.avg_confidence || 0,
                    });
                }
            }
        });
        
        return Array.from(classMap.values());
    }, [data]);

    const totalInferences = useMemo(() => {
        return classData.reduce((sum, item) => sum + item.inferences, 0);
    }, [classData]);

    return (
        <Card className="w-full">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold text-slate-900">
                            Inference Statistics by Class
                        </h3>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <p className="text-sm text-muted-foreground">Loading...</p>
                    </div>
                ) : classData.length === 0 ? (
                    <div className="flex items-center justify-center py-12">
                        <p className="text-sm text-muted-foreground">No inference data available</p>
                    </div>
                ) : (
                    <div className="flex gap-6">
                        {/* Chart Section */}
                        <div className="flex-1">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={classData}
                                    margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#e2e8f0"
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey="class"
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
                                        formatter={(value: number) => [
                                            `${value} inferences`,
                                            "Count",
                                        ]}
                                        labelStyle={{ color: "#334155" }}
                                    />
                                    <Bar
                                        dataKey="inferences"
                                        fill="#7c3aed"
                                        radius={[8, 8, 0, 0]}
                                        isAnimationActive={true}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Sidebar - Class Statistics */}
                        <aside className="w-56 border-l border-slate-200 pl-6">
                            <div className="mb-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <p className="text-sm font-semibold text-slate-900">
                                        Total Inferences
                                    </p>
                                    <p className="text-sm font-semibold text-slate-900">
                                        {totalInferences}
                                    </p>
                                </div>

                                <ul className="space-y-3">
                                    {classData.slice(0, 10).map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-center justify-between transition-colors hover:bg-slate-50 -mx-2 px-2 py-1 rounded"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm text-slate-700 truncate max-w-[120px]">
                                                    {item.class}
                                                </span>
                                            </div>
                                            <span className="text-sm font-semibold text-slate-900">
                                                {item.inferences}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
