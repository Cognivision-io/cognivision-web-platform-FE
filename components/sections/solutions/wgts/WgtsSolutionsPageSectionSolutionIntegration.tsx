"use client";

import Image from "next/image";
import { GlowSection } from "@/components/layout/GlowLayout";
import { Scan, ScanSearch, TrendingUp } from "lucide-react";

const PURPLE = "#5b2fe8";

type Feature = {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const FEATURES: Feature[] = [
  {
    title: "Object Detection",
    description:
      "Automatically identifies the jack and each bowl in real time using YOLO-based machine learning. Delivers fast, accurate object detection directly from the live camera feed.",
    Icon: ScanSearch,
  },
  {
    title: "AR Distance Measurement",
    description:
      "Calculates precise edge-to-edge distances between the bowls and the jack in real time. Powered by ARKit and Cognivision’s advanced spatial geometry engine for high accuracy.",
    Icon: Scan,
  },
  {
    title: "Real-Time Feedback",
    description:
      "The Cognivision SDK instantly displays measurement overlays within the app interface, enabling real-time distance visualization. It blends AR visuals with live camera input for a seamless, interactive experience. Users get instant, accurate spatial feedback directly within their workflow.",
    Icon: TrendingUp,
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

export default function WgtsSolutionsPageSectionSolutionIntegration() {
  return (
    <GlowSection
      bgClassName="bg-white"
      className="min-h-[100svh]"
      allowGlowBleed
      randomizeGlows
      glowCount={2}
      glowSeed="wgts-integration"
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
            <div className="relative h-[320px] w-full max-w-[560px] overflow-hidden rounded-[22px] bg-[#f3f4f6] sm:h-[420px] lg:h-[520px]">
              <Image
                src="/SolutionHero2.svg"
                alt="WGTS Solution"
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
