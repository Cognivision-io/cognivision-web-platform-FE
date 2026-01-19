import { useState, useCallback, useRef } from "react";
import {
  CloudUpload,
  FileText,
  Folder,
  Image as ImageIcon,
  Loader2,
  X,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDropzone } from "react-dropzone";
import {
  useUploadImagesMutation,
  useUploadFolderMutation,
} from "@/features/dataset/mutations/upload.mutation";
import { useProjectQuery } from "@/features/dataset/queries/project.query";
import { useParams } from "next/navigation";
import Image from "next/image";
import CustomToast from "@/components/ui/sonner";
import { getApiErrorMessage } from "@/lib/api-error";

interface UploadStepProps {
  onNext: (data: { roboflowProjectId: string; imageIds: string[] }) => void;
}

export const UploadStep = ({ onNext }: UploadStepProps) => {
  const [batchName, setBatchName] = useState("");
  const [tags, setTags] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<
    { file: File; preview: string }[]
  >([]);
  const [uploadProgress, setUploadProgress] = useState(false);

  const params = useParams();
  const projectId = params.id as string;
  const { data: project } = useProjectQuery(Number(projectId));
  const uploadProjectId = project?.data?.project?.id || projectId;

  const handleSuccess = (data: any) => {
    setUploadProgress(false);
    const roboflowProjectId = data.projectId;
    const imageIds =
      data.results?.successful?.map((item: any) => item.result.id) || [];

    CustomToast.success("Uploaded successfully");
    onNext({ roboflowProjectId, imageIds });
  };

  const { mutate: uploadImages } = useUploadImagesMutation({
    onSuccess: (data) => {
      handleSuccess(data);
    },
    onError: (error) => {
      setUploadProgress(false);
      CustomToast.error(getApiErrorMessage(error, "Failed to upload images"));
    },
  });

  const { mutate: uploadFolder } = useUploadFolderMutation({
    onSuccess: (data) => {
      handleSuccess(data);
    },
    onError: (error) => {
      setUploadProgress(false);
      CustomToast.error(getApiErrorMessage(error, "Failed to upload folder"));
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPreviews = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...acceptedFiles]);
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".bmp", ".webp", ".avif"],
    },
    noClick: true, // Disable click on root to allow custom buttons
  });

  const folderInputRef = useRef<HTMLInputElement>(null);

  const handleFolderSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      const validFiles = selectedFiles.filter((file) =>
        file.type.startsWith("image/")
      );
      const newPreviews = validFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setFiles((prev) => [...prev, ...validFiles]);
      setPreviewImages((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => {
      // Revoke the object URL to avoid memory leaks
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleUpload = () => {
    if (files.length === 0) return;

    if (!batchName.trim()) {
      CustomToast.error("Batch Name is required");
      return;
    }

    setUploadProgress(true);

    // Check if files have webkitRelativePath determining if it was a folder upload
    // Typically mixed uploads are tricky, but if we use the folder button, all might share logic
    // For simplicity, if we used the folder input, we might want to call uploadFolder,
    // but the backend logic for uploadImages is similar if we just pass files.
    // However, the user specifically asked for /project/upload-folder if user upload folder.
    // The dropzone flattens files. The folderInputRef gives files with webkitRelativePath.

    // Simplification: If any file has a path separator in webkitRelativePath, treat as folder upload?
    // Or simpler: Use uploadImages for drag/drop and file selection, uploadFolder for folder selection logic.
    // Given the state is merged, we'll try to determine best generic strategy.
    // If we assume purely on how they were added:
    // It's hard to distinguish once merged into 'files' array without tracking source.

    // Let's check if any file has a non-empty webkitRelativePath indicating folder structure.
    const isFolderUpload = files.some(
      (f) => f.webkitRelativePath && f.webkitRelativePath.includes("/")
    );

    if (isFolderUpload) {
      uploadFolder({
        projectId: uploadProjectId,
        batch: batchName,
        files,
        id: projectId,
      });
    } else {
      uploadImages({
        projectId: uploadProjectId,
        batch: batchName,
        files,
        id: projectId,
      });
    }
  };

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
            Batch Name: <span className="text-red-500">*</span>
          </Label>
          <Input
            value={batchName}
            onChange={(e) => setBatchName(e.target.value)}
            placeholder="Enter batch name"
            className="h-11 rounded-lg border-slate-200 bg-white text-sm shadow-none focus-visible:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-900">Tags:</Label>
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Search or add tags for images..."
            className="h-11 rounded-lg border-slate-200 bg-white text-sm shadow-none focus-visible:ring-primary"
          />
        </div>
      </div>

      {files.length > 0 ? (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900">
              {uploadProgress ? "Uploading files..." : "Selected Files"}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {previewImages.map((img, index) => (
              <div
                key={index}
                className="relative aspect-square group rounded-lg overflow-hidden border border-slate-200"
              >
                <Image
                  src={img.preview}
                  alt="preview"
                  fill
                  className="object-cover"
                />
                {!uploadProgress && (
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3 text-slate-700" />
                  </button>
                )}
              </div>
            ))}

            {/* Add more button */}
            {!uploadProgress && (
              <div
                {...getRootProps()}
                onClick={open}
                className="flex items-center justify-center aspect-square rounded-lg border-2 border-dashed border-slate-200 hover:border-primary/50 hover:bg-slate-50 cursor-pointer transition"
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-1 text-slate-400">
                  <Plus className="h-6 w-6" />
                  <span className="text-xs">Add</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setFiles([]);
                setPreviewImages([]);
              }}
              disabled={uploadProgress}
            >
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={uploadProgress}>
              {uploadProgress && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {uploadProgress ? "Uploading..." : "Start Upload"}
            </Button>
          </div>
        </div>
      ) : (
        /* Upload Areas */
        <div className="grid gap-6 md:grid-cols-2">
          {/* Drag and Drop Area */}
          <div
            {...getRootProps()}
            className={`flex min-h-[400px] flex-col rounded-xl border-2 border-dashed transition-colors ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-[#e1e4f5] bg-white"
            } p-8`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f0f2f5]">
                <ImageIcon className="h-8 w-8 text-slate-400" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-700">
                  {isDragActive
                    ? "Drop the files here..."
                    : "Drag and drop files to upload dataset"}
                </h3>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={open}
                  type="button"
                  className="h-10 gap-2 rounded-lg border-slate-300 font-medium text-slate-700 hover:bg-slate-100 hover:text-black"
                >
                  <FileText className="h-4 w-4" />
                  Select File(s)
                </Button>
                <div className="relative">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => folderInputRef.current?.click()}
                    className="h-10 gap-2 rounded-lg border-slate-300 font-medium text-slate-700 hover:bg-slate-100 hover:text-black"
                  >
                    <Folder className="h-4 w-4" />
                    Select Folder
                  </Button>
                  <input
                    type="file"
                    ref={folderInputRef}
                    onChange={handleFolderSelect}
                    className="hidden"
                    {...({ webkitdirectory: "", directory: "" } as any)}
                    multiple
                  />
                </div>
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
      )}
    </>
  );
};
