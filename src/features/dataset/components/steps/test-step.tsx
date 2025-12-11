
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Check, 
  ChevronRight, 
  Download, 
  Edit, 
  Plus, 
  History,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProjectQuery } from "@/features/dataset/queries/project.query";
import { useUnannotatedImagesQuery } from "@/features/dataset/queries/image.query";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TestStepProps {
  onBack: () => void;
}

export const TestStep = ({ onBack }: TestStepProps) => {
  const router = useRouter();
  const params = useParams();
  const projectId = Number(params.id);
  const { data: projectResponse } = useProjectQuery(projectId);
  const { data: imagesResponse } = useUnannotatedImagesQuery(projectId, 0, 3);
  
  const project = projectResponse?.data?.project;
  const versions = projectResponse?.data?.versions || [];
  
  // Default to first version or a mock if none
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(
    versions.length > 0 ? versions[0].id : null
  );

  const selectedVersion = versions.find(v => v.id === selectedVersionId) || versions[0];
  
  // Mock data if no versions exist yet (for UI preview)
  const displayVersion = selectedVersion || {
    id: "v1",
    name: "2025-10-07 1:54am",
    created: Date.now(),
    images: project?.images || 0,
    splits: { train: 70, valid: 20, test: 10 },
    preprocessing: {},
    augmentation: {},
    exports: []
  };

  const selectedImages = imagesResponse?.results?.slice(0, 3) || [];

  return (
    <div className="flex bg-[#f8f9fc] min-h-[600px]">
      {/* Left Sidebar - Versions List */}
      <div className="w-80 flex-none bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Versions</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {/* Create New Version Button */}
            <button className="w-full flex flex-col items-start gap-1 p-3 rounded-lg border-2 border-dashed border-[#6841ff]/30 bg-[#6841ff]/5 hover:bg-[#6841ff]/10 transition-colors group">
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
                            <span className={cn(
                                "text-sm font-semibold",
                                selectedVersionId === version.id ? "text-[#6841ff]" : "text-slate-900"
                            )}>
                                {version.name}
                            </span>
                            {selectedVersionId === version.id && (
                                <span className="bg-[#6841ff] text-white text-[10px] px-1.5 py-0.5 rounded">Selected</span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono">
                                V{version.id.split('/').pop() || "1"}
                            </span>
                            <span>{format(new Date(version.created * 1000), "MMM d, yyyy")}</span>
                        </div>
                    </button>
                ))
            ) : (
                // Mock Item if no versions
                <button
                    className="w-full flex flex-col items-start gap-1 p-3 rounded-lg border border-[#6841ff] bg-[#f5f3ff] text-left"
                >
                     <div className="flex items-center justify-between w-full">
                        <span className="text-sm font-semibold text-[#6841ff]">
                            {displayVersion.name}
                        </span>
                        <span className="bg-[#6841ff] text-white text-[10px] px-1.5 py-0.5 rounded">Selected</span>
                     </div>
                     <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono">V1</span>
                        <span>{format(new Date(), "MMM d, yyyy")}</span>
                     </div>
                </button>
            )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-200 bg-white flex items-center justify-between">
            <div>
                 <div className="flex items-center gap-2 mb-1">
                     <span className="bg-slate-900 text-white text-xs font-bold px-1.5 py-0.5 rounded">v1</span>
                     <h1 className="text-xl font-bold text-slate-900">{displayVersion.name}</h1>
                 </div>
                 <div className="text-xs text-slate-500">
                     Generated on {format(new Date(displayVersion.created * 1000 || Date.now()), "MMM d, yyyy")} by <span className="text-slate-700 font-medium">Workspace hania</span>
                 </div>
            </div>
            
            <div className="flex items-center gap-3">
                <Button variant="outline" className="h-9 gap-2 text-slate-700">
                    <Download className="h-4 w-4" />
                    Download Dataset
                </Button>
                <Button 
                    onClick={() => router.push('/dashboard/dataset')}
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
                    Prepare your images and data for training by compiling them into a version. 
                    Experiment with different configurations to achieve better training results.
                </p>
                
                <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Version Name:</label>
                    <Input 
                        value={displayVersion.name} 
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
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Source Images</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-8">
                             <span className="w-24 font-bold text-slate-700">Images:</span>
                             <span className="text-slate-600">{displayVersion.images}</span>
                        </div>
                        <div className="flex items-center gap-8">
                             <span className="w-24 font-bold text-slate-700">Classes:</span>
                             <span className="text-slate-600">0</span>
                        </div>
                        <div className="flex items-center gap-8">
                             <span className="w-24 font-bold text-slate-700">Unannotated:</span>
                             <span className="text-slate-600">0</span>
                        </div>
                    </div>
                </div>
            </div>

             {/* Train/Test Split Section */}
             <div className="flex gap-6 max-w-3xl border-t border-slate-100 pt-8">
                <div className="flex-none">
                     <div className="h-10 w-10 bg-[#6841ff] rounded-full flex items-center justify-center shadow-lg shadow-[#6841ff]/20">
                         <Check className="h-5 w-5 text-white" />
                     </div>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Train/Test Split</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-8">
                             <span className="w-24 font-bold text-slate-700">Training Set:</span>
                             <span className="text-slate-600">{(displayVersion.splits?.train || 0)/100 * displayVersion.images} images ({displayVersion.splits?.train || 70}%)</span>
                        </div>
                        <div className="flex items-center gap-8">
                             <span className="w-24 font-bold text-slate-700">Validation Set:</span>
                             <span className="text-slate-600">{(displayVersion.splits?.valid || 0)/100 * displayVersion.images} images ({displayVersion.splits?.valid || 20}%)</span>
                        </div>
                        <div className="flex items-center gap-8">
                             <span className="w-24 font-bold text-slate-700">Testing Set:</span>
                             <span className="text-slate-600">{(displayVersion.splits?.test || 0)/100 * displayVersion.images} images ({displayVersion.splits?.test || 10}%)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Total Images Grid */}
            <div className="max-w-3xl pt-8">
                 <h3 className="text-lg font-bold text-slate-900 mb-4 pl-16">
                    {displayVersion.images} Total Images
                 </h3>
                 <div className="pl-16 flex gap-4">
                    {selectedImages.length > 0 ? (
                        selectedImages.map((img) => (
                            <div key={img.id} className="h-24 w-24 rounded-lg overflow-hidden border border-slate-200 bg-white relative">
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
                    ) : (
                         [1, 2, 3].map((i) => (
                            <div key={i} className="h-24 w-24 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                                <span className="text-xs text-slate-400">No Image</span>
                            </div>
                         ))
                    )}
                 </div>
            </div>

        </div>
      </div>
    </div>
  );
};
