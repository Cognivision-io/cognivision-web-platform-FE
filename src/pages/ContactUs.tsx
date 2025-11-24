import ConnectWithTeamSection from "@/components/ConnectWithTeamSection";
import ContactSection from "@/components/ContactUsSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import UpcomingUseCasesSection from "@/components/UseCasesLandingGridSection";
import UseCasesSection from "@/components/UseCasesSection";
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

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-[#f4f7fe] text-[#0f172a]">
      <Header />
      <ConnectWithTeamSection />
      <Footer />
    </div>
  );
};

export default ContactUs;
