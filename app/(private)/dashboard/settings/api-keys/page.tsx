import { KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";

const ApiKeysPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[32px] font-semibold text-[#141b2d]">API Keys</h1>
        <p className="mt-1 text-base text-[#6c7394]">
          Securely manage keys for programmatic access to your VisionKit workspace.
        </p>
      </div>
      <div className="rounded-2xl border border-[#e0e5ff] bg-white px-6 py-7 shadow-[0_24px_50px_rgba(41,53,108,0.07)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edefff] text-primary">
              <KeyRound className="h-5 w-5 text-[#6a6ce0]" />
            </div>
            <div>
              <p className="text-base font-semibold text-[#1b2559]">Key management is coming soon</p>
              <p className="text-sm text-[#6c7394]">We&apos;ll notify you as soon as you can mint and revoke keys.</p>
            </div>
          </div>
          <Button
            type="button"
            variant="secondary"
            className="h-11 rounded-xl bg-[#eef0ff] px-5 text-sm font-semibold text-[#6a6ce0] hover:bg-[#e0e3ff]"
            disabled
          >
            Generate key
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeysPage;
