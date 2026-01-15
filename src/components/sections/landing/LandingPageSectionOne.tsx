"use client";

import { GlowSection } from "@/components/layout/GlowLayout";
import Image from "next/image";
import Link from "next/link";

const PURPLE = "#5b2fe8";

export default function LandingPageSectionOne() {
  return (
    <GlowSection
      bgClassName="bg-white"
      className="min-h-[70svh]"
      allowGlowBleed
      randomizeGlows
      glowCount={2}
      glowSeed="landing-hero"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-0">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="font-heading text-[32px] font-semibold leading-[1.08] tracking-wide text-[#0b1020] sm:text-[42px] lg:text-[50px]">
              Advance Spatial Intelligence for <br />
              <span
                className="font-heading font-semibold"
                style={{ color: PURPLE }}
              >
                Mobile Applications
              </span>
            </h1>

            <p className="mt-6 max-w-[520px] text-[16px] leading-7 text-[#111827]/80">
              Build native grade AR experiences in hybrid and <br />
              cross platform apps using a unified SDK.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/register"
                className="inline-flex h-[46px] items-center justify-center rounded-md px-7 text-[14px] font-semibold text-white shadow-[0_10px_18px_rgba(91,47,232,0.25)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
                style={{ backgroundColor: PURPLE }}
              >
                Get Started
              </Link>

              <Link
                href="/solutions"
                className="inline-flex h-[46px] items-center justify-center rounded-md border px-7 text-[14px] font-semibold text-[#111827] transition-colors hover:bg-black/[0.03]"
                style={{ borderColor: "rgba(91,47,232,0.35)" }}
              >
                Explore Now
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-12 grid max-w-[520px] grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
              <div>
                <div className="text-[26px] font-heading font-semibold tracking-tight text-[#0b1020]">
                  3+
                </div>
                <div className="mt-2 text-[15px] leading-6 text-[#111827]/70">
                  Use Cases <br />
                  Validated
                </div>
              </div>

              <div>
                <div className="text-[26px] font-heading font-semibold tracking-tight text-[#0b1020]">
                  15+
                </div>
                <div className="mt-2 text-[15px] leading-6 text-[#111827]/70">
                  Developers <br />
                  Onboarded
                </div>
              </div>

              <div>
                <div className="text-[26px] font-heading font-semibold tracking-tight text-[#0b1020]">
                  4+
                </div>
                <div className="mt-2 text-[15px] leading-6 text-[#111827]/70">
                  AR-Solutions <br />
                  Delivered
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative h-[320px] w-[320px] sm:h-[440px] sm:w-[440px] lg:h-[540px] lg:w-[540px]">
              <Image
                src="/hero.svg"
                alt="Hero"
                fill
                priority
                className="select-none object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </GlowSection>
  );
}
