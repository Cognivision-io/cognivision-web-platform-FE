"use client";

import Image from "next/image";
import Link from "next/link";
import { GlowSection } from "@/components/layout/GlowLayout";

const PURPLE = "#5b2fe8";

type UseCaseCard = {
  title: string;
  description: string;
  image: string;
  hrefTry?: string;
  hrefExplore?: string;
};

const CARDS: UseCaseCard[] = [
  {
    title: "Playing Games",
    description:
      "Build next-gen games that react to real-world environments using object detection, tracking, and spatial AR.",
    image: "/Hero10.svg",
    hrefTry: "/register",
    hrefExplore: "/solutions",
  },
  {
    title: "Collaborative Spatial Workflows",
    description:
      "Enable real-time, shared AR experiences that allow distributed teams to visualize, annotate, and interact with spatial data as if co-located. ",
    image: "/Hero8.svg",
    hrefTry: "/register",
    hrefExplore: "/solutions",
  },
  {
    title: "Spatial Travel & Location Experiences",
    description:
      "Deliver location-aware experiences that combine real-world environments with digital storytelling.",
    image: "/Hero11.svg",
    hrefTry: "/register",
    hrefExplore: "/solutions",
  },
  {
    title: "Digital Fashion & Virtual Assets",
    description:
      "Support virtual apparel and digital assets with real-time body tracking and spatial alignment for seamless try-ons.",
    image: "/Hero13.svg",
    hrefTry: "/register",
    hrefExplore: "/solutions",
  },
  {
    title: "Immersive Live Events & Concerts",
    description:
      "Deliver immersive virtual and AR concerts with real-time environment understanding and spatial anchoring.",
    image: "/Hero9.svg",
    hrefTry: "/register",
    hrefExplore: "/solutions",
  },
  {
    title: "Art, Museums & Digital Exhibitions",
    description:
      "Augment physical and digital art with spatial storytelling, object recognition, and immersive overlays. ",
    image: "/Hero12.svg",
    hrefTry: "/register",
    hrefExplore: "/solutions",
  },
];

function UseCaseCard({ card }: { card: UseCaseCard }) {
  return (
    <div className="rounded-[10px] bg-[#F4F7FF] p-6 shadow-[0_10px_30px_rgba(17,24,39,0.06)]">
      {/* Image */}
      <div className="relative overflow-hidden rounded-[6px] bg-white">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover"
            priority={false}
            sizes="(max-width: 1024px) 100vw, 360px"
          />
        </div>
      </div>

      {/* Text */}
      <div className="mt-5">
        <h3 className="font-heading text-[18px] font-semibold leading-[1.15] text-[#0b1020]">
          {card.title}
        </h3>
        <p className="mt-2 text-[13.5px] leading-6 text-[#111827]/70">
          {card.description}
        </p>
      </div>
    </div>
  );
}

export default function LandingPageSectionUpcomingUseCases() {
  return (
    <GlowSection
      bgClassName="bg-white"
      className="min-h-[100svh] py-20 sm:py-24"
      allowGlowBleed
      randomizeGlows
      glowCount={3}
      glowSeed="landing-upcoming-use-cases"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-0">
        {/* Title */}
        <div className="text-center">
          <h2 className="font-heading text-[36px] font-semibold leading-[1.05] tracking-wide text-[#0b1020] sm:text-[44px]">
            Upcoming{" "}
            <span className="font-heading" style={{ color: PURPLE }}>
              Use-Cases
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-[640px] text-[15px] leading-7 text-[#111827]/70">
            Exploring new AR applications across sports, gaming, retail, and
            beyond.”
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c) => (
            <UseCaseCard key={c.title} card={c} />
          ))}
        </div>
      </div>
    </GlowSection>
  );
}
