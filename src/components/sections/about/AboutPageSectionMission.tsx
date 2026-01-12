"use client";

import { GlowSection } from "@/components/layout/GlowLayout";
import { SteppedImageCollage } from "@/features/dataset/components/ui/SteppedImageCollage";

const PURPLE = "#5b2fe8";

export default function AboutPageSectionMission() {
  return (
    <GlowSection
      bgClassName="bg-white"
      className="py-20 sm:py-24"
      allowGlowBleed
      randomizeGlows
      glowCount={3}
      glowSeed="about-mission"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-0">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT */}
          <div className="max-w-[560px]">
            <div className="text-[18px] font-semibold text-[#111827]/70">
              Our Mission
            </div>

            <h2 className="mt-5 font-heading text-[54px] font-semibold leading-[1.05] tracking-wide text-[#0b1020] sm:text-[60px]">
              Revolutionizing how{" "}
              <span style={{ color: PURPLE }}>developers</span> work
            </h2>

            <p className="mt-8 text-[16px] leading-8 text-[#111827]/75">
              Cognivision simplifies how developers build intelligent,
              vision-driven applications by unifying computer vision, AR, and
              machine learning into a single SDK. With a flexible,
              cross-platform foundation, teams can deploy visual intelligence
              faster without complex integrations.
            </p>

            <div
              className="mt-8 font-heading text-[18px] font-semibold tracking-wide"
              style={{ color: PURPLE }}
            >
              EMPOWERING DEVELOPERS TO BUILD SMARTER,
              <br />
              FASTER, AND EVERYWHERE.
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center lg:justify-end">
            <SteppedImageCollage
              // ✅ swap these with your actual images in /public
              leftSrc="/AboutHero2.svg"
              rightSrc="/AboutHero3.svg"
              leftAlt="AR on phone"
              rightAlt="AR on tablet"
              className="max-w-[560px]"
              priorityLeft
            />
          </div>
        </div>
      </div>
    </GlowSection>
  );
}
