"use client";

import Link from "next/link";
import { GlowSection } from "@/components/layout/GlowLayout";
import { Phone, Mail, Globe, Linkedin, Instagram } from "lucide-react";

const PURPLE = "#5b2fe8";

function UnderlineField({
  label,
  placeholder,
  className,
  defaultValue,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <label className={["block", className].filter(Boolean).join(" ")}>
      <div className="text-[12px] font-medium text-[#6b7280]">{label}</div>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mt-2 w-full border-0 border-b border-black/25 bg-transparent px-0 pb-2 text-[14px] text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#5b2fe8]"
      />
    </label>
  );
}

export default function LandingPageSectionContact() {
  return (
    <GlowSection
      bgClassName="bg-white"
      className="min-h-[100svh] py-20 sm:py-24"
      allowGlowBleed
      randomizeGlows
      glowCount={3}
      glowSeed="landing-contact"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-0">
        {/* Heading */}
        <div className="text-center">
          <h2 className="font-heading text-[44px] font-semibold leading-[1.05] tracking-wide text-[#0b1020]">
            Lets{" "}
            <span className="font-heading" style={{ color: PURPLE }}>
              Connect
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-[15px] leading-7 text-[#111827]/70">
            Get in touch and start building your AR experience today.
          </p>
        </div>

        {/* Card */}
        <div className="mt-12 rounded-[14px] bg-white shadow-[0_30px_80px_rgba(17,24,39,0.10)]">
          <div className="grid overflow-hidden rounded-[14px] lg:grid-cols-[520px_1fr]">
            {/* LEFT purple panel */}
            <div className="relative bg-[#5b2fe8] p-10 text-white">
              <h3 className="font-heading text-[34px] font-semibold leading-[1.05]">
                Contact Information
              </h3>

              <p className="mt-5 max-w-[380px] text-[16px] leading-7 text-white/80">
                Connect with us and become part of cognivision’s community and
                get early updates about our features
              </p>

              {/* Contact rows */}
              <div className="mt-16 space-y-10">
                <div className="flex items-center gap-5">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-white/10">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-[15px] text-white/90">
                    +1012 3456 789
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-white/10">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-[15px] text-white/90">
                    info@cognivision
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-white/10">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-[15px] text-white/90">
                    www.cognivision
                  </div>
                </div>
              </div>

              {/* Social icons bottom */}
              <div className="absolute bottom-10 left-10 flex items-center gap-4">
                <Link
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white text-black"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white"
                >
                  <Globe className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* RIGHT form */}
            <div className="p-10 sm:p-12">
              <form className="space-y-10">
                {/* Two-column inputs */}
                <div className="grid gap-10 md:grid-cols-2">
                  <UnderlineField label="First Name" placeholder="|" />
                  <UnderlineField label="Last Name" defaultValue="Doe" />
                </div>

                <div className="grid gap-10 md:grid-cols-2">
                  <UnderlineField label="Email" type="email" />
                  <UnderlineField
                    label="Phone Number"
                    defaultValue="+1 012 3456 789"
                  />
                </div>

                {/* Subject */}
                <div>
                  <div className="text-[14px] font-semibold text-[#111827]">
                    Select Subject?
                  </div>

                  <div className="mt-4 flex items-center gap-10">
                    <label className="flex items-center gap-3 text-[13px] text-[#111827]">
                      <input
                        type="radio"
                        name="subject"
                        defaultChecked
                        className="h-4 w-4 accent-black"
                      />
                      Project demo
                    </label>

                    <label className="flex items-center gap-3 text-[13px] text-[#111827]">
                      <input
                        type="radio"
                        name="subject"
                        className="h-4 w-4 accent-black"
                      />
                      General Inquiry
                    </label>
                  </div>
                </div>

                {/* Message */}
                <label className="block">
                  <div className="text-[12px] font-medium text-[#6b7280]">
                    Message
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Write your message.."
                    className="mt-2 w-full resize-none border-0 border-b border-black/25 bg-transparent px-0 pb-2 text-[14px] text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#5b2fe8]"
                  />
                </label>

                {/* Submit */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="inline-flex h-[44px] items-center justify-center rounded-md px-10 text-[15px] font-semibold text-white shadow-[0_14px_26px_rgba(91,47,232,0.22)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
                    style={{ backgroundColor: PURPLE }}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </GlowSection>
  );
}
