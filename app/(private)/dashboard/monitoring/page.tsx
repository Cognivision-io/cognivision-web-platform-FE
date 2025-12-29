"use client";

import { useState, useMemo } from "react";
import SummaryCards from "@/components/dashboard/monitoring/SummaryCards";
import AnnotationCard from "@/components/dashboard/monitoring/AnnotationCard";
import VersionTable from "@/components/dashboard/monitoring/VersionTable";
import { useProjectsQuery } from "@/features/dataset/queries/project.query";
import { useMonitoringStats } from "@/features/monitoring/queries/monitoring.query";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import type { TimeRange } from "@/interfaces/monitoring.interface";

export default function MonitoringPage() {
    const [selectedProjectId, setSelectedProjectId] = useState<string>("");
    const [timeRange, setTimeRange] = useState<TimeRange>("7");

    const { data: projectsData, isLoading: projectsLoading } = useProjectsQuery({
        page: 1,
        limit: 100,
    });

    const dateRanges = useMemo(() => {
        const now = new Date();
        const getStartDate = (days: number) => {
            const date = new Date(now);
            date.setDate(date.getDate() - days);
            return date.toISOString().split("T")[0];
        };

        return {
            "7": getStartDate(7),
            "30": getStartDate(30),
            "90": getStartDate(90),
        };
    }, []);

    const { data: monitoringData, isLoading: monitoringLoading } = useMonitoringStats(
        selectedProjectId ? {
            startTime: dateRanges[timeRange],
            endTime: new Date().toISOString().split("T")[0],
        } : undefined,
        { enabled: !!selectedProjectId }
    );

    const projects = projectsData?.data?.data || [];

    return (
        <div className="mx-auto w-full max-w-7xl space-y-8 px-6 py-8 lg:px-10">
            <section>
                <div className="mb-4">
                    <h1 className="text-2xl font-semibold">Monitoring</h1>
                    <p className="text-sm text-muted-foreground">Overview of model health and recent activity</p>
                </div>

                {/* Project Selector */}
                <div className="mb-6">
                    <div className="relative w-full max-w-md">
                        <select
                            value={selectedProjectId}
                            onChange={(e) => setSelectedProjectId(e.target.value)}
                            className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-slate-900 shadow-sm hover:border-slate-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            disabled={projectsLoading}
                        >
                            <option value="">Select a project to monitor</option>
                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                    </div>
                </div>

                {!selectedProjectId && (
                    <Card>
                        <CardContent className="flex items-center justify-center py-12">
                            <p className="text-sm text-muted-foreground">
                                Please select a project to view monitoring statistics
                            </p>
                        </CardContent>
                    </Card>
                )}

                {selectedProjectId && (
                    <>
                        <SummaryCards data={monitoringData} isLoading={monitoringLoading} timeRange={timeRange} onTimeRangeChange={setTimeRange} />

                        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <div className="lg:col-span-3">
                                <AnnotationCard data={monitoringData} isLoading={monitoringLoading} />
                            </div>

                            <div className="lg:col-span-3">
                                <VersionTable data={monitoringData} isLoading={monitoringLoading} />
                            </div>
                        </section>
                    </>
                )}
            </section>
        </div>
    );
}
