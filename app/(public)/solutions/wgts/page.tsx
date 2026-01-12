import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import SolutionsPageSectionProblem from "@/components/sections/solutions/SolutionsPageSectionProblems";
import SolutionsPageSectionResources from "@/components/sections/solutions/SolutionsPageSectionResources";
import SolutionsPageSectionSolutionIntegration from "@/components/sections/solutions/SolutionsPageSectionSolutionIntegration";
import SolutionsPageSectionWGTS from "@/components/sections/solutions/SolutionsPageSectionWGTS";
import type { FC } from "react";

const WgtsPage: FC = () => {
  return (
    <div>
      <Header />
      <SolutionsPageSectionWGTS />
      <SolutionsPageSectionProblem />
      <SolutionsPageSectionSolutionIntegration />
      <SolutionsPageSectionResources />
      <Footer />
    </div>
  );
};

export default WgtsPage;
