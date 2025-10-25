import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Store, Gamepad2, Heart, HardHat, Sprout } from "lucide-react";

const useCaseTemplates = [
  {
    title: "Sports",
    description: "Detect and track balls/players in real time, measure distances (e.g., ball-to-hoop, player spacing) with AR overlays.",
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

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto">
          <header className="border-b bg-background sticky top-0 z-10">
            <div className="flex items-center h-14 px-6">
              <SidebarTrigger />
            </div>
          </header>

          <div className="p-8 max-w-7xl">
            <h1 className="text-3xl font-bold mb-8">Explore Use-Case's Templates</h1>

            {/* Featured Template */}
            <div className="mb-12">
              {useCaseTemplates.map((useCase) => (
                <Card key={useCase.title} className="max-w-xs hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="w-full h-32 flex items-center justify-center bg-muted rounded-lg mb-4">
                      <useCase.icon className="h-16 w-16" />
                    </div>
                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {useCase.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Upcoming Use Cases */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Upcoming Use cases</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {upcomingUseCases.map((useCase) => (
                  <Card key={useCase.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="w-full h-24 flex items-center justify-center bg-muted rounded-lg mb-3">
                        <useCase.icon className="h-10 w-10" />
                      </div>
                      <CardTitle className="text-base">{useCase.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-xs line-clamp-3">
                        {useCase.description}
                      </CardDescription>
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

export default Dashboard;
