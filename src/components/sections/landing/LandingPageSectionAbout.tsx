"use client";

import { GlowSection } from "@/components/layout/GlowLayout";
import { SteppedImageCollage } from "@/features/dataset/components/ui/SteppedImageCollage";
import Link from "next/link";

const PURPLE = "#5b2fe8";

export default function LandingPageSectionAbout() {
  return (
    <GlowSection
      bgClassName="bg-white"
      className="min-h-[100svh] py-20 sm:py-24"
      allowGlowBleed
      randomizeGlows
      glowCount={3}
      glowSeed="landing-about"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-0">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* LEFT: collage */}
          <div className="flex justify-center lg:justify-start">
            <SteppedImageCollage
              leftSrc="/Hero2.svg"
              rightSrc="/Hero3.svg"
              leftAlt="AR headset"
              rightAlt="AR experience"
              priorityLeft
            />
          </div>

          {/* RIGHT: content */}
          <div className="max-w-[520px] justify-self-center lg:justify-self-end">
            <h2 className="font-heading text-[42px] font-semibold leading-[1.1] tracking-wide text-[#0b1020]">
              About{" "}
              <span className="font-heading" style={{ color: PURPLE }}>
                Cognivision
              </span>
            </h2>

            <p className="mt-8 text-[16px] leading-8 text-[#111827]/75">
              Cognivision is a unified AR and computer vision SDK, enabling
              developers to build native-grade, hybrid AR experiences quickly,
              reliably, and at scale across industries.
            </p>

            <div className="mt-10">
              <Link
                href="/about"
                className="inline-flex h-[46px] items-center justify-center rounded-md px-7 text-[14px] font-semibold text-white shadow-[0_10px_18px_rgba(91,47,232,0.25)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
                style={{ backgroundColor: PURPLE }}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </GlowSection>
  );
}
