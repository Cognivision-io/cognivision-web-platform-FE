"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Link as LinkIcon, Copy, Monitor } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { type RoboflowInferenceResponse } from "@/types/project.interface";
import { useUserApiKeyQuery } from "@/features/api-key/queries/api-key.query";
import CustomToast from "@/components/ui/sonner";

interface TestModelDialogProps {
  version: any;
  project: any;
  workspaceName?: string;
  children: React.ReactNode;
}

function TestModelDialogInner({
  version,
  project,
  workspaceName,
  children,
}: TestModelDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [confidenceThreshold, setConfidenceThreshold] = useState(50);
  const [overlapThreshold, setOverlapThreshold] = useState(50);
  const [inferenceResult, setInferenceResult] =
    useState<RoboflowInferenceResponse | null>(null);
  const [isInferencing, setIsInferencing] = useState(false);
  const [isEngineReady, setIsEngineReady] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const { data: userApiKey } = useUserApiKeyQuery();
  const apiKey = userApiKey?.key?.trim() ?? "";
  // Check if model is ready (HTTP API doesn't need complex initialization)
  useEffect(() => {
    if (version.model?.id && apiKey) {
      setIsEngineReady(true);
    } else {
      setIsEngineReady(false);
    }
  }, [version.model?.id, apiKey]);

  const runInference = async (imageUrl: string) => {
    if (!version.model?.id || !isEngineReady || !apiKey) {
      console.error("Model not ready or missing API key");
      CustomToast.error("Model is not ready. Please try again.");
      return;
    }

    setIsInferencing(true);
    setInferenceResult(null);

    try {
      void apiKey;
      void workspaceName;
      void confidenceThreshold;
      void overlapThreshold;
      CustomToast.error("Model inference API is disabled.");
    } finally {
      setIsInferencing(false);
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      // Run inference with current settings
      runInference(imageUrl);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {/* Max width set to match a large dashboard view */}
      <DialogContent className="max-w-[95vw] h-[90vh] flex flex-col p-0 gap-0 overflow-hidden sm:rounded-xl">
        {/* Header */}
        <div className="border-b px-6 py-4 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              Visualize
            </h2>
            <div className="h-4 w-[1px] bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Switch Model:</span>
              <Select defaultValue={version.id}>
                <SelectTrigger className="w-[300px] h-9">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={version.id}>
                    {version.model?.id || version.name}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-500 uppercase font-medium">
                mAP@50
              </span>
              <span className="font-semibold text-[#6841ff]">
                {version.model?.map || "0.0"}%
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-500 uppercase font-medium">
                Precision
              </span>
              <span className="font-semibold text-slate-700">
                {version.model?.precision || "0.0"}%
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-500 uppercase font-medium">
                Recall
              </span>
              <span className="font-semibold text-slate-700">
                {version.model?.recall || "0.0"}%
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-1 overflow-hidden bg-[#f8f9fc]">
          {/* LEFT SIDEBAR - Inputs */}
          <div className="w-80 border-r bg-white p-4 flex flex-col gap-6 overflow-y-auto shrink-0">
            {/* Upload */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-slate-900">
                Upload Image or Video File
              </h3>
              <div
                {...getRootProps()}
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 transition-colors",
                  !isEngineReady && "opacity-50 cursor-not-allowed",
                  isEngineReady &&
                    !isDragActive &&
                    "cursor-pointer border-slate-200 hover:border-[#6841ff]/50",
                  isDragActive && "border-[#6841ff] bg-[#6841ff]/5",
                )}
              >
                <input {...getInputProps()} disabled={!isEngineReady} />
                {!isEngineReady ? (
                  <>
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#6841ff] border-t-transparent" />
                    <p className="text-xs text-slate-500 text-center">
                      Loading model...
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="h-6 w-6 text-slate-400" />
                    <p className="text-xs text-slate-500 text-center">
                      Drop file here or
                    </p>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Select File
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Paste URL */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-slate-900">
                Paste Image URL
              </h3>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    className="pl-9 h-9 text-xs"
                    placeholder={
                      isEngineReady ? "Paste a link..." : "Loading model..."
                    }
                    disabled={!isEngineReady}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CENTRE - Visualization */}
          <div className="flex-1 flex items-center justify-center p-6 overflow-hidden relative">
            {selectedImage ? (
              <div className="relative max-w-full max-h-full shadow-lg rounded-lg overflow-hidden border bg-white inline-block">
                <img
                  ref={imgRef}
                  src={selectedImage}
                  alt="Test"
                  className="max-w-full max-h-[calc(90vh-100px)] object-contain block"
                />

                {/* Overlay Predictions */}
                {inferenceResult &&
                  inferenceResult.predictions &&
                  inferenceResult.predictions.map((pred, i) => {
                    // Filter by threshold logic just for display
                    if (pred.confidence < confidenceThreshold / 100)
                      return null;

                    // Calculate percentage positions
                    // Roboflow API returns: { x, y, width, height, class, confidence }
                    // x,y are center coordinates

                    const imgW = inferenceResult.image.width;
                    const imgH = inferenceResult.image.height;

                    const x = pred.x;
                    const y = pred.y;
                    const w = pred.width;
                    const h = pred.height;

                    const left = x - w / 2;
                    const top = y - h / 2;

                    return (
                      <div
                        key={i}
                        className="absolute border-2 border-[#ff3838] bg-[#ff3838]/10"
                        style={{
                          left: `${(left / imgW) * 100}%`,
                          top: `${(top / imgH) * 100}%`,
                          width: `${(w / imgW) * 100}%`,
                          height: `${(h / imgH) * 100}%`,
                        }}
                      >
                        <span className="absolute -top-6 left-0 bg-[#ff3838] text-white text-[10px] px-1 py-0.5 rounded-sm whitespace-nowrap z-10">
                          {pred.class} {Math.round(pred.confidence * 100)}%
                        </span>
                      </div>
                    );
                  })}

                {isInferencing && (
                  <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-20">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#6841ff] border-t-transparent"></div>
                      <span className="text-xs font-semibold text-[#6841ff]">
                        Running Inference...
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="h-32 w-32 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                  <Monitor className="h-10 w-10 text-slate-300" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900">
                    No Image Selected
                  </h3>
                  <p className="text-slate-500">
                    Select an image from the sidebar to test the model.
                  </p>
                </div>
              </div>
            )}

            {/* Object count badge */}
            {inferenceResult && inferenceResult.predictions && (
              <div className="absolute bottom-6 right-6 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-md shadow-md z-30">
                {
                  inferenceResult.predictions.filter(
                    (p) => p.confidence >= confidenceThreshold / 100,
                  ).length
                }{" "}
                object
                {inferenceResult.predictions.filter(
                  (p) => p.confidence >= confidenceThreshold / 100,
                ).length !== 1
                  ? "s"
                  : ""}{" "}
                detected
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR - Controls */}
          <div className="w-80 border-l bg-white flex flex-col shrink-0">
            {/* Controls */}
            <div className="p-4 space-y-6 border-b">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-700">
                    Confidence Threshold
                  </label>
                  <span className="text-xs text-slate-500">
                    {confidenceThreshold}%
                  </span>
                </div>
                <Slider
                  value={[confidenceThreshold]}
                  onValueChange={(v) => setConfidenceThreshold(v[0])}
                  max={100}
                  step={1}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-700">
                    Overlap Threshold
                  </label>
                  <span className="text-xs text-slate-500">
                    {overlapThreshold}%
                  </span>
                </div>
                <Slider
                  value={[overlapThreshold]}
                  onValueChange={(v) => setOverlapThreshold(v[0])}
                  max={100}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-700">
                  Label Display Mode
                </label>
                <Select defaultValue="confidence">
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confidence">Draw Confidence</SelectItem>
                    <SelectItem value="label">Label Only</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <Button
                  size="sm"
                  onClick={() => selectedImage && runInference(selectedImage)}
                  className="bg-[#6841ff] hover:bg-[#5835e6] text-xs h-8"
                  disabled={!selectedImage || !apiKey || !isEngineReady}
                >
                  Run Inference
                </Button>
              </div>
            </div>

            {/* JSON Output */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="p-3 bg-slate-50 border-b flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">
                  Inference Response
                </span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Copy className="h-3 w-3 text-slate-400" />
                </Button>
              </div>
              <div className="flex-1 p-4 overflow-auto bg-white">
                <pre className="text-[10px] font-mono text-slate-600 leading-tight">
                  {inferenceResult
                    ? JSON.stringify(inferenceResult.predictions, null, 2)
                    : "No inference run yet..."}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const TestModelDialog = (props: TestModelDialogProps) => {
  return (
    <Suspense fallback={null}>
      <TestModelDialogInner {...props} />
    </Suspense>
  );
};
