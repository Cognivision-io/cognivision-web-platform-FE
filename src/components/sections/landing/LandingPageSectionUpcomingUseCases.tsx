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
    title: "Discuss with Colleagues",
    description:
      "Working online is the same experience as working in an office. This will be achieved with..",
    image: "/Hero8.svg",
    hrefTry: "/register",
    hrefExplore: "/use-case",
  },
  {
    title: "Virtual Reality Concert",
    description:
      "Watching concerts virtually is one of the things that can be done in cyberspace..",
    image: "/Hero9.svg",
    hrefTry: "/register",
    hrefExplore: "/use-case",
  },
  {
    title: "Playing Games",
    description:
      "For gamers, the metaverse could be an interesting platform of choice for the..",
    image: "/Hero10.svg",
    hrefTry: "/register",
    hrefExplore: "/use-case",
  },
  {
    title: "Online Travel",
    description:
      "With cyberspace, online travel is certainly not impossible. We can do this with the help of..",
    image: "/Hero11.svg",
    hrefTry: "/register",
    hrefExplore: "/use-case",
  },
  {
    title: "Artworks",
    description:
      "In the past, works of art such as paintings could only be seen in the real world..",
    image: "/Hero12.svg",
    hrefTry: "/register",
    hrefExplore: "/use-case",
  },
  {
    title: "Digital Clothing",
    description:
      "The community has also been active with the emergence of paintings or drawings..",
    image: "/Hero13.svg",
    hrefTry: "/register",
    hrefExplore: "/use-case",
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

      {/* Buttons */}
      <div className="mt-5 flex items-center gap-3">
        <Link
          href={card.hrefTry || "/register"}
          className="inline-flex h-[34px] items-center justify-center rounded-sm px-4 text-[13px] font-semibold text-white shadow-[0_10px_18px_rgba(91,47,232,0.20)]"
          style={{ backgroundColor: PURPLE }}
        >
          Try now
        </Link>

        <Link
          href={card.hrefExplore || "/use-case"}
          className="inline-flex h-[34px] items-center justify-center rounded-sm border px-4 text-[13px] font-semibold text-[#0b1020] hover:bg-black/[0.03]"
          style={{ borderColor: "rgba(91,47,232,0.35)" }}
        >
          Explore now
        </Link>
      </div>
    </div>
  );
}

export default function LandingPageSectionUpcomingUseCases() {
  return (
    <GlowSection
      bgClassName="bg-[#F6F7FF]"
      className="py-20 sm:py-24"
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
