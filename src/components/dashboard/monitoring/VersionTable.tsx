"use client";

import { useMemo, useState } from "react";
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
} from "@mui/x-data-grid";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { RoboflowInferenceStats } from "@/interfaces/monitoring.interface";

interface VersionTableProps {
  data?: RoboflowInferenceStats;
  isLoading: boolean;
}

type ModelStatRow = {
  id: string;
  modelName: string;
  predictedClass: string | null;
  inferences: number | null;
  avgConfidence: number | null;
  avgResponseTime: number | null;
  deploymentTypes: string;
  inferenceServerVersions: string;
};

const formatNumber = (value?: number | string | null) => {
  if (value === null || value === undefined || value === "") return "--";
  const numericValue = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(numericValue)) return String(value);
  return numericValue.toLocaleString();
};

const formatPercent = (value?: number | null) => {
  if (value === null || value === undefined) return "--";
  return `${(value * 100).toFixed(1)}%`;
};

const formatMilliseconds = (value?: number | null) => {
  if (value === null || value === undefined) return "--";
  return `${(value * 1000).toFixed(0)}ms`;
};

const VersionTableEmptyState = () => {
  return (
    <div className="flex h-full items-center justify-center px-6 text-sm text-muted-foreground">
      No model statistics available.
    </div>
  );
};

export default function VersionTable({ data, isLoading }: VersionTableProps) {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const rows = useMemo<ModelStatRow[]>(() => {
    const modelStats = data?.inference_stats ?? [];
    return modelStats.map((stat, index) => ({
      id: `${stat.model_name ?? "model"}:${stat.predicted_class ?? "class"}:${index}`,
      modelName: stat.model_name,
      predictedClass: stat.predicted_class || null,
      inferences: stat.num_inferences,
      avgConfidence: stat.avg_confidence,
      avgResponseTime: stat.avg_response_time,
      deploymentTypes: stat.deployment_types,
      inferenceServerVersions: stat.inference_server_versions,
    }));
  }, [data]);

  const columns = useMemo<GridColDef<ModelStatRow>[]>(
    () => [
      {
        field: "modelName",
        headerName: "Model Name",
        flex: 1.2,
        minWidth: 180,
        renderCell: (params) => (
          <span className="text-[12px] font-semibold text-slate-700">
            {params.value || "--"}
          </span>
        ),
      },
      {
        field: "predictedClass",
        headerName: "Predicted Class",
        flex: 1,
        minWidth: 160,
        renderCell: (params) => (
          <span className="text-[12px] text-slate-500">
            {(params.value as string) || "N/A"}
          </span>
        ),
      },
      {
        field: "inferences",
        headerName: "Inferences",
        flex: 0.7,
        minWidth: 120,
        renderCell: (params) => (
          <span className="text-[12px] font-medium text-slate-700">
            {formatNumber(params.value as number | null)}
          </span>
        ),
      },
      {
        field: "avgConfidence",
        headerName: "Avg Confidence",
        flex: 0.8,
        minWidth: 150,
        renderCell: (params) => (
          <span className="text-[12px] font-medium text-slate-700">
            {formatPercent(params.value as number | null)}
          </span>
        ),
      },
      {
        field: "avgResponseTime",
        headerName: "Avg Response Time",
        flex: 0.9,
        minWidth: 170,
        renderCell: (params) => (
          <span className="text-[12px] font-medium text-slate-700">
            {formatMilliseconds(params.value as number | null)}
          </span>
        ),
      },
      {
        field: "deploymentTypes",
        headerName: "Deployment Type",
        flex: 0.9,
        minWidth: 160,
        renderCell: (params) => (
          <span className="text-[12px] font-medium capitalize text-slate-700">
            {(params.value as string) || "--"}
          </span>
        ),
      },
      {
        field: "inferenceServerVersions",
        headerName: "Server Version",
        flex: 1,
        minWidth: 170,
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
    [],
  );

  return (
    <Card>
      <CardHeader>
        <h3 className="text-base font-semibold">Model Statistics</h3>
      </CardHeader>
      <CardContent>
        <div className="min-w-0">
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            loading={isLoading}
            disableRowSelectionOnClick
            disableColumnMenu
            pagination
            pageSizeOptions={[5, 10, 20]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            slots={{
              noRowsOverlay: VersionTableEmptyState,
              noResultsOverlay: VersionTableEmptyState,
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
      </CardContent>
    </Card>
  );
}
