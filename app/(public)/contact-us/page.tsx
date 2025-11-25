import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConnectWithTeamSection from "@/components/sections/contact/ConnectWithTeamSection";
import ContactSection from "@/components/sections/contact/ContactSection";

const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-[#f4f7fe] text-[#0f172a]">
      <Header />
      <ConnectWithTeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default ContactUsPage;
