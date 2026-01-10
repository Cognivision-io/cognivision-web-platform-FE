"use client";

import React, { useMemo, useState } from "react";
import {
  CheckCircle2,
  Database,
  Users,
  Headphones,
  Globe,
  Lock,
  MessagesSquare,
  Coins,
} from "lucide-react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { GlowSection } from "@/components/layout/GlowLayout";

type Billing = "monthly" | "annual";

type Plan = {
  key: "public" | "core" | "enterprise";
  title: string;
  subtitle: string;
  priceLabel: string; // "Free" | "$79" | "Contact Us"
  strikeLabel?: string; // "$99"
  priceMeta?: string; // "per month, billed annually"
  cta: { label: string; href: string };
  topRows: {
    icon: React.ReactNode;
    label: string;
    value: string;
    sub?: string;
  }[];
  includedTitle: string;
  included: string[];
  bottomNote: { icon: React.ReactNode; text: string };
};

const PURPLE = "#5b2fe8";

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function TogglePill({
  value,
  onChange,
}: {
  value: Billing;
  onChange: (v: Billing) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-lg bg-white p-1 shadow-sm ring-1 ring-black/5">
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className={cn(
          "h-9 rounded-md px-5 text-[13px] font-medium transition",
          value === "monthly"
            ? "bg-[#f3f4f6] text-[#111827]"
            : "text-[#111827] hover:bg-[#f9fafb]"
        )}
      >
        Monthly
      </button>

      <button
        type="button"
        onClick={() => onChange("annual")}
        className={cn(
          "h-9 rounded-md px-5 text-[13px] font-medium transition",
          value === "annual"
            ? "bg-[#f3f4f6] text-[#111827]"
            : "text-[#111827] hover:bg-[#f9fafb]"
        )}
      >
        Annual
        <span className="ml-1 select-none rounded-md bg-transparent px-2 py-1 text-[11px] font-semibold tracking-wide text-[#111827]">
          SAVE 20%
        </span>
      </button>
    </div>
  );
}

