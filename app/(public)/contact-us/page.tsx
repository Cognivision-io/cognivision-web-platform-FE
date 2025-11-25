import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConnectWithTeamSection from "@/components/sections/contact/ConnectWithTeamSection";

const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-[#f4f7fe] text-[#0f172a]">
      <Header />
      <ConnectWithTeamSection />
      <Footer />
    </div>
  );
};

export default ContactUsPage;
