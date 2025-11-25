// src/app/(marketing)/sports-use-case/page.tsx
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ResourcesSection from "@/components/sections/use-case/ResourcesSection";
import SolutionCognivisionSection from "@/components/sections/use-case/SolutionCognivisionSection";
import WgtsHeroSection from "@/components/sections/use-case/WgtsHeroSection";
import WgtsKeyLearningsSection from "@/components/sections/use-case/WgtsKeyLearningSection";
import React from "react";

export default function SportsUseCasePage() {
  return (
    <>
      <Header />
      <WgtsHeroSection />
      <WgtsKeyLearningsSection />
      <SolutionCognivisionSection />
      <ResourcesSection />
      <Footer />
    </>
  );
}
