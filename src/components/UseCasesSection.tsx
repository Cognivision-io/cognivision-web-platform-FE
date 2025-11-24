"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const UseCasesSection: React.FC = () => {
  return (
    <section className="bg-[#f5f7fb] px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <h2 className="text-[32px] font-extrabold leading-tight text-black sm:text-[36px]">
          Use Cases
        </h2>

        {/* Top: main case + phone mockups */}
        <div className="relative mt-10 md:mt-12">
          {/* White card */}
          <div className="rounded-[26px] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.16)] md:pr-[260px]">
            <div className="px-8 pt-8 pb-4 md:px-10 md:pt-10">
              <h3 className="text-[20px] font-semibold text-black md:text-[22px]">
                The Solution Cognivision SDK Integration
              </h3>
              <p className="mt-4 text-[14px] leading-[1.9] text-[#111827]">
                WGTS (Who’s Got The Shot) is an iOS-based sports analytics and
                AR precision app for lawn bowls players, referees, and
                enthusiasts. It leverages Cognivision.ai’s Swift SDK to deliver
                real-time, ultra-accurate distance measurement between bowls and
                the jack&nbsp;eliminating manual measurement tools and disputes
                during gameplay.
              </p>

              <button
                type="button"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#5628e0] px-6 py-2.5 text-[14px] font-semibold text-white shadow-[0_16px_36px_rgba(86,40,224,0.5)]"
              >
                <span>Explore More</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Bottom image strip inside the card */}
            <div className="mt-4 overflow-hidden rounded-b-[26px]">
              <img
                src="/public/frame.png" // <- replace with your asset
                alt="WGTS app UI"
                className="h-[170px] w-full object-cover"
              />
            </div>
          </div>

          {/* Phone stack on the right */}
          <div className="pointer-events-none hidden md:block">
            <img
              src="/public/MobileCollection.png" // <- replace with your asset
              alt="WGTS mobile mockups"
              className="absolute right-0 top-1/2 h-[540px] -translate-y-1/2 select-none drop-shadow-[0_26px_60px_rgba(15,23,42,0.55)]"
            />
          </div>
        </div>

        {/* Bottom: wide case banner */}
        <div className="mt-10 rounded-[26px] bg-black shadow-[0_26px_70px_rgba(15,23,42,0.5)] md:mt-12">
          <div className="grid overflow-hidden rounded-[26px] md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            {/* Left text panel */}
            <div className="flex items-center justify-center bg-gradient-to-r from-black via-black to-black/60 px-10 py-10 md:px-14 md:py-14">
              <div className="max-w-md text-white">
                <h3 className="text-[26px] font-extrabold leading-snug md:text-[30px]">
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
                src="/public/image2.png" // <- replace with your asset
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
