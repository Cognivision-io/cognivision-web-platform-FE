"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CloudUpload,
  Crop,
  Eye,
  Workflow,
} from "lucide-react";
import { Stepper } from "@/components/ui/stepper";
import { cn } from "@/lib/utils";
import { UploadStep } from "@/features/dataset/components/steps/upload-step";
import { AnnotateStep } from "@/features/dataset/components/steps/annotate-step";
import { ProjectAnnotationStep } from "@/features/dataset/components/steps/project-annotation-step";
import { TestStep } from "@/features/dataset/components/steps/test-step";

const steps = [
  {
    id: "upload",
    label: "Upload Data",
    description: "Upload Sample data",
    icon: CloudUpload,
  },
  {
    id: "annotate",
    label: "Annotate",
    description: "Label data yourself or with AI",
    icon: Crop,
  },
  {
    id: "train",
    label: "Train",
    description: "Train your data",
    icon: Workflow,
  },
  {
    id: "test",
    label: "Test",
    description: "Test Your Data",
    icon: Eye,
  },
];

const getStepIndexFromId = (stepId: string | null) => {
  if (!stepId) return 0;
  const index = steps.findIndex((step) => step.id === stepId);
  return index >= 0 ? index : 0;
};

function UploadDatasetPageInner() {
  const searchParams = useSearchParams();
  const stepParam = searchParams.get("step");
  const focusImageId = searchParams.get("focusImageId") || undefined;

  const [currentStep, setCurrentStep] = useState(() =>
    getStepIndexFromId(stepParam)
  );
  const [uploadedData, setUploadedData] = useState<{
    roboflowProjectId: string;
    imageIds: string[];
  } | null>(null);

  useEffect(() => {
    setCurrentStep(getStepIndexFromId(stepParam));
  }, [stepParam]);

  const handleUploadSuccess = (data: { roboflowProjectId: string; imageIds: string[] }) => {
    setUploadedData(data);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#f8f9fc] px-6 py-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        {/* Stepper Card */}
        <div className="rounded-xl border border-[#e1e4f5] bg-white px-8 py-6 shadow-[0_1px_2px_rgba(15,23,42,0.02)]">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        {/* Main Content Card */}
        <div
          className={cn(
            "rounded-xl border border-[#e1e4f5] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.02)]",
            currentStep === 2 ? "p-0 overflow-hidden" : "p-8"
          )}
        >
          {currentStep === 0 && (
            <UploadStep onNext={handleUploadSuccess} />
          )}

          {currentStep === 1 && (
            <AnnotateStep 
              onNext={() => setCurrentStep(2)} 
              uploadedData={uploadedData}
              initialImageId={focusImageId}
            />
          )}

          {currentStep === 2 && (
            <ProjectAnnotationStep
              onNext={() => setCurrentStep(3)}
              uploadedData={uploadedData}
            />
          )}

          {currentStep === 3 && (
            <TestStep />
          )}
        </div>
      </div>
    </div>
  );
};

const UploadDatasetPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-3.5rem)] bg-[#f8f9fc] px-6 py-8 text-muted-foreground lg:px-10">
          <div className="mx-auto w-full max-w-7xl text-sm">
            Loading dataset workflow...
          </div>
        </div>
      }
    >
      <UploadDatasetPageInner />
    </Suspense>
  );
};

export default UploadDatasetPage;
