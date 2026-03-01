"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </main>
  );
}
