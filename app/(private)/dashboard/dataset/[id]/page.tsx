"use client";

import { useParams, useRouter } from "next/navigation";
import { useProjectQuery } from "@/features/dataset/queries/project.query";
import {
  ArrowLeft,
  Upload,
  Settings,
  Calendar,
  Image as ImageIcon,
  Eye,
  Shield,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestModelDialog } from "@/features/dataset/components/test-model/test-model-dialog";

import { formatDistanceToNow } from "date-fns";

const ProjectDetailPage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const projectId = parseInt(params.id);

  const { data, isLoading, error } = useProjectQuery(projectId);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-[#f4f6ff] px-6 py-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-center">
          <div className="text-lg text-slate-500">
            Loading project details...
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-[#f4f6ff] px-6 py-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4">
          <div className="text-lg text-red-600">
            Failed to load project details
          </div>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const { workspace, project, versions } = data.data;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#f4f6ff] px-6 py-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e1e4f5] bg-white text-slate-600 transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-3xl font-semibold text-slate-900">
            {project.name}
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={() =>
              router.push(`/dashboard/dataset/${params.id}/upload-dataset`)
            }
            className="bg-[#6841ff] hover:bg-[#5835e6]"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Data
          </Button>
          {/* <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button> */}
        </div>

        {/* Project Info Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Workspace Card */}
          <div className="rounded-xl border border-[#e1e4f5] bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Workspace
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-500">Name</p>
                <p className="text-base font-medium text-slate-900">
                  {workspace.name}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">URL</p>
                <p className="text-base font-medium text-slate-900">
                  {workspace.url}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Members</p>
                <p className="text-base font-medium text-slate-900">
                  {workspace.members}
                </p>
              </div>
            </div>
          </div>

          {/* Project Info Card */}
          <div className="rounded-xl border border-[#e1e4f5] bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Project Details
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-slate-400" />
                <span className="rounded-full border border-[#e2e4f0] bg-[#f7f7fb] px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
                  {project.type}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-slate-400" />
                <p className="text-sm text-slate-900">{project.license}</p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <p className="text-sm text-slate-500">
                  Created{" "}
                  {formatDistanceToNow(new Date(project.created * 1000), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-slate-400" />
                <p className="text-sm text-slate-500">
                  {project.public ? "Public" : "Private"}
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Card */}
          <div className="rounded-xl border border-[#e1e4f5] bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-slate-600">
                  <ImageIcon className="h-4 w-4" />
                  Images
                </span>
                <span className="text-base font-semibold text-slate-900">
                  {project.images}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Unannotated</span>
                <span className="text-base font-semibold text-amber-600">
                  {project.unannotated}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Versions</span>
                <span className="text-base font-semibold text-slate-900">
                  {project.versions}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Annotation Type</span>
                <span className="text-xs font-medium text-slate-900">
                  {project.annotation}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Splits */}
        {project.splits && (
          <div className="rounded-xl border border-[#e1e4f5] bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Data Splits
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {Object.entries(project.splits).map(([key, value]) => (
                <div
                  key={key}
                  className="rounded-lg border border-[#e3e5f1] bg-[#f8f9fc] p-4"
                >
                  <p className="mb-1 text-xs uppercase tracking-wide text-slate-500">
                    {key}
                  </p>
                  <p className="text-2xl font-bold text-slate-900">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Classes */}
        {project.classes && Object.keys(project.classes).length > 0 && (
          <div className="rounded-xl border border-[#e1e4f5] bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Classes
            </h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(project.classes).map(([classId, count]) => {
                const color = project.colors?.[classId] || "#6841ff";
                return (
                  <div
                    key={classId}
                    className="flex items-center gap-2 rounded-lg border border-[#e3e5f1] bg-white px-4 py-2"
                  >
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm font-medium text-slate-900">
                      Class {classId}: {count} annotations
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Preprocessing Settings */}
        {project.preprocessing &&
          Object.keys(project.preprocessing).length > 0 && (
            <div className="rounded-xl border border-[#e1e4f5] bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Preprocessing
              </h3>
              <div className="space-y-3">
                {project.preprocessing.resize && (
                  <div>
                    <p className="text-sm font-medium text-slate-900">Resize</p>
                    <p className="text-sm text-slate-600">
                      {project.preprocessing.resize.format}{" "}
                      {project.preprocessing.resize.width} x{" "}
                      {project.preprocessing.resize.height}
                    </p>
                  </div>
                )}
                {project.preprocessing["auto-orient"] && (
                  <div>
                    <p className="text-sm text-slate-600">
                      Auto-orient enabled
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Augmentation Settings */}
        {project.augmentation &&
          Object.keys(project.augmentation).length > 0 && (
            <div className="rounded-xl border border-[#e1e4f5] bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Augmentation
              </h3>
              <div className="space-y-3">
                {project.augmentation.image && (
                  <div>
                    <p className="text-sm text-slate-600">
                      Image versions: {project.augmentation.image.versions}
                    </p>
                  </div>
                )}
                {project.augmentation.flip && (
                  <div>
                    <p className="text-sm text-slate-600">
                      Flip:{" "}
                      {project.augmentation.flip.horizontal ? "Horizontal" : ""}{" "}
                      {project.augmentation.flip.vertical ? "Vertical" : ""}
                    </p>
                  </div>
                )}
                {project.augmentation.brightness && (
                  <div>
                    <p className="text-sm text-slate-600">
                      Brightness: ±{project.augmentation.brightness.percent}%
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Versions List */}
        {versions && versions.length > 0 && (
          <div className="rounded-xl border border-[#e1e4f5] bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Versions ({versions.length})
            </h3>
            <div className="space-y-3">
              {versions.map((version) => (
                <div
                  key={version.id}
                  className="rounded-lg border border-[#e3e5f1] bg-[#f8f9fc] p-4"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {version.name}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Created{" "}
                        {formatDistanceToNow(new Date(version.created * 1000), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-slate-600">
                      {version.images} images
                    </span>
                  </div>
                  {version.exports && version.exports.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {version.exports.map((exportFormat) => (
                        <span
                          key={exportFormat}
                          className="rounded-full bg-[#6841ff]/10 px-3 py-1 text-xs font-medium text-[#6841ff]"
                        >
                          {exportFormat}
                        </span>
                      ))}
                    </div>
                  )}
                  {version.model && (
                    <div className="mt-3 flex items-center justify-between rounded-md bg-green-50 p-3">
                      <p className="text-xs font-medium text-green-800">
                        Model trained: mAP {version.model.map}
                      </p>
                      <TestModelDialog version={version} project={project}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 border-green-200 bg-white text-xs hover:bg-green-100 hover:text-green-900"
                        >
                          Test Model
                        </Button>
                      </TestModelDialog>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
