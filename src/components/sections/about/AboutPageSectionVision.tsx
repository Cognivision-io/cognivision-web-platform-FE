"use client";

import { GlowSection } from "@/components/layout/GlowLayout";
import { SteppedImageCollage } from "@/features/dataset/components/ui/SteppedImageCollage";

const PURPLE = "#5b2fe8";

export default function AboutPageSectionVision() {
  return (
    <GlowSection
      bgClassName="bg-[#f6f7ff]"
      className="min-h-[100svh] py-20 sm:py-24"
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

            <h2 className="mt-5 font-heading text-[54px] font-semibold leading-[1.05] tracking-wide text-[#0b1020] sm:text-[60px]">
              A{" "}
              <span className="font-heading" style={{ color: PURPLE }}>
                vision
              </span>{" "}
              for the future
            </h2>

            <p className="mt-8 text-[16px] leading-8 text-[#111827]/75">
              Cognivision empowers developers to build intelligent, real-world
              computer vision solutions across industries such as healthcare,
              retail, fintech, and construction. Our hybrid-compatible SDK
              supports multiple technology stacks, enabling scalable, on-device
              vision experiences across mobile, web, and enterprise systems.
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
