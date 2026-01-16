import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Check, ChevronRight, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProjectQuery } from "@/features/dataset/queries/project.query";
import { useUnannotatedImagesQuery } from "@/features/dataset/queries/image.query";
import { useTrainModelMutation } from "@/features/dataset/mutations/project.mutation";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CreateVersionScreen } from "../version/create-version-screen";
import CustomToast from "@/components/ui/sonner";

export const TestStep = () => {
  const router = useRouter();
  const params = useParams();
  const projectId = Number(params.id);
  const { data: projectResponse } = useProjectQuery(projectId);
  const { data: imagesResponse } = useUnannotatedImagesQuery(projectId, 0, 3);

  const project = projectResponse?.data?.project;
  const versions = projectResponse?.data?.versions || [];

  const [isCreating, setIsCreating] = useState(false);
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(
    null
  );
  const [hasCreatedNewVersion, setHasCreatedNewVersion] = useState(false);
  const [createdVersionId, setCreatedVersionId] = useState<string | null>(null);
  const [createdVersionName, setCreatedVersionName] = useState<string | null>(
    null
  );

  const latestVersion = useMemo(() => {
    if (!versions.length) return null;
    return [...versions].sort((a, b) => (b.created || 0) - (a.created || 0))[0];
  }, [versions]);

  useEffect(() => {
    if (selectedVersionId) return;
    if (!latestVersion?.id) return;
    setSelectedVersionId(latestVersion.id);
  }, [latestVersion?.id, selectedVersionId]);

  useEffect(() => {
    if (!createdVersionName) return;
    const created = versions.find((v) => v.name === createdVersionName);
    if (!created?.id) return;
    setCreatedVersionId(created.id);
    setSelectedVersionId(created.id);
  }, [createdVersionName, versions]);

  const { mutate: trainModel, isPending: isTrainingModel } =
    useTrainModelMutation({
      onSuccess: () => {
        CustomToast.success("Model training started successfully!");
      },
      onError: (error: any) => {
        console.error("Train model error:", error);
        CustomToast.error(
          error?.response?.data?.message || "Failed to start model training"
        );
      },
    });

  const handleDeployModel = () => {
    if (!hasCreatedNewVersion) {
      CustomToast.error("Create a new version before deploying a model");
      return;
    }
    if (!selectedVersion) {
      CustomToast.error("Please select a version to deploy");
      return;
    }

    // Extract version number from version ID (e.g., "huzaifa-e6d6m/test-bhzn9/2" -> "2")
    const versionNumber = selectedVersion.id.split("/").pop() || "1";
    trainModel({
      projectId: projectId,
      versionNumber: versionNumber,
      modelType: "yolov8n", // Object Detection: yolov8n (nano - fast), yolov8s (small), yolov8m (medium), yolov8l (large)
    });
  };

  const selectedVersion =
    versions.find((v) => v.id === selectedVersionId) || versions[0];

  const selectedImages = imagesResponse?.results?.slice(0, 3) || [];
  const canDeploy =
    hasCreatedNewVersion && !!selectedVersion && !isTrainingModel;

  return (
    <div className="flex bg-[#f8f9fc] min-h-[600px]">
      {/* Left Sidebar - Versions List */}
      <div className="w-80 flex-none bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Versions</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* Create New Version Button */}
          <button
            onClick={() => setIsCreating(true)}
            className="w-full flex-col items-start gap-1 p-3 rounded-lg border-2 border-dashed border-[#6841ff]/30 bg-[#6841ff]/5 hover:bg-[#6841ff]/10 transition-colors group"
          >
            <div className="flex items-center gap-2 text-[#6841ff] font-semibold">
              <Plus className="h-4 w-4" />
              <span>Create New Version</span>
            </div>
          </button>

          {/* Version List Items */}
          {versions.length > 0 ? (
            versions.map((version) => (
              <button
                key={version.id}
                onClick={() => setSelectedVersionId(version.id)}
                className={cn(
                  "w-full flex-col items-start gap-1 p-3 rounded-lg border text-left transition-all",
                  selectedVersionId === version.id
                    ? "border-[#6841ff] bg-[#f5f3ff]"
                    : "border-slate-200 bg-white hover:border-slate-300"
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      selectedVersionId === version.id
                        ? "text-[#6841ff]"
                        : "text-slate-900"
                    )}
                  >
                    {version.name}
                  </span>
                  {selectedVersionId === version.id && (
                    <span className="bg-[#6841ff] text-white text-[10px] px-1.5 py-0.5 rounded">
                      Selected
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono">
                    V{version.id.split("/").pop() || "1"}
                  </span>
                  <span>
                    {format(new Date(version.created * 1000), "MMM d, yyyy")}
                  </span>
                </div>
              </button>
            ))
          ) : (
            // Empty state - no versions available
            <div className="w-full p-4 text-center space-y-2">
              <div className="text-slate-400 text-sm">
                No versions available
              </div>
              <div className="text-slate-500 text-xs">
                Please create a version to get started
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      {isCreating ? (
        <CreateVersionScreen
          onBack={() => setIsCreating(false)}
          onCreated={({ versionId, versionName }) => {
            setHasCreatedNewVersion(true);
            setCreatedVersionName(versionName);
            if (versionId) {
              setCreatedVersionId(versionId);
              setSelectedVersionId(versionId);
            }
          }}
          project={project}
          versions={versions}
          projectId={projectId}
        />
      ) : !selectedVersion ? (
        // Empty State - No Version Selected
        <div className="flex-1 flex items-center justify-center bg-[#f8f9fc]">
          <div className="text-center space-y-4 max-w-md">
            <div className="mx-auto h-16 w-16 bg-[#6841ff]/10 rounded-full flex items-center justify-center">
              <Box className="h-8 w-8 text-[#6841ff]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">
                No Versions Available
              </h3>
              <p className="text-slate-500 text-sm">
                Create your first version to start training models and deploying
                your dataset.
              </p>
            </div>
            <Button
              onClick={() => setIsCreating(true)}
              className="bg-[#6841ff] hover:bg-[#5936db] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Version
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 border-b border-slate-200 bg-white flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-slate-900 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                  v{selectedVersion.id.split("/").pop() || "1"}
                </span>
                <h1 className="text-xl font-bold text-slate-900">
                  {selectedVersion.name}
                </h1>
              </div>
              <div className="text-xs text-slate-500">
                Generated on{" "}
                {format(
                  new Date(selectedVersion.created * 1000 || Date.now()),
                  "MMM d, yyyy"
                )}{" "}
                by{" "}
                <span className="text-slate-700 font-medium">
                  Workspace {project?.id?.split("/")[0]}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* <Button variant="outline" className="h-9 gap-2 text-slate-700">
                    <Download className="h-4 w-4" />
                    Download Dataset
                </Button> */}
              <Button
                variant="outline"
                onClick={handleDeployModel}
                disabled={!canDeploy}
                title={
                  !hasCreatedNewVersion
                    ? "Create a new version to deploy a model"
                    : undefined
                }
                className="h-9 gap-2 border-[#6841ff] text-[#6841ff] hover:bg-[#f5f3ff] hover:text-[#6841ff] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Box className="h-4 w-4" />
                {isTrainingModel ? "Deploying..." : "Deploy Model"}
              </Button>
              <Button
                onClick={() => router.push("/dashboard/dataset")}
                className="h-9 gap-2 bg-[#6841ff] hover:bg-[#5936db] text-white font-medium"
              >
                Finish
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {/* Info Box */}
            <div className="max-w-3xl">
              <p className="text-sm text-slate-500 mb-4">
                Prepare your images and data for training by compiling them into
                a version. Experiment with different configurations to achieve
                better training results.
              </p>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Version Name:
                </label>
                <Input
                  value={selectedVersion.name}
                  readOnly
                  className="bg-white border-slate-200 text-slate-500"
                />
              </div>
            </div>

            {/* Source Images Section */}
            <div className="flex gap-6 max-w-3xl border-t border-slate-100 pt-8">
              <div className="flex-none">
                <div className="h-10 w-10 bg-[#6841ff] rounded-full flex items-center justify-center shadow-lg shadow-[#6841ff]/20">
                  <Check className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Source Images
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-8">
                    <span className="w-24 font-bold text-slate-700">
                      Images:
                    </span>
                    <span className="text-slate-600">
                      {selectedVersion.images}
                    </span>
                  </div>
                  <div className="flex items-center gap-8">
                    <span className="w-24 font-bold text-slate-700">
                      Classes:
                    </span>
                    <span className="text-slate-600">
                      {project?.classes
                        ? Object.keys(project.classes).length
                        : 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-8">
                    <span className="w-24 font-bold text-slate-700">
                      Unannotated:
                    </span>
                    <span className="text-slate-600">
                      {project?.unannotated || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Images Grid */}
            <div className="max-w-3xl pt-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4 pl-16">
                {selectedVersion.images} Total Images
              </h3>
              <div className="pl-16 flex gap-4">
                {selectedImages.length > 0
                  ? selectedImages.map((img) => (
                      <div
                        key={img.id}
                        className="h-24 w-24 rounded-lg overflow-hidden border border-slate-200 bg-white relative"
                      >
                        <img
                          src={img.url || img.urls?.original}
                          alt={img.name}
                          className="h-full w-full object-cover"
                        />
                        {/* Overlay for class if annotated (mock) */}
                        {/* <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="border border-green-400 h-1/2 w-1/2" />
                                </div> */}
                      </div>
                    ))
                  : [1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-24 w-24 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200"
                      >
                        <span className="text-xs text-slate-400">No Image</span>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
