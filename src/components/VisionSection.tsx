// components/sections/VisionSection.tsx

import React from "react";

const VisionSection: React.FC = () => {
  return (
    <section className="bg-[#f5f7fe] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-5xl rounded-[26px] border border-[#e5e7f5] bg-white px-4 py-10 shadow-sm sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <div className="space-y-12 lg:space-y-16">
          {/* Block 1 */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] lg:items-start">
            <h3 className="text-[22px] font-semibold leading-snug text-[#111827] sm:text-[24px]">
              A vision for
              <br />
              the future
            </h3>

            <div className="space-y-4 text-[14px] leading-relaxed text-[#4b5563] sm:text-[15px]">
              <p>
                Traditionally, real-time video and voice happen in standalone
                applications. But teams increasingly want intelligence to live
                directly inside the products they already use.
              </p>
              <p>
                We envision a platform that empowers developers across sectors
                like healthcare, retail, fintech, and construction to build
                intelligent, real-world solutions. From detecting anomalies to
                analyzing retail shelves or monitoring activity on construction
                sites, CogniVision makes vision technology adaptable and
                scalable for every use case.
              </p>
              <p>
                Our SDK supports multiple tech stacks — from Swift to Python,
                JavaScript, and beyond — ensuring flexibility across mobile,
                web, and enterprise systems. By combining innovation,
                accessibility, and cross-platform performance, CogniVision is
                shaping the future of computer vision for anyone, anytime and
                anywhere.
              </p>
              <p className="pt-1 text-[12px] font-semibold tracking-wide text-[#4f46e5]">
                BUILT FOR EVERY DEVELOPER, EVERYWHERE
              </p>
            </div>
          </div>

          {/* Divider line for large screens (keeps card feeling structured) */}
          <div className="hidden h-px w-full bg-[#eef0fb] lg:block" />

          {/* Block 2 */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] lg:items-start">
            <h3 className="text-[22px] font-semibold leading-snug text-[#111827] sm:text-[24px]">
              Revolutionizing
              <br />
              how developers
              <br />
              work
            </h3>

            <div className="space-y-4 text-[14px] leading-relaxed text-[#4b5563] sm:text-[15px]">
              <p>
                CogniVision is transforming how teams build intelligent,
                vision-driven applications. By merging computer vision, AR, and
                machine learning into a single SDK, we remove the complexity of
                stitching together multiple tools and services.
              </p>
              <p>
                Developers can focus on creativity and functionality — not
                infrastructure — bringing ideas to life faster than ever. With a
                flexible, cross-platform foundation, CogniVision empowers teams
                to design, train, and deploy visual intelligence across any
                industry or device.
              </p>
              <p>
                From healthcare diagnostics to retail analytics and industrial
                automation, CogniVision redefines what&apos;s possible when
                innovation meets simplicity.
              </p>
              <p className="pt-1 text-[12px] font-semibold tracking-wide text-[#4f46e5]">
                EMPOWERING DEVELOPERS TO BUILD SMARTER, FASTER, AND EVERYWHERE.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
