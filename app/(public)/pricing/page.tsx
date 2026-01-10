import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import FaqSection from "@/components/sections/pricing/FAQSection";
import { PricingSection } from "@/components/sections/pricing/PricingSection";

export default function PricingPage() {
  return (
    <main>
      <Header />
      <PricingSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
