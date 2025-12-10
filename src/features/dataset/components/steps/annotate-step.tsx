import { Pencil, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useUnannotatedImagesQuery, useImageDetailQuery } from "@/features/dataset/queries/image.query";
import { useState } from "react";

interface AnnotateStepProps {
  onNext: () => void;
  uploadedData?: { roboflowProjectId: string; imageIds: string[] } | null;
}

export const AnnotateStep = ({ onNext, uploadedData }: AnnotateStepProps) => {
  const params = useParams();
  const projectId = Number(params.id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: imagesData, isLoading: isLoadingUnannotated } = useUnannotatedImagesQuery(projectId, 0, {
    enabled: !uploadedData
  }); 

  const currentUploadImageId = uploadedData?.imageIds[currentImageIndex];
  const { data: imageDetail, isLoading: isLoadingDetail } = useImageDetailQuery(
    uploadedData?.roboflowProjectId || "",
    currentUploadImageId || "",
    { enabled: !!uploadedData && !!currentUploadImageId }
  );

  const isLoading = uploadedData ? isLoadingDetail : isLoadingUnannotated;
  
  // Normalize the image object. 
  // If uploadedData is present, the API returns { data: { image: ... } }
  // If not, useUnannotatedImagesQuery returns { results: [...] }
  const currentImage = uploadedData 
    ? imageDetail?.data?.image 
    : imagesData?.results?.[currentImageIndex];
    
  const totalImages = uploadedData ? uploadedData.imageIds.length : (imagesData?.results?.length || 0);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Uploaded on 10/03/25 at 10:02 pm
          </h2>
          <div className="mt-2 inline-flex items-center rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            Uploaded Oct 3, 2025 (10:02 PM)
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="h-10 rounded-lg border-slate-300 font-medium text-slate-700 hover:bg-slate-50"
          >
            Upload More
          </Button>
          <Button
            variant="outline"
            className="h-10 rounded-lg border-slate-300 font-medium text-slate-700 hover:bg-slate-50"
          >
            Rename
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: Image Preview */}
        <div className="flex items-center justify-center rounded-xl bg-[#f8f9fc] p-8 min-h-[400px]">
          {isLoading ? (
             <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="text-sm text-slate-500">Loading images...</span>
             </div>
          ) : currentImage ? (
            <div className="relative aspect-square w-full max-w-md">
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src={currentImage.urls?.original || currentImage.url} 
                    alt={currentImage.name}
                    className="h-full w-full object-contain mix-blend-multiply"
                  />
                </div>
                {/* Simple pagination controls for preview if multiple images exist */}
                {totalImages > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                         <Button 
                            size="sm" 
                            variant="secondary" 
                            disabled={currentImageIndex === 0}
                            onClick={() => setCurrentImageIndex(prev => Math.max(0, prev - 1))}
                         >
                            Prev
                         </Button>
                         <Button 
                            size="sm" 
                            variant="secondary" 
                            disabled={currentImageIndex === totalImages - 1}
                            onClick={() => setCurrentImageIndex(prev => Math.min(totalImages - 1, prev + 1))}
                         >
                            Next
                         </Button>
                    </div>
                )}
            </div>
          ) : (
            <div className="text-center text-slate-500">
                No unannotated images found.
            </div>
          )}
        </div>

        {/* Right: Labeling Options */}
        <div>
          <h3 className="mb-6 text-lg font-medium text-slate-900">
            How do you want to label your images?
          </h3>

          <div className="space-y-4">
            {/* Label Myself */}
            <button className="flex w-full items-start gap-4 rounded-xl border border-[#6841ff] bg-[#f5f3ff] p-5 text-left transition-all hover:bg-[#ebe7ff]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#6841ff] text-white">
                <Pencil className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">Label Myself</div>
                <div className="mt-1 text-sm text-slate-600">
                  Label images with our AI labeling tools.
                </div>
              </div>
            </button>

            {/* Auto-Label */}
            <button className="flex w-full items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 text-left transition-all hover:border-slate-300 hover:bg-slate-50">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">
                  Auto-Label Entire Batch
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Use your own custom model or a zero-shot model to automatically
                  label your entire batch.
                </div>
              </div>
            </button>
          </div>

          {/* Temporary Navigation for Dev */}
          <div className="mt-8 flex justify-end">
            <Button onClick={onNext}>Proceed to Train (Dev)</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
