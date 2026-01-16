"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
} from "@mui/x-data-grid";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { CalendarDays } from "lucide-react";
import { DayPicker, type DateRange } from "react-day-picker";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useApiUsageDetailedLogsQuery } from "@/features/monitoring/queries/api-usage-detailed-logs.query";
import { useApiUsageSummaryQuery } from "@/features/monitoring/queries/api-usage-summary.query";
import { cn } from "@/lib/utils";

const formatDateTime = (value?: string | null) => {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return format(date, "MMM dd, yyyy - HH:mm:ss");
};

const formatNumber = (value?: number | string | null) => {
  if (value === null || value === undefined || value === "") return "--";
  const numericValue = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(numericValue)) return String(value);
  return numericValue.toLocaleString();
};

const formatDecimal = (value?: number | string | null) => {
  if (value === null || value === undefined || value === "") return "--";
  const numericValue = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(numericValue)) return String(value);
  return numericValue.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
};

const formatBytes = (value?: number | string | null) => {
  if (value === null || value === undefined || value === "") return "--";
  const bytes = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(bytes)) return String(value);
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
};

const DetailedLogsEmptyState = () => {
  return (
    <div className="flex h-full items-center justify-center px-6 text-sm text-muted-foreground">
      No detailed logs yet.
    </div>
  );
};

const asTruncatedText = (value: unknown) => {
  if (value === null || value === undefined || value === "") return "--";
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
};

type DetailedLogsTableProps = {
  workspaceId?: number;
  workspaceName?: string;
  className?: string;
};

