import { useState } from "react";
import { Box, Download, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

import { useParams } from "next/navigation";
import { useUnannotatedImagesQuery, useImageDetailQuery } from "@/features/dataset/queries/image.query";

interface TrainStepProps {
  onNext: () => void;
  uploadedData?: { roboflowProjectId: string; imageIds: string[] } | null;
}

export const TrainStep = ({ onNext, uploadedData }: TrainStepProps) => {
  const [zoom, setZoom] = useState(1);
  const [sliderValue, setSliderValue] = useState(50);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);

  const params = useParams();
  const projectId = Number(params.id);

  // Fetch list of images (fallback if no uploadedData, or for the sidebar list)
  const { data: imagesData } = useUnannotatedImagesQuery(projectId, 0);
  
  // Decide which list to show in sidebar
  // If we have uploadedData, we ideally want to show THOSE images. 
  // But useUnannotatedImagesQuery returns a list. 
  // If accessible, we use imagesData results. 
  // If uploadedData is set, we might want to filter, but for now let's just use the unannotated list as the "pool"
  const trainFiles = imagesData?.results || [];

  const currentFile = trainFiles[selectedFileIndex];

  // If we have uploadedData, we can try to fetch strict details using the project ID from the upload context.
  // We use currentFile.id (from the full list) rather than strict index mapping to uploadedData.imageIds,
  // because the sidebar shows ALL unannotated images, not just the uploaded batch.
  const selectedImageId = currentFile?.id;

  const { data: imageDetail } = useImageDetailQuery(
    uploadedData?.roboflowProjectId || "",
    String(selectedImageId),
    { enabled: !!uploadedData && !!selectedImageId }
  );

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
          <button className="flex h-12 w-12 items-center justify-center rounded-lg border border-dashed border-slate-300 hover:border-primary hover:bg-primary/5">
            <Plus className="h-5 w-5 text-slate-400" />
          </button>

          <div className="flex flex-col gap-2 overflow-y-auto pb-4">
            {trainFiles.map((file, i) => (
              <button
                key={file.id || i}
                onClick={() => setSelectedFileIndex(i)}
                className={cn(
                  "relative h-12 w-12 overflow-hidden rounded-lg border transition-all",
                  selectedFileIndex === i
                    ? "border-[#6841ff] ring-2 ring-[#6841ff]/20"
                    : "border-slate-200 hover:border-slate-300"
                )}
              >
                <img
                  src={getImageUrl(file)}
                  alt={file.name}
                  className="h-full w-full object-cover"
                />
              </button>
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
              View Only
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
                  className="max-h-[500px] object-contain"
                />
              )}
              {/* Mock Bounding Boxes */}
              <div className="absolute inset-0 border-2 border-[#4ade80]/50" />
              <div className="absolute left-1/4 top-1/4 h-1/2 w-1/2 border-2 border-[#4ade80]">
                <span className="absolute -top-6 left-0 bg-[#4ade80] px-1.5 py-0.5 text-[10px] font-bold text-slate-900">
                  Leaf 98%
                </span>
              </div>
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
