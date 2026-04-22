"use client";

import { Coins } from "lucide-react";

import { useWorkspaceCreditsQuery } from "@/features/workspace/queries/workspace.query";

const formatCredits = (value?: number | string | null) => {
  const numericValue = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(numericValue)) {
    return "--";
  }
  return numericValue.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
};

type WorkspaceCreditsSummaryCardProps = {
  workspaceId?: number;
  workspaceName?: string;
  className?: string;
};

export const WorkspaceCreditsSummaryCard = ({
  workspaceId,
  workspaceName,
  className,
}: WorkspaceCreditsSummaryCardProps) => {
  const { data: creditsData, isLoading } =
    useWorkspaceCreditsQuery(workspaceId);

  const baseClasses =
    "rounded-xl border border-[#e1e4f5] bg-white p-6 shadow-sm";
  const combinedClasses = className
    ? `${baseClasses} ${className}`
    : baseClasses;

  if (!workspaceId) {
    return (
      <div className={combinedClasses}>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Credits
        </h3>
        <p className="text-sm text-slate-500">
          Workspace credits are unavailable.
        </p>
      </div>
    );
  }

  const creditsDisplay = isLoading
    ? "Loading..."
    : formatCredits(creditsData?.data?.credits);

  return (
    <div className={combinedClasses}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Credits
        </h3>
        <Coins className="h-4 w-4 text-[#6841ff]" />
      </div>
      <p className="mt-3 text-2xl font-semibold text-slate-900">
        {creditsDisplay}
      </p>
      <p className="mt-1 text-xs text-slate-500">
        Available credits for {workspaceName ?? "this workspace"}
      </p>
    </div>
  );
};