export default function DetailedLogsTable({
  workspaceId,
  workspaceName,
  className,
}: DetailedLogsTableProps) {
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const now = new Date();
    return { from: startOfMonth(now), to: endOfMonth(now) };
  });

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    setPaginationModel({ page: 0, pageSize: 10 });
  }, [workspaceId]);

  const startDate = useMemo(() => {
    return dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : undefined;
  }, [dateRange.from]);

  const endDate = useMemo(() => {
    return dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : undefined;
  }, [dateRange.to]);

  const dateRangeLabel = useMemo(() => {
    if (!dateRange.from && !dateRange.to) return "Select dates";
    if (dateRange.from && !dateRange.to)
      return `${format(dateRange.from, "MMM dd, yyyy")} - …`;
    if (!dateRange.from && dateRange.to)
      return `… - ${format(dateRange.to, "MMM dd, yyyy")}`;
    return `${format(dateRange.from as Date, "MMM dd, yyyy")} - ${format(
      dateRange.to as Date,
      "MMM dd, yyyy"
    )}`;
  }, [dateRange]);

  const {
    data: summaryResponse,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
  } = useApiUsageSummaryQuery({
    workspaceId,
    startDate,
    endDate,
  });

  const {
    data: logsResponse,
    isLoading: isLogsLoading,
    isError: isLogsError,
  } = useApiUsageDetailedLogsQuery({
    workspaceId,
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
  });

  const rows = useMemo(() => {
    return (logsResponse?.data?.data ?? []).map((entry) => ({
      id: entry.id,
      createdAt: entry.createdAt,
      method: entry.method,
      statusCode: entry.statusCode,
      responseTimeMs: entry.responseTimeMs,
      creditsUsed: entry.creditsUsed,
      requestSize: entry.requestSize,
      responseSize: entry.responseSize,
      apiKey: entry.apiKey,
      modelId: entry.modelId,
      ipAddress: entry.ipAddress,
      userAgent: entry.userAgent,
      errorMessage: entry.errorMessage,
      metadata: entry.metadata,
      rateLimited: entry.rateLimited,
    }));
  }, [logsResponse]);

  const totalRows = logsResponse?.data?.total ?? 0;

  const summaryChartData = useMemo(() => {
    const rows = summaryResponse?.data?.data ?? [];
    return rows.map((row) => ({
      date: row.periodStart,
      total: Number(row.totalRequests) || 0,
      success: Number(row.successfulRequests) || 0,
      failed: Number(row.failedRequests) || 0,
    }));
  }, [summaryResponse]);

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "createdAt",
        headerName: "Timestamp",
        flex: 1.3,
        minWidth: 190,
        renderCell: (params) => (
          <span className="text-[12px] font-medium text-slate-700">
            {formatDateTime(params.value as string)}
          </span>
        ),
      },
      {
        field: "method",
        headerName: "Method",
        flex: 0.6,
        minWidth: 110,
        renderCell: (params) => {
          const value = ((params.value as string) || "").toUpperCase();
          const tone =
            value === "GET"
              ? "bg-emerald-50 text-emerald-700"
              : value === "POST"
              ? "bg-indigo-50 text-indigo-700"
              : value === "DELETE"
              ? "bg-rose-50 text-rose-700"
              : "bg-slate-100 text-slate-700";
          return (
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${tone}`}
            >
              {value || "--"}
            </span>
          );
        },
      },
      {
        field: "statusCode",
        headerName: "Status",
        flex: 0.6,
        minWidth: 110,
        renderCell: (params) => {
          const value = Number(params.value);
          const isSuccess = value >= 200 && value < 300;
          const isClientError = value >= 400 && value < 500;
          const isServerError = value >= 500;
          const tone = isSuccess
            ? "bg-emerald-50 text-emerald-700"
            : isClientError
            ? "bg-amber-50 text-amber-700"
            : isServerError
            ? "bg-rose-50 text-rose-700"
            : "bg-slate-100 text-slate-700";
          return (
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold ${tone}`}
            >
              {Number.isNaN(value) ? "--" : value}
            </span>
          );
        },
      },
      {
        field: "responseTimeMs",
        headerName: "Response",
        flex: 0.9,
        minWidth: 140,
        renderCell: (params) => {
          const formatted = formatNumber(params.value as number);
          return (
            <span className="text-[12px] font-medium text-slate-700">
              {formatted === "--" ? "--" : `${formatted} ms`}
            </span>
          );
        },
      },
      {
        field: "creditsUsed",
        headerName: "Credits",
        flex: 0.8,
        minWidth: 130,
        renderCell: (params) => (
          <span className="text-[12px] font-medium text-slate-700">
            {formatDecimal(params.value as number)}
          </span>
        ),
      },
      {
        field: "requestSize",
        headerName: "Req Size",
        flex: 0.8,
        minWidth: 130,
        renderCell: (params) => (
          <span className="text-[12px] font-medium text-slate-700">
            {formatBytes(params.value as number)}
          </span>
        ),
      },
      {
        field: "responseSize",
        headerName: "Res Size",
        flex: 0.8,
        minWidth: 130,
        renderCell: (params) => (
          <span className="text-[12px] font-medium text-slate-700">
            {formatBytes(params.value as number)}
          </span>
        ),
      },
      {
        field: "ipAddress",
        headerName: "IP",
        flex: 0.9,
        minWidth: 160,
        renderCell: (params) => (
          <span className="text-[12px] font-medium text-slate-700">
            {(params.value as string) || "--"}
          </span>
        ),
      },
      {
        field: "apiKey",
        headerName: "API Key",
        flex: 1,
        minWidth: 170,
        renderCell: (params) => (
          <span
            className="block w-full truncate text-[12px] font-medium text-slate-700"
            title={(params.value as string) ?? ""}
          >
            {(params.value as string) || "--"}
          </span>
        ),
      },
      {
        field: "modelId",
        headerName: "Model",
        flex: 1.2,
        minWidth: 200,
        renderCell: (params) => (
          <span
            className="block w-full truncate text-[12px] font-medium text-slate-700"
            title={(params.value as string) ?? ""}
          >
            {(params.value as string) || "--"}
          </span>
        ),
      },
      {
        field: "metadata",
        headerName: "Metadata",
        flex: 1.2,
        minWidth: 220,
        renderCell: (params) => {
          const text = asTruncatedText(params.value);
          return (
            <span
              className="block w-full truncate text-[12px] text-slate-500"
              title={text}
            >
              {text}
            </span>
          );
        },
      },
      {
        field: "rateLimited",
        headerName: "Rate Limited",
        flex: 0.9,
        minWidth: 160,
        renderCell: (params) => {
          const limited = Boolean(params.value);
          return (
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                limited
                  ? "bg-rose-50 text-rose-700"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {limited ? "Yes" : "No"}
            </span>
          );
        },
      },
      {
        field: "errorMessage",
        headerName: "Error",
        flex: 1.8,
        minWidth: 280,
        renderCell: (params) => {
          const value = params.value as string | null;
          return (
            <span
              className={`block w-full truncate text-[12px] ${
                value ? "font-medium text-rose-700" : "text-slate-500"
              }`}
              title={value ?? ""}
            >
              {value || "--"}
            </span>
          );
        },
      },
      {
        field: "userAgent",
        headerName: "User Agent",
        flex: 1.6,
        minWidth: 320,
        renderCell: (params) => (
          <span
            className="block w-full truncate text-[12px] text-slate-500"
            title={(params.value as string) ?? ""}
          >
            {(params.value as string) || "--"}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Usage Summary
              </h3>
              <p className="text-sm text-muted-foreground">
                Aggregate API usage for {workspaceName ?? "this workspace"}.
              </p>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="justify-start gap-2 border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50"
                  disabled={!workspaceId}
                >
                  <CalendarDays className="h-4 w-4 text-slate-500" />
                  <span className="text-sm font-medium">{dateRangeLabel}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-auto p-0">
                <DayPicker
                  mode="range"
                  numberOfMonths={2}
                  selected={dateRange}
                  onSelect={(next) =>
                    setDateRange(next ?? { from: undefined, to: undefined })
                  }
                  defaultMonth={dateRange.from ?? new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>

        <CardContent>
          {!workspaceId ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-sm text-muted-foreground">
                Select a workspace to view usage summary.
              </p>
            </div>
          ) : !startDate || !endDate ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-sm text-muted-foreground">
                Select a start and end date to view usage summary.
              </p>
            </div>
          ) : isSummaryError ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-sm text-muted-foreground">
                Failed to load usage summary.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Total Requests
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {isSummaryLoading
                      ? "--"
                      : formatNumber(summaryResponse?.data?.totalRequests ?? null)}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Successful
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-emerald-700">
                    {isSummaryLoading
                      ? "--"
                      : formatNumber(
                          summaryResponse?.data?.successfulRequests ?? null
                        )}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Failed
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-rose-700">
                    {isSummaryLoading
                      ? "--"
                      : formatNumber(summaryResponse?.data?.failedRequests ?? null)}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Avg Response
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {(() => {
                      if (isSummaryLoading) return "--";
                      const formatted = formatNumber(
                        summaryResponse?.data?.avgResponseTimeMs ?? null
                      );
                      return formatted === "--" ? "--" : `${formatted} ms`;
                    })()}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Credits Used
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {isSummaryLoading
                      ? "--"
                      : formatDecimal(summaryResponse?.data?.totalCreditsUsed ?? null)}
                  </p>
                </div>
              </div>

              <div className="mt-6 h-[260px] w-full rounded-xl border border-slate-200 bg-white p-4">
                <p className="mb-3 text-sm font-semibold text-slate-900">
                  Requests Over Time
                </p>
                {isSummaryLoading ? (
                  <div className="flex h-[200px] items-center justify-center">
                    <p className="text-sm text-muted-foreground">Loading...</p>
                  </div>
                ) : summaryChartData.length === 0 ? (
                  <div className="flex h-[200px] items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                      No summary data available for this range.
                    </p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={summaryChartData}
                      margin={{ left: 8, right: 8 }}
                    >
                      <defs>
                        <linearGradient
                          id="totalGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#7c3aed"
                            stopOpacity={0.35}
                          />
                          <stop
                            offset="100%"
                            stopColor="#7c3aed"
                            stopOpacity={0.02}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e2e8f0"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="date"
                        stroke="#64748b"
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        stroke="#64748b"
                        tick={{ fontSize: 12 }}
                        allowDecimals={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "10px",
                          boxShadow: "0 6px 16px rgba(15, 23, 42, 0.12)",
                        }}
                        labelStyle={{ color: "#0f172a", fontWeight: 600 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="total"
                        stroke="#7c3aed"
                        strokeWidth={2}
                        fill="url(#totalGradient)"
                        name="Total"
                        isAnimationActive
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Detailed Logs
              </h3>
              <p className="text-sm text-muted-foreground">
                Request-level API monitoring for{" "}
                {workspaceName ?? "this workspace"}.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                {totalRows} records
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!workspaceId ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-sm text-muted-foreground">
                Select a workspace to view detailed logs.
              </p>
            </div>
          ) : isLogsError ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-sm text-muted-foreground">
                Failed to load detailed logs.
              </p>
            </div>
          ) : (
            <div className="min-h-[520px] min-w-0">
              <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                loading={isLogsLoading}
                disableRowSelectionOnClick
                disableColumnMenu
                pagination
                paginationMode="server"
                rowCount={totalRows}
                pageSizeOptions={[10, 20, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                slots={{
                  noRowsOverlay: DetailedLogsEmptyState,
                  noResultsOverlay: DetailedLogsEmptyState,
                }}
                sx={{
                  width: "100%",
                  minWidth: 0,
                  border: "1px solid #e6e9f5",
                  borderRadius: 3,
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
        </CardContent>
      </Card>
    </div>
  );
}
