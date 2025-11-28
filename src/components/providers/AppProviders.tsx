'use client';

import { useEffect, useState, type PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as HotToaster } from "react-hot-toast";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as ShadToaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/stores/auth-store";

const AppProviders = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());
  const hydrateAuth = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrateAuth();
  }, [hydrateAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <ShadToaster />
        <HotToaster />
        <SonnerToaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
