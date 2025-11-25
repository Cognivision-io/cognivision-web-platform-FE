import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MissionSection from "@/components/sections/about/MissionSection";
import VisionSection from "@/components/sections/about/VisionSection";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f7fe]">
      <Header />
      <MissionSection />
      <VisionSection />
      <Footer />
    </div>
  );
};

export default AboutUsPage;
