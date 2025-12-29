"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Hash, ImageIcon, Plus, Workflow, X } from "lucide-react";
import { useCreateProjectMutation } from "@/features/dataset/mutations/project.mutation";
import { useQueryClient } from "@tanstack/react-query";
import { PROJECTS_QUERY_KEY } from "@/features/dataset/queries/project.query";
import { useAuthStore } from "@/stores/auth-store";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";

const useCaseOptions = [
  { label: "Retail analytics", value: "retail" },
  { label: "Manufacturing QA", value: "manufacturing" },
  { label: "Smart mobility", value: "mobility" },
  { label: "Healthcare", value: "health" },
];

type Tool = "traditional" | "rapid";
type ProjectType =
  | "object-detection"
  | "classification"
  | "instance-segmentation";
type LabelMode = "" | "single" | "multi";

const schema = yup.object({
  name: yup.string().required("Project Name is required"),
  annotation: yup.string().required("Annotation Group is required"),
  tool: yup.string().oneOf(["traditional", "rapid"]).default("traditional"),
  selectedType: yup
    .string()
    .oneOf(["object-detection", "classification", "instance-segmentation"])
    .default("object-detection"),
  labelMode: yup.string().default(""),
  useCase: yup.string().default(""),
});

type FormData = yup.InferType<typeof schema>;

