"use client";

import Link from "next/link";
import { GlowSection } from "@/components/layout/GlowLayout";
import { SteppedImageCollage } from "@/features/dataset/components/ui/SteppedImageCollage";

const PURPLE = "#5b2fe8";

export default function LandingPageSectionSolutions() {
  return (
    <GlowSection bgClassName="bg-[#f5f7ff]" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-0">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* LEFT: stepped collage */}
          <div className="flex justify-center lg:justify-start">
            <SteppedImageCollage
              // ✅ replace with your actual assets in /public
              leftSrc="/Hero6.svg"
              rightSrc="/Hero7.svg"
              leftAlt="Table AR"
              rightAlt="WGTS"
              className="max-w-[560px]"
              priorityLeft
            />
          </div>

          {/* RIGHT: content */}
          <div className="max-w-[560px] justify-self-center lg:justify-self-end">
            <h2 className="font-heading text-[42px] font-semibold leading-[1.1] tracking-wide text-[#0b1020]">
              Our{" "}
              <span className="font-heading" style={{ color: PURPLE }}>
                Solutions
              </span>
            </h2>

            <p className="mt-8 text-[16px] leading-8 text-[#111827]/75">
              Our solutions showcase the power of Cognivision in real-world
              applications. WGTS delivers ultra-accurate AR measurement for lawn
              bowls, eliminating manual tools and disputes, while Table AR
              brings tabletop games to life with holographic overlays, measuring
              distances and tracking gameplay in real time—merging physical and
              digital experiences seamlessly.
            </p>

            <div className="mt-10">
              <Link
                href="/solutions"
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
