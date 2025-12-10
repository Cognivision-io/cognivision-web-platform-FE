"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
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
import { TrainStep } from "@/features/dataset/components/steps/train-step";
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

const UploadDatasetPage = () => {
  const params = useParams<{ id: string | string[] }>();
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedData, setUploadedData] = useState<{
    roboflowProjectId: string;
    imageIds: string[];
  } | null>(null);

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
            />
          )}

          {currentStep === 2 && (
            <TrainStep onNext={() => setCurrentStep(3)} />
          )}

          {currentStep === 3 && (
            <TestStep onBack={() => setCurrentStep(2)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadDatasetPage;
