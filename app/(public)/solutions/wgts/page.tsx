import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import WgtsSolutionsPageSection from "@/components/sections/solutions/wgts/WgtsSolutionsPageSection";
import WgtsSolutionsPageSectionResources from "@/components/sections/solutions/wgts/WgtsSolutionsPageSectionResources";
import WgtsSolutionsPageSectionProblems from "@/components/sections/solutions/wgts/WgtsSolutionsPageSectionProblems";
import WgtsSolutionsPageSectionSolutionIntegration from "@/components/sections/solutions/wgts/WgtsSolutionsPageSectionSolutionIntegration";

import type { FC } from "react";

const WgtsPage: FC = () => {
  return (
    <div>
      <Header />
      <WgtsSolutionsPageSection />
      <WgtsSolutionsPageSectionProblems />
      <WgtsSolutionsPageSectionSolutionIntegration />
      <WgtsSolutionsPageSectionResources />
      <Footer />
    </div>
  );
};

export default WgtsPage;
