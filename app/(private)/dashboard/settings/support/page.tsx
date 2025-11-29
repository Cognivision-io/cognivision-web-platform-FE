import { Gavel } from "lucide-react";

const SupportPage = () => {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-[28px] font-semibold leading-tight text-[#111827]">
          Support
        </h1>
        <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-[#7f8590]">
          API keys are revokable credentials used to integrate the API into your
          application. Use your keys to perform inference on your models and
          upload images directly to your project from outside sources.
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-6">
        {/* Read the documentation */}
        <div className="flex items-center gap-6 rounded-lg border border-[#e6e9f2] bg-white px-6 py-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
          <div className="grid h-14 w-14 place-items-center rounded-lg bg-[#f0f0fe]">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-[#4845f5]">
              <span className="text-[14px] font-bold leading-none text-white">
                i
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[14px] font-semibold text-[#212133]">
              Read the documentation
            </p>
            <p className="text-[12.5px] text-[#6b6f8d]">
              Discover the concepts, reference, guides and tutorials.
            </p>
          </div>
        </div>

        {/* Submit a support ticket */}
        <div className="flex items-center gap-6 rounded-lg border border-[#e6e9f2] bg-white px-6 py-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
          <div className="grid h-14 w-14 place-items-center rounded-lg bg-[#fcf3cc]">
            <Gavel className="h-6 w-6 text-[#c8842a]" />
          </div>

          <div className="space-y-1">
            <p className="text-[14px] font-semibold text-[#212133]">
              Submit a support ticket
            </p>
            <p className="text-[12.5px] text-[#6b6f8d]">
              submit a support ticket
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
