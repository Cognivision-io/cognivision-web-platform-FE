import { useState, useEffect, memo } from "react";
import { Box, Download, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

import { useParams } from "next/navigation";
import { useUnannotatedImagesQuery, useImageDetailQuery, UNANNOTATED_IMAGES_QUERY_KEY } from "@/features/dataset/queries/image.query";
import { useProjectQuery } from "@/features/dataset/queries/project.query";
import { useAutoAnnotationDirectMutation, useCreateProjectMutation } from "@/features/dataset/mutations/project.mutation";
import { useUploadImagesMutation } from "@/features/dataset/mutations/upload.mutation";
import type { AnnotationItem } from "@/interfaces/project.interface";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { toast } from "sonner";

interface TrainStepProps {
  onNext: () => void;
  uploadedData?: { roboflowProjectId: string; imageIds: string[] } | null;
}

export const TrainStep = ({ onNext, uploadedData }: TrainStepProps) => {
  const [zoom, setZoom] = useState(1);
  const [sliderValue, setSliderValue] = useState(50);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [annotations, setAnnotations] = useState<AnnotationItem[]>([]);
  // Track IDs from initial uploadedData AND new uploads in this step
  const [extendedImageIds, setExtendedImageIds] = useState<string[]>(uploadedData?.imageIds || []);
  const imageUploadRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { mutate: autoAnnotate, isPending: isAnnotating } = useAutoAnnotationDirectMutation();

  const { mutate: uploadImages, isPending: isUploading } = useUploadImagesMutation({
    onSuccess: (data) => {
      toast.success("Images uploaded successfully");
      queryClient.invalidateQueries({ queryKey: UNANNOTATED_IMAGES_QUERY_KEY });
      
      // Extract new IDs from response
      const newIds = data.results?.successful?.map((item: any) => item.result.id) || [];
      if (newIds.length > 0) {
        setExtendedImageIds(prev => [...prev, ...newIds]);
      }
    },
    onError: (error) => {
      console.error("Upload error:", error);
      toast.error("Failed to upload images");
    }
  });

  const params = useParams();
  const projectId = Number(params.id);

  // Fetch list of images (fallback if no uploadedData, or for the sidebar list)
  // Passing limit 50 to ensure we see more images
  const { data: imagesData } = useUnannotatedImagesQuery(projectId, 0, 50);

  // Fetch project details to get Roboflow ID if uploadedData is missing
  const { data: projectData } = useProjectQuery(projectId);
  const roboflowProjectId = uploadedData?.roboflowProjectId || projectData?.data?.project?.id || "";
  
  // Decide which list to show in sidebar
  // We simply show all unannotated images available.
  const trainFiles = imagesData?.results || [];

  const currentFile = trainFiles[selectedFileIndex];

  // If we have uploadedData, we can try to fetch strict details using the project ID from the upload context.
  // We use currentFile.id (from the full list) rather than strict index mapping to uploadedData.imageIds,
  // because the sidebar shows ALL unannotated images, not just the uploaded batch.
  // Prioritize uploadedData IDs if available, otherwise fallback to the list
  const selectedImageId = trainFiles[selectedFileIndex]?.id || extendedImageIds[selectedFileIndex];

  const { data: imageDetail } = useImageDetailQuery(
    roboflowProjectId,
    String(selectedImageId),
    { enabled: !!roboflowProjectId && !!selectedImageId }
  );

  // Reset annotations when image changes
  useEffect(() => {
    setAnnotations([]);
  }, [selectedImageId]); // Trigger on ID change

  // Determine the display URL for the main canvas
  // If detail is fetched, use its high-res original url. 
  // Otherwise fall back to the list's url (which might be a thumb or standard url).
  const displayImage = uploadedData && imageDetail?.data?.image
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

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!displayImage || !roboflowProjectId) return;

    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();
    // Calculate relative coordinates (0-1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    autoAnnotate(
      {
        imageId: String(displayImage.id || ""),
        pointX: x,
        pointY: y,
        imageUrl: getImageUrl(displayImage),
        projectId: roboflowProjectId,
      },
      {
        onSuccess: (response) => {
          if (response.data?.result) {
             // Append new annotations to existing ones
             setAnnotations((prev) => [...prev, ...response.data.result]);
          }
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
                    toast.error("Project ID not found. Please try refreshing.");
                    return;
                 }
                 uploadImages({
                   projectId: roboflowProjectId,
                   files: Array.from(e.target.files),
                   batch: "train-step-upload"
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

          <div className="flex flex-col gap-2 overflow-y-auto pb-4">
            {trainFiles.map((file, i) => (
              <SidebarImageItem
                key={file.id || i}
                fileId={file.id}
                roboflowProjectId={roboflowProjectId}
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
                  className={cn("max-h-[500px] object-contain cursor-crosshair", isAnnotating && "opacity-80 cursor-wait")}
                  onClick={handleImageClick}
                />
              )}
              {/* Annotations */}
              {annotations.map((ann, i) => (
                <div
                  key={i}
                  className="absolute border-2 border-[#4ade80]"
                  style={{
                    // Assuming YOLO format: center x, center y, width, height (all normalized 0-1)
                    left: `${(ann.x - ann.width / 2) * 100}%`,
                    top: `${(ann.y - ann.height / 2) * 100}%`,
                    width: `${ann.width * 100}%`,
                    height: `${ann.height * 100}%`,
                  }}
                >
                  <span className="absolute -top-6 left-0 bg-[#4ade80] px-1.5 py-0.5 text-[10px] font-bold text-slate-900 whitespace-nowrap">
                    {ann.class} {Math.round(ann.confidence * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex h-16 items-center border-t border-slate-200 bg-white px-6">
          <div className="flex w-full items-center gap-6">
            <span className="text-xs font-bold text-slate-900">
              Predictions
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
          <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#6841ff] bg-white py-2.5 text-sm font-semibold text-[#6841ff] shadow-sm transition-colors hover:bg-[#f5f3ff]">
            <Box className="h-4 w-4" />
            Deploy Your Model
          </button>

          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[10px] font-medium text-slate-400">OR</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            onClick={onNext}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <Plus className="h-4 w-4" />
            Test on More Files
          </button>

          <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
            <Download className="h-4 w-4" />
            Download Image
          </button>
        </div>

        <div className="mt-auto pt-6">
          <button className="w-full rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
            Relabel Objects
          </button>
        </div>
      </div>
    </div>
  );
};

const SidebarImageItem = memo(({
  fileId,
  roboflowProjectId,
  isSelected,
  onClick
}: {
  fileId: string;
  roboflowProjectId: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const { data } = useImageDetailQuery(roboflowProjectId, fileId, { enabled: !!roboflowProjectId && !!fileId });
  const imageUrl = data?.data?.image?.urls?.thumb || data?.data?.image?.urls?.original || data?.data?.image?.url || "";
  
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
        <img src={imageUrl} alt="thumbnail" className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full bg-slate-100 animate-pulse" />
      )}
    </button>
  );
});
