"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronDown,
  Edit,
  ImageIcon,
  MoreHorizontal,
  Search,
  Users,
} from "lucide-react";
import { CreateProjectDialog } from "@/features/dataset/components/create-project-dialog";
import {
  useProjectsQuery,
  useDeleteProjectMutation,
} from "@/features/dataset/queries/project.query";
import { useWorkspacesQuery } from "@/features/workspace/queries/workspace.query";
import { CreateWorkspaceDialog } from "@/features/workspace/components/create-workspace-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

const DatasetPage = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<number | null>(
    null
  );

  // Get user initials
  const getUserInitials = () => {
    if (!user) return "U";
    const firstInitial = user.firstName?.charAt(0).toUpperCase() || "";
    const lastInitial = user.lastName?.charAt(0).toUpperCase() || "";
    return firstInitial + lastInitial || "U";
  };

  const { data: workspacesData, isLoading: workspacesLoading } =
    useWorkspacesQuery({
      page: 1,
      limit: 50,
    });

  const { data: projectsData, isLoading: projectsLoading } = useProjectsQuery({
    page: 1,
    limit: 50,
    search: debouncedSearch,
  });

  const { mutate: deleteProject } = useDeleteProjectMutation();

  const workspaces = workspacesData?.data?.data || [];
  const projects = projectsData?.data?.data || [];

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

  const filteredProjects = useMemo(() => {
    if (!selectedWorkspaceId) return projects;
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

  const handleProjectClick = (projectId: string) => {
    router.push(`/dashboard/dataset/${projectId}`);
  };

  const handleWorkspaceCreated = (workspaceId: number) => {
    setSelectedWorkspaceId(workspaceId);
  };

  const canCreateProject = !!selectedWorkspaceId;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#f4f6ff] px-6 py-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        {/* Top bar */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          {/* Title */}
          <div>
            <h1 className="text-[32px] font-semibold leading-tight text-slate-900">
              Projects
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {selectedWorkspace
                ? `Workspace: ${selectedWorkspace.name}`
                : "Select a workspace to see its projects."}
            </p>
          </div>

          {/* Right actions */}
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6841ff]/12 text-sm font-semibold text-[#6841ff]">
                {getUserInitials()}
              </div>

              <button className="inline-flex items-center gap-2 rounded-full border border-[#e1e4f5] bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-colors hover:border-[#ced3f0]">
                <Users className="h-4 w-4 text-slate-500" />
                Invite Team
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full flex-col gap-3 md:flex-row md:items-center">
            <div className="w-full md:max-w-[240px]">
              <Select
                value={selectedWorkspaceId ? String(selectedWorkspaceId) : ""}
                onValueChange={(value) => {
                  const nextId = Number(value);
                  if (Number.isNaN(nextId)) return;
                  setSelectedWorkspaceId(nextId);
                }}
              >
                <SelectTrigger className="h-10 w-full rounded-lg border border-[#e1e4f5] bg-white px-4 text-sm font-medium text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.02)] focus:ring-0">
                  <SelectValue placeholder="Select workspace" />
                </SelectTrigger>
                <SelectContent>
                  {workspacesLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading workspaces...
                    </SelectItem>
                  ) : workspaces.length === 0 ? (
                    <SelectItem value="empty" disabled>
                      No workspaces available
                    </SelectItem>
                  ) : (
                    workspaces.map((workspace) => (
                      <SelectItem
                        key={workspace.id}
                        value={String(workspace.id)}
                      >
                        {workspace.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="relative w-full md:max-w-[300px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                type="search"
                placeholder="Search projects"
                className="h-10 rounded-lg border border-[#e1e4f5] bg-white pl-11 text-sm text-slate-900 placeholder:text-slate-400 shadow-[0_1px_2px_rgba(15,23,42,0.02)] focus-visible:ring-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button className="inline-flex w-full items-center justify-between gap-3 rounded-lg border border-[#e1e4f5] bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.02)] transition hover:border-[#ced3f0] md:w-auto">
              <span className="text-xs font-medium text-slate-500">Sort :</span>
              <span className="text-sm font-semibold text-slate-900">
                Date Edited
              </span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
            <CreateWorkspaceDialog
              nextOrder={workspaces.length + 1}
              onCreated={(workspace) => handleWorkspaceCreated(workspace.id)}
            />
            <CreateProjectDialog
              workspaces={workspaces}
              defaultWorkspaceId={selectedWorkspaceId ?? undefined}
              disabled={!canCreateProject}
            />
          </div>
        </div>

        {/* Project list */}
        <div className="space-y-4 pt-2">
          {workspacesLoading ? (
            <div className="text-center text-sm text-slate-500">
              Loading workspaces...
            </div>
          ) : workspaces.length === 0 ? (
            <div className="rounded-xl border border-[#e1e4f5] bg-white px-6 py-6 text-center text-sm text-slate-500 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
              No workspaces yet. Create one to start your first project.
            </div>
          ) : projectsLoading ? (
            <div className="text-center text-sm text-slate-500">
              Loading projects...
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center text-sm text-slate-500">
              No projects found in this workspace.
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-4 rounded-lg border border-[#e3e5f1] bg-white px-5 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.04)] w-[60%] cursor-pointer transition-all hover:border-[#6841ff]/30 hover:shadow-[0_10px_24px_rgba(104,65,255,0.08)]"
                role="button"
                tabIndex={0}
                onClick={() => handleProjectClick(project.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleProjectClick(project.id);
                  }
                }}
              >
                {/* Thumbnail */}
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#e4e6f2] bg-[#f7f7fd] text-slate-300">
                  <ImageIcon className="h-7 w-7" />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex flex-wrap items-start gap-3 sm:items-center sm:justify-between">
                    <div>
                      <span className="inline-flex rounded-full border border-[#e2e4f0] bg-[#f7f7fb] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-600">
                        {project.type}
                      </span>
                      <h3 className="mt-2 text-base font-semibold text-slate-900">
                        {project.name}
                      </h3>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="text-slate-500 transition hover:text-slate-800"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectClick(project.id);
                          }}
                          className="flex items-center gap-2"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProject(project.id);
                          }}
                          className="text-red-600 focus:text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Edited{" "}
                    {formatDistanceToNow(new Date(project.updatedAt), {
                      addSuffix: true,
                    })}
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-xs font-medium text-slate-600">
                    <span>{project.images || 0} Images</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span>{project.models || 0} Models</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DatasetPage;
