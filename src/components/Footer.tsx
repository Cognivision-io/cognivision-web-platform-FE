// src/components/Footer.tsx
import React from "react";
import { ArrowRight } from "lucide-react";

const Footer: React.FC = () => {
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

            <div className="space-y-3 text-[13px] leading-relaxed text-[#e5e7eb]">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#9ca3af]">
                CONTACT
              </p>
              <p className="text-[13px] text-[#f9fafb]">+1 408 879 5885</p>
              <button
                type="button"
                className="border-b border-white/80 text-left text-[13px] font-medium text-white"
              >
                Contact Us
              </button>
              <p className="max-w-xs text-[13px] text-[#e5e7eb]">
                2804 Mission College Blvd.
                <br />
                Santa Clara, CA, USA 95054
              </p>
            </div>
          </div>

          {/* Middle: Start Now / email capture */}
          <div className="w-full space-y-4 md:w-[36%]">
            <h3 className="text-[16px] font-semibold text-white">Start Now</h3>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-2 flex max-w-md flex-col gap-3 sm:flex-row"
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

          {/* Right: link columns */}
          <div className="flex w-full gap-16 text-[13px] text-[#f9fafb] md:w-[26%]">
            <div className="space-y-3">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#9ca3af]">
                WHY VISIONKIT
              </p>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Advantages
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Solutions
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#9ca3af]">
                GET STARTED
              </p>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Login
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support Plans
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Get Started
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
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
