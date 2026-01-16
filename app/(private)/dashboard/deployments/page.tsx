"use client";

import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WebApiTab from "@/components/dashboard/deployments/WebApiTab";
import CodeSnippetsTab from "@/components/dashboard/deployments/CodeSnippetsTab";
import {
  useWorkspacesQuery,
  useWorkspaceApiKeyQuery,
} from "@/features/workspace/queries/workspace.query";

export default function DeploymentsPage() {
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<number | null>(
    null
  );

  const { data: workspacesData, isLoading: workspacesLoading } =
    useWorkspacesQuery({
      page: 1,
      limit: 50,
    });

  const workspaces = workspacesData?.data?.data || [];

  useEffect(() => {
    if (workspaces.length === 0) {
      setSelectedWorkspaceId(null);
      return;
    }

    const hasSelectedWorkspace = workspaces.some(
      (workspace) => workspace.id === selectedWorkspaceId
    );

    if (!selectedWorkspaceId || !hasSelectedWorkspace) {
      setSelectedWorkspaceId(workspaces[0].id);
    }
  }, [workspaces, selectedWorkspaceId]);

  const selectedWorkspace = useMemo(
    () => workspaces.find((workspace) => workspace.id === selectedWorkspaceId),
    [workspaces, selectedWorkspaceId]
  );

  const { data: workspaceApiKeyResponse, isLoading: apiKeyLoading } =
    useWorkspaceApiKeyQuery(selectedWorkspace?.id);
  const workspaceApiKey = workspaceApiKeyResponse?.data?.apiKey || "";

  const baseApiUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://api.visioncore.ai";
  const normalizedBaseApiUrl = baseApiUrl.replace(/\/$/, "");
  const runPredictionUrl = `${normalizedBaseApiUrl}/project/model/run-prediction`;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-6 py-8 lg:px-10">
      <header className="space-y-4">
        <div className="mb-2 flex items-center gap-3">
          <h1 className="text-2xl font-semibold">Deployment</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="text-[#111827]">
            <div className="text-xs font-medium">Model:</div>
            <div className="mt-1 text-[#000000] rounded-lg bg-white px-3 py-2 text-xs border border-[#9CA3AF]">
              Fruit_Detector_v1, trained on 2025-10-05
            </div>
          </div>
          <div className="text-[#111827]">
            <div className="text-xs font-medium ">Deployment Details:</div>
            <div className="mt-1 text-[#000000] rounded-lg bg-white px-3 py-2 text-xs border border-[#9CA3AF]">
              Date: 2025-10-06, By: hania@visioncore.ai
            </div>
          </div>
          <div className="text-[#111827]">
            <div className="text-xs font-medium">Accuracy:</div>
            <div className="mt-1 text-[#000000] rounded-lg bg-white px-3 py-2 text-xs border border-[#9CA3AF]">
              92%
            </div>
          </div>
        </div>
      </header>

      <section className="space-y-6">
        <div className="mt-4">
          <div className="mb-3">
            <p className="text-lg font-semibold">API Details</p>
          </div>

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500">Workspace</p>
              <Select
                value={selectedWorkspaceId ? String(selectedWorkspaceId) : ""}
                onValueChange={(value) => {
                  const nextId = Number(value);
                  if (Number.isNaN(nextId)) return;
                  setSelectedWorkspaceId(nextId);
                }}
              >
                <SelectTrigger className="h-10 w-full rounded-lg border border-[#e1e4f5] bg-white px-4 text-sm font-medium text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.02)] focus:ring-0 sm:w-[260px]">
                  <SelectValue placeholder="Select workspace" />
                </SelectTrigger>
                <SelectContent>
                  {workspacesLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading workspaces...
                    </SelectItem>
                  ) : workspaces.length === 0 ? (
                    <SelectItem value="empty" disabled>
                      No workspaces available
                    </SelectItem>
                  ) : (
                    workspaces.map((workspace) => (
                      <SelectItem
                        key={workspace.id}
                        value={String(workspace.id)}
                      >
                        {workspace.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-muted-foreground">
              {selectedWorkspace
                ? `Selected: ${selectedWorkspace.name}`
                : "Pick a workspace to access its API key."}
            </p>
          </div>

          <Tabs defaultValue="webapi">
            <TabsList className="flex items-end justify-start gap-6 border-b border-gray-200 w-full bg-transparent">
              <TabsTrigger
                value="webapi"
                className="relative inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-sm font-medium  border-b-2 border-transparent transition-colors data-[state=active]:bg-transparent  data-[state=active]:shadow-none data-[state=active]:border-violet-600 data-[state=active]:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent rounded-none text-black"
              >
                Web API Link
              </TabsTrigger>

              <TabsTrigger
                value="code"
                className="relative inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-sm font-medium  border-b-2 border-transparent transition-colors data-[state=active]:bg-transparent  data-[state=active]:shadow-none data-[state=active]:border-violet-600 data-[state=active]:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent rounded-none text-black"
              >
                Code Snippets
              </TabsTrigger>
            </TabsList>

            <div className="mt-4">
              <TabsContent value="webapi">
                <WebApiTab
                  apiKey={workspaceApiKey}
                  apiKeyLoading={apiKeyLoading}
                  baseUrl={runPredictionUrl}
                  workspaceName={selectedWorkspace?.name}
                />
              </TabsContent>

              <TabsContent value="code">
                <CodeSnippetsTab apiKey={workspaceApiKey} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
