import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import TableArSolutionsPageSectionHero from "@/components/sections/solutions/tablear/TableArSolutionsPageSectionHero";
import TableArSolutionsPageSectionProblems from "@/components/sections/solutions/tablear/TableArSolutionsPageSectionProblems";
import TableArSolutionsPageSectionSolutionIntegration from "@/components/sections/solutions/tablear/TableArSolutionsPageSectionSolutionIntegration";
import { FC } from "react";

const TableArPage: FC = () => {
  return (
    <div>
      <Header />
      <TableArSolutionsPageSectionHero />
      <TableArSolutionsPageSectionProblems />
      <TableArSolutionsPageSectionSolutionIntegration />
      <Footer />
    </div>
  );
};

export default TableArPage;
