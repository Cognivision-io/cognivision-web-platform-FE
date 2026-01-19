"use client";

import { GlowSection } from "@/components/layout/GlowLayout";
import { SteppedImageCollage } from "@/features/dataset/components/ui/SteppedImageCollage";

const PURPLE = "#5b2fe8";

export default function AboutPageSectionVision() {
  return (
    <GlowSection
      bgClassName="bg-white"
      allowGlowBleed
      randomizeGlows
      className="min-h-[80svh] pb-20 sm:pb-24"
      glowCount={2}
      glowSeed="about-section-vision"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-0">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          {/* LEFT: collage */}
          <div className="flex justify-center lg:justify-start">
            <SteppedImageCollage
              // ✅ replace with your actual public assets
              leftSrc="/AboutHero4.svg"
              rightSrc="/AboutHero5.svg"
              leftAlt="Gaming use-case"
              rightAlt="Healthcare use-case"
              className="max-w-[560px]"
              priorityLeft
            />
          </div>

          {/* RIGHT: content */}
          <div className="max-w-[640px] justify-self-center lg:justify-self-end">
            <div className="text-[18px] font-semibold text-[#111827]/70">
              Our Vision
            </div>

            <h2 className="mt-5 font-heading text-[38px] font-semibold leading-[1.05] tracking-wide text-[#0b1020] sm:text-[48px] lg:text-[60px]">
              A{" "}
              <span className="font-heading" style={{ color: PURPLE }}>
                vision
              </span>{" "}
              for the future
            </h2>

            <p className="mt-8 text-[16px] leading-8 text-[#111827]/75">
              Cognivision empowers developers to create intelligent, real-world
              computer vision experiences that perform reliably at scale. Our
              platform is designed for production-grade use cases where
              accuracy, performance, and trust are essential. Our hybrid-ready
              SDK supports multiple technology stacks and deployment models,
              enabling on-device, privacy-aware vision experiences across
              mobile, web, and enterprise systems.
            </p>

            <div
              className="mt-8 font-heading text-[18px] font-semibold tracking-wide"
              style={{ color: PURPLE }}
            >
              BUILT FOR EVERY DEVELOPER, EVERYWHERE
            </div>
          </div>
        </div>
      </div>
    </GlowSection>
  );
}
