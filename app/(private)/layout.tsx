"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { AppSidebar } from "@/components/dashboard/AppSidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //     router.replace("/login");
  //   }
  // }, [isAuthenticated, isLoading, router]);

  // if (isLoading || !isAuthenticated) {
  //   return (
  //     <div className="grid min-h-screen place-items-center bg-background text-foreground">
  //       <p className="text-sm text-muted-foreground">Loading dashboard...</p>
  //     </div>
  //   );
  // }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 border-b bg-background">
            <div className="flex h-14 items-center px-6">
              <SidebarTrigger />
            </div>
          </header>
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
