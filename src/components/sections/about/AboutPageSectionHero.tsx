"use client";

import Image from "next/image";
import { GlowSection } from "@/components/layout/GlowLayout";

const PURPLE = "#5b2fe8";

export default function AboutPageSectionHero() {
  return (
    <GlowSection
      bgClassName="bg-white"
      className="min-h-[100svh] py-20 sm:py-24"
      allowGlowBleed
      randomizeGlows
      glowCount={3}
      glowSeed="about-hero"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-0">
        <div className="grid items-center gap-16 lg:grid-cols-[520px_1fr]">
          {/* LEFT IMAGE */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative h-[650px] w-[650px] overflow-hidden rounded-[18px] bg-white shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
              <Image
                src="/AboutHero1.svg"
                alt="About CogniVision"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 520px"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="max-w-[640px] justify-self-center lg:justify-self-start">
            <div className="text-[16px] font-semibold text-[#111827]/80">
              About CogniVision
            </div>

            <h2 className="mt-6 font-heading text-[54px] font-semibold leading-[1.05] tracking-wide text-[#0b1020] sm:text-[62px]">
              Unlocking the future of
              <br />
              <span className="text-[#0b1020]">Spatial </span>
              <span style={{ color: PURPLE }}>AR experiences</span>
            </h2>

            <p className="mt-8 text-[16px] leading-8 text-[#111827]/75">
              We build developer friendly AR tools that make spatial
              intelligence practical, scalable, and easy to integrate. Our
              hybrid-compatible SDK helps teams turn real-world environments
              into interactive AR experiences without sacrificing performance,
              flexibility, or control.”
            </p>
          </div>
        </div>
      </div>
    </GlowSection>
  );
}
