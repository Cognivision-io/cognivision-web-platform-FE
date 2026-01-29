"use client";

import { useParams, useRouter } from "next/navigation";
import { useProjectQuery } from "@/features/dataset/queries/project.query";
import {
  ArrowLeft,
  Upload,
  Calendar,
  Image as ImageIcon,
  Eye,
  Link2,
  Shield,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestModelDialog } from "@/features/dataset/components/test-model/test-model-dialog";
import { ProjectImagesTabs } from "@/features/dataset/components/project-images-tabs";
import { formatDistanceToNow } from "date-fns";
import { useCurrentWorkspaceId } from "@/hooks/use-current-workspace-id";
import {
  useProjectApiKeyQuery,
  useProjectApiKeyValueQuery,
} from "@/features/api-key/queries/api-key.query";
import CustomToast from "@/components/ui/sonner";
import { useMemo } from "react";
import { Input } from "@/components/ui/input";

const ProjectDetailPage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const projectId = Number(params.id);
  const workspaceIdFromUser = useCurrentWorkspaceId();

  const { data, isLoading, error } = useProjectQuery(projectId);

  const projectDetails = data?.data;
  const workspace = projectDetails?.workspace;
  const project = projectDetails?.project;
  const versions = projectDetails?.versions;

  const workspaceIdForApiKey = (() => {
    if (workspaceIdFromUser) return workspaceIdFromUser;
    const fallback =
      typeof workspace?.id === "number" ? workspace.id : Number(workspace?.id);
    return Number.isFinite(fallback) && fallback > 0 ? fallback : undefined;
  })();

  const {
    data: projectApiKeyResponse,
    isLoading: isProjectApiKeyLoading,
    isError: isProjectApiKeyError,
  } = useProjectApiKeyQuery(
    {
      workspaceId: workspaceIdForApiKey,
      projectId: Number.isFinite(projectId) ? projectId : undefined,
      page: 1,
      limit: 10,
    },
    {
      enabled:
        !!workspaceIdForApiKey &&
        !!projectDetails &&
        Number.isFinite(projectId) &&
        !isLoading,
    },
  );

  const projectApiKeyEntry = useMemo(() => {
    const entries = projectApiKeyResponse?.data?.data ?? [];
    const match = entries.find((entry) => entry.project === projectId);
    return match ?? entries[0];
  }, [projectApiKeyResponse?.data?.data, projectId]);

  const projectApiKeyId = projectApiKeyEntry?.id;

  const {
    data: projectApiKeyValueResponse,
    isLoading: isProjectApiKeyValueLoading,
    isError: isProjectApiKeyValueError,
  } = useProjectApiKeyValueQuery(
    { apiKeyId: projectApiKeyId },
    {
      enabled:
        !!workspaceIdForApiKey &&
        !!projectApiKeyId &&
        !isProjectApiKeyLoading &&
        !isProjectApiKeyError,
    },
  );

  const projectApiKeyValue = projectApiKeyValueResponse?.data?.apiKey ?? "";

  const maskedProjectApiKeyValue = projectApiKeyValue
    ? "pj_**************************"
    : "";

  const copyProjectApiKey = async () => {
    try {
      if (!projectApiKeyValue) return;
      await navigator.clipboard.writeText(projectApiKeyValue);
      CustomToast.success("Copied API key");
    } catch (copyError) {
      console.error("Failed to copy API key", copyError);
      CustomToast.error("Failed to copy. Please try again.");
    }
  };

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

  if (error || !projectDetails || !workspace || !project || !versions) {
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
        </div>
        <div className="rounded-xl border border-[#e1e4f5] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* LEFT: Title + helper */}
            <div className="min-w-0">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Project API Key
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Use this API key to authenticate requests for this project.
              </p>
            </div>

            {/* RIGHT: Key + copy */}
            <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center md:justify-end">
              <Input
                readOnly
                value={
                  !workspaceIdForApiKey
                    ? "Workspace unavailable"
                    : isProjectApiKeyLoading || isProjectApiKeyValueLoading
                      ? "Loading..."
                      : isProjectApiKeyError || isProjectApiKeyValueError
                        ? "Failed to load"
                        : maskedProjectApiKeyValue || "API key not found"
                }
                className="h-10 w-full md:w-[420px] font-mono text-[12px] text-slate-900 border-[#e1e4f5] bg-[#f9fafb] focus-visible:ring-0"
              />

              <button
                type="button"
                className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#e1e4f5] bg-white px-4 text-xs font-semibold text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.02)] transition hover:border-[#ced3f0] disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => void copyProjectApiKey()}
                disabled={
                  !projectApiKeyValue ||
                  isProjectApiKeyLoading ||
                  isProjectApiKeyValueLoading
                }
                aria-label="Copy project API key"
              >
                <Link2 className="h-4 w-4 text-slate-500" />
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* Project Info Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-6">
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

              {/* Project API Key Card */}
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

        {/* Images */}
        <div className="rounded-xl border border-[#e1e4f5] bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Images
          </h3>
          <ProjectImagesTabs projectId={projectId} />
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
                      <TestModelDialog
                        version={version}
                        project={project}
                        workspaceName={workspace?.url}
                      >
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
