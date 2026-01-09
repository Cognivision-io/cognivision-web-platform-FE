"use client";

/* eslint-disable @next/next/no-img-element */

import { ArrowRight } from "lucide-react";
import Link from "next/link";

const UseCasesSection = () => {
  return (
    <section id="use-cases" className="bg-[#f5f7fb] px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <h2 className="text-[32px] font-extrabold leading-tight text-black sm:text-[36px]">
          Use Cases
        </h2>
        <div className="mt-10 grid gap-8 items-stretch md:mt-12 md:grid-cols-2">
          {/* Left: White Card */}
          <div className="rounded-[26px] z-11 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.16)] flex flex-col">
            <div className="px-8 pt-8 pb-4 md:px-10 md:pt-10">
              <h3 className="text-[20px] font-semibold text-black md:text-[22px]">
                The Solution Cognivision SDK Integration
              </h3>
              <p className="mt-4 text-[14px] leading-[1.9] text-[#111827]">
                WGTS (Who’s Got The Shot) is an iOS-based sports analytics and
                AR precision app for lawn bowls players, referees, and
                enthusiasts. It leverages Cognivision.ai’s Swift SDK to deliver
                real-time, ultra-accurate distance measurement between bowls and
                the jack, eliminating manual tools and disputes during gameplay.
              </p>

              <Link
                href={"/login"}
                type="button"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#5628e0] px-6 py-2.5 text-[14px] font-semibold text-white shadow-[0_16px_36px_rgba(86,40,224,0.5)]"
              >
                <span>Explore More</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-4 overflow-hidden rounded-b-[26px]">
              <img
                src="/frame.png"
                alt="WGTS app UI"
                className="h-[170px] w-full object-cover"
              />
            </div>
          </div>

          {/* Right: Mobile Mockups, smaller now */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[900px] scale-[1.05] md:scale-[1.1] lg:scale-[1.12]">
              <img
                src="/MobileCollection.png"
                alt="WGTS mobile mockups"
                className="relative z-10 w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Bottom: wide case banner */}
        <div className="mt-10 rounded-[26px] bg-black shadow-[0_26px_70px_rgba(15,23,42,0.5)] md:mt-12">
          <div className="grid overflow-hidden rounded-[26px] md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            {/* Left text panel */}
            <div className="flex items-center justify-center bg-linear-to-r from-black via-black to-black/60 px-10 py-10 md:px-14 md:py-14">
              <div className="max-w-md text-white">
                <h3 className="text-[56px] font-extrabold leading-snug md:text-[44px]">
                  WGTS (Who’s
                  <br />
                  Got The Shot)
                </h3>

                <div className="mt-5 space-y-1.5 text-[13px] leading-relaxed text-[#e5e7eb]">
                  <p>
                    <span className="font-semibold">Platform:</span>&nbsp;iOS
                    (Swift)
                  </p>
                  <p>
                    <span className="font-semibold">Launch:</span>&nbsp;2025
                    (App Store Live)
                  </p>
                  <p>
                    <span className="font-semibold">SDK:</span>
                    &nbsp;Cognivision.ai – Swift Edition
                  </p>
                  <p>
                    <span className="font-semibold">Website:</span>&nbsp;WGTS on
                    App Store
                  </p>
                </div>
              </div>
            </div>

            {/* Right image panel */}
            <div className="h-[220px] md:h-full">
              <img
                src="/image2.png"
                alt="Lawn bowls on green"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
