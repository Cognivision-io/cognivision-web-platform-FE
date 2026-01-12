import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LandingPageSectionOne from "@/components/sections/landing/LandingPageSectionOne";
import LandingPageSectionAbout from "@/components/sections/landing/LandingPageSectionAbout";
import LandingPageSectionVisionSDK from "@/components/sections/landing/LandingPageSectionVisionSdk";
import LandingPageSectionSolutions from "@/components/sections/landing/LandingPageSolutionSection";
import LandingPageSectionUpcomingUseCases from "@/components/sections/landing/LandingPageSectionUpcomingUseCases";
import LandingPageSectionContact from "@/components/sections/landing/LandingPageSectionContactUs";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <LandingPageSectionOne />
      <LandingPageSectionAbout />
      <LandingPageSectionVisionSDK />
      <LandingPageSectionSolutions />
      <LandingPageSectionUpcomingUseCases />
      <LandingPageSectionContact />
      <Footer />
    </div>
  );
};

export default LandingPage;
