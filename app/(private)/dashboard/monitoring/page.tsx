"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SummaryCards from "@/components/dashboard/monitoring/SummaryCards";
import AnnotationCard from "@/components/dashboard/monitoring/AnnotationCard";
import VersionTable from "@/components/dashboard/monitoring/VersionTable";
import DetailedLogsTable from "@/components/dashboard/monitoring/DetailedLogsTable";
import { useProjectsQuery } from "@/features/dataset/queries/project.query";
import { useMonitoringStats } from "@/features/monitoring/queries/monitoring.query";
import { ChevronDown } from "lucide-react";
import type { TimeRange } from "@/interfaces/monitoring.interface";
import { useCurrentWorkspaceId } from "@/hooks/use-current-workspace-id";
import { useWorkspaceQuery } from "@/features/workspace/queries/workspace.query";

const normalizeProjectId = (value: unknown) =>
  value === null || value === undefined ? "" : String(value);

export default function MonitoringPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();

  const workspaceId = useCurrentWorkspaceId();
  const { data: workspaceResponse } = useWorkspaceQuery(workspaceId);
  const workspaceName = workspaceResponse?.data?.name;

  const selectedProjectFromUrl = normalizeProjectId(searchParams.get("project"));
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    selectedProjectFromUrl,
  );
  const [timeRange, setTimeRange] = useState<TimeRange>("7");

  useEffect(() => {
    setSelectedProjectId(selectedProjectFromUrl);
  }, [selectedProjectFromUrl]);

  const { data: projectsData, isLoading: projectsLoading } = useProjectsQuery(
    {
      page: 1,
      limit: 100,
      workspace: workspaceId,
    },
    { enabled: !!workspaceId },
  );

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

  const projects = useMemo(
    () => projectsData?.data?.data ?? [],
    [projectsData],
  );

  useEffect(() => {
    if (projects.length === 0) return;
    const isValid = projects.some(
      (project) => normalizeProjectId(project.id) === selectedProjectId,
    );
    if (isValid) return;

    const nextProjectId = normalizeProjectId(projects[0].id);
    setSelectedProjectId(nextProjectId);

    const nextParams = new URLSearchParams(searchParamsString);
    nextParams.set("project", nextProjectId);
    router.replace(`${pathname}?${nextParams.toString()}`);
  }, [pathname, projects, router, searchParamsString, selectedProjectId]);

  const { data: monitoringData, isLoading: monitoringLoading } =
    useMonitoringStats(
      selectedProjectId
        ? {
            projectId: selectedProjectId,
            startTime: dateRanges[timeRange],
            endTime: new Date().toISOString().split("T")[0],
          }
        : undefined,
      { enabled: !!workspaceId && !!selectedProjectId },
    );

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-6 py-8 lg:px-10">
      <section>
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">Monitoring</h1>
          <p className="text-sm text-muted-foreground">
            Overview of model health and recent activity
          </p>
        </div>

        <div className="mb-6 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
          {/* Project Selector */}
          <div className="relative w-full min-w-0 max-w-md">
            <select
              value={selectedProjectId}
              onChange={(e) => {
                const nextProjectId = e.target.value;
                setSelectedProjectId(nextProjectId);

                const nextParams = new URLSearchParams(searchParamsString);
                if (nextProjectId) {
                  nextParams.set("project", nextProjectId);
                } else {
                  nextParams.delete("project");
                }
                router.replace(`${pathname}?${nextParams.toString()}`);
              }}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-slate-900 shadow-sm hover:border-slate-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              disabled={projectsLoading || !workspaceId}
            >
              <option value="">
                {projectsLoading
                  ? "Loading projects..."
                  : !workspaceId
                    ? "No workspace assigned"
                    : "Select a project"}
              </option>
              {projects.map((project) => (
                <option
                  key={normalizeProjectId(project.id)}
                  value={normalizeProjectId(project.id)}
                >
                  {project.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
          </div>
        </div>

        <div className="space-y-6">
          <SummaryCards
            data={monitoringData}
            isLoading={monitoringLoading}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
          />
          <AnnotationCard data={monitoringData} isLoading={monitoringLoading} />
          <VersionTable data={monitoringData} isLoading={monitoringLoading} />
        </div>

        <DetailedLogsTable
          key={`${workspaceId ?? "no-workspace"}:${selectedProjectId ?? "no-project"}`}
          workspaceId={workspaceId}
          workspaceName={workspaceName}
          projectId={selectedProjectId || undefined}
        />
      </section>
    </div>
  );
}
