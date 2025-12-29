"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { RoboflowInferenceStats } from "@/interfaces/monitoring.interface";

interface VersionTableProps {
    data?: RoboflowInferenceStats;
    isLoading: boolean;
}

export default function VersionTable({ data, isLoading }: VersionTableProps) {
    const modelStats = data?.inference_stats || [];

    return (
        <Card>
            <CardHeader>
                <h3 className="text-base font-semibold">Model Statistics</h3>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <p className="text-sm text-muted-foreground">Loading...</p>
                    </div>
                ) : modelStats.length === 0 ? (
                    <div className="flex items-center justify-center py-8">
                        <p className="text-sm text-muted-foreground">No model statistics available</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="text-left text-xs text-muted-foreground">
                                    <th className="py-2">Model Name</th>
                                    <th className="py-2">Predicted Class</th>
                                    <th className="py-2">Inferences</th>
                                    <th className="py-2">Avg Confidence</th>
                                    <th className="py-2">Avg Response Time</th>
                                    <th className="py-2">Deployment Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {modelStats.map((stat, idx) => (
                                    <tr key={idx} className="border-t">
                                        <td className="py-3 text-sm font-medium">{stat.model_name}</td>
                                        <td className="py-3 text-sm text-muted-foreground">
                                            {stat.predicted_class || "N/A"}
                                        </td>
                                        <td className="py-3 text-sm">
                                            {stat.num_inferences ?? "N/A"}
                                        </td>
                                        <td className="py-3 text-sm">
                                            {stat.avg_confidence 
                                                ? `${(stat.avg_confidence * 100).toFixed(1)}%` 
                                                : "N/A"}
                                        </td>
                                        <td className="py-3 text-sm">
                                            {stat.avg_response_time 
                                                ? `${(stat.avg_response_time * 1000).toFixed(0)}ms` 
                                                : "N/A"}
                                        </td>
                                        <td className="py-3 text-sm capitalize">{stat.deployment_types}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
