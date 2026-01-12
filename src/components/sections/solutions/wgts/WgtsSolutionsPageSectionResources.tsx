"use client";

import Image from "next/image";
import Link from "next/link";
import { GlowSection } from "@/components/layout/GlowLayout";

type ResourceCard = {
  title: string;
  description: string;
  image: string;
  href?: string;
};

const RESOURCES: ResourceCard[] = [
  {
    title: "Platform: iOS (Swift)",
    description:
      "Built natively for iOS using Swift, ensuring seamless performance and ARKit integration.",
    image: "/SolutionHero3.svg",
  },
  {
    title: "Launch: 2025 (App Store Live)",
    description:
      "Launched in 2025 and now live on the App Store, delivering real-world AR + ML experiences to users.",
    image: "/SolutionHero4.svg",
  },
  {
    title: "SDK: CogniVision.ai – Swift Edition",
    description:
      "Powered by Cognivision.io – Swift Edition, offering seamless AR and ML integration for iOS developers.",
    image: "/SolutionHero5.svg",
  },
  {
    title: "Website: WGTS on App Store",
    description:
      "Discover more on the WGTS App Store page, showcasing Cognivision-powered AR precision in action.",
    image: "/SolutionHero6.svg",
    href: "#",
  },
];

function ResourceCardItem({ item }: { item: ResourceCard }) {
  const Wrapper = item.href ? Link : ("div" as any);

  return (
    <Wrapper
      {...(item.href ? { href: item.href } : {})}
      className={[
        "group block overflow-hidden rounded-[18px] bg-white",
        "shadow-[0_20px_50px_rgba(17,24,39,0.10)]",
      ].join(" ")}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full bg-[#eef2ff]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Bottom black panel */}
      <div className="rounded-b-[18px] bg-[#0b0b0f] px-6 pb-7 pt-6">
        <div className="font-heading text-[18px] font-semibold leading-6 text-white">
          {item.title}
        </div>
        <p className="mt-3 text-[13.5px] leading-6 text-white/75">
          {item.description}
        </p>
      </div>
    </Wrapper>
  );
}

export default function WgtsSolutionsPageSectionResources() {
  return (
    <GlowSection
      bgClassName="bg-white"
      className="min-h-[100svh]"
      allowGlowBleed
      randomizeGlows
      glowCount={4}
      glowSeed="landing-hero"
    >
      <div className="mx-auto max-w-6xl min-h-[calc(100svh-78px)] px-5 py-16 sm:px-6 lg:px-0">
        {/* Title */}
        <div className="text-center">
          <h2 className="font-heading text-[44px] font-semibold leading-[1.05] tracking-wide text-[#0b1020]">
            Resources
          </h2>
        </div>

        {/* Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {RESOURCES.map((r) => (
            <ResourceCardItem key={r.title} item={r} />
          ))}
        </div>
      </div>
    </GlowSection>
  );
}
