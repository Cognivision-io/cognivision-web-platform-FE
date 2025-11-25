/* eslint-disable @next/next/no-img-element */

const MissionSection = () => {
  return (
    <section className="bg-[#f5f7fe] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        {/* Eyebrow label */}
        <p className="text-[11px] tracking-[0.18em] text-[#6b7280]">
          OUR MISSION
        </p>

        {/* Main heading */}
        <h2 className="mt-5 text-[26px] font-extrabold leading-tight tracking-tight text-black sm:text-[32px] md:text-[38px] lg:text-[44px]">
          Empowering computer vision experiences
          <br className="hidden sm:block" />
          <span className="block sm:inline"> with our sdk that connect </span>
          <span className="bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent">
            anyone, anytime and anywhere.
          </span>
        </h2>

        {/* Video / demo block */}
        <div className="mt-10 w-full max-w-3xl rounded-[18px] bg-black shadow-[0_26px_76px_rgba(15,23,42,0.7)] sm:mt-14">
          {/* Aspect ratio wrapper for responsiveness */}
          <div className="relative w-full overflow-hidden rounded-[18px] bg-black pb-[56.25%]">
            {/* Replace src with your real video thumbnail / embed */}
            <img
              src="/Background.png"
              alt="Cognivision SDK demo for developers"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
