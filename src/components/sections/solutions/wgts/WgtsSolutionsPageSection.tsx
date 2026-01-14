"use client";

import Link from "next/link";
import Image from "next/image";
import { GlowSection } from "@/components/layout/GlowLayout";
import { ArrowUpRight } from "lucide-react";

const PURPLE = "#5b2fe8";

export default function WgtsSolutionsPageSection() {
  return (
    <GlowSection
      bgClassName="bg-white"
      allowGlowBleed
      randomizeGlows
      glowCount={2}
      glowSeed="wgts-hero"
    >
      <div className="mx-auto max-w-6xl min-h-[calc(95svh-78px)] px-5 py-16 sm:px-6 lg:px-0">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT */}
          <div className="max-w-[600px]">
            <div className="text-[16px] font-semibold text-[#111827]/70">
              Sports Solution
            </div>

            <h1 className="mt-5 font-heading text-[42px] font-semibold leading-[1.05] tracking-wide text-[#0b1020] sm:text-[56px] lg:text-[66px]">
              <span style={{ color: PURPLE }}>WGTS</span>{" "}
              <span className="text-[#0b1020]">(Who’s Got</span>
              <br />
              <span className="text-[#0b1020]">the shot)</span>
            </h1>

            <p className="mt-8 max-w-[560px] text-[16px] leading-8 text-[#111827]/75">
              WGTS (Who’s Got The Shot) is an iOS AR app for lawn bowls,
              delivering real-time, ultra-accurate distance measurements between
              bowls and the jack, eliminating manual tools and gameplay
              disputes.
            </p>

            <div className="mt-10">
              <Link
                href="https://apps.apple.com/au/app/wgts/id6739811024"
                className="inline-flex h-[50px] items-center gap-3 rounded-md px-6 text-[15px] font-semibold text-white shadow-[0_16px_34px_rgba(91,47,232,0.25)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
                style={{ backgroundColor: PURPLE }}
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-black/15">
                  <ArrowUpRight className="h-4 w-4 text-white" />
                </span>
                Download App
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[560px] lg:h-[520px] lg:w-[560px]">
              {/* On mobile/tablet keep it centered; on desktop place it right + vertically centered */}
              <div className="relative aspect-square w-full lg:absolute lg:right-0 lg:top-1/2 lg:w-[550px] lg:-translate-y-1/2 xl:w-[600px]">
                <Image
                  src="/SolutionHero1.svg"
                  alt="WGTS screens"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_45px_95px_rgba(0,0,0,0.28)]"
                  sizes="(max-width: 1024px) 92vw, 560px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlowSection>
  );
}
