import { CloudUpload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TestStepProps {
  onBack: () => void;
}

export const TestStep = ({ onBack }: TestStepProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-slate-900">
          Test Your Model
        </h2>
        <p className="mt-2 text-slate-500">
          Upload new images to test your trained model's performance.
        </p>
      </div>

      {/* Upload Area for Test */}
      <div className="w-full max-w-2xl rounded-xl border border-dashed border-slate-300 bg-[#f8f9fc] p-12 text-center transition-colors hover:border-primary hover:bg-primary/5">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eef2ff] text-[#6841ff]">
          <CloudUpload className="h-8 w-8" />
        </div>
        <h3 className="mt-6 text-lg font-semibold text-slate-900">
          Upload Test Images
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Drag and drop or click to select files
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button className="h-10 gap-2 rounded-lg bg-[#6841ff] font-medium text-white hover:bg-[#5b35e6]">
            <FileText className="h-4 w-4" />
            Select Files
          </Button>
        </div>
      </div>

      {/* Back to Train */}
      <div className="mt-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-slate-500 hover:text-slate-900"
        >
          Back to Training
        </Button>
      </div>
    </div>
  );
};
