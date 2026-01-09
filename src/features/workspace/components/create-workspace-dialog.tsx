"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { useCreateWorkspaceMutation } from "@/features/workspace/mutations/workspace.mutation";
import { WORKSPACES_QUERY_KEY } from "@/features/workspace/queries/workspace.query";
import type { Workspace } from "@/interfaces/workspace.interface";

const schema = yup.object({
  name: yup.string().required("Workspace name is required"),
});

type FormData = yup.InferType<typeof schema>;

type CreateWorkspaceDialogProps = {
  nextOrder?: number;
  onCreated?: (workspace: Workspace) => void;
};

export const CreateWorkspaceDialog = ({
  nextOrder,
  onCreated,
}: CreateWorkspaceDialogProps) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: createWorkspace, isPending } = useCreateWorkspaceMutation({
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: WORKSPACES_QUERY_KEY });
      toast.success("Workspace created successfully");
      setOpen(false);
      onCreated?.(response.data);
      reset();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create workspace");
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: FormData) => {
    createWorkspace({
      name: data.name,
      status: true,
      order: nextOrder ?? 1,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-10 rounded-lg border border-[#e1e4f5] bg-white px-3 text-sm font-semibold text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-colors hover:border-[#ced3f0]">
          <Plus className="h-4 w-4" />
          New Workspace
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[520px] border-0 bg-transparent p-0 [&>button]:hidden">
        <div className="relative rounded-[20px] border border-[#e6e7ef] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
          <DialogClose asChild>
            <button
              type="button"
              className="absolute right-6 top-6 text-slate-500 transition hover:text-slate-900"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogClose>

          <div className="space-y-2">
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-slate-400">
              Workspace
            </p>
            <h2 className="text-[22px] font-semibold text-slate-900">
              Create a new workspace
            </h2>
            <p className="text-[13px] text-slate-500">
              Organize projects, teams, and usage under a single workspace.
            </p>
          </div>

          <form
            className="mt-6 space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-2">
              <Label className="text-[13px] font-semibold text-slate-900">
                Workspace name
              </Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Default Workspace"
                    className="h-10 rounded-[12px] border-slate-300 bg-white px-4 text-[14px] font-medium text-slate-900 shadow-none placeholder:text-slate-400 focus-visible:ring-0"
                  />
                )}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between rounded-lg border border-[#eef0f5] bg-[#f8f9ff] px-4 py-3 text-xs text-slate-500">
              <span>Order</span>
              <span className="font-semibold text-slate-700">
                {nextOrder ?? 1}
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  className="h-10 rounded-[12px] bg-[#cfcfcf] px-5 text-[13px] font-medium text-white hover:bg-[#c6c6c6]"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isPending}
                className="h-10 rounded-[12px] bg-primary px-5 text-[13px] font-medium text-white hover:bg-primary/90"
              >
                {isPending ? "Creating..." : "Create Workspace"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
