"use client";

import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  Edit,
  ImageIcon,
  MoreHorizontal,
  Search,
  Users,
} from "lucide-react";
import { CreateProjectDialog } from "@/features/dataset/components/create-project-dialog";
import { WorkspaceCreditsHistoryTable } from "@/features/workspace/components/workspace-credits-history-table";
import { WorkspaceCreditsSummaryCard } from "@/features/workspace/components/workspace-credits-summary-card";
import {
  useProjectsQuery,
  useDeleteProjectMutation,
} from "@/features/dataset/queries/project.query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { initialsFromFullName } from "@/lib/utils";
import { useCurrentWorkspaceId } from "@/hooks/use-current-workspace-id";
import { useWorkspaceQuery } from "@/features/workspace/queries/workspace.query";

const DatasetPage = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const workspaceId = useCurrentWorkspaceId();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const getUserInitials = () => (user ? initialsFromFullName(user.name) : "U");

  const { data: workspaceResponse, isLoading: workspaceLoading } =
    useWorkspaceQuery(workspaceId);
  const workspaceName = workspaceResponse?.data?.name;

  const { data: projectsData, isLoading: projectsLoading } = useProjectsQuery(
    {
      page: 1,
      limit: 50,
      search: debouncedSearch,
      workspace: workspaceId,
    },
    { enabled: !!workspaceId }
  );

  const { mutate: deleteProject } = useDeleteProjectMutation();

  const projects = useMemo(() => projectsData?.data?.data ?? [], [projectsData]);

  const handleProjectClick = (projectId: string) => {
    router.push(`/dashboard/dataset/${projectId}`);
  };

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
              {workspaceLoading
                ? "Loading workspace..."
                : workspaceName
                  ? `Workspace: ${workspaceName}`
                  : workspaceId
                    ? `Workspace ID: ${workspaceId}`
                    : "No workspace assigned to your account."}
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
            <CreateProjectDialog
              workspaceId={workspaceId}
              disabled={!workspaceId}
            />
          </div>
        </div>

        {workspaceId && (
          <div className="space-y-4">
            <WorkspaceCreditsSummaryCard
              workspaceId={workspaceId}
              workspaceName={workspaceName}
            />
            <WorkspaceCreditsHistoryTable
              workspaceId={workspaceId}
              workspaceName={workspaceName}
              collapsible
              defaultCollapsed
            />
          </div>
        )}

	        {/* Project list */}
	        <div className="space-y-4 pt-2">
	          {!workspaceId ? (
            <div className="rounded-xl border border-[#e1e4f5] bg-white px-6 py-6 text-center text-sm text-slate-500 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
              No workspace is assigned to your account yet.
            </div>
          ) : projectsLoading ? (
            <div className="text-center text-sm text-slate-500">
              Loading projects...
            </div>
	          ) : projects.length === 0 ? (
	            <div className="text-center text-sm text-slate-500">
	              No projects found.
	            </div>
	          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex w-full items-center gap-4 rounded-lg border border-[#e3e5f1] bg-white px-5 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.04)] cursor-pointer transition-all hover:border-[#6841ff]/30 hover:shadow-[0_10px_24px_rgba(104,65,255,0.08)]"
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
                      <div className="min-w-0">
                        <span className="inline-flex rounded-full border border-[#e2e4f0] bg-[#f7f7fb] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-600">
                          {project.type}
                        </span>
                        <h3 className="mt-2 truncate text-base font-semibold text-slate-900">
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
                  </div>
                </div>
              ))}
            </div>
	          )}
	        </div>
      </div>
    </div>
  );
};

export default DatasetPage;
