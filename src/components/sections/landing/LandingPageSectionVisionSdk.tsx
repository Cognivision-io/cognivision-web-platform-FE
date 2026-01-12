"use client";

import { GlowSection } from "@/components/layout/GlowLayout";
import { SteppedImageCollage } from "@/features/dataset/components/ui/SteppedImageCollage";
import { Layers3, Cpu, Box, Gauge } from "lucide-react";

const PURPLE = "#5b2fe8";

type Feature = {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const FEATURES: Feature[] = [
  {
    title: "Hybrid-Ready AR",
    description:
      "One SDK for Flutter & React Native — no need for native ARKit/ARCore coding.",
    Icon: Layers3,
  },
  {
    title: "AI Vision + ML Inference",
    description:
      "Real-time object detection, pose tracking, spatial analysis, and more.",
    Icon: Cpu,
  },
  {
    title: "3D Spatial Mapping",
    description:
      "Understand surfaces, depth, and real-world geometry for precise AR overlays.",
    Icon: Box,
  },
  {
    title: "Cross-Platform Performance",
    description:
      "Runs seamlessly on iOS, Android, and web with optimized edge + cloud inference.",
    Icon: Gauge,
  },
];

function FeatureRow({ item }: { item: Feature }) {
  const { Icon } = item;

  return (
    <div className="flex items-start gap-6">
      {/* Icon tile */}
      <div
        className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: PURPLE }}
      >
        <Icon className="h-6 w-6 text-white" />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <div className="font-heading text-[18px] font-semibold leading-6 text-[#0b1020]">
          {item.title}
        </div>
        <p className="mt-2 max-w-[520px] text-[14px] leading-6 text-[#111827]/70">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function LandingPageSectionVisionSDK() {
  return (
    <GlowSection bgClassName="bg-white" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-0">
        {/* Title */}
        <div className="text-center">
          <h2 className="font-heading text-[34px] font-semibold leading-[1.05] tracking-wide text-[#0b1020] sm:text-[44px]">
            Hybrid Apps Get Real AR Intelligence; Powered By One
            <br />
            Unified{" "}
            <span style={{ color: PURPLE }} className="font-heading">
              Vision SDK
            </span>
          </h2>
        </div>

        {/* Content */}
        <div className="mt-14 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT: features list */}
          <div className="space-y-10">
            {FEATURES.map((f) => (
              <FeatureRow key={f.title} item={f} />
            ))}
          </div>

          {/* RIGHT: stepped collage */}
          <div className="flex justify-center lg:justify-end">
            <SteppedImageCollage
              // ✅ replace these two with your actual screenshot SVG/PNG in /public
              leftSrc="/Hero5.svg"
              rightSrc="/Hero4.svg"
              leftAlt="Vision dashboard"
              rightAlt="Vision demo"
              className="max-w-[560px]"
              priorityLeft
            />
          </div>
        </div>
      </div>
    </GlowSection>
  );
}
