// src/components/sections/ResourcesSection.tsx
import React from "react";
import Image from "next/image";

type ResourceCard = {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
};

const RESOURCES: ResourceCard[] = [
  {
    id: "platform",
    title: "Platform: iOS (Swift)",
    subtitle:
      "Built natively for iOS using Swift, ensuring seamless performance and ARKit integration.",
    imageSrc: "/assets/resource-1.jpg",
  },
  {
    id: "launch",
    title: "Launch: 2025 (App Store Live)",
    subtitle:
      "Launched in 2025 and now live on the App Store, delivering real-world AR + ML experiences to users.",
    imageSrc: "/assets/resource-2.jpg",
  },
  {
    id: "sdk",
    title: "SDK: Cognivision.ai — Swift Edition",
    subtitle:
      "Powered by Cognivision.ai — Swift Edition, offering seamless AR and ML integration for iOS developers.",
    imageSrc: "/assets/resource-3.jpg",
  },
  {
    id: "website",
    title: "Website: WGTS on App Store",
    subtitle:
      "Discover more on the WGTS App Store page, showcasing Cognivision-powered AR precision in action.",
    imageSrc: "/assets/resource-4.jpg",
  },
];

const ResourcesSection: React.FC = () => {
  return (
    <section className="w-full bg-white pb-20 pt-10 md:pb-24 md:pt-14">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="mb-8 text-center md:mb-10">
          <h2 className="text-[26px] font-extrabold leading-[1.15] text-black sm:text-[30px] md:text-[34px]">
            Resources
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          {RESOURCES.map((resource) => (
            <article
              key={resource.id}
              className="group relative flex min-h-[260px] flex-col overflow-hidden rounded-[22px] bg-black/5 shadow-[0_16px_40px_rgba(15,23,42,0.18)]"
            >
              {/* Image */}
              <div className="relative h-[230px] w-full flex-1">
                <Image
                  src={resource.imageSrc}
                  alt={resource.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 18vw, (min-width: 768px) 40vw, 100vw"
                />

                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black via-black/65 to-transparent" />

                {/* Text content */}
                <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-10">
                  <h3 className="text-[13px] font-semibold leading-snug text-white sm:text-[14px]">
                    {resource.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-white/80 sm:text-[12px]">
                    {resource.subtitle}
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

export default ResourcesSection;
