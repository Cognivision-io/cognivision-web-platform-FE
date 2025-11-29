import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  ImageIcon,
  MoreHorizontal,
  Search,
  Users,
} from "lucide-react";
import { CreateWorkspaceDialog } from "@/features/dataset/components/create-workspace-dialog";

const projects = [
  {
    id: "1",
    type: "Object detection",
    title: "My first project",
    edited: "Edited 1 day ago",
    images: 0,
    models: 0,
  },
];

const DatasetPage = () => {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#f4f6ff] px-6 py-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        {/* Top bar */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          {/* Title */}
          <div>
            <h1 className="text-[32px] font-semibold leading-tight text-slate-900">
              Dataset
            </h1>
          </div>

          {/* Right actions */}
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6841ff]/12 text-sm font-semibold text-[#6841ff]">
                H
              </div>

              <button className="inline-flex items-center gap-2 rounded-full border border-[#e1e4f5] bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-colors hover:border-[#ced3f0]">
                <Users className="h-4 w-4 text-slate-500" />
                Invite Team
              </button>
            </div>
          </div>
        </div>

        {/* Filters: search + sort */}
        {/* Search + Sort + New Project in one row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left side: Search */}
          <div className="flex w-full space-x-3">
            <div className="relative w-full md:max-w-[300px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                type="search"
                placeholder="Search projects"
                className="h-10 rounded-lg border border-[#e1e4f5] bg-white pl-11 text-sm text-slate-900 placeholder:text-slate-400 shadow-[0_1px_2px_rgba(15,23,42,0.02)] focus-visible:ring-0"
              />
            </div>

            {/* Right side: sort + new project */}
            <button className="inline-flex w-full items-center justify-between gap-3 rounded-lg border border-[#e1e4f5] bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.02)] transition hover:border-[#ced3f0] md:w-auto">
              <span className="text-xs font-medium text-slate-500">Sort :</span>
              <span className="text-sm font-semibold text-slate-900">
                Date Edited
              </span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>
          </div>
          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
            <CreateWorkspaceDialog />
          </div>
        </div>

        {/* Project list */}
        <div className="space-y-4 pt-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-4 rounded-lg border border-[#e3e5f1] bg-white px-5 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.04)] w-[60%]"
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
                      {project.title}
                    </h3>
                  </div>

                  <button className="text-slate-500 transition hover:text-slate-800">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-0.5 text-xs text-slate-500">
                  {project.edited}
                </p>

                <div className="mt-1 flex items-center gap-2 text-xs font-medium text-slate-600">
                  <span>{project.images} Images</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span>{project.models} Models</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DatasetPage;
