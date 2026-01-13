"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import WebApiTab from "@/components/dashboard/deployments/WebApiTab";
import DownloadTab from "@/components/dashboard/deployments/DownloadTab";
import CodeSnippetsTab from "@/components/dashboard/deployments/CodeSnippetsTab";

export default function DeploymentsPage() {
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

          <Tabs defaultValue="webapi">
            <TabsList className="flex items-end justify-start gap-6 border-b border-gray-200 w-full bg-transparent">
              <TabsTrigger
                value="webapi"
                className="relative inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-sm font-medium  border-b-2 border-transparent transition-colors data-[state=active]:bg-transparent  data-[state=active]:shadow-none data-[state=active]:border-violet-600 data-[state=active]:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent rounded-none text-black"
              >
                Web API Link
              </TabsTrigger>

              <TabsTrigger
                value="download"
                className="relative inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-sm font-medium  border-b-2 border-transparent transition-colors data-[state=active]:bg-transparent  data-[state=active]:shadow-none data-[state=active]:border-violet-600 data-[state=active]:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent rounded-none text-black"
              >
                Download
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
                <WebApiTab />
              </TabsContent>

              <TabsContent value="download">
                <DownloadTab />
              </TabsContent>

              <TabsContent value="code">
                <CodeSnippetsTab />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
