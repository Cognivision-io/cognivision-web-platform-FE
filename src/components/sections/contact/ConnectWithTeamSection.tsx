"use client";

import { GlowSection } from "@/components/layout/GlowLayout";
import Image from "next/image";
import React, { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import type { ContactUsPayload } from "@/interfaces/contact.interface";
import { useContactUsMutation } from "@/features/contact/mutations/contact.mutation";
import CustomToast from "@/components/ui/sonner";
import { isValidEmail } from "@/lib/utils";

const PURPLE = "#5328D4";
const INPUT_BG = "#F6F8FD";

type CountryCode =
  | "US"
  | "CA"
  | "UK"
  | "PK"
  | "IN"
  | "AE"
  | "SA"
  | "AU"
  | "NZ"
  | "DE"
  | "FR"
  | "IT"
  | "ES"
  | "NL"
  | "SE"
  | "NO"
  | "DK"
  | "FI"
  | "CH"
  | "AT"
  | "BE"
  | "IE"
  | "SG"
  | "MY"
  | "ID"
  | "TH"
  | "PH"
  | "JP"
  | "KR"
  | "CN"
  | "HK"
  | "ZA"
  | "EG"
  | "NG"
  | "KE";

const COUNTRIES: { code: CountryCode; name: string; dial: string }[] = [
  { code: "US", name: "United States", dial: "+1" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "UK", name: "United Kingdom", dial: "+44" },
  { code: "PK", name: "Pakistan", dial: "+92" },
  { code: "IN", name: "India", dial: "+91" },

  // Middle East
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },

  // Asia-Pacific
  { code: "SG", name: "Singapore", dial: "+65" },
  { code: "MY", name: "Malaysia", dial: "+60" },
  { code: "ID", name: "Indonesia", dial: "+62" },
  { code: "TH", name: "Thailand", dial: "+66" },
  { code: "PH", name: "Philippines", dial: "+63" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "KR", name: "South Korea", dial: "+82" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "HK", name: "Hong Kong", dial: "+852" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "NZ", name: "New Zealand", dial: "+64" },

  // Europe
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "SE", name: "Sweden", dial: "+46" },
  { code: "NO", name: "Norway", dial: "+47" },
  { code: "DK", name: "Denmark", dial: "+45" },
  { code: "FI", name: "Finland", dial: "+358" },
  { code: "CH", name: "Switzerland", dial: "+41" },
  { code: "AT", name: "Austria", dial: "+43" },
  { code: "BE", name: "Belgium", dial: "+32" },
  { code: "IE", name: "Ireland", dial: "+353" },

  // Africa
  { code: "ZA", name: "South Africa", dial: "+27" },
  { code: "EG", name: "Egypt", dial: "+20" },
  { code: "NG", name: "Nigeria", dial: "+234" },
  { code: "KE", name: "Kenya", dial: "+254" },
];

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
  const contactMutation = useContactUsMutation();

  const dialCode = useMemo(() => {
    const found = COUNTRIES.find((c) => c.code === visualCountry);
    return found?.dial ?? "+44";
  }, [visualCountry]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formEl = event.currentTarget; // ✅ keep a reference

    const formData = new FormData(formEl);

    const getText = (key: string) => {
      const value = formData.get(key);
      return typeof value === "string" ? value.trim() : "";
    };

    const rawPhone = getText("phoneNumber");
    const phone =
      rawPhone.length > 0 && !rawPhone.startsWith("+")
        ? `${dialCode}${rawPhone}`
        : rawPhone;

    const payload: ContactUsPayload = {
      firstName: getText("firstName"),
      lastName: getText("lastName"),
      email: getText("email"),
      phone,
      subject: getText("subject"),
      message: getText("message"),
    };

    if (!isValidEmail(payload.email)) {
      CustomToast.error("Please enter a valid email address.");
      return;
    }

    if (contactMutation.isPending) return;

    contactMutation.mutate(payload, {
      onSuccess: () => {
        CustomToast.success("Message sent successfully");

        // ✅ Reset uncontrolled inputs/textarea/checkboxes
        formEl.reset();

        // ✅ Reset controlled select
        setCountryValue("");
      },
      onError: (error) => {
        console.log(error, "ERROR");
        const message = error?.response?.data?.message;
        CustomToast.error(
          typeof message === "string" ? message : "Failed to send message",
        );
      },
    });
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
            <h2 className="font-heading text-[40px] font-extrabold leading-[0.95] tracking-tight text-black sm:text-[56px]">
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
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center gap-2">
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

              {/* Subject */}
              <div>
                <Label htmlFor="subject" required>
                  Subject
                </Label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
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
                  disabled={contactMutation.isPending}
                  className="h-11 rounded-md px-8 text-[13px] font-semibold text-white"
                  style={{ background: PURPLE }}
                >
                  {contactMutation.isPending ? "Submitting..." : "Submit"}
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
