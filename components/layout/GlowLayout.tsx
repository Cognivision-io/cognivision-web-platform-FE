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

  /** When true, glows slowly drift to create motion. */
  animateGlows?: boolean;
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
  allowGlowBleed = false,
  randomizeGlows = false,
  glowSeed,
  glowCount = 3,
  glows,
  animateGlows = true,
}: GlowSectionProps) {
  const reactId = React.useId();
  const seed =
    glowSeed ??
    // useId is stable across SSR/CSR, so this remains deterministic
    reactId;

  const numericSeed = React.useMemo(() => {
    if (typeof seed === "number") return seed >>> 0;
    return hashStringToUint32(String(seed));
  }, [seed]);

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
  }, [
    blurPx,
    glowCount,
    glows,
    intensity,
    randomizeGlows,
    numericSeed,
    sizePx,
  ]);

  const motionByIndex = React.useMemo(() => {
    if (!animateGlows) return [];

    const random = mulberry32((numericSeed + 0x9e3779b9) >>> 0);
    return computedGlows.map(() => {
      const dx = Math.round(lerp(-64, 64, random()));
      const dy = Math.round(lerp(-52, 52, random()));
      const durationSec = lerp(2, 5, random());
      const delaySec = -lerp(0, 4, random());
      return { dx, dy, durationSec, delaySec };
    });
  }, [animateGlows, computedGlows, numericSeed]);

  return (
    <section
      className={[
        "relative w-full",
        allowGlowBleed ? "overflow-visible" : "overflow-hidden",
        allowGlowBleed ? undefined : bgClassName,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
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

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          ...(allowGlowBleed ? { zIndex: -10 } : null),
          ...(allowGlowBleed
            ? { clipPath: "inset(-2000px 0 -2000px 0)" }
            : null),
        }}
      >
        {computedGlows.map((glow, index) => {
          const glowSizePx = glow.sizePx ?? sizePx;
          const glowBlurPx = glow.blurPx ?? blurPx;
          const glowIntensity = glow.intensity ?? intensity;
          const motion = motionByIndex[index];

          // Backward-compatible positioning for the legacy corner glows.
          const isLegacyCornerGlow = !randomizeGlows && !glows && index < 2;
          const clampPct = (value: number) =>
            Math.min(99.5, Math.max(0.5, value));
          const positioningStyle = isLegacyCornerGlow
            ? index === 0
              ? { left: 0, bottom: 0 }
              : { right: 0, top: 0 }
            : {
                left: `${clampPct(glow.xPct)}%`,
                top: `${clampPct(glow.yPct)}%`,
                transform: "translate(-50%, -50%)",
              };

          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              aria-hidden
              className="absolute"
              style={positioningStyle}
            >
              <div
                className={animateGlows ? "cv-glow-drift" : undefined}
                style={
                  motion
                    ? ({
                        ["--cv-glow-dx"]: `${motion.dx}px`,
                        ["--cv-glow-dy"]: `${motion.dy}px`,
                        ["--cv-glow-duration"]: `${motion.durationSec}s`,
                        ["--cv-glow-delay"]: `${motion.delaySec}s`,
                      } as React.CSSProperties)
                    : undefined
                }
              >
                <div
                  className="rounded-full"
                  style={{
                    width: 1,
                    height: 1,
                    backgroundColor: `rgba(${glowRgb}, ${Math.min(
                      0.95,
                      glowIntensity * 0.95
                    )})`,
                    boxShadow: `0 0 ${glowBlurPx}px ${Math.round(
                      glowSizePx / 2
                    )}px rgba(${glowRgb}, ${Math.min(
                      0.75,
                      glowIntensity * 0.75
                    )})`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative">{children}</div>
    </section>
  );
}
