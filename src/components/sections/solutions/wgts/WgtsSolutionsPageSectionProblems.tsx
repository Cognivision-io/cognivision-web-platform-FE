"use client";

import { GlowSection } from "@/components/layout/GlowLayout";
import { Ruler, Zap, Clock3, Users, Info, Wrench } from "lucide-react";

const PURPLE = "#5b2fe8";

type ProblemItem = {
  text: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const PROBLEMS: ProblemItem[] = [
  {
    Icon: Ruler,
    text: "Difficult for players and referees to visualize distances quickly during fast-paced gameplay.",
  },
  {
    Icon: Zap,
    text: "Lack of standardized measurement, making competitions inconsistent.",
  },
  {
    Icon: Clock3,
    text: "Accuracy depended heavily on the skill and judgment of referees.",
  },
  {
    Icon: Users,
    text: "Manual measurement often led to disputes over scores and distances.",
  },
  {
    Icon: Info,
    text: "Gameplay could be slowed down due to repeated measurements.",
  },
  {
    Icon: Wrench,
    text: "There was no real-time digital tracking of positions or scores.",
  },
];

function ProblemCard({ item }: { item: ProblemItem }) {
  const { Icon } = item;

  return (
    <div className="flex items-start gap-3 rounded-[12px] border border-[#5b2fe8]/35 bg-[#F6F7FF] px-4 py-5 sm:items-center sm:gap-4 sm:px-6 sm:py-6">
      {/* Icon circle (thin outline + subtle red ring like screenshot) */}
      <div className="relative grid h-[44px] w-[44px] place-items-center rounded-full">
        <div className="absolute inset-0 rounded-full border border-[#ff5a5a]/35" />
        <div className="absolute inset-[4px] rounded-full bg-white" />
        <Icon className="relative z-10 h-5 w-5" style={{ color: PURPLE }} />
      </div>

      <div className="text-[15px] font-semibold leading-6 text-[#111827]/75">
        {item.text}
      </div>
    </div>
  );
}

export default function WgtsSolutionsPageSectionProblems() {
  return (
    <GlowSection
      bgClassName="bg-white"
      allowGlowBleed
      randomizeGlows
      glowCount={2}
      glowSeed="wgts-problems"
    >
      <div className="mx-auto max-w-6xl min-h-[calc(90svh-78px)] px-5 py-16 sm:px-6 lg:px-0">
        {/* Title */}
        <div className="text-center">
          <h2 className="font-heading text-[32px] font-semibold leading-[1.05] tracking-wide text-[#0b1020] sm:text-[40px] lg:text-[44px]">
            The{" "}
            <span className="font-heading" style={{ color: PURPLE }}>
              Problem
            </span>
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {PROBLEMS.map((p, idx) => (
            <ProblemCard key={idx} item={p} />
          ))}
        </div>
      </div>
    </GlowSection>
  );
}
