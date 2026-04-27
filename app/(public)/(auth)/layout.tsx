import type { ReactNode } from "react";
import Link from "next/link";

const steps = [
  {
    n: "1",
    title: "Describe your AR feature",
    sub: "Type a prompt inside VS Code",
  },
  {
    n: "2",
    title: "AI generates everything",
    sub: "ARKit module, RN bridge & UI components",
  },
  {
    n: "3",
    title: "Run on a real iPhone",
    sub: "Working AR — not snippets or examples",
  },
];

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      {/* Left — purple marketing panel */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-1/2 flex-col">
        <div className="relative flex w-full flex-1 flex-col overflow-hidden bg-[#5925dc] px-12 py-10 text-white">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-60 w-60 rounded-full bg-white/[0.04]" />

          {/* Logo */}
          <Link
            href="https://cognivision.io/"
            className="relative z-10 flex items-center gap-3 shrink-0"
          >
            <div className="flex h-9 w-9 items-center justify-center ">
              <img src="/logo.svg" alt="" className="h-full w-full  " />
            </div>
            <span className="text-[20px] font-semibold tracking-[-0.02em]">
              Cognivision
            </span>
          </Link>

          {/* Main content — centered vertically */}
          <div className="relative z-10 flex flex-1 flex-col justify-center gap-5 py-10">
            {/* VS Code badge */}
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/[0.18] bg-white/[0.12] px-4 py-[7px]">
              <span className="h-[7px] w-[7px] rounded-sm bg-[#a8f0c6]" />
              <span className="text-[13.5px] font-medium text-white/85">
                VS Code Extension
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-[32px] font-bold leading-[1.28] tracking-[-0.02em]">
              AR features in React
              <br />
              Native, <span className="text-white/50">from a prompt.</span>
            </h2>

            {/* Description */}
            <p className="text-[15.5px] leading-[1.8] text-white/60">
              No Swift. No native bridging. Just describe what
              <br />
              you want — Cognivision generates working AR
              <br />
              code that runs on a real iPhone in minutes.
            </p>

            {/* Numbered steps */}
            <div className="mt-4 flex flex-col">
              {steps.map((step, i) => (
                <div key={step.n} className="relative flex items-start gap-4">
                  {/* Vertical connector (not on last step) */}
                  {i < steps.length - 1 && (
                    <div className="absolute left-4 top-9 h-12 w-px bg-white/15" />
                  )}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.12] text-sm font-semibold">
                    {step.n}
                  </div>
                  <div
                    className={`flex flex-col gap-1 ${i < steps.length - 1 ? "pb-10" : ""}`}
                  >
                    <span className="text-[15px] font-medium">
                      {step.title}
                    </span>
                    <span className="text-[13.5px] text-white/48">
                      {step.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right — form content */}
      <div className="flex w-full min-h-screen flex-col lg:w-[55%] xl:w-1/2">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
