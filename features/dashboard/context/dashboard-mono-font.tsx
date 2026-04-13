"use client";

import { createContext, useContext, type ReactNode } from "react";

const DashboardMonoClassContext = createContext<string>("");

export function DashboardMonoClassProvider({
  monoClassName,
  children,
}: {
  monoClassName: string;
  children: ReactNode;
}) {
  return (
    <DashboardMonoClassContext.Provider value={monoClassName}>
      {children}
    </DashboardMonoClassContext.Provider>
  );
}

export function useDashboardMonoClass() {
  return useContext(DashboardMonoClassContext);
}
