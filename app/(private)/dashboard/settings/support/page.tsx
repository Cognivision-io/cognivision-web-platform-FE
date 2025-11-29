import { LifeBuoy, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

const SupportPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[32px] font-semibold text-[#141b2d]">Support</h1>
        <p className="mt-1 text-base text-[#6c7394]">Need help? Reach out to our team and track responses here.</p>
      </div>
      <div className="rounded-2xl border border-[#e0e5ff] bg-white px-6 py-7 shadow-[0_24px_50px_rgba(41,53,108,0.07)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f1f5ff]">
              <LifeBuoy className="h-5 w-5 text-[#6580ff]" />
            </div>
            <div>
              <p className="text-base font-semibold text-[#1b2559]">We&apos;re here for you</p>
              <p className="text-sm text-[#6c7394]">
                Drop us a line anytime at{" "}
                <span className="font-semibold text-[#4d63d5]">support@visionkit.ai</span>
              </p>
            </div>
          </div>
          <Button
            type="button"
            className="h-11 rounded-xl bg-[#4d63d5] px-5 text-sm font-semibold text-white shadow-[0_20px_30px_rgba(77,99,213,0.35)] hover:bg-[#4357c7]"
          >
            Contact support
          </Button>
        </div>
      </div>
      <div className="rounded-2xl border border-[#e8ebff] bg-white px-5 py-5 shadow-[0_20px_40px_rgba(41,53,108,0.05)]">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5f8ff]">
            <ShieldCheck className="h-5 w-5 text-[#5e73d8]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1b2559]">Status</p>
            <p className="text-sm text-[#6c7394]">All systems are operational</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
