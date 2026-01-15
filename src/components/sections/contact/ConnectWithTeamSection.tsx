"use client";

import { GlowSection } from "@/components/layout/GlowLayout";
import Image from "next/image";
import React, { FormEvent, useMemo, useState } from "react";

const PURPLE = "#5328D4";
const INPUT_BG = "#F6F8FD";

type CountryCode = "UK" | "US" | "PK" | "CA" | "OTHER";

const COUNTRIES: { code: CountryCode; name: string; dial: string }[] = [
  { code: "UK", name: "United Kingdom", dial: "+44" },
  { code: "US", name: "United States", dial: "+1" },
  { code: "PK", name: "Pakistan", dial: "+92" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "OTHER", name: "Other", dial: "+" },
];

function UKFlag({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 40"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="60" height="40" fill="#012169" />
      {/* white diagonals */}
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#FFF" strokeWidth="10" />
      {/* red diagonals */}
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="6" />
      {/* white cross */}
      <rect x="0" y="15" width="60" height="10" fill="#FFF" />
      <rect x="25" y="0" width="10" height="40" fill="#FFF" />
      {/* red cross */}
      <rect x="0" y="17" width="60" height="6" fill="#C8102E" />
      <rect x="27" y="0" width="6" height="40" fill="#C8102E" />
    </svg>
  );
}

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="#111827"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Label({
  children,
  required,
  htmlFor,
}: {
  children: React.ReactNode;
  required?: boolean;
  htmlFor: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[13px] font-semibold text-[#111827]"
    >
      {children}
      {required ? <span className="text-red-500">*</span> : null}
    </label>
  );
}

const ConnectWithTeamSection = () => {
  // Screenshot shows UK flag + +44 by default, while still showing "Select" placeholder.
  // We mimic that: default visuals -> UK; select itself starts empty (placeholder).
  const [countryValue, setCountryValue] = useState<CountryCode | "">("");
  const visualCountry: CountryCode = (countryValue || "UK") as CountryCode;

  const dialCode = useMemo(() => {
    const found = COUNTRIES.find((c) => c.code === visualCountry);
    return found?.dial ?? "+44";
  }, [visualCountry]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log("Form data:", Object.fromEntries(formData.entries()));
  };

  return (
    <GlowSection
      bgClassName="bg-white"
      allowGlowBleed
      randomizeGlows
      glowCount={2}
      glowSeed="contact-us-hero"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-0">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_560px]">
          {/* Left content */}
          <div className="relative">
            <h2 className="font-heading text-[58px] font-extrabold leading-[0.95] tracking-tight text-black sm:text-[70px]">
              Connect with
              <br />
              <span style={{ color: PURPLE }}>Our team</span>
            </h2>

            <p className="mt-6 max-w-[520px] text-[13px] leading-[1.7] text-[#374151]">
              Have questions or want to explore how our AR solutions can work
              for you? Get in touch with us to discuss your ideas, product
              needs, or technical requirements. Our team is here to help you
              understand our SDK, explore use cases, and see how spatial
              intelligence can fit into your workflow. You can also book a demo
              to experience our technology in action and discover how it can
              power your next AR product.
            </p>

            <div className="mt-6">
              <div className="text-[20px] font-extrabold text-black">
                Learn more about product
              </div>
              <div className="mt-2 text-[13px] text-[#6B7280]">
                Have questions about our developer friendly product admin panel
              </div>
            </div>
            <div className="mt-10 flex w-full justify-end">
              <Image
                src="/ContactUsHero1.svg"
                alt=""
                width={360}
                height={260}
                priority
                className="h-auto w-[320px] select-none"
              />
            </div>
          </div>

          {/* Right form card */}
          <div className="rounded-[2px] bg-white px-10 py-10 shadow-[0_20px_80px_rgba(17,24,39,0.06)]">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* First / Last */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="firstName" required>
                    First Name
                  </Label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="h-11 w-full rounded-md px-4 text-[13px] text-[#111827] outline-none placeholder:text-[#9CA3AF]"
                    style={{ background: INPUT_BG }}
                  />
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="h-11 w-full rounded-md px-4 text-[13px] text-[#111827] outline-none placeholder:text-[#9CA3AF]"
                    style={{ background: INPUT_BG }}
                  />
                </div>
              </div>

              {/* Email / Company */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="email" required>
                    Email
                  </Label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="@gmail.com"
                    className="h-11 w-full rounded-md px-4 text-[13px] text-[#111827] outline-none placeholder:text-[#9CA3AF]"
                    style={{ background: INPUT_BG }}
                  />
                </div>

                <div>
                  <Label htmlFor="company" required>
                    Company
                  </Label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    className="h-11 w-full rounded-md px-4 text-[13px] text-[#111827] outline-none placeholder:text-[#9CA3AF]"
                    style={{ background: INPUT_BG }}
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <Label htmlFor="country" required>
                  Country
                </Label>

                <div className="relative">
                  <select
                    id="country"
                    name="country"
                    required
                    value={countryValue}
                    onChange={(e) =>
                      setCountryValue(e.target.value as CountryCode | "")
                    }
                    className="h-11 w-full appearance-none rounded-md px-4 pr-20 text-[13px] text-[#111827] outline-none"
                    style={{ background: INPUT_BG }}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  {/* right-side flag + caret (like screenshot) */}
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center gap-2">
                    {visualCountry === "UK" ? (
                      <UKFlag className="h-[14px] w-[20px] rounded-[2px]" />
                    ) : (
                      <div className="h-[14px] w-[20px] rounded-[2px] bg-black/10" />
                    )}
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone" required>
                  Phone Number
                </Label>
                <input
                  id="phone"
                  name="phoneNumber"
                  type="tel"
                  required
                  placeholder={dialCode}
                  className="h-11 w-full rounded-md px-4 text-[13px] text-[#111827] outline-none placeholder:text-[#9CA3AF]"
                  style={{ background: INPUT_BG }}
                />
              </div>

              {/* Message */}
              <div className="pt-2">
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full resize-none rounded-md px-4 py-3 text-[13px] text-[#111827] outline-none placeholder:text-[#9CA3AF]"
                  style={{ background: INPUT_BG }}
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-4 pt-1 text-[12px] text-[#374151]">
                <label className="flex items-center gap-3">
                  <input
                    name="agreePrivacy"
                    type="checkbox"
                    required
                    className="h-[16px] w-[16px] rounded-[4px] border-2"
                    style={{ accentColor: PURPLE, borderColor: "#6E4BDA" }}
                  />
                  <span>
                    By checking this box you agree to our privacy policy
                  </span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    name="getUpdates"
                    type="checkbox"
                    className="h-[16px] w-[16px] rounded-[4px] border-2"
                    style={{ accentColor: PURPLE, borderColor: "#6E4BDA" }}
                  />
                  <span>Check this box to get updates about CogniVision.</span>
                </label>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="h-11 rounded-md px-8 text-[13px] font-semibold text-white"
                  style={{ background: PURPLE }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </GlowSection>
  );
};

export default ConnectWithTeamSection;
