// src/components/sections/SolutionCognivisionSection.tsx
import React from "react";
import Image from "next/image";
import { ScanLine, Ruler, Activity } from "lucide-react"; // or any icons you like

const features = [
  {
    id: "object-detection",
    icon: ScanLine,
    title: "Object Detection",
    text: [
      "Automatically identifies the jack and each bowl in real time using YOLO-based machine learning.",
      "Delivers fast, accurate object detection directly from the live camera feed.",
    ],
  },
  {
    id: "ar-distance",
    icon: Ruler,
    title: "AR Distance Measurement",
    text: [
      "Calculates precise edge-to-edge distances between the bowls and the jack in real time.",
      "Powered by ARKit and Cognivision’s advanced spatial geometry engine for high accuracy.",
    ],
  },
  {
    id: "real-time-feedback",
    icon: Activity,
    title: "Real-Time Feedback",
    text: [
      "The Cognivision SDK instantly displays measurement overlays within the app interface, enabling real-time distance visualization.",
      "It blends AR visuals with live camera input for a seamless, interactive experience.",
    ],
  },
];

const SolutionCognivisionSection: React.FC = () => {
  return (
    <section className="w-full bg-white pb-16 pt-14 md:pb-20 md:pt-18">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="mb-10 text-center md:mb-12">
          <h2 className="text-[26px] font-extrabold leading-[1.15] text-black sm:text-[30px] md:text-[34px]">
            The Solution Cognivision SDK
            <br className="hidden sm:block" /> Integration
          </h2>
        </div>

        {/* Content */}
        <div className="grid gap-10 items-stretch md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-12">
          {/* Left: main image */}
          <div className="relative overflow-hidden rounded-[28px] bg-black/5 shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/assets/sdk-main.jpg" // <-- replace with your green-table image
                alt="Cognivision SDK lawn bowls visualization"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
          </div>

          {/* Right: feature bullets */}
          <div className="flex flex-col justify-center gap-8">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex gap-4 sm:gap-5">
                  {/* Circular icon container */}
                  <div className="mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm">
                    <Icon className="h-5 w-5 text-gray-700" />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-[15px] font-semibold text-black md:text-[16px]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[12px] leading-relaxed text-gray-700 md:text-[13px]">
                      {item.text[0]}
                    </p>
                    <p className="mt-1 text-[12px] leading-relaxed text-gray-700 md:text-[13px]">
                      {item.text[1]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionCognivisionSection;
