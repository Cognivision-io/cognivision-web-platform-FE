// src/components/Footer.tsx
"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Left: Logo + contact */}
          <div className="w-full space-y-6 md:w-[32%]">
            <div className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="CogniVision.io"
                className="h-10 w-auto drop-shadow-sm"
              />
            </div>

            <div className="w-full space-y-4">
              <h3 className="font-heading text-[16px] font-semibold text-[#D9D9D9]">
                Start Now
              </h3>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-2 flex w-full max-w-xl flex-col sm:flex-row md:max-w-3xl"
              >
                <input
                  type="email"
                  placeholder="What's your work email?"
                  className="h-10 flex-1 rounded-md border border-transparent bg-[#f5f5ff] px-3 text-[13px] text-[#111827] outline-none placeholder:text-[#6b7280] sm:rounded-r-none"
                />
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#5628e0] px-5 text-[13px] font-medium shadow-[0_10px_25px_rgba(86,40,224,0.5)] sm:rounded-l-none"
                >
                  <span>Get a demo</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>

          {/* Right: link columns */}
          <div className="flex w-full justify-start gap-16 text-[13px] text-[#f9fafb] md:ml-auto md:w-auto md:justify-end">
            <div className="space-y-3">
              <p className="text-[13px] font-heading font-semibold tracking-[0.18em] text-[#9ca3af]">
                WHY COGNIVISION
              </p>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/wgts" className="hover:text-white">
                    Use Cases
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-[13px] font-heading font-semibold tracking-[0.18em] text-[#9ca3af]">
                GET STARTED
              </p>
              <ul className="space-y-2">
                <li>
                  <Link href="/#pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/#docs" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
