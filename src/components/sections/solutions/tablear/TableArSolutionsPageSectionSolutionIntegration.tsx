"use client";

import Image from "next/image";
import { GlowSection } from "@/components/layout/GlowLayout";

const PURPLE = "#5b2fe8";

type Feature = {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
};

import { Box, ScanSearch, Dices, Monitor } from "lucide-react";

const FEATURES: Feature[] = [
  {
    title: "AR Measurement",
    description:
      "Point your phone at the table and see instant, glowing measurement lines between any two minis. Spell ranges, movement distances, and line-of-sight—all calculated in real-time with magical AR overlays.",
    Icon: Box,
  },
  {
    title: "Mini Scanning",
    description:
      "Scan any miniature to instantly tag it with health, status effects, and initiative order. Your physical minis become smart game pieces with floating AR data halos visible only through your device.",
    Icon: ScanSearch,
  },
  {
    title: "Dice Roller",
    description:
      "Roll physical or digital dice with AR fanfare. Auto-calculate modifiers, and track combat stats because sometimes you need dice that can't fall off the table.",
    Icon: Dices,
  },
  {
    title: "DM Console",
    description:
      "A master control panel for Dungeon Masters. Track all player positions, reveal hidden enemies with dramatic AR animations, control environmental effects, and orchestrate epic battles from your phone or tablet.",
    Icon: Monitor,
  },
];

function FeatureRow({ item }: { item: Feature }) {
  const { Icon } = item;

  return (
    <div className="flex items-start gap-6">
      {/* Icon circle */}
      <div className="mt-1 grid h-[64px] w-[64px] shrink-0 place-items-center rounded-full border border-black/45 bg-white">
        <Icon className="h-6 w-6 text-black/60" />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <div className="font-heading text-[22px] font-semibold leading-7 text-[#0b1020]">
          {item.title}
        </div>
        <p className="mt-3 max-w-[520px] text-[15px] leading-7 text-[#111827]/75">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function TableArSolutionsPageSectionSolutionIntegration() {
  return (
    <GlowSection
      bgClassName="bg-white"
      className="min-h-[100svh]"
      allowGlowBleed
      randomizeGlows
      glowCount={4}
      glowSeed="landing-hero"
    >
      <div className="mx-auto max-w-6xl min-h-[calc(100svh-78px)] px-5 py-16 sm:px-6 lg:px-0">
        {/* Title */}
        <div className="text-center">
          <h2 className="font-heading text-[46px] font-semibold leading-[1.05] tracking-wide text-[#0b1020] sm:text-[56px]">
            The Solution{" "}
            <span className="font-heading" style={{ color: PURPLE }}>
              Cognivision
            </span>
            <br />
            SDK Integration
          </h2>
        </div>

        {/* Content */}
        <div className="mt-14 grid items-start gap-14 lg:grid-cols-[560px_1fr]">
          {/* LEFT image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative h-[520px] w-[560px] max-w-full overflow-hidden rounded-[22px] bg-[#f3f4f6]">
              <Image
                src="/SolutionHero8.svg"
                alt="TableAR Solution"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 92vw, 560px"
              />
            </div>
          </div>

          {/* RIGHT features */}
          <div className="space-y-14 pt-6">
            {FEATURES.map((f) => (
              <FeatureRow key={f.title} item={f} />
            ))}
          </div>
        </div>
      </div>
    </GlowSection>
  );
}