function RadioOption({
  label,
  value,
  selected,
  onSelect,
}: {
  label: string;
  value: LabelMode;
  selected: boolean;
  onSelect: (v: LabelMode) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className="inline-flex items-center gap-2 text-[13px] text-slate-500"
      aria-checked={selected}
      role="radio"
    >
      <span
        className={cn(
          "flex h-4.5 w-4.5 items-center justify-center rounded-full border-2 border-slate-200 bg-white",
          selected && "border-[#4a2cf0]"
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full bg-transparent",
            selected && "bg-[#4a2cf0]"
          )}
        />
      </span>
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

export const CreateWorkspaceDialog = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      annotation: "",
      tool: "traditional",
      selectedType: "object-detection",
      labelMode: "",
      useCase: "",
    },
  });

  const tool = watch("tool") as Tool;
  const selectedType = watch("selectedType") as ProjectType;
  const labelMode = watch("labelMode") as LabelMode;

  const { mutate: createProject, isPending } = useCreateProjectMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
      setOpen(false);
      toast.success("Project created successfully");
      router.push(`/dashboard/dataset/${data.data.id}/upload-dataset`);
      reset();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create project");
    },
  });

  const onSubmit = (data: FormData) => {
    let workspaceId = 1;
    if (user?.workspaces && user.workspaces.length > 0) {
      workspaceId = user.workspaces[0];
    }

    createProject({
      name: data.name,
      annotation: data.annotation,
      description: "This project is for detecting fruits in images.", // Hardcoded for now
      license: "Public Domain", // Hardcoded for now
      type: data.selectedType as ProjectType,
      workspace: workspaceId,
    });
  };

  const projectTypeDescription = useMemo(
    () =>
      ({
        "object-detection":
          "Identify objects and their positions with bounding boxes.",
        classification: "Assign labels to the entire image.",
        "instance-segmentation":
          "Detect multiple objects and their actual shape.",
      }[selectedType]),
    [selectedType]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-10 rounded-lg bg-primary px-3 text-sm font-semibold shadow-[0_12px_30px_rgba(91,33,255,0.35)] hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[94vw] max-w-[920px] border-0 bg-transparent p-0 [&>button]:hidden">
        <div className="max-h-[calc(100vh-2.5rem)] overflow-hidden">
          <div className="relative max-h-[calc(100vh-2.5rem)] overflow-y-auto rounded-[20px]">
            <div className="relative rounded-[20px] border border-[#e6e7ef] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
              {/* Close X */}
              <DialogClose asChild>
                <button
                  type="button"
                  className="sticky right-0 top-0 z-50 ml-auto mr-8 mt-8 block w-fit text-slate-900/80 transition hover:text-slate-900"
                  aria-label="Close"
                >
                  <X className="h-7 w-7" />
                </button>
              </DialogClose>

              {/* Header */}
              <div className="sticky top-0 z-40 bg-white px-7 pb-3 pt-4 md:px-12">
                <div className="pt-6 md:pt-8">
                  <h2 className="text-[30px] font-semibold leading-[1.08] text-slate-900 md:text-[34px]">
                    Let&apos;s create your Workspace.
                  </h2>

                  <div className="mt-3 flex items-center gap-2.5 text-[14px] leading-none">
                    <span className="text-slate-500">{user?.firstName || "User"}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span className="rounded-full bg-[#eef0f5] px-3 py-1 text-[12px] font-medium text-slate-600">
                      My First Project
                    </span>
                  </div>
                </div>

                <div className="mt-5 h-px w-full bg-slate-100" />
              </div>

              {/* Body */}
              <div className="px-5 pb-9 pt-2 md:px-10">
                <form id="create-project-form" onSubmit={handleSubmit(onSubmit)}>
                  {/* Top fields */}
                  <div className="grid gap-x-5 gap-y-5 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label className="text-[13px] font-semibold text-slate-900">
                        Project Name
                      </Label>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="My First Project"
                            className="h-10 rounded-[12px] border-slate-300 bg-white px-4 text-[14px] font-medium text-slate-900 shadow-none placeholder:text-slate-400 focus-visible:ring-0"
                          />
                        )}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[13px] font-semibold text-slate-900">
                        Annotation Group
                      </Label>
                      <Controller
                        name="annotation"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Objects"
                            className="h-10 rounded-[12px] border-slate-300 bg-white px-4 text-[14px] font-medium text-slate-900 shadow-none placeholder:text-slate-400 focus-visible:ring-0"
                          />
                        )}
                      />
                      {errors.annotation && (
                        <p className="text-xs text-red-500">
                          {errors.annotation.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[13px] font-semibold text-slate-900">
                        Tool
                      </Label>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setValue("tool", "traditional")}
                          className={cn(
                            "h-10 min-w-[150px] rounded-[12px] border px-5 text-[14px] font-medium transition",
                            tool === "traditional"
                              ? "border-[#4a2cf0] bg-[#cfd2ff] text-slate-800"
                              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                          )}
                        >
                          Traditional
                        </button>

                        <button
                          type="button"
                          onClick={() => setValue("tool", "rapid")}
                          className={cn(
                            "h-10 min-w-[120px] rounded-[12px] border px-5 text-[14px] font-medium transition",
                            tool === "rapid"
                              ? "border-[#4a2cf0] bg-[#cfd2ff] text-slate-800"
                              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                          )}
                        >
                          Rapid
                        </button>
                      </div>
                    </div>

                    {/* Project Category under first column */}
                    <div className="space-y-2 md:col-span-1">
                      <Label className="text-[13px] font-semibold text-slate-900">
                        Project Category
                      </Label>

                      <Controller
                        name="useCase"
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="h-10 w-full rounded-[12px] border-slate-300 bg-white px-4 text-[14px] font-medium text-slate-700 shadow-none focus:ring-0">
                              <SelectValue placeholder="Select Use Case" />
                            </SelectTrigger>
                            <SelectContent>
                              {useCaseOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="mt-4">
                    <div className="text-[13px] font-semibold text-slate-900">
                      Project Type
                    </div>

                    <div className="mt-3 overflow-hidden border border-slate-200 bg-white">
                      {/* Object Detection */}
                      <button
                        type="button"
                        onClick={() =>
                          setValue("selectedType", "object-detection")
                        }
                        className={cn(
                          "relative w-full px-7 py-6 text-left",
                          selectedType === "object-detection"
                            ? "bg-[#cfd2ff]"
                            : "bg-white hover:bg-slate-50"
                        )}
                      >
                        {selectedType === "object-detection" && (
                          <span className="pointer-events-none absolute inset-0 outline outline-2 outline-[#4a2cf0] outline-offset-[-2px]" />
                        )}

                        <div className="flex items-start justify-between gap-5">
                          <div>
                            <div className="text-[18px] font-semibold text-slate-900">
                              Object Detection
                            </div>
                            <div className="mt-2 text-[14px] text-slate-700">
                              Identify objects and their positions with bounding
                              boxes.
                            </div>
                          </div>

                          <div className="flex flex-wrap justify-end gap-2 pt-0.5">
                            <span className="inline-flex items-center rounded-full bg-[#4a2cf0] px-4 py-1.5 text-[12px] font-medium text-white">
                              Bounding Boxes
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full bg-[#4a2cf0] px-4 py-1.5 text-[12px] font-medium text-white">
                              <Hash className="h-3.5 w-3.5" />
                              Counts
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full bg-[#4a2cf0] px-4 py-1.5 text-[12px] font-medium text-white">
                              <Workflow className="h-3.5 w-3.5" />
                              Tracking
                            </span>
                          </div>
                        </div>
                      </button>

                      <div className="h-px w-full bg-slate-200" />

                      {/* Classification */}
                      <button
                        type="button"
                        onClick={() =>
                          setValue("selectedType", "classification")
                        }
                        className={cn(
                          "relative w-full px-7 py-6 text-left transition",
                          selectedType === "classification"
                            ? "bg-[#cfd2ff]"
                            : "bg-white hover:bg-slate-50"
                        )}
                      >
                        {selectedType === "classification" && (
                          <span className="pointer-events-none absolute inset-0 outline outline-2 outline-[#4a2cf0] outline-offset-[-2px]" />
                        )}

                        <div className="flex items-start justify-between gap-5">
                          <div>
                            <div className="text-[18px] font-semibold text-slate-900">
                              Classification
                            </div>
                            <div className="mt-2 text-[14px] text-slate-700">
                              Assign labels to the entire image.
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-3 pt-0.5">
                            <div className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-500">
                              <ImageIcon className="h-4 w-4" />
                              Image Labels
                            </div>

                            <div
                              className="flex items-center gap-6"
                              role="radiogroup"
                              aria-label="Classification label mode"
                            >
                              <RadioOption
                                label="Single-Label"
                                value="single"
                                selected={labelMode === "single"}
                                onSelect={(v) => setValue("labelMode", v)}
                              />
                              <RadioOption
                                label="Multi-Label"
                                value="multi"
                                selected={labelMode === "multi"}
                                onSelect={(v) => setValue("labelMode", v)}
                              />
                            </div>
                          </div>
                        </div>
                      </button>

                      <div className="h-px w-full bg-slate-200" />

                      {/* Instance Segmentation */}
                      <button
                        type="button"
                        onClick={() =>
                          setValue("selectedType", "instance-segmentation")
                        }
                        className={cn(
                          "relative w-full px-7 py-6 text-left transition",
                          selectedType === "instance-segmentation"
                            ? "bg-[#cfd2ff]"
                            : "bg-white hover:bg-slate-50"
                        )}
                      >
                        {selectedType === "instance-segmentation" && (
                          <span className="pointer-events-none absolute inset-0 outline outline-2 outline-[#4a2cf0] outline-offset-[-2px]" />
                        )}

                        <div>
                          <div className="text-[18px] font-semibold text-slate-900">
                            Instance Segmentation
                          </div>
                          <div className="mt-2 text-[14px] text-slate-700">
                            Detect multiple objects and their actual shape.
                          </div>
                        </div>
                      </button>
                    </div>

                    {/* Other */}
                    <button
                      type="button"
                      className="mt-6 w-full rounded-[12px] border border-slate-300 bg-white py-4 text-center text-[14px] font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Other
                    </button>

                    <div className="sr-only" aria-hidden="true">
                      {projectTypeDescription}
                    </div>
                  </div>
                </form>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 z-40 border-t border-slate-200 bg-white px-5 py-3 md:px-10">
                <div className="flex items-center justify-between">
                  <DialogClose asChild>
                    <Button className="h-12 rounded-[14px] bg-[#cfcfcf] px-10 text-[14px] font-medium text-white hover:bg-[#c6c6c6]">
                      Cancel
                    </Button>
                  </DialogClose>

                  <Button
                    type="submit"
                    form="create-project-form"
                    disabled={isPending}
                    className="h-12 rounded-[14px] bg-primary px-10 text-[14px] font-medium text-white hover:bg-primary/90"
                  >
                    {isPending ? "Creating..." : "Create Workspace"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