function FeatureRow({
  icon,
  value,
  label,
  sub,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  sub?: string;
}) {
  return (
    <div className="flex items-start gap-3 px-6 py-4">
      <div className="mt-0.5 text-[#111827]/70">{icon}</div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-[13px] font-semibold text-[#111827]">
            {value}
          </span>
          <span className="text-[13px] text-[#6b7280]">{label}</span>
        </div>
        {sub ? (
          <div className="mt-0.5 text-[12px] text-[#9ca3af]">{sub}</div>
        ) : null}
      </div>
    </div>
  );
}

function IncludedList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="px-6 py-5">
      <div className="text-[13px] font-semibold text-[#111827]">{title}</div>
      <ul className="mt-3 space-y-3">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-3">
            <CheckCircleRoundedIcon
              fontSize="small"
              className="text-[#5b2fe8]"
            />
            <span className="text-[13px] leading-5 text-[#374151]">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PricingCard({ plan, dimmed }: { plan: Plan; dimmed?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-xl shadow-sm transition-colors duration-200",
        dimmed ? "bg-white/60" : "bg-white"
      )}
    >
      {/* Head */}
      <div className="px-6 pt-6 flex flex-col min-h-[280px]">
        <div className="text-[20px] font-semibold" style={{ color: PURPLE }}>
          {plan.title}
        </div>
        <div className="mt-1 text-[13px] text-[#6b7280]">{plan.subtitle}</div>

        <div className="mt-8">
          {/* Price row slot */}
          <div className="h-[52px] flex items-end gap-2">
            <div className="text-[40px] font-semibold leading-[1] text-[#111827]">
              {plan.priceLabel}
            </div>

            {plan.strikeLabel ? (
              <div className="pb-1 text-[14px] text-[#9ca3af] line-through">
                {plan.strikeLabel}
              </div>
            ) : (
              <div className="pb-1 text-[14px] text-transparent">.</div>
            )}
          </div>

          {/* Meta row slot */}
          <div className="mt-2 h-[22px] text-[13px] leading-[22px] text-[#6b7280]">
            {plan.priceMeta
              ? plan.priceMeta
              : plan.key === "public"
              ? "No credit card required."
              : "\u00A0"}
          </div>
        </div>

        <div className="mt-auto pt-6">
          <a
            href={plan.cta.href}
            className="inline-flex h-11 w-full items-center justify-center rounded-md text-[13px] font-semibold text-white"
            style={{ backgroundColor: PURPLE }}
          >
            {plan.cta.label}
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-6 h-px w-full bg-[#eef2ff]" />

      {/* Top rows */}
      <div className="divide-y divide-[#eef2ff]">
        {plan.topRows.map((r, idx) => (
          <FeatureRow
            key={idx}
            icon={r.icon}
            value={r.value}
            label={r.label}
            sub={r.sub}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[#eef2ff]" />

      {/* Included */}
      <IncludedList title={plan.includedTitle} items={plan.included} />

      {/* Divider */}
      <div className="h-px w-full bg-[#eef2ff]" />

      {/* Bottom note */}
      <div className="flex items-start gap-3 px-6 py-5">
        <div className="mt-0.5 text-[#111827]/70">{plan.bottomNote.icon}</div>
        <div className="text-[13px] leading-5 text-[#374151]">
          {plan.bottomNote.text}
        </div>
      </div>
    </div>
  );
}

export function PricingSection() {
  const [billing, setBilling] = useState<Billing>("monthly");

  const plans = useMemo<Plan[]>(() => {
    const corePrice = billing === "annual" ? "$79" : "$99";
    const coreStrike = billing === "annual" ? "$99" : undefined;
    const coreMeta =
      billing === "annual"
        ? "per month, billed annually"
        : "per month, billed monthly";

    return [
      {
        key: "public",
        title: "Public",
        subtitle: "Best for Open Source and Exploration",
        priceLabel: "Free",
        cta: { label: "Get Started for Free", href: "/register" },
        topRows: [
          {
            icon: <Database className="h-4 w-4" />,
            value: "$60/mo",
            label: "free credits",
          },
          {
            icon: <Coins className="h-4 w-4" />,
            value: "$4/credit",
            label: "",
          },
          { icon: <Users className="h-4 w-4" />, value: "2 users", label: "" },
          {
            icon: <MessagesSquare className="h-4 w-4" />,
            value: "Community Support",
            label: "",
          },
        ],
        includedTitle: "What’s included:",
        included: [
          "Data labeling suite w/ AI features",
          "Model training",
          "Workflow builder",
          "Cloud hosted deployment",
          "Edge device sandbox",
        ],
        bottomNote: {
          icon: <Globe className="h-4 w-4" />,
          text: "Data and models are open source on Cognivision Universe",
        },
      },
      {
        key: "core",
        title: "Core",
        subtitle: "Best for Small Projects with Private Data",
        priceLabel: corePrice,
        strikeLabel: coreStrike,
        priceMeta: coreMeta,
        cta: { label: "Get Started for Free", href: "/register" },
        topRows: [
          {
            icon: <Database className="h-4 w-4" />,
            value: "$60/mo",
            label: "free credits",
            sub: "(Annual commitments receive all credits immediately)",
          },
          {
            icon: <Coins className="h-4 w-4" />,
            value: "$4/credit",
            label: "",
          },
          { icon: <Users className="h-4 w-4" />, value: "3 users", label: "" },
          {
            icon: <MessagesSquare className="h-4 w-4" />,
            value: "Community Support",
            label: "",
          },
        ],
        includedTitle: "Features in Public, plus:",
        included: [
          "Private data & models",
          "Training analytics",
          "Model evaluation",
          "Preprocessing & augmentations",
          "Train concurrent models",
          "Download model weights",
        ],
        bottomNote: {
          icon: <Lock className="h-4 w-4" />,
          text: "Data and models are private",
        },
      },
      {
        key: "enterprise",
        title: "Enterprise",
        subtitle: "Best for Production Deployments",
        priceLabel: "Contact Us",
        cta: { label: "Contact Sales", href: "/contact-us" },
        topRows: [
          {
            icon: <Database className="h-4 w-4" />,
            value: "Custom",
            label: "",
          },
          {
            icon: <Coins className="h-4 w-4" />,
            value: "Custom",
            label: "",
          },
          { icon: <Users className="h-4 w-4" />, value: "Custom", label: "" },
          {
            icon: <Headphones className="h-4 w-4" />,
            value: "Enterprise Support",
            label: "",
          },
        ],
        includedTitle: "Features in Core, plus:",
        included: [
          "Deploy to the edge with commercial Inference model license",
          "Priority access to faster cloud GPUs",
          "RBAC with annotation review",
          "Workflow versioning",
          "Model monitoring",
          "Filter model evaluation by tag",
        ],
        bottomNote: {
          icon: <Lock className="h-4 w-4" />,
          text: "Data and models are private",
        },
      },
    ];
  }, [billing]);

  return (
    <GlowSection bgClassName="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-0">
        {/* Title */}
        <div className="text-center">
          <h1
            className="mx-auto max-w-4xl font-[Orbitron]
           text-[44px] font-semibold leading-[1.15] text-[#111827]"
          >
            One platform to deploy computer vision.
            <br />
            Start today.
          </h1>

          <div className="mt-10">
            <TogglePill value={billing} onChange={setBilling} />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-1 lg:grid-cols-3">
          {plans.map((p) => (
            <PricingCard key={p.key} plan={p} dimmed={p.key !== "core"} />
          ))}
        </div>
      </div>
    </GlowSection>
  );
}
