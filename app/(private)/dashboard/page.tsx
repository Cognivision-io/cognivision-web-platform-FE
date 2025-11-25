'use client';

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { BarChart3, Dumbbell, Gamepad2, HardHat, Heart, Sprout, Store } from "lucide-react";

const useCaseTemplates = [
  {
    title: "Sports",
    description:
      "Detect and track balls/players in real time, measure distances (e.g., ball-to-hoop, player spacing) with AR overlays.",
    icon: Dumbbell,
  },
];

const upcomingUseCases = [
  {
    title: "Retail",
    description: "Assist product in centers view aid measure their dimensions using AR.",
    icon: Store,
  },
  {
    title: "Gaming",
    description: "Scan from surrounds.",
    icon: Gamepad2,
  },
  {
    title: "Healthcare",
    description: "Detect wounds, skin lesions, or body parts and manage over time.",
    icon: Heart,
  },
  {
    title: "Construction",
    description: "Detect objects (site) and measure distances or verify 3D footages.",
    icon: HardHat,
  },
  {
    title: "Agriculture",
    description: "Detect fruits, diseases and measure growth (yield and plant diameter) using AR.",
    icon: Sprout,
  },
];

const DashboardPage = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />

        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 border-b bg-background">
            <div className="flex h-14 items-center px-6">
              <SidebarTrigger />
            </div>
          </header>

          <div className="max-w-7xl p-8">
            <h1 className="mb-8 text-3xl font-bold">Explore Use-Case&apos;s Templates</h1>

            <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {useCaseTemplates.map((useCase) => (
                <Card key={useCase.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4 flex h-32 w-full items-center justify-center rounded-lg bg-muted">
                      <useCase.icon className="h-16 w-16" />
                    </div>
                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">{useCase.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <div className="mb-6 flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">Upcoming Use cases</h2>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {upcomingUseCases.map((useCase) => (
                  <Card key={useCase.title} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mb-3 flex h-24 w-full items-center justify-center rounded-lg bg-muted">
                        <useCase.icon className="h-10 w-10" />
                      </div>
                      <CardTitle className="text-base">{useCase.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-xs">{useCase.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardPage;
