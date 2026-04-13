"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  CheckCircle2,
  Database,
  Users,
  Headphones,
  Globe,
  Lock,
  MessagesSquare,
  Coins,
  Gift,
  CreditCard,
} from "lucide-react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { GlowSection } from "@/components/layout/GlowLayout";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { useSubscriptionModalStore } from "@/store/subscription-modal-store";
import { SubscriptionPlanKey } from "@/features/subscription/types";

type Billing = "monthly" | "annual";

type Plan = {
  key: SubscriptionPlanKey;
  title: string;
  subtitle: string;
  priceLabel: string; // "Free" | "$79" | "Contact Us"
  strikeLabel?: string; // "$99"
  priceMeta?: string; // "per month, billed annually"
  cta: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  topRows: {
    icon: React.ReactNode;
    label: string;
    value: string;
    sub?: string;
  }[];
  includedTitle: string;
  included: string[];
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
            : "text-[#111827] hover:bg-[#f9fafb]",
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
            : "text-[#111827] hover:bg-[#f9fafb]",
        )}
      >
        Annual
        <span className="ml-2 inline-flex select-none items-center rounded-full bg-[#5b2fe8]/10 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#5b2fe8] ring-1 ring-[#5b2fe8]/20">
          Save 20%
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
        dimmed ? "bg-white/60" : "bg-white",
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
          {plan.cta.href ? (
            <Button
              asChild
              size="lg"
              className="w-full"
              style={{ backgroundColor: PURPLE }}
            >
              <Link href={plan.cta.href}>{plan.cta.label}</Link>
            </Button>
          ) : (
            <Button
              type="button"
              size="lg"
              className="w-full"
              onClick={plan.cta.onClick}
              style={{ backgroundColor: PURPLE }}
            >
              {plan.cta.label}
            </Button>
          )}
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
    </div>
  );
}

export function PricingSection() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const openModal = useSubscriptionModalStore((state) => state.openModal);

  const handlePlanUpgrade = (planKey: SubscriptionPlanKey) => {
    if (user) {
      openModal(planKey);
      return;
    }
    const callbackUrl = `/dashboard?upgradePlan=${planKey}`;
    router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  };

  const corePrice = billing === "annual" ? "$79" : "$99";
  const coreStrike = billing === "annual" ? "$99" : undefined;
  const coreMeta =
    billing === "annual"
      ? "per month, billed annually"
      : "per month, billed monthly";

  const plans: Plan[] = [
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
        "Swift & Kotlin SDKs",
        "Data labeling suite w/ AI features",
        "Model training",
        "Workflow builder",
        "Cloud hosted deployment",
        "Edge device sandbox",
      ],
    },
    {
      key: "core",
      title: "Core",
      subtitle: "Best for Small Projects with Private Data",
      priceLabel: corePrice,
      strikeLabel: coreStrike,
      priceMeta: coreMeta,
      cta: {
        label: "Upgrade to Core",
        onClick: () => handlePlanUpgrade("core"),
      },
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
        "React Native & Flutter SDKs",
        "Private data & models",
        "Training analytics",
        "Model evaluation",
        "Preprocessing & augmentations",
        "Train concurrent models",
        "Download model weights",
      ],
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
    },
  ];

  return (
    <GlowSection
      bgClassName="bg-white"
      allowGlowBleed
      randomizeGlows
      glowCount={2}
      glowSeed="pricing-hero"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-0">
        {/* Title */}
        <div className="text-center">
          {/* Heading */}
          <h1
            className="mx-auto max-w-6xl font-heading
    text-[38px] font-semibold leading-[1.15] text-[#111827]"
          >
            <span className="text-[#0b1020] sm:text-[40px]">
              Only pay for what you use with Cognivision&apos;s flexible pricing
              model.
            </span>
          </h1>

          {/* Feature row (NEW) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-14">
            <div className="flex items-center gap-3 text-sm font-medium text-[#4B5563]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] bg-white">
                <Gift className="h-8 w-8 text-[#6B7280]" />
              </div>
              <span>Start building for free</span>
            </div>

            <div className="flex items-center gap-3 text-sm font-medium text-[#4B5563]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] bg-white">
                <CreditCard className="h-8 w-8 text-[#6B7280]" />
              </div>
              <span>Flexible billing options</span>
            </div>
          </div>

          {/* Toggle pill */}
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
