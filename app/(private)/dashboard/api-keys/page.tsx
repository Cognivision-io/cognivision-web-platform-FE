"use client";

import { useState } from "react";
import { Copy, Info, RotateCcw } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import CustomToast from "@/components/ui/sonner";
import { useDashboardMonoClass } from "@/features/dashboard/context/dashboard-mono-font";
import { useWorkspaceApiKeyQuery } from "@/features/workspace/queries/workspace.query";
import { useCurrentWorkspaceId } from "@/hooks/use-current-workspace-id";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ApiKeysPage() {
  const monoClassName = useDashboardMonoClass();
  const workspaceId = useCurrentWorkspaceId();
  const { data, isLoading, isError } = useWorkspaceApiKeyQuery(workspaceId);
  const [resetOpen, setResetOpen] = useState(false);

  const apiKey = data?.data?.apiKey?.trim() ?? "";

  const handleCopy = async () => {
    if (!apiKey) {
      CustomToast.error("No API key to copy.");
      return;
    }
    try {
      await navigator.clipboard.writeText(apiKey);
      CustomToast.success("API key copied to clipboard.");
    } catch {
      CustomToast.error("Could not copy to clipboard.");
    }
  };

  const handleResetConfirm = () => {
    setResetOpen(false);
    toast("Key reset is not available yet. Contact support if you need a new key.");
  };

  return (
    <div className="bg-[#f4f7fe] px-4 py-6 md:px-8 md:py-6">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="rounded-[14px] border border-[#e2e8f0] bg-white shadow-sm">
          <div className="border-b border-[#f1f5f9] px-7 pb-5 pt-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h1 className="text-[16px] font-semibold tracking-[-0.3px] text-[#2b2b2b]">
                  Access Key
                </h1>
                <p className="mt-1 max-w-xl text-[13px] font-normal leading-[1.5] text-[#94a3b8]">
                  Use this key to authenticate requests to the Cognivision SDK
                </p>
              </div>
              <span className="inline-flex h-[24.4px] shrink-0 items-center justify-center self-start rounded-full bg-[#10b981] px-2.5 text-[11px] font-medium uppercase tracking-[0.3px] text-white sm:self-center">
                Active
              </span>
            </div>
          </div>

          <div className="px-7 pb-7 pt-5">
            <p className="text-[12px] font-medium text-[#64748b]">API Key</p>

            <div className="mt-2 flex min-h-[66px] flex-col gap-3 rounded-[10px] border border-[#e2e8f0] bg-[#f4f7fe] p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <p
                className={cn(
                  "min-w-0 flex-1 break-all text-[13.5px] tracking-[0.3px] text-[#2b2b2b]",
                  monoClassName,
                )}
              >
                {!workspaceId ? (
                  <span className="text-[#94a3b8]">
                    No workspace selected. Sign in again or contact support.
                  </span>
                ) : isLoading ? (
                  <span className="text-[#94a3b8]">Loading key…</span>
                ) : isError ? (
                  <span className="text-[#94a3b8]">Could not load API key. Try again later.</span>
                ) : apiKey ? (
                  apiKey
                ) : (
                  <span className="text-[#94a3b8]">No API key available for this workspace.</span>
                )}
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={handleCopy}
                disabled={!apiKey || isLoading || !workspaceId}
                className="h-[36.4px] shrink-0 gap-2 rounded-[7px] border-[#e2e8f0] bg-white px-4 text-[13px] font-medium text-[#2b2b2b] hover:bg-[#f8fafc]"
              >
                <Copy className="size-[15px]" aria-hidden />
                Copy
              </Button>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => setResetOpen(true)}
              className="mt-4 h-[36.4px] gap-2 rounded-[7px] border-[#fee2e2] bg-white px-4 text-[13px] font-medium text-[#ef4444] hover:bg-[#fef2f2] hover:text-[#ef4444]"
            >
              <RotateCcw className="size-[15px]" aria-hidden />
              Reset Key
            </Button>

            <div className="mt-6 flex gap-3 rounded-[10px] border border-[#d8ccf5] bg-[#ede9fb] p-4">
              <Info className="mt-0.5 size-[18px] shrink-0 text-[#5925dc]" aria-hidden />
              <p className="text-[12.5px] leading-[1.6] text-[#5925dc]">
                <span className="font-semibold">Important:</span>
                <span className="font-normal">
                  {" "}
                  Keep your API key secure and never share it publicly. Resetting your key will
                  invalidate the current key immediately and may cause service interruptions.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={resetOpen} onOpenChange={setResetOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset API key?</AlertDialogTitle>
            <AlertDialogDescription>
              This will invalidate your current key. SDK and integrations using the old key will
              stop working until you update them.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleResetConfirm}
              className="bg-[#ef4444] text-white hover:bg-[#ef4444]/90"
            >
              Reset key
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
