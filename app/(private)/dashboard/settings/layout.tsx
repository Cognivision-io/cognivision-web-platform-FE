"use client";

/** Full-width settings area; matches Figma (no inner settings sidebar). */
export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-0 flex-1 bg-[#f4f7fe]">{children}</div>;
}
