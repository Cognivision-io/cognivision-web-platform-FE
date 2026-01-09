"use client";

import { useMemo, useState } from "react";
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";

import { useWorkspaceCreditsHistoryQuery } from "@/features/workspace/queries/workspace.query";
import type { WorkspaceCreditHistoryEntry } from "@/interfaces/workspace.interface";
import { cn } from "@/lib/utils";

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

const formatDateTime = (value?: string | null) => {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return format(date, "MMM dd, yyyy - HH:mm");
};

const formatTaskLabel = (value?: string | null) => {
  if (!value) return "--";
  const cleaned = value.replace(/_/g, " ").toLowerCase();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
};

const formatAmount = (value?: string | null, transactionType?: string | null) => {
  const numericValue = Number(value);
  const sign =
    transactionType === "addition"
      ? "+"
      : transactionType === "deduction"
        ? "-"
        : "";
  if (Number.isNaN(numericValue)) {
    return `${sign}${value ?? "--"}`;
  }
  return `${sign}${numericValue.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  })}`;
};

const CreditHistoryEmptyState = () => {
  return (
    <div className="flex h-full items-center justify-center px-6 text-sm text-[#7a819f]">
      No credit activity yet.
    </div>
  );
};

type WorkspaceCreditsHistoryTableProps = {
  workspaceId?: number;
  workspaceName?: string;
  className?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
};

export const WorkspaceCreditsHistoryTable = ({
  workspaceId,
  workspaceName,
  className,
  collapsible = false,
  defaultCollapsed = false,
}: WorkspaceCreditsHistoryTableProps) => {
  const [isExpanded, setIsExpanded] = useState(!defaultCollapsed);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const { data: historyData, isLoading } = useWorkspaceCreditsHistoryQuery({
    workspaceId,
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
  });

  const historyRows = useMemo(() => {
    return (historyData?.data?.data ?? []).map(
      (entry: WorkspaceCreditHistoryEntry) => ({
        id: entry.id,
        createdAt: entry.createdAt,
        amount: entry.amount,
        transactionType: entry.transactionType,
        task: entry.task,
        balanceAfter: entry.balanceAfter,
        description: entry.description,
        workspaceName: entry.workspace?.name,
      })
    );
  }, [historyData]);

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "createdAt",
        headerName: "Date",
        flex: 1.2,
        minWidth: 180,
        renderCell: (params) => (
          <span className="text-[12px] font-medium text-[#4b5563]">
            {formatDateTime(params.value as string)}
          </span>
        ),
      },
      {
        field: "transactionType",
        headerName: "Type",
        flex: 0.8,
        minWidth: 120,
        renderCell: (params) => {
          const value = params.value as string;
          const isAddition = value === "addition";
          const isDeduction = value === "deduction";
          const badgeClasses = isAddition
            ? "bg-[#e8f7ef] text-[#117b4f]"
            : isDeduction
              ? "bg-[#fdecec] text-[#b42318]"
              : "bg-[#eef2ff] text-[#4b5563]";
          const label = isAddition
            ? "Addition"
            : isDeduction
              ? "Deduction"
              : "Other";
          return (
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${badgeClasses}`}
            >
              {label}
            </span>
          );
        },
      },
      {
        field: "task",
        headerName: "Task",
        flex: 1,
        minWidth: 150,
        renderCell: (params) => (
          <span className="text-[12px] font-semibold text-[#1f2937]">
            {formatTaskLabel(params.value as string)}
          </span>
        ),
      },
      {
        field: "amount",
        headerName: "Amount",
        flex: 0.7,
        minWidth: 120,
        renderCell: (params) => {
          const type = params.row.transactionType as string;
          const isAddition = type === "addition";
          const isDeduction = type === "deduction";
          const toneClass = isAddition
            ? "text-[#117b4f]"
            : isDeduction
              ? "text-[#b42318]"
              : "text-[#374151]";
          return (
            <span className={`text-[12px] font-semibold ${toneClass}`}>
              {formatAmount(params.value as string, type)}
            </span>
          );
        },
      },
      {
        field: "balanceAfter",
        headerName: "Balance After",
        flex: 0.9,
        minWidth: 140,
        renderCell: (params) => (
          <span className="text-[12px] font-medium text-[#374151]">
            {formatCredits(params.value as string)}
          </span>
        ),
      },
      {
        field: "description",
        headerName: "Description",
        flex: 1.5,
        minWidth: 240,
        renderCell: (params) => (
          <span className="text-[12px] text-[#6b7280]">
            {(params.value as string) || "-"}
          </span>
        ),
      },
    ],
    []
  );

  const totalRows = historyData?.data?.total ?? 0;
  const baseClasses =
    "rounded-xl border border-[#e1e4f5] bg-white p-6 shadow-sm";
  const combinedClasses = className
    ? `${baseClasses} ${className}`
    : baseClasses;

  if (!workspaceId) {
    return (
      <div className={combinedClasses}>
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Credit History
        </h3>
        <p className="text-sm text-slate-500">
          Workspace credit history is unavailable.
        </p>
      </div>
    );
  }

  return (
    <div className={combinedClasses}>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[16px] font-semibold text-[#111827]">
            Credit history
          </h2>
          <p className="text-[12px] text-[#7a819f]">
            A detailed ledger for {workspaceName ?? "this workspace"}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full border border-[#e3e6f5] bg-[#f7f8ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5b6280]">
            {totalRows} records
          </div>
          {collapsible && (
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-[#e3e6f5] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5b6280] transition hover:border-[#cad2f0]"
            >
              <span>{isExpanded ? "Hide history" : "View history"}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  isExpanded ? "rotate-180" : ""
                )}
              />
            </button>
          )}
        </div>
      </div>

      {(!collapsible || isExpanded) && (
        <div className="min-h-[420px]">
          <DataGrid
            autoHeight
            rows={historyRows}
            columns={columns}
            loading={isLoading}
            disableRowSelectionOnClick
            disableColumnMenu
            pagination
            paginationMode="server"
            rowCount={totalRows}
            pageSizeOptions={[10, 20, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            slots={{
              noRowsOverlay: CreditHistoryEmptyState,
              noResultsOverlay: CreditHistoryEmptyState,
            }}
            sx={{
              border: "1px solid #e6e9f5",
              borderRadius: 16,
              backgroundColor: "#ffffff",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f3f5ff",
                color: "#1b2559",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.24em",
                borderBottom: "1px solid #e4e8f8",
              },
              "& .MuiDataGrid-columnSeparator": {
                color: "#e4e8f8",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #eef1fb",
                color: "#1f2937",
                alignItems: "center",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f7f8ff",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "1px solid #e4e8f8",
                backgroundColor: "#fafbff",
              },
              "& .MuiDataGrid-overlay": {
                backgroundColor: "#ffffff",
              },
            }}
          />
        </div>
      )}
    </div>
  );
};
