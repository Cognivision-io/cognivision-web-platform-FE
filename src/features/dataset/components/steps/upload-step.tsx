import { useState } from "react";
import {
  CloudUpload,
  FileText,
  Folder,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UploadStepProps {
  onNext: () => void;
}

export const UploadStep = ({ onNext }: UploadStepProps) => {
  const [batchName, setBatchName] = useState("Uploaded on 10/03/25 at 9:23 pm");
  const [tags, setTags] = useState("");

  return (
    <>
      <div className="mb-8 flex items-center gap-3">
        <CloudUpload className="h-6 w-6 text-slate-900" />
        <h1 className="text-2xl font-semibold text-slate-900">Upload</h1>
      </div>

      {/* Inputs */}
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-900">
            Batch Name:
          </Label>
          <Input
            value={batchName}
            onChange={(e) => setBatchName(e.target.value)}
            className="h-11 rounded-lg border-slate-200 bg-white text-sm shadow-none focus-visible:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-900">
            Tags:
          </Label>
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Search or add tags for images..."
            className="h-11 rounded-lg border-slate-200 bg-white text-sm shadow-none focus-visible:ring-primary"
          />
        </div>
      </div>

      {/* Upload Areas */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Drag and Drop Area */}
        <div className="flex min-h-[400px] flex-col rounded-xl border border-[#e1e4f5] bg-white p-8">
          <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f0f2f5]">
              <ImageIcon className="h-8 w-8 text-slate-400" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-700">
                Drag and drop files to upload dataset
              </h3>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="h-10 gap-2 rounded-lg border-slate-300 font-medium text-slate-700 hover:bg-slate-50"
              >
                <FileText className="h-4 w-4" />
                Select File(s)
              </Button>
              <Button
                variant="outline"
                className="h-10 gap-2 rounded-lg border-slate-300 font-medium text-slate-700 hover:bg-slate-50"
              >
                <Folder className="h-4 w-4" />
                Select Folder
              </Button>
            </div>
          </div>

          {/* Supported Formats */}
          <div className="mt-8 rounded-lg border border-[#e1e4f5] bg-[#fafbfd] p-4">
            <h4 className="mb-3 text-sm font-medium text-slate-500">
              Supported Formats
            </h4>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <div className="font-semibold text-slate-700">Images</div>
                <div className="mt-1 font-mono text-slate-500">
                  .jpg, .png, .bmp, .webp, .avif
                </div>
              </div>
              <div>
                <div className="font-semibold text-slate-700">Videos</div>
                <div className="mt-1 font-mono text-slate-500">
                  .mov, .mp4
                </div>
              </div>
              <div>
                <div className="font-semibold text-slate-700">PDFs</div>
                <div className="mt-1 font-mono text-slate-500">.pdf</div>
              </div>
            </div>
            <div className="mt-3 text-[10px] text-slate-400">
              *Max size of 20MB and 16,400 x 16,900 pixels.
            </div>
          </div>
        </div>

        {/* Pre-built Dataset Area */}
        <div className="flex min-h-[400px] flex-col rounded-xl border border-[#e1e4f5] bg-[#f8f9fc] p-8">
          <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center">
              <CloudUpload className="h-10 w-10 text-slate-900" />
            </div>

            <h3 className="text-lg font-semibold text-slate-700">
              Use Pre-built dataset
            </h3>

            <div className="mt-4 w-full max-w-xs rounded-xl border border-[#e1e4f5] bg-[#f0f2f5] p-8 text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded bg-slate-400 text-white">
                <FileText className="h-5 w-5" />
              </div>
              <div className="text-sm font-medium text-slate-600">
                Upload dataset
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Temporary Navigation for Dev */}
      <div className="mt-8 flex justify-end">
        <Button onClick={onNext}>Proceed to Annotate (Dev)</Button>
      </div>
    </>
  );
};
