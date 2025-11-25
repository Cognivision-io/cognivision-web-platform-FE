// src/components/sections/WgtsHeroSection.tsx
import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const WgtsHeroSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#f5f6fb]">
      {/* Soft top gradient so it feels like the screenshot */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-[#f5f6fb] to-[#f5f6fb]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 pb-16 pt-14 md:flex-row md:items-center md:pb-20 md:pt-20 lg:gap-16">
        {/* Left – copy */}
        <div className="w-full md:w-[55%]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
            Sports Use Case
          </p>

          <h1 className="mt-3 text-[32px] font-extrabold leading-[1.05] text-black sm:text-[38px] md:text-[44px] lg:text-[48px]">
            WGTS (Who&rsquo;s Got The Shot)
          </h1>

          <p className="mt-4 max-w-xl text-[14px] leading-[1.9] text-[#111827] md:text-[15px]">
            WGTS (Who&apos;s Got The Shot) is an iOS-based sports analytics and
            AR precision app for lawn bowls players, referees, and enthusiasts.
            It leverages Cognivision.ai&rsquo;s Swift SDK to deliver real-time,
            ultra-accurate distance measurement between bowls and the jack —
            eliminating manual measurement tools and disputes during gameplay.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(15,23,42,0.45)] transition hover:translate-y-[1px] hover:bg-black/90"
            >
              <span>Implement Use-Case</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Right – device mockups image (replace src with your asset) */}
        <div className="flex w-full justify-center md:w-[45%]">
          <div className="relative w-full max-w-[360px] md:max-w-[380px] lg:max-w-[420px]">
            {/* Glow */}
            <div className="absolute -inset-x-10 bottom-0 top-6 rounded-[48px] bg-gradient-to-b from-white/60 via-white/0 to-black/10 blur-3xl" />

            <div className="relative rounded-[40px] bg-transparent">
              <Image
                src="/assets/wgts-hero-devices.png"
                alt="WGTS app preview"
                width={800}
                height={900}
                priority
                className="h-auto w-full object-contain drop-shadow-[0_24px_70px_rgba(15,23,42,0.55)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WgtsHeroSection;
