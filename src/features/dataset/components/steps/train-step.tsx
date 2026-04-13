import { useState, useEffect, memo } from "react";
import { Box, Download, Minus, Plus, Edit2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { useParams } from "next/navigation";
import {
  useUnannotatedImagesQuery,
  useImageDetailQuery,
  UNANNOTATED_IMAGES_QUERY_KEY,
} from "@/features/dataset/queries/image.query";
import { useProjectQuery } from "@/features/dataset/queries/project.query";
import {
  useAutoAnnotationBatchDirectMutation,
  useCreateProjectMutation,
  useUploadAnnotationMutation,
} from "@/features/dataset/mutations/project.mutation";
import { useUploadImagesMutation } from "@/features/dataset/mutations/upload.mutation";
import type { AnnotationItem } from "@/interfaces/project.interface";
import type { Image } from "@/interfaces/image.interface";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDropzone } from "react-dropzone";
import { ArrowRight, CloudUpload } from "lucide-react";
import { downloadImage } from "@/features/dataset/utils/dataset.utils";
import CustomToast from "@/components/ui/sonner";

interface TrainStepProps {
  onNext: () => void;
  uploadedData?: { roboflowProjectId: string; imageIds: string[] } | null;
}

export const TrainStep = ({ onNext, uploadedData }: TrainStepProps) => {
  const [zoom, setZoom] = useState(1);
  const [sliderValue, setSliderValue] = useState(50);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [annotations, setAnnotations] = useState<AnnotationItem[]>([]);
  const [collectedPoints, setCollectedPoints] = useState<
    { x: number; y: number }[]
  >([]);
  const [pointLabels, setPointLabels] = useState<{ [index: number]: string }>(
    {}
  );
  const [annotationLabels, setAnnotationLabels] = useState<{
    [index: number]: string;
  }>({});
  const [editingPointIndex, setEditingPointIndex] = useState<number | null>(
    null
  );
  const [tempLabel, setTempLabel] = useState("");
  // Track IDs from initial uploadedData AND new uploads in this step
  const [extendedImageIds, setExtendedImageIds] = useState<string[]>(
    uploadedData?.imageIds || []
  );
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [hasUploadedAnnotations, setHasUploadedAnnotations] = useState(false);
  const imageUploadRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { mutate: autoAnnotateBatch, isPending: isAnnotating } =
    useAutoAnnotationBatchDirectMutation();

  const { mutate: uploadImages, isPending: isUploading } =
    useUploadImagesMutation({
      onSuccess: (data) => {
        CustomToast.success("Images uploaded successfully");
        queryClient.invalidateQueries({
          queryKey: UNANNOTATED_IMAGES_QUERY_KEY,
        });

        // Extract new IDs from response
        const newIds =
          data.results?.successful?.map((item: any) => item.result.id) || [];
        if (newIds.length > 0) {
          setExtendedImageIds((prev) => [...prev, ...newIds]);
        }
        setIsUploadModalOpen(false);
      },
      onError: (error) => {
        console.error("Upload error:", error);
      },
    });

  const { mutate: uploadAnnotation, isPending: isUploadingAnnotation } =
    useUploadAnnotationMutation({
      onSuccess: () => {
        CustomToast.success("Annotation uploaded successfully!");
        setHasUploadedAnnotations(true);
      },
      onError: (error) => {
        console.error("Upload annotation error:", error);
        CustomToast.error("Failed to upload annotation");
      },
    });

  // Helper function to convert annotations to YOLO format
  const convertAnnotationsToYOLO = (
    annotations: AnnotationItem[]
  ): { yoloContent: string; classList: string[] } => {
    // Separate user-labeled and auto-generated labels
    const allClasses = annotations.map((ann) => ann.class || "unlabeled");
    const userLabels = allClasses.filter((cls) => !cls.startsWith("Object_"));
    const hasUnlabeled = allClasses.some((cls) => cls.startsWith("Object_"));

    // Build class list: user labels first (sorted), then 'unlabeled' if any exist
    const uniqueUserLabels = Array.from(new Set(userLabels)).sort();
    const classList = hasUnlabeled
      ? [...uniqueUserLabels, "unlabeled"]
      : uniqueUserLabels;

    const yoloLines = annotations
      .map((ann, index) => {
        // Map annotation class to class ID
        let className = ann.class || "unlabeled";
        // Convert auto-generated labels to 'unlabeled'
        if (className.startsWith("Object_")) {
          className = "unlabeled";
        }
        const classId = classList.indexOf(className);

        if (ann.polygon && ann.imageWidth && ann.imageHeight) {
          // Normalize polygon coordinates to 0-1 range
          const normalizedCoords = ann.polygon
            .map(([x, y]) => {
              return `${(x / ann.imageWidth!).toFixed(6)} ${(
                y / ann.imageHeight!
              ).toFixed(6)}`;
            })
            .join(" ");

          const yoloLine = `${classId} ${normalizedCoords}`;

          return yoloLine;
        }
        return "";
      })
      .filter((line) => line);

    const finalYoloFormat = yoloLines.join("\n");

    return {
      yoloContent: finalYoloFormat,
      classList: classList,
    };
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      if (!roboflowProjectId) {
        CustomToast.error("Project ID not found. Please try refreshing.");
        return;
      }
      uploadImages({
        projectId: roboflowProjectId,
        files: acceptedFiles,
        batch: "train-step-upload",
      });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".bmp", ".webp", ".avif"],
      "video/*": [".mp4", ".mov", ".webm"],
    },
    multiple: true,
  });

  const params = useParams();
  const projectId = Number(params.id);

  // Fetch list of images (fallback if no uploadedData, or for the sidebar list)
  // Passing limit 50 to ensure we see more images
  const { data: imagesData } = useUnannotatedImagesQuery(projectId, 0, 50);

  // Fetch project details to get Roboflow ID if uploadedData is missing
  const { data: projectData } = useProjectQuery(projectId);
  const roboflowProjectId =
    uploadedData?.roboflowProjectId || projectData?.data?.project?.id || "";

  // Decide which list to show in sidebar
  // We simply show all unannotated images available.
  const trainFiles = imagesData?.results || [];

  const currentFile = trainFiles[selectedFileIndex];

  // If we have uploadedData, we can try to fetch strict details using the project ID from the upload context.
  // We use currentFile.id (from the full list) rather than strict index mapping to uploadedData.imageIds,
  // because the sidebar shows ALL unannotated images, not just the uploaded batch.
  // Prioritize uploadedData IDs if available, otherwise fallback to the list
  const selectedImageId =
    trainFiles[selectedFileIndex]?.id || extendedImageIds[selectedFileIndex];

  const { data: imageDetail } = useImageDetailQuery(
    roboflowProjectId,
    String(selectedImageId),
    { enabled: !!roboflowProjectId && !!selectedImageId }
  );

  // Reset annotations and points when image changes
  useEffect(() => {
    setAnnotations([]);
    setCollectedPoints([]);
    setPointLabels({});
  }, [selectedImageId]); // Trigger on ID change

  // Determine the display URL for the main canvas
  // If detail is fetched, use its high-res original url.
  // Otherwise fall back to the list's url (which might be a thumb or standard url).
  const displayImage =
    uploadedData && imageDetail?.data?.image
      ? imageDetail.data.image
      : currentFile;

  // Helper to get safe URL
  const getImageUrl = (img: any) => {
    if (!img) return "";
    return img.urls?.original || img.url || "";
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 1));
  const handleReset = () => setZoom(1);

  const handleClearAnnotations = () => {
    setAnnotations([]);
    setAnnotationLabels({});
    setCollectedPoints([]);
    setPointLabels({});
    setEditingPointIndex(null);
    setTempLabel("");
    setHasUploadedAnnotations(false);
    CustomToast.success("Annotations cleared");
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!displayImage || !roboflowProjectId) return;

    // Clear previous annotations when starting a new point collection
    if (collectedPoints.length === 0) {
      if (annotations.length > 0) {
        setAnnotations([]);
        setAnnotationLabels({});
        setHasUploadedAnnotations(false);
      }
    }

    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();

    // Calculate absolute pixel coordinates relative to image
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Add point to collected points
    setCollectedPoints((prev) => [...prev, { x, y }]);
  };

  const handleSubmitBatchAnnotation = () => {
    if (!displayImage || !roboflowProjectId || collectedPoints.length === 0)
      return;

    // Get the actual displayed image to measure its rendered size
    const imgElement = document.querySelector(
      'img[alt="Preview"]'
    ) as HTMLImageElement;
    if (!imgElement) {
      CustomToast.error("Unable to measure image size");
      return;
    }

    const displayedWidth = imgElement.width;
    const displayedHeight = imgElement.height;
    // Use naturalWidth/naturalHeight for the TRUE original image dimensions
    const originalWidth = imgElement.naturalWidth;
    const originalHeight = imgElement.naturalHeight;

    // Calculate scale factor from displayed to original
    const scaleX = originalWidth / displayedWidth;
    const scaleY = originalHeight / displayedHeight;

    // Convert points from displayed coordinates to original image coordinates
    const normalizedPoints = collectedPoints.map((point) => ({
      x: Math.round((point.x / zoom) * scaleX),
      y: Math.round((point.y / zoom) * scaleY),
    }));

    autoAnnotateBatch(
      {
        imageId: String(displayImage.id || ""),
        points: normalizedPoints,
        imageUrl: getImageUrl(displayImage),
        projectId: roboflowProjectId,
      },
      {
        onSuccess: (response) => {
          console.log("AutoAnnotate Batch Response:", response.data);
          const data = response.data;

          if (
            data &&
            data.success &&
            data.objects &&
            Array.isArray(data.objects)
          ) {
            // Handle new batch response format with multiple objects
            const newAnnotations = data.objects.map(
              (obj: any, objIndex: number): AnnotationItem => {
                // Get the class label from the corresponding point (if available)
                const pointIndex =
                  objIndex < collectedPoints.length ? objIndex : 0;
                const className =
                  pointLabels[pointIndex] ||
                  `Object_${annotations.length + objIndex + 1}`;

                const annotation: AnnotationItem = {
                  class: className,
                  confidence: 1.0,
                  imageWidth: data.imageWidth,
                  imageHeight: data.imageHeight,
                };

                // Add polygon if available
                if (obj.polygon && Array.isArray(obj.polygon)) {
                  annotation.polygon = obj.polygon as [number, number][];
                }

                // Add mask area if available
                if (obj.mask_area !== undefined) {
                  annotation.maskArea = obj.mask_area;
                }

                // Normalize BBox if available [x, y, width, height]
                if (
                  obj.bbox &&
                  Array.isArray(obj.bbox) &&
                  data.imageWidth &&
                  data.imageHeight
                ) {
                  const [bx, by, bw, bh] = obj.bbox;
                  annotation.x = (bx + bw / 2) / data.imageWidth;
                  annotation.y = (by + bh / 2) / data.imageHeight;
                  annotation.width = bw / data.imageWidth;
                  annotation.height = bh / data.imageHeight;
                }

                return annotation;
              }
            );

            // Store labels for these annotations
            const startIndex = annotations.length;
            newAnnotations.forEach((ann, idx) => {
              setAnnotationLabels((prev) => ({
                ...prev,
                [startIndex + idx]: ann.class || "",
              }));
            });

            setAnnotations((prev) => [...prev, ...newAnnotations]);
            setCollectedPoints([]);
            setPointLabels({}); // Clear point labels after creating annotations
            CustomToast.success(`${newAnnotations.length} object(s) detected`);
          }
        },
        onError: () => {
          CustomToast.error("Failed to annotate objects");
        },
      }
    );
  };

  return (
    <div className="flex h-[calc(100vh-16rem)] min-h-[600px]">
      {/* Left Sidebar - Files List */}
      <div className="w-20 flex-none border-r border-slate-200 bg-white py-4">
        <div className="mb-4 flex flex-col items-center gap-1 px-2">
          <span className="text-xs font-semibold text-slate-500">Files</span>
          <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-slate-100 px-1.5 text-[10px] font-bold text-slate-600">
            {trainFiles.length}
          </span>
        </div>

        <div className="flex flex-col items-center gap-3 px-2">
          <input
            type="file"
            ref={imageUploadRef}
            className="hidden"
            multiple
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                if (!roboflowProjectId) {
                  CustomToast.error(
                    "Project ID not found. Please try refreshing."
                  );
                  return;
                }
                uploadImages({
                  projectId: roboflowProjectId,
                  files: Array.from(e.target.files),
                  batch: "train-step-upload",
                });
              }
            }}
          />
          <button
            onClick={() => imageUploadRef.current?.click()}
            disabled={isUploading}
            className="flex h-12 w-12 items-center justify-center rounded-lg border border-dashed border-slate-300 hover:border-primary hover:bg-primary/5 disabled:opacity-50"
          >
            <Plus className="h-5 w-5 text-slate-400" />
          </button>

          <div className="flex flex-col gap-2 overflow-y-auto pb-4 max-h-[35rem]">
            {trainFiles.map((file, i) => (
              <SidebarImageItem
                key={file.id || i}
                image={file}
                isSelected={selectedFileIndex === i}
                onClick={() => setSelectedFileIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Center - Canvas */}
      <div className="flex flex-1 flex-col bg-[#f8f9fc]">
        {/* Canvas Header */}
        <div className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-900">
              {displayImage?.name || "No image selected"}
            </span>
            <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
              Smart Annotation
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="rounded p-1.5 text-slate-500 hover:bg-slate-100"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center text-xs font-medium text-slate-600">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="rounded p-1.5 text-slate-500 hover:bg-slate-100"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              onClick={handleReset}
              className="ml-2 text-xs font-medium text-slate-500 hover:text-slate-900"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="relative flex-1 overflow-hidden bg-[#0b0f2c] p-8">
          <div className="flex h-full w-full items-center justify-center">
            <div
              className="relative transition-transform duration-200 ease-out"
              style={{ transform: `scale(${zoom})` }}
            >
              {displayImage && (
                <img
                  src={getImageUrl(displayImage)}
                  alt="Preview"
                  className={cn(
                    "max-h-[500px] object-contain cursor-crosshair",
                    isAnnotating && "opacity-80 cursor-wait"
                  )}
                  onClick={handleImageClick}
                />
              )}
              {/* Collected Points - Before API Call */}
              {collectedPoints.length > 0 && (
                <div className="absolute inset-0 pointer-events-none">
                  {collectedPoints.map((point, i) => (
                    <div
                      key={`collected-${i}`}
                      className="absolute"
                      style={{
                        left: `${point.x}px`,
                        top: `${point.y}px`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {/* Point Circle - non-interactive, clicks pass through */}
                      <div className="flex items-center justify-center relative">
                        <div className="h-6 w-6 rounded-full border-2 border-blue-500 bg-blue-100/50 flex items-center justify-center pointer-events-none">
                          <div className="h-2 w-2 rounded-full bg-blue-500" />
                        </div>
                        {/* Point Label with Edit Button - interactive area */}
                        <div className="absolute top-0 -right-6 flex items-center gap-1 pointer-events-auto group">
                          <div className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap">
                            {pointLabels[i] || `P${i + 1}`}
                          </div>
                          {/* Edit Button - appears on hover */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingPointIndex(i);
                              setTempLabel(pointLabels[i] || "");
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded p-0.5 shadow-sm hover:bg-blue-50"
                            title="Edit label"
                          >
                            <Edit2 className="h-3 w-3 text-blue-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* Annotations */}
              {annotations.map((ann, i) => (
                <div key={i} className="absolute inset-0 pointer-events-none">
                  {/* Render Polygon if available */}
                  {ann.polygon && ann.imageWidth && ann.imageHeight && (
                    <svg
                      viewBox={`0 0 ${ann.imageWidth} ${ann.imageHeight}`}
                      className="absolute left-0 top-0 h-full w-full"
                      preserveAspectRatio="none"
                    >
                      <polygon
                        points={ann.polygon.map((p) => p.join(",")).join(" ")}
                        className="fill-[#4ade80]/20 stroke-[#4ade80]"
                        strokeWidth="2"
                      />
                    </svg>
                  )}

                  {/* Render BBox (Fallback or Always? Usually just fallback if polygon exists, but sticking to logic) */}
                  {!ann.polygon &&
                    ann.x !== undefined &&
                    ann.y !== undefined &&
                    ann.width !== undefined &&
                    ann.height !== undefined && (
                      <div
                        className="absolute border-2 border-[#4ade80]"
                        style={{
                          left: `${(ann.x - ann.width / 2) * 100}%`,
                          top: `${(ann.y - ann.height / 2) * 100}%`,
                          width: `${ann.width * 100}%`,
                          height: `${ann.height * 100}%`,
                        }}
                      />
                    )}

                  {/* Render Label ALWAYS if coordinates exist */}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex h-16 items-center border-t border-slate-200 bg-white px-6">
          <div className="flex w-full items-center gap-6">
            <span className="text-xs font-bold text-slate-900">
              {collectedPoints.length > 0
                ? `Points: ${collectedPoints.length}`
                : "Predictions"}
            </span>
            <div className="flex flex-1 items-center gap-4">
              <span className="text-[10px] font-medium text-slate-500">
                Fewer Objects
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(parseInt(e.target.value))}
                className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#6841ff]"
              />
              <span className="text-[10px] font-medium text-slate-500">
                More Objects
              </span>
            </div>
            {collectedPoints.length === 0 && annotations.length > 0 && (
              <button
                onClick={handleClearAnnotations}
                className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                disabled={isAnnotating}
                title="Clear current predictions/annotations"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear Annotations
              </button>
            )}
            {collectedPoints.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => setCollectedPoints([])}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  disabled={isAnnotating}
                >
                  Clear Points
                </button>
                <button
                  onClick={handleSubmitBatchAnnotation}
                  className="rounded-lg bg-[#6841ff] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#5936db] disabled:opacity-50"
                  disabled={isAnnotating}
                >
                  {isAnnotating ? "Annotating..." : "Annotate"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 flex-none border-l border-slate-200 bg-white p-6">
        <h3 className="text-sm font-bold text-slate-900">
          How is your model looking?
        </h3>
        <p className="mt-2 text-xs text-slate-500">
          You can adjust the slider to show more or less objects before taking
          your next action.
        </p>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <Plus className="h-4 w-4" />
            Test on More Files
          </button>

          <button
            onClick={() => {
              if (annotations.length > 0 && displayImage) {
                // Convert annotations to YOLO format
                const { yoloContent, classList } =
                  convertAnnotationsToYOLO(annotations);

                // Create a text file from the YOLO content
                const blob = new Blob([yoloContent], { type: "text/plain" });
                const file = new File(
                  [blob],
                  `${displayImage.id}_annotation.txt`,
                  { type: "text/plain" }
                );

                // Create label map : { "0": "class_name" }
                const labelMap: Record<string, string> = {};
                classList.forEach((cls, idx) => {
                  labelMap[String(idx)] = cls;
                });

                // Upload the annotation file
                uploadAnnotation({
                  projectId: projectId,
                  imageId: String(displayImage.id),
                  file: file,
                  labelMap,
                });

                // Log class mapping for reference
                CustomToast.success(
                  `Uploaded with ${
                    classList.length
                  } class(es): ${classList.join(", ")}`
                );
              }
            }}
            disabled={annotations.length === 0 || isUploadingAnnotation}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CloudUpload className="h-4 w-4" />
            {isUploadingAnnotation ? "Uploading..." : "Upload Annotation"}
          </button>

          <button
            onClick={async () => {
              if (displayImage) {
                try {
                  const imageUrl = getImageUrl(displayImage);
                  const filename =
                    displayImage.name ||
                    `image_${displayImage.id || "download"}.jpg`;
                  await downloadImage(imageUrl, filename);
                  CustomToast.success("Image downloaded successfully");
                } catch (error) {
                  CustomToast.error("Failed to download image");
                }
              } else {
                CustomToast.error("No image selected");
              }
            }}
            disabled={!displayImage}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="h-4 w-4" />
            Download Image
          </button>
        </div>

        <div className="mt-auto space-y-3 pt-6">
          <button
            onClick={onNext}
            disabled={!hasUploadedAnnotations}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#6841ff] py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#5936db] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step
            <ArrowRight className="h-4 w-4" />
          </button>

          {/* <button className="w-full rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
            Relabel Objects
          </button> */}
        </div>
      </div>

      {/* Label Editor Dialog */}
      <Dialog
        open={editingPointIndex !== null}
        onOpenChange={(open) => !open && setEditingPointIndex(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Point Label</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label
                htmlFor="point-label"
                className="text-sm font-medium text-slate-700"
              >
                Label for Point{" "}
                {editingPointIndex !== null ? editingPointIndex + 1 : ""}
              </label>
              <input
                id="point-label"
                type="text"
                value={tempLabel}
                onChange={(e) => setTempLabel(e.target.value)}
                placeholder={`P${
                  editingPointIndex !== null ? editingPointIndex + 1 : ""
                }`}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#6841ff] focus:outline-none focus:ring-2 focus:ring-[#6841ff]/20"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && editingPointIndex !== null) {
                    if (tempLabel.trim()) {
                      setPointLabels((prev) => ({
                        ...prev,
                        [editingPointIndex]: tempLabel.trim(),
                      }));
                    } else {
                      setPointLabels((prev) => {
                        const updated = { ...prev };
                        delete updated[editingPointIndex];
                        return updated;
                      });
                    }
                    setEditingPointIndex(null);
                    setTempLabel("");
                  }
                }}
              />
              <p className="text-xs text-slate-500">
                Enter a custom label or leave empty to use default (P
                {editingPointIndex !== null ? editingPointIndex + 1 : ""})
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setEditingPointIndex(null);
                setTempLabel("");
              }}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (editingPointIndex !== null) {
                  if (tempLabel.trim()) {
                    setPointLabels((prev) => ({
                      ...prev,
                      [editingPointIndex]: tempLabel.trim(),
                    }));
                  } else {
                    setPointLabels((prev) => {
                      const updated = { ...prev };
                      delete updated[editingPointIndex];
                      return updated;
                    });
                  }
                  setEditingPointIndex(null);
                  setTempLabel("");
                }
              }}
              className="rounded-lg bg-[#6841ff] px-4 py-2 text-sm font-medium text-white hover:bg-[#5936db]"
            >
              Save
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader className="flex flex-col items-center gap-2 pb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <CloudUpload className="h-6 w-6 text-slate-600" />
            </div>
            <DialogTitle className="text-center text-xl font-semibold text-slate-900">
              Test on More Files
            </DialogTitle>
          </DialogHeader>

          <div
            {...getRootProps()}
            className={cn(
              "mt-4 flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors",
              isDragActive
                ? "border-[#6841ff] bg-[#6841ff]/5"
                : "border-slate-200 bg-slate-50 hover:bg-slate-100"
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4 text-center p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                <CloudUpload className="h-6 w-6 text-slate-900" />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-slate-900">
                  Upload images or a short video
                </h3>
                <p className="text-xs text-slate-500">
                  .mp4, .webm, .3gp, .ogv, .m4v, .jpeg, .jpg, .png, .gif, .svg,
                  <br />
                  .bmp, .ico, .fl
                  <br />
                  Videos can be up to 10 seconds.
                </p>
              </div>

              {isUploading && (
                <div className="text-sm font-medium text-[#6841ff] animate-pulse">
                  Uploading...
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const SidebarImageItem = memo(
  ({
    image,
    isSelected,
    onClick,
  }: {
    image: Image;
    isSelected: boolean;
    onClick: () => void;
  }) => {
    const imageUrl =
      image.urls?.thumb ||
      image.urls?.original ||
      image.url ||
      (image.owner
        ? `https://source.roboflow.com/${image.owner}/${image.id}/thumb.jpg`
        : "");

    return (
      <button
        onClick={onClick}
        className={cn(
          "relative h-12 w-12 overflow-hidden rounded-lg border transition-all flex-none",
          isSelected
            ? "border-[#6841ff] ring-2 ring-[#6841ff]/20"
            : "border-slate-200 hover:border-slate-300"
        )}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="thumbnail"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-slate-100 animate-pulse" />
        )}
      </button>
    );
  }
);
