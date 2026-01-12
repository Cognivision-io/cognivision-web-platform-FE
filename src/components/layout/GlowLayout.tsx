"use client";

import React from "react";

type GlowSectionProps = {
  children: React.ReactNode;
  className?: string;
  /** section background */
  bgClassName?: string;

  /** glow color in rgb form: "91,47,232" for #5b2fe8 */
  glowRgb?: string;

  /** 0..1 (opacity multiplier) */
  intensity?: number;

  /** blur radius in px */
  blurPx?: number;

  /** glow blob size in px */
  sizePx?: number;

  /** offsets in px (negative pushes outward) */
  offsetPx?: number;
};

export function GlowSection({
  children,
  className,
  bgClassName = "bg-white",
  glowRgb = "91,47,232",
  intensity = 0.35,
  blurPx = 90,
  sizePx = 560,
  offsetPx = 176, // ~44 * 4, close to your -right-44 style
}: GlowSectionProps) {
  const size = `${sizePx}px`;
  const blur = `${blurPx}px`;

  return (
    <section
      className={["relative w-full overflow-visible", bgClassName, className]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Bottom-left glow */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          left: `-${offsetPx}px`,
          bottom: `-${Math.round(offsetPx * 0.6)}px`,
          width: size,
          height: size,
          opacity: intensity,
          filter: `blur(${blur})`,
          background: `radial-gradient(circle at 30% 70%, rgba(${glowRgb}, 0.95), rgba(${glowRgb}, 0) 70%)`,
        }}
      />

      {/* Top-right glow */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          right: `-${offsetPx}px`,
          top: `-${Math.round(offsetPx * 0.6)}px`,
          width: size,
          height: size,
          opacity: intensity,
          filter: `blur(${blur})`,
          background: `radial-gradient(circle at 70% 30%, rgba(${glowRgb}, 0.95), rgba(${glowRgb}, 0) 70%)`,
        }}
      />

      <div className="relative">{children}</div>
    </section>
  );
}
