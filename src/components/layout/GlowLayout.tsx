"use client";

import React from "react";

type GlowBlob = {
  /** 0..100-ish positioning, can be outside for bleed */
  xPct: number;
  yPct: number;
  /** optional overrides per glow */
  sizePx?: number;
  blurPx?: number;
  intensity?: number;
  /** radial focal point (0..100) inside the blob */
  focalXPct?: number;
  focalYPct?: number;
};

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

  /**
   * When true, render the background as a lower z-index layer so glows can
   * visually bleed into adjacent sections (above their backgrounds).
   */
  allowGlowBleed?: boolean;

  /** When true, uses seeded pseudo-random glow placement instead of fixed corners. */
  randomizeGlows?: boolean;

  /** Optional seed for deterministic glow placement across renders. */
  glowSeed?: string | number;

  /** Number of glow blobs when `randomizeGlows` is enabled. */
  glowCount?: number;

  /** Provide explicit glow blobs (overrides `randomizeGlows`). */
  glows?: GlowBlob[];
};

function hashStringToUint32(input: string) {
  // FNV-1a 32-bit
  let hash = 0x811c9dc5;
  for (let index = 0; index < input.length; index++) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let t = Math.imul(value ^ (value >>> 15), 1 | value);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function lerp(min: number, max: number, t: number) {
  return min + (max - min) * t;
}

export function GlowSection({
  children,
  className,
  bgClassName = "bg-white",
  glowRgb = "91,47,232",
  intensity = 0.35,
  blurPx = 90,
  sizePx = 560,
  offsetPx = 176, // ~44 * 4, close to your -right-44 style
  allowGlowBleed = false,
  randomizeGlows = false,
  glowSeed,
  glowCount = 3,
  glows,
}: GlowSectionProps) {
  const reactId = React.useId();
  const seed =
    glowSeed ??
    // useId is stable across SSR/CSR, so this remains deterministic
    reactId;

  const computedGlows = React.useMemo<GlowBlob[]>(() => {
    if (glows && glows.length > 0) return glows;

    if (!randomizeGlows) {
      return [
        {
          xPct: 0,
          yPct: 100,
          sizePx,
          blurPx,
          intensity,
          focalXPct: 30,
          focalYPct: 70,
        },
        {
          xPct: 100,
          yPct: 0,
          sizePx,
          blurPx,
          intensity,
          focalXPct: 70,
          focalYPct: 30,
        },
      ];
    }

    const numericSeed =
      typeof seed === "number" ? seed >>> 0 : hashStringToUint32(String(seed));
    const random = mulberry32(numericSeed);

    const pickBiased = () => {
      // Favor edges, but still allow mid-field glows.
      const edgeBias = random();
      if (edgeBias < 0.5) {
        return random() < 0.5
          ? lerp(-12, 18, random())
          : lerp(82, 112, random());
      }
      return lerp(18, 82, random());
    };

    return Array.from({ length: Math.max(1, glowCount) }, () => {
      const sizeMultiplier = lerp(0.7, 1.15, random());
      const blurMultiplier = lerp(0.75, 1.25, random());
      const intensityMultiplier = lerp(0.6, 1.0, random());

      return {
        xPct: pickBiased(),
        yPct: pickBiased(),
        sizePx: Math.round(sizePx * sizeMultiplier),
        blurPx: Math.round(blurPx * blurMultiplier),
        intensity: intensity * intensityMultiplier,
        focalXPct: Math.round(lerp(35, 65, random())),
        focalYPct: Math.round(lerp(35, 65, random())),
      };
    });
  }, [blurPx, glowCount, glows, intensity, randomizeGlows, seed, sizePx]);

  return (
    <section
      className={[
        "relative w-full overflow-visible",
        allowGlowBleed ? undefined : bgClassName,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ overflow: "hidden" }}
    >
      {allowGlowBleed ? (
        <div
          aria-hidden
          className={["absolute inset-0", bgClassName]
            .filter(Boolean)
            .join(" ")}
          style={{ zIndex: -20 }}
        />
      ) : null}

      {computedGlows.map((glow, index) => {
        const glowSizePx = glow.sizePx ?? sizePx;
        const glowBlurPx = glow.blurPx ?? blurPx;

        const focalX = glow.focalXPct ?? 50;
        const focalY = glow.focalYPct ?? 50;

        // Backward-compatible positioning for the legacy corner glows.
        const isLegacyCornerGlow = !randomizeGlows && !glows && index < 2;
        const legacyStyle =
          isLegacyCornerGlow && index === 0
            ? {
                left: `-${offsetPx}px`,
                bottom: `-${Math.round(offsetPx * 0.6)}px`,
              }
            : isLegacyCornerGlow && index === 1
            ? {
                right: `-${offsetPx}px`,
                top: `-${Math.round(offsetPx * 0.6)}px`,
              }
            : null;

        const positioningStyle = legacyStyle ?? {
          left: `${glow.xPct}%`,
          top: `${glow.yPct}%`,
          transform: "translate(-50%, -50%)",
        };

        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="pointer-events-none absolute rounded-full"
            style={{
              ...positioningStyle,
              ...(allowGlowBleed ? { zIndex: -10 } : null),
            }}
          >
            <div
              className="h-full w-full rounded-full"
              style={{
                width: `${glowSizePx}px`,
                height: `${glowSizePx}px`,
                opacity: glow.intensity ?? intensity,
                filter: `blur(${glowBlurPx}px)`,
                background: `radial-gradient(circle at ${focalX}% ${focalY}%, rgba(${glowRgb}, 0.95), rgba(${glowRgb}, 0) 70%)`,
              }}
            />
          </div>
        );
      })}

      <div className="relative">{children}</div>
    </section>
  );
}
