"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";

const useCases = [
  {
    title: "Retail",
    image: "/usecases/retail.jpg",
  },
  {
    title: "Automotive",
    image: "/usecases/automotive.jpg",
  },
  {
    title: "Aerospace & Defense",
    image: "/usecases/aerospace-defense.jpg",
  },
  {
    title: "Government",
    image: "/usecases/government.jpg",
  },
  {
    title: "Manufacturing",
    image: "/usecases/manufacturing.jpg",
  },
  {
    title: "Telecommunications",
    image: "/usecases/telecommunications.jpg",
  },
  {
    title: "Healthcare",
    image: "/usecases/healthcare.jpg",
  },
  {
    title: "Utilities",
    image: "/usecases/utilities.jpg",
  },
  // You can add more use cases here if you want a longer slider
];

const UpcomingUseCasesSection = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll horizontally every 5 seconds
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let direction: 1 | -1 = 1;

    const interval = setInterval(() => {
      if (!container) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      const pageWidth = container.clientWidth; // scroll by one “page”

      const nextLeft =
        direction === 1
          ? Math.min(container.scrollLeft + pageWidth, maxScroll)
          : Math.max(container.scrollLeft - pageWidth, 0);

      container.scrollTo({
        left: nextLeft,
        behavior: "smooth",
      });

      // Flip direction at edges
      if (nextLeft >= maxScroll - 2) {
        direction = -1;
      } else if (nextLeft <= 2) {
        direction = 1;
      }
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#f5f7fb] py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Heading + copy */}
        <div className="max-w-3xl">
          <h2 className="text-[32px] font-extrabold leading-tight text-black sm:text-[36px]">
            Upcoming use cases
          </h2>
          <p className="mt-6 text-[15px] leading-[1.9] text-[#111827]">
            Bring real-world intelligence to any industry with powerful vision
            and AR capabilities detect, measure, and understand everything in
            real time.
          </p>
          <p className="mt-2 text-[15px] leading-[1.9] text-[#111827]">
            From sports to healthcare to retail, our SDK adapts to every
            environment&nbsp;turning visual data into instant, actionable
            insights.
          </p>
        </div>

        {/* Cards slider */}
        <div
          ref={scrollRef}
          className="mt-12 overflow-x-hidden pb-2 min-w-screen"
        >
          <div className="grid grid-flow-col auto-cols-[280px] grid-rows-2 gap-6">
            {useCases.map((item) => (
              <article
                key={item.title}
                className="group relative h-[190px] overflow-hidden rounded-2xl bg-[#111827] shadow-[0_20px_45px_rgba(15,23,42,0.45)]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {/* Dark gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Title */}
                <div className="absolute inset-x-0 bottom-0 px-5 pb-4 pt-10">
                  <p className="text-[15px] font-medium text-white">
                    {item.title}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingUseCasesSection;
