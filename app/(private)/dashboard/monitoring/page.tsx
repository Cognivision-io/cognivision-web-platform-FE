"use client";

import { useEffect, useMemo, useState } from "react";
import SummaryCards from "@/components/dashboard/monitoring/SummaryCards";
import AnnotationCard from "@/components/dashboard/monitoring/AnnotationCard";
import VersionTable from "@/components/dashboard/monitoring/VersionTable";
import DetailedLogsTable from "@/components/dashboard/monitoring/DetailedLogsTable";
import { useProjectsQuery } from "@/features/dataset/queries/project.query";
import { useMonitoringStats } from "@/features/monitoring/queries/monitoring.query";
import { useWorkspacesQuery } from "@/features/workspace/queries/workspace.query";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import type { TimeRange } from "@/interfaces/monitoring.interface";

export default function MonitoringPage() {
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<number | null>(
    null
  );
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [timeRange, setTimeRange] = useState<TimeRange>("7");

  const { data: workspacesData, isLoading: workspacesLoading } =
    useWorkspacesQuery({
      page: 1,
      limit: 50,
    });

  const { data: projectsData, isLoading: projectsLoading } = useProjectsQuery({
    page: 1,
    limit: 100,
  });

  const workspaces = workspacesData?.data?.data || [];

  useEffect(() => {
    if (workspaces.length === 0) {
      setSelectedWorkspaceId(null);
      return;
    }

    const hasSelectedWorkspace = workspaces.some(
      (workspace) => workspace.id === selectedWorkspaceId
    );

    if (!selectedWorkspaceId || !hasSelectedWorkspace) {
      setSelectedWorkspaceId(workspaces[0].id);
    }
  }, [workspaces, selectedWorkspaceId]);

  const selectedWorkspace = useMemo(
    () => workspaces.find((workspace) => workspace.id === selectedWorkspaceId),
    [workspaces, selectedWorkspaceId]
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

  const projects = projectsData?.data?.data || [];

  const filteredProjects = useMemo(() => {
    if (!selectedWorkspaceId) return [];

    const projectIds = new Set(
      (selectedWorkspace?.projects ?? [])
        .map((projectId) => Number(projectId))
        .filter((projectId) => !Number.isNaN(projectId))
    );

    return projects.filter((project) => {
      if (project.workspaceId === selectedWorkspaceId) return true;
      const projectId = Number(project.id);
      if (Number.isNaN(projectId)) return false;
      return projectIds.has(projectId);
    });
  }, [projects, selectedWorkspace, selectedWorkspaceId]);

  useEffect(() => {
    if (!selectedWorkspaceId) {
      setSelectedProjectId("");
      return;
    }

    if (!selectedProjectId) return;
    const stillValid = filteredProjects.some(
      (project) => project.id === selectedProjectId
    );
    if (!stillValid) setSelectedProjectId("");
  }, [filteredProjects, selectedProjectId, selectedWorkspaceId]);

  const { data: monitoringData, isLoading: monitoringLoading } =
    useMonitoringStats(
      selectedProjectId
        ? {
            startTime: dateRanges[timeRange],
            endTime: new Date().toISOString().split("T")[0],
          }
        : undefined,
      { enabled: !!selectedWorkspaceId && !!selectedProjectId }
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
          {/* Workspace Selector */}
          <div className="relative w-full min-w-0 max-w-md">
            <select
              value={selectedWorkspaceId ? String(selectedWorkspaceId) : ""}
              onChange={(e) => {
                const nextId = Number(e.target.value);
                if (Number.isNaN(nextId)) return;
                setSelectedWorkspaceId(nextId);
              }}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-slate-900 shadow-sm hover:border-slate-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              disabled={workspacesLoading}
            >
              <option value="">
                {workspacesLoading
                  ? "Loading workspaces..."
                  : "Select a workspace"}
              </option>
              {workspaces.map((workspace) => (
                <option key={workspace.id} value={String(workspace.id)}>
                  {workspace.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
          </div>
        </div>

        <DetailedLogsTable
          workspaceId={selectedWorkspace?.id}
          workspaceName={selectedWorkspace?.name}
        />
      </section>
    </div>
  );
}
