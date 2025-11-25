/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import {
  AppWindow,
  ArrowUpRight,
  Box,
  CheckSquare,
  ChevronDown,
  Cpu,
  Scan,
  Shield,
  Zap,
} from "lucide-react";

import ContactSection from "@/components/sections/contact/ContactSection";
import ConnectWithTeamSection from "@/components/sections/contact/ConnectWithTeamSection";
import Footer from "@/components/layout/Footer";
import UpcomingUseCasesSection from "@/components/sections/landing/UpcomingUseCasesSection";
import UseCasesSection from "@/components/sections/landing/UseCasesSection";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#f4f7fe] text-[#0f172a]">
      <div className="relative overflow-hidden pb-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-linear-to-b from-[#4c23d7] via-[#5129de] to-[#5b30e6]" />
        <img
          src="/HeroGreyWaves.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-[230px] w-full select-none"
        />

        <div className="relative mx-auto max-w-6xl px-6 pt-8">
          <header className="flex items-center justify-between gap-4">
            <img
              src="/logo.svg"
              alt="CogniVision.io"
              className="h-10 w-auto drop-shadow-sm"
            />

            <nav className="hidden items-center gap-8 text-sm font-semibold text-white md:flex">
              <a
                className="flex items-center gap-2 transition-opacity hover:opacity-90"
                href="#use-cases"
              >
                <span>Use Cases</span>
                <ChevronDown size={16} />
              </a>
              <a
                className="transition-opacity hover:opacity-90"
                href="#pricing"
              >
                Pricing
              </a>
              <a className="transition-opacity hover:opacity-90" href="#docs">
                Docs
              </a>
              <a
                className="transition-opacity hover:opacity-90"
                href="#contact"
              >
                Contact
              </a>
            </nav>

            <Link
              href="/register"
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#171717] shadow-[0_10px_25px_rgba(0,0,0,0.16)] transition duration-150 hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </header>
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 pb-12 pt-10 md:flex-row md:items-center md:pb-20 lg:gap-16 lg:pt-16">
          <div className="flex w-full justify-center md:w-5/12">
            <div className="relative w-full max-w-[360px]">
              <div className="absolute inset-0 rounded-[36px] bg-linear-to-b from-white/35 via-white/10 to-transparent blur-3xl" />
              <img
                src="/MobileLogo.svg"
                alt="CogniVision mobile preview"
                className="relative z-10 w-full drop-shadow-[0_28px_60px_rgba(24,18,48,0.35)]"
              />
            </div>
          </div>

          <div className="w-full text-center md:flex md:w-7/12 md:flex-col md:justify-center md:text-left">
            <h1 className="text-[36px] font-extrabold leading-[1.05] text-black sm:text-[42px] md:text-[48px] lg:text-[52px]">
              Bring Real-World Intelligence to Your App
            </h1>
            <p className="mt-5 text-lg leading-[1.7] text-[#323a4b] sm:text-xl">
              Cognivision is a unified AR + AI vision SDK that lets developers
              add spatial understanding, object detection, and real-time
              measurements to hybrid apps — with just a few lines of code.
            </p>
            <Link
              href="/register"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#5b25e5] to-[#6d37ff] px-7 py-3 text-base font-semibold text-white shadow-[0_16px_38px_rgba(68,43,199,0.35)] transition duration-150 hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <section className="bg-[#f4f7fe] px-6 pb-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-[30px] font-extrabold text-black sm:text-[32px]">
            About Cognivision
          </h2>
          <p className="mt-4 text-lg leading-[1.75] text-[#1f2937] sm:text-xl">
            Cognivision is a hybrid AR + AI SDK that lets developers bring
            spatially aware, real-time vision to apps across iOS, Android, and
            web. Track objects, map environments, and overlay AR insights —
            fast, precise, and without complex native coding.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-12 md:grid-cols-3 md:gap-10 lg:mt-16">
          {[
            {
              icon: <Scan size={26} className="text-[#5b25e5]" />,
              title: "Hybrid-Ready AR For Developers",
              body: "Build on iOS, Android, or web without writing ARKit/ARCore code.",
            },
            {
              icon: <Shield size={26} className="text-[#5b25e5]" />,
              title: "Real-Time AI Vision",
              body: "Object detection, pose tracking, and spatial analysis at the edge.",
            },
            {
              icon: <Zap size={26} className="text-[#5b25e5]" />,
              title: "Cross-Industry Applications",
              body: "From sports and healthcare to retail and industrial solutions.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-start justify-start gap-4 md:items-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#d8dded] bg-white shadow-[0_10px_30px_rgba(11,0,81,0.08)]">
                {feature.icon}
              </div>
              <div className="space-y-3 text-left md:text-center">
                <h3 className="text-[21px] font-semibold leading-snug text-black">
                  {feature.title}
                </h3>
                <p className="text-[15px] leading-7 text-[#212530]/90">
                  {feature.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center lg:mt-14">
          <Link
            href="/register"
            className="inline-flex items-center gap-3 rounded-full border-2 border-[#5b25e5] px-6 py-3 text-base font-semibold text-[#2b2358] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(76,35,215,0.18)]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dedaf8] text-[#5b25e5]">
              <ArrowUpRight size={18} strokeWidth={2.4} />
            </span>
            Explore More
          </Link>
        </div>
      </section>

      <section className="bg-[#f6f7fb] px-6 py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-4xl text-[32px] font-extrabold leading-tight text-black sm:text-[36px] lg:text-[40px]">
            Hybrid Apps Get Real AR Intelligence — Powered By One Unified Vision
            SDK.
          </h2>

          <div className="mt-16 flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-24">
            <div className="max-w-xl lg:w-[40%]">
              <h3 className="text-[32px] font-semibold leading-tight text-black">
                What problem are we solving?
              </h3>
              <p className="mt-6 text-[16px] leading-[1.85] text-[#171c26]">
                Cognivision is a plug-and-play computer vision SDK built for
                Flutter and React Native developers who want to integrate AR
                capabilities without rewriting native code.
                <br />
                It combines machine learning, AR spatial mapping, and 3D
                understanding into one lightweight toolkit — optimized for
                real-time performance on mobile.
              </p>
            </div>

            <div className="flex-1 space-y-10">
              {[
                {
                  title: "Hybrid-Ready AR",
                  body: "One SDK for Flutter & React Native — no need for native ARKit/ARCore coding.",
                  color: "#a88bff",
                  icon: <AppWindow size={22} strokeWidth={2.2} color="black" />,
                },
                {
                  title: "AI Vision + ML Inference",
                  body: "Real-time object detection, pose tracking, spatial analysis, and more.",
                  color: "#ffbe32",
                  icon: <Cpu size={22} strokeWidth={2.2} color="black" />,
                },
                {
                  title: "3D Spatial Mapping",
                  body: "Understand surfaces, depth, and real-world geometry for precise AR overlays.",
                  color: "#39c56b",
                  icon: <Box size={22} strokeWidth={2.2} color="black" />,
                },
                {
                  title: "Cross-Platform Performance",
                  body: "Runs seamlessly on iOS, Android, and web with optimized edge + cloud inference.",
                  color: "#f5933c",
                  icon: (
                    <CheckSquare size={22} strokeWidth={2.2} color="black" />
                  ),
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 sm:gap-5"
                >
                  <div
                    className="mt-1 flex h-14 w-14 items-center justify-center rounded-[18px] shadow-[0_16px_40px_rgba(9,3,75,0.14)]"
                    style={{ backgroundColor: item.color }}
                  >
                    <span className="text-white">{item.icon}</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[17px] font-semibold text-[#0f172a]">
                      {item.title}
                    </h4>
                    <p className="text-[15px] leading-7 text-[#1f2937]">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <UseCasesSection />
      <UpcomingUseCasesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
