import { Eye, Link2, Trash2 } from "lucide-react";

const ApiKeysPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-[28px] font-semibold leading-tight text-[#111827]">
          API Keys
        </h1>
        <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-[#4b5563]">
          API keys are revokable credentials used to integrate the API into your
          application. Use your keys to perform inference on your models and
          upload images directly to your project from outside sources.
        </p>
      </div>

      {/* Keys section */}
      <div className="space-y-6">
        {/* Private API Key */}
        <div className="rounded-xl border border-[#e5e7f3] bg-white px-6 py-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
          <div className="space-y-1.5">
            <p className="text-[13px] font-semibold text-[#111827]">
              Private API Key
            </p>
            <p className="text-[12px] text-[#4b5563]">
              For use with our{" "}
              <span className="font-semibold">Platform APIs</span>
            </p>
          </div>

          <div className="mt-4 rounded-md border border-[#e5e7eb] bg-[#f9fafb] px-4 py-2.5">
            <div className="flex items-center gap-3">
              <p className="flex-1 truncate text-[12px] text-[#111827]">
                o0K9kdy2ZLjrw6iCkUT
              </p>
              <div className="flex items-center gap-3 text-[#9ca3af]">
                <button
                  type="button"
                  className="transition-colors hover:text-[#4b5563]"
                  aria-label="Reveal key"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="transition-colors hover:text-[#4b5563]"
                  aria-label="Copy key"
                >
                  <Link2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="transition-colors hover:text-[#ef4444]"
                  aria-label="Delete key"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Publishable API Key */}
        <div className="rounded-xl border border-[#e5e7f3] bg-white px-6 py-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
          <div className="space-y-1.5">
            <p className="text-[13px] font-semibold text-[#111827]">
              Publishable API Key
            </p>
            <p className="text-[12px] text-[#4b5563]">
              For use exclusively with{" "}
              <span className="font-mono text-[11px]">inferencejs</span>, the
              client-side library.
            </p>
          </div>

          <div className="mt-4 rounded-md border border-[#e5e7eb] bg-[#f9fafb] px-4 py-2.5">
            <div className="flex items-center gap-3">
              <p className="flex-1 truncate text-[12px] text-[#111827]">
                rf_wUkEmRMybTRW0GCjjYRQLj4V9aR2
              </p>
              <div className="flex items-center gap-3 text-[#9ca3af]">
                <button
                  type="button"
                  className="transition-colors hover:text-[#4b5563]"
                  aria-label="Copy key"
                >
                  <Link2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeysPage;
