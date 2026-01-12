import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutPageSectionHero from "@/components/sections/about/AboutPageSectionHero";
import AboutPageSectionMission from "@/components/sections/about/AboutPageSectionMission";
import AboutPageSectionVision from "@/components/sections/about/AboutPageSectionVision";

const AboutUsPage = () => {
  return (
    <div>
      <Header />
      <AboutPageSectionHero />
      <AboutPageSectionMission />
      <AboutPageSectionVision />
      <Footer />
    </div>
  );
};

export default AboutUsPage;
