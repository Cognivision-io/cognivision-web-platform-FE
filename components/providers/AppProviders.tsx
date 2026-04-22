"use client";

import { useEffect, useState, type PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuthStore } from "@/store/auth-store";
import { Toaster } from "sonner";

const AppProviders = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());
  const hydrateAuth = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    void hydrateAuth();
  }, [hydrateAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <Toaster position="top-right" key={"toast"} />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
