// src/components/sections/WgtsKeyLearningsSection.tsx
import React from "react";
import Image from "next/image";

type LearningCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
};

const LEARNINGS: LearningCard[] = [
  {
    id: "sdk",
    title: "Ease of SDK integration",
    description:
      "made Cognivision.ai viable for rapid prototyping in any sports AR scenario.",
    imageSrc: "/assets/wgts-learning-1.jpg",
  },
  {
    id: "edge",
    title: "Edge detection and depth fusion",
    description:
      "enable sub-centimetre distance estimates without LiDAR dependency.",
    imageSrc: "/assets/wgts-learning-2.jpg",
  },
  {
    id: "adoption",
    title: "End-user adoption",
    description:
      "proves strong demand for consumer-level cognitive vision tools.",
    imageSrc: "/assets/wgts-learning-3.jpg",
  },
];

const WgtsKeyLearningsSection: React.FC = () => {
  return (
    <section className="w-full bg-white pb-20 pt-12 md:pb-24 md:pt-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="mb-10 text-center md:mb-14">
          <h2 className="text-[28px] font-extrabold leading-tight text-black sm:text-[32px] md:text-[36px]">
            Key Learnings
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-7">
          {LEARNINGS.map((learning) => (
            <article
              key={learning.id}
              className="group relative flex min-h-[260px] flex-col overflow-hidden rounded-[26px] bg-black/5 shadow-[0_16px_40px_rgba(15,23,42,0.18)]"
            >
              {/* Image */}
              <div className="relative h-[280px] w-full flex-1 md:h-[320px]">
                <Image
                  src={learning.imageSrc}
                  alt={learning.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 32vw, 100vw"
                />

                {/* Bottom gradient overlay */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/85 via-black/55 to-transparent" />

                {/* Text overlay */}
                <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-10 sm:px-5 sm:pb-5">
                  <h3 className="text-[14px] font-semibold leading-snug text-white sm:text-[15px]">
                    {learning.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-white/80 sm:text-[12px]">
                    {learning.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WgtsKeyLearningsSection;
