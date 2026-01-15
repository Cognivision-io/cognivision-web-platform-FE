import { useState } from "react";
import {
  Check,
  Plus,
  ArrowLeft,
  X,
  Info,
  Layers,
  Sparkles,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { PreprocessingModal } from "./modals/preprocessing-modal";
import { AugmentationModal } from "./modals/augmentation-modal";
import { useCreateVersionMutation } from "@/features/dataset/queries/project.query";
import { toast } from "sonner";
import CustomToast from "@/components/ui/sonner";

interface CreateVersionScreenProps {
  onBack: () => void;
  onCreated?: (created: { versionId?: string; versionName: string }) => void;
  project: any;
  versions: any[];
  projectId: number;
}

export const CreateVersionScreen = ({
  onBack,
  onCreated,
  project,
  versions,
  projectId,
}: CreateVersionScreenProps) => {
  const [currentStep, setCurrentStep] = useState(3); // Start at step 3 as per screenshot
  const [isPreprocessingModalOpen, setIsPreprocessingModalOpen] =
    useState(false);
  const [isAugmentationModalOpen, setIsAugmentationModalOpen] = useState(false);
  const [versionName, setVersionName] = useState(
    format(new Date(), "yyyy-MM-dd h:mma").toLowerCase()
  );
  const [preprocessingSteps, setPreprocessingSteps] = useState([
    { id: "1", name: "Auto-Orient", detail: "Applied" },
    { id: "2", name: "Grayscale", detail: "Standard" },
  ]);
  const [augmentationSteps, setAugmentationSteps] = useState([
    { id: "a1", name: "Flip", detail: "Horizontal: True, Vertical: False" },
    {
      id: "a2",
      name: "Brightness",
      detail: "Brighten: True, Darken: False, Percent: 91%",
    },
  ]);

  const createVersionMutation = useCreateVersionMutation();

  const handleContinue = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCreate = async () => {
    const payload: any = {
      versionName,
      preprocessing: {},
      augmentation: {
        image: { versions: 1 },
      },
    };

    // Mapping for Preprocessing
    preprocessingSteps.forEach((step) => {
      const key = step.name.toLowerCase().replace(/\s+/g, "-");
      switch (key) {
        case "auto-orient":
          payload.preprocessing["auto-orient"] = true;
          break;
        case "grayscale":
          payload.preprocessing["grayscale"] = true;
          break;
        case "resize":
          const rMatch = step.detail.match(/(\d+)x(\d+)/);
          payload.preprocessing["resize"] = {
            width: rMatch ? parseInt(rMatch[1]) : 200,
            height: rMatch ? parseInt(rMatch[2]) : 200,
            format: "Stretch to",
          };
          break;
        case "auto-adjust-contrast":
          payload.preprocessing["contrast"] = { type: "Contrast Stretching" };
          break;
        case "filter-null":
          payload.preprocessing["filter-null"] = { percent: 50 };
          break;
        case "isolate-objects":
          payload.preprocessing["isolate"] = true;
          break;
        case "tile":
          payload.preprocessing["tile"] = { rows: 2, columns: 2 };
          break;
      }
    });

    // Mapping for Augmentation
    augmentationSteps.forEach((step: any) => {
      const key = step.name.toLowerCase().replace(/\s+/g, "-");
      switch (key) {
        case "flip":
          payload.augmentation["flip"] = {
            horizontal: step.detail.includes("Horizontal: True"),
            vertical: step.detail.includes("Vertical: True"),
          };
          break;
        case "brightness":
          const bMatch = step.detail.match(/Percent: (\d+)%/);
          payload.augmentation["brightness"] = {
            brighten: step.detail.includes("Brighten: True"),
            darken: step.detail.includes("Darken: True"),
            percent: bMatch ? parseInt(bMatch[1]) : 91,
          };
          break;
        case "hue":
          const hMatch = step.detail.match(/Degrees: (\d+)/);
          payload.augmentation["hue"] = {
            degrees: hMatch ? parseInt(hMatch[1]) : 180,
          };
          break;
        case "exposure":
          const eMatch = step.detail.match(/Percent: (\d+)%/);
          payload.augmentation["exposure"] = {
            percent: eMatch ? parseInt(eMatch[1]) : 30,
          };
          break;
        case "blur":
          const blMatch = step.detail.match(/Pixels: ([\d.]+)/);
          payload.augmentation["blur"] = {
            pixels: blMatch ? parseFloat(blMatch[1]) : 1.5,
          };
          break;
        case "saturation":
          const sMatch = step.detail.match(/Percent: (\d+)%/);
          payload.augmentation["saturation"] = {
            percent: sMatch ? parseInt(sMatch[1]) : 50,
          };
          break;
        case "noise":
          const nMatch = step.detail.match(/Percent: (\d+)%/);
          payload.augmentation["noise"] = {
            percent: nMatch ? parseInt(nMatch[1]) : 50,
          };
          break;
        case "rotation":
          const rotMatch = step.detail.match(/(-?\d+).*?(-?\d+)/);
          payload.augmentation["rotate"] = {
            degrees: rotMatch ? parseInt(rotMatch[2]) : 45,
          };
          break;
        case "crop":
          payload.augmentation["crop"] = { min: 12, max: 71 };
          break;
        case "shear":
          payload.augmentation["shear"] = { horizontal: 45, vertical: 45 };
          break;
        case "cutout":
          payload.augmentation["cutout"] = { count: 26, percent: 71 };
          break;
      }
    });

    try {
      const response: any = await createVersionMutation.mutateAsync({
        id: projectId,
        payload,
      });
      CustomToast.success("Version created successfully!");
      const createdVersionId =
        response?.data?.version?.id ??
        response?.version?.id ??
        response?.data?.id ??
        response?.id;
      onCreated?.({ versionId: createdVersionId, versionName });
      onBack();
    } catch (error: any) {
      console.error("Failed to create version:", error);
      CustomToast.error(
        error?.response?.data?.message || "Failed to create version"
      );
    }
  };

  const removePreprocessingStep = (id: string) => {
    setPreprocessingSteps((steps) => steps.filter((s) => s.id !== id));
  };

  const removeAugmentationStep = (id: string) => {
    setAugmentationSteps((steps) => steps.filter((s: any) => s.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="px-8 py-4 border-b border-slate-200 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-bold text-slate-900">Create New Version</h2>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200 flex items-center gap-1">
            <Database className="h-3 w-3" /> Uses Credits
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Intro */}
          <div>
            <p className="text-sm text-slate-500 mb-4">
              Prepare your images and data for training by compiling them into a
              version. Experiment with different configurations to achieve
              better training results.
            </p>
            <div className="space-y-1.5 max-w-md">
              <label className="text-sm font-semibold text-slate-700">
                Version Name:
              </label>
              <Input
                value={versionName}
                onChange={(e) => setVersionName(e.target.value)}
                className="h-10 border-slate-200 focus:border-[#6841ff] focus:ring-1 focus:ring-[#6841ff]"
              />
            </div>
          </div>

          <div className="space-y-10">
            {/* Step 1: Source Images */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 bg-[#6841ff] rounded-full flex items-center justify-center shadow-lg shadow-[#6841ff]/20">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div className="w-0.5 h-full bg-slate-100 mt-2"></div>
              </div>
              <div className="pb-4">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Source Images
                </h3>
                <div className="grid grid-cols-[120px_1fr] gap-y-2 text-sm">
                  <span className="font-bold text-slate-700">Images:</span>
                  <span className="text-slate-600">{project?.images || 0}</span>
                  <span className="font-bold text-slate-700">Classes:</span>
                  <span className="text-slate-600">19</span>
                  <span className="font-bold text-slate-700">Unannotated:</span>
                  <span className="text-slate-600">15</span>
                </div>
              </div>
            </div>

            {/* Step 2: Train/Test Split */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 bg-[#6841ff] rounded-full flex items-center justify-center shadow-lg shadow-[#6841ff]/20">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div className="w-0.5 h-full bg-slate-100 mt-2"></div>
              </div>
              <div className="pb-4">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Train/Test Split
                </h3>
                <div className="grid grid-cols-[120px_1fr] gap-y-2 text-sm">
                  <span className="font-bold text-slate-700">
                    Training Set:
                  </span>
                  <span className="text-slate-600">15 images</span>
                  <span className="font-bold text-slate-700">
                    Validation Set:
                  </span>
                  <span className="text-slate-600">2 images</span>
                  <span className="font-bold text-slate-700">Testing Set:</span>
                  <span className="text-slate-600">1 images</span>
                </div>
              </div>
            </div>

            {/* Step 3: Preprocessing */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all",
                    currentStep > 3
                      ? "bg-[#6841ff] border-[#6841ff] shadow-lg shadow-[#6841ff]/20"
                      : currentStep === 3
                      ? "border-[#6841ff] text-[#6841ff]"
                      : "border-slate-200 text-slate-300"
                  )}
                >
                  {currentStep > 3 ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    "3"
                  )}
                </div>
                <div className="w-0.5 h-full bg-slate-100 mt-2"></div>
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-slate-900">
                    Preprocessing
                  </h3>
                  <button className="text-slate-400 hover:text-slate-600 border-none bg-transparent cursor-pointer">
                    <Info className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-slate-500 mb-4">
                  Decrease training time and increase performance by applying
                  image transformations to all images in this dataset.
                </p>

                {currentStep === 3 && (
                  <div className="space-y-4 max-w-md">
                    <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100 bg-white shadow-sm">
                      {preprocessingSteps.map((step) => (
                        <div
                          key={step.id}
                          className="p-4 flex items-center justify-between group"
                        >
                          <div>
                            <div className="font-bold text-slate-700 text-sm">
                              {step.name}
                            </div>
                            <div className="text-slate-500 text-xs">
                              {step.detail}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button className="text-[#6841ff] text-xs font-semibold hover:underline border-none bg-transparent cursor-pointer">
                              Edit
                            </button>
                            <button
                              onClick={() => removePreprocessingStep(step.id)}
                              className="text-slate-300 hover:text-slate-500 transition-colors border-none bg-transparent cursor-pointer"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => setIsPreprocessingModalOpen(true)}
                        className="w-full p-4 flex items-center gap-2 text-[#6841ff] hover:bg-slate-50 transition-colors group border-none bg-transparent cursor-pointer"
                      >
                        <Plus className="h-4 w-4 transition-transform group-hover:scale-110" />
                        <span className="text-sm font-semibold">
                          Add Preprocessing Step
                        </span>
                      </button>
                    </div>
                    <Button
                      onClick={handleContinue}
                      className="bg-[#6841ff] hover:bg-[#5936db] text-white px-8 h-10 font-bold rounded-md shadow-md"
                    >
                      Continue
                    </Button>
                  </div>
                )}

                {currentStep > 3 && (
                  <div className="space-y-1 text-sm bg-slate-50 p-4 rounded-lg border border-slate-100 max-w-md">
                    {preprocessingSteps.map((step) => (
                      <div key={step.id} className="flex gap-2">
                        <span className="font-bold text-slate-700">
                          {step.name}:
                        </span>
                        <span className="text-slate-500">{step.detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Step 4: Augmentation */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all",
                    currentStep > 4
                      ? "bg-[#6841ff] border-[#6841ff] shadow-lg shadow-[#6841ff]/20"
                      : currentStep === 4
                      ? "border-[#6841ff] text-[#6841ff]"
                      : "border-slate-200 text-slate-300"
                  )}
                >
                  {currentStep > 4 ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    "4"
                  )}
                </div>
                <div className="w-0.5 h-full bg-slate-100 mt-2"></div>
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-slate-900">
                    Augmentation
                  </h3>
                  <button className="text-slate-400 hover:text-slate-600 border-none bg-transparent cursor-pointer">
                    <Info className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-slate-500 mb-4">
                  Create new training examples for your model to learn from by
                  generating augmented versions of each image in your training
                  set.
                </p>

                {currentStep === 4 && (
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-3">
                      {augmentationSteps.length > 0
                        ? augmentationSteps.map((step: any) => (
                            <div
                              key={step.id}
                              className="flex items-center gap-3 group"
                            >
                              <div className="flex-1 border border-slate-200 rounded-lg p-4 bg-white shadow-sm flex items-center justify-between">
                                <div>
                                  <div className="font-bold text-slate-700 text-sm">
                                    {step.name}
                                  </div>
                                  <div className="text-slate-500 text-xs">
                                    {step.detail}
                                  </div>
                                </div>
                                <button className="text-[#6841ff] text-xs font-semibold hover:underline border-none bg-transparent cursor-pointer">
                                  Edit
                                </button>
                              </div>
                              <button
                                onClick={() => removeAugmentationStep(step.id)}
                                className="text-slate-300 hover:text-slate-500 transition-colors border-none bg-transparent cursor-pointer"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))
                        : null}

                      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm mt-4">
                        <button
                          onClick={() => setIsAugmentationModalOpen(true)}
                          className="w-full p-4 flex items-center gap-2 text-[#6841ff] hover:bg-slate-50 transition-colors group border-none bg-transparent cursor-pointer border-b border-slate-100"
                        >
                          <Plus className="h-4 w-4 transition-transform group-hover:scale-110" />
                          <span className="text-sm font-semibold">
                            Add Augmentation Step
                          </span>
                        </button>
                        <button className="w-full p-4 flex items-center gap-3 text-slate-600 hover:bg-slate-50 transition-colors group border-none bg-transparent cursor-pointer text-left">
                          <div className="bg-[#f5f3ff] p-1.5 rounded-md">
                            <Layers className="h-4 w-4 text-[#6841ff]" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-700">
                              Use Previous Augmentations
                            </span>
                            <span className="text-[11px] text-slate-500">
                              Use augmentations from a previous version.
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-6">
                      <Button
                        onClick={handleContinue}
                        className="bg-[#6841ff] hover:bg-[#5936db] text-white px-8 h-10 font-bold rounded-md shadow-md"
                      >
                        Continue
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setAugmentationSteps([])}
                        className="border-slate-200 text-slate-600 h-10 font-bold px-6 bg-white hover:bg-slate-50"
                      >
                        Clear All
                      </Button>
                    </div>
                  </div>
                )}

                {currentStep > 4 && (
                  <div className="space-y-1 text-sm bg-slate-50 p-4 rounded-lg border border-slate-100 max-w-md">
                    {augmentationSteps.length > 0 ? (
                      augmentationSteps.map((step: any) => (
                        <div key={step.id} className="flex gap-2">
                          <span className="font-bold text-slate-700">
                            {step.name}:
                          </span>
                          <span className="text-slate-500">{step.detail}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-sm text-slate-500 italic">
                        None applied
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Step 5: Create */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all",
                    currentStep === 5
                      ? "border-[#6841ff] text-[#6841ff]"
                      : "border-slate-200 text-slate-300"
                  )}
                >
                  {currentStep === 5 ? <Plus className="h-5 w-5" /> : "5"}
                </div>
              </div>
              <div className="flex-1 pb-20">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-slate-900">Create</h3>
                  <button className="text-slate-400 hover:text-slate-600 border-none bg-transparent cursor-pointer">
                    <Sparkles className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-slate-500 mb-6">
                  Review your selections and select a version size to create a
                  moment-in-time snapshot of your dataset with the applied
                  transformations.
                </p>

                {currentStep === 5 && (
                  <div className="space-y-8 max-w-2xl">
                    {/* <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Maximum Version Size</label>
                        <Select value={versionSize} onValueChange={setVersionSize}>
                             <SelectTrigger className="w-72 bg-white border-slate-200 h-11">
                                <SelectValue placeholder="Select size" />
                             </SelectTrigger>
                             <SelectContent>
                                <SelectItem value="1x">48 images (1x)</SelectItem>
                                <SelectItem value="2x">96 images (2x)</SelectItem>
                                <SelectItem value="3x">144 images (3x)</SelectItem>
                             </SelectContent>
                        </Select>
                        <p className="text-xs text-slate-400">Larger versions take longer to train but often result in better model performance.</p>
                    </div> */}
                    {/* <div className="space-y-2">
                         <label className="text-sm font-bold text-slate-700">Version Notes:</label>
                         <Textarea 
                            placeholder="Add any version notes here..." 
                            className="min-h-[120px] bg-white border-slate-200 focus:border-[#6841ff] focus:ring-[#6841ff]"
                            value={versionNotes}
                            onChange={(e) => setVersionNotes(e.target.value)}
                         />
                    </div> */}

                    <Button
                      className="bg-[#6841ff] hover:bg-[#5936db] text-white px-10 h-11 font-bold rounded-lg shadow-lg shadow-[#6841ff]/20 text-base"
                      onClick={handleCreate}
                      disabled={createVersionMutation.isPending}
                    >
                      {createVersionMutation.isPending
                        ? "Creating..."
                        : "Create"}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <PreprocessingModal
        isOpen={isPreprocessingModalOpen}
        onClose={() => setIsPreprocessingModalOpen(false)}
        onAdd={(step) =>
          setPreprocessingSteps([
            ...preprocessingSteps,
            { ...step, id: Math.random().toString() },
          ])
        }
        existingSteps={preprocessingSteps.map((s) => s.name)}
      />

      <AugmentationModal
        isOpen={isAugmentationModalOpen}
        onClose={() => setIsAugmentationModalOpen(false)}
        onAdd={(step) =>
          setAugmentationSteps([
            ...augmentationSteps,
            { ...step, id: Math.random().toString() },
          ] as any)
        }
        existingSteps={augmentationSteps.map((s: any) => s.name)}
      />
    </div>
  );
};
