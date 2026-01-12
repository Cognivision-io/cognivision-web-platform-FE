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
import Footer from "@/components/layout/Footer";
import UpcomingUseCasesSection from "@/components/sections/landing/UpcomingUseCasesSection";
import UseCasesSection from "@/components/sections/landing/UseCasesSection";
import Header from "@/components/layout/Header";
import LandingPageSectionOne from "@/components/sections/landing/LandingPageSectionOne";
import LandingPageSectionAbout from "@/components/sections/landing/LandingPageSectionAbout";
import LandingPageSectionVisionSDK from "@/components/sections/landing/LandingPageSectionVisionSdk";
import LandingPageSectionSolutions from "@/components/sections/landing/LandingPageSolutionSection";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <LandingPageSectionOne />
      <LandingPageSectionAbout />
      <LandingPageSectionVisionSDK />
      <LandingPageSectionSolutions />
      <Footer />
    </div>
  );
};

export default LandingPage;
