"use client";

/* eslint-disable @next/next/no-img-element */

import React from "react";

type CarouselItem = {
  title: string;
  image: string;
};

const carouselItems: CarouselItem[] = [
  { title: "Smart Retail", image: "/landing-carousel/Carousel1.png" },
  { title: "Connected Stadiums", image: "/landing-carousel/Carousel2.png" },
  { title: "Precision Farming", image: "/landing-carousel/Carousel3.png" },
  { title: "Surgical Guidance", image: "/landing-carousel/Carousel4.png" },
  { title: "Autonomous Logistics", image: "/landing-carousel/Carousel5.png" },
  { title: "Energy Grid Monitoring", image: "/landing-carousel/Carousel6.png" },
  { title: "AR Navigation", image: "/landing-carousel/Carousel7.png" },
  { title: "Robotics QA", image: "/landing-carousel/Carousel8.png" },
  { title: "Asset Inspections", image: "/landing-carousel/Carousel9.png" },
  { title: "Mobility Analytics", image: "/landing-carousel/Carousel10.png" },
  { title: "Public Safety", image: "/landing-carousel/Carousel11.png" },
  { title: "Advanced Training", image: "/landing-carousel/Carousel12.png" },
];

type CarouselRowProps = {
  items: CarouselItem[];
  reverse?: boolean;
  duration?: number;
};

const CarouselCard = ({ image, title }: CarouselItem) => (
  <article
    className="
      group relative h-[200px] w-[240px]
      overflow-hidden rounded-xl
      sm:h-[210px] sm:w-[280px]
      md:h-[220px] md:w-[320px]
      lg:w-[360px]
    "
  >
    <img
      src={image}
      alt={title}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
    />
    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-10">
      <p className="text-[15px] font-medium text-white">{title}</p>
    </div>
  </article>
);

const CarouselRow = ({
  items,
  reverse = false,
  duration = 45,
}: CarouselRowProps) => (
  <div className="flex overflow-hidden py-3 sm:py-4">
    <div
      className={`carousel-track flex min-w-max shrink-0 gap-4 sm:gap-6 ${
        reverse ? "carousel-track--reverse" : ""
      }`}
      // Use CSS variable to control animation duration
      style={{ ["--duration" as string]: `${duration}s` }}
    >
      {[...items, ...items].map((item, index) => (
        <CarouselCard key={`${item.title}-${index}`} {...item} />
      ))}
    </div>
  </div>
);

const UpcomingUseCasesSection = () => {
  const rows = [carouselItems.slice(0, 6), carouselItems.slice(6)];

  return (
    <section className="bg-[#F4F7FE] py-20 md:py-24 overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-6xl">
          <h2 className="text-[32px] font-extrabold leading-tight text-black sm:text-[36px]">
            Upcoming use cases
          </h2>
          <p className="mt-6 text-[15px] leading-[1.9] text-[#111827]">
            Bring real-world intelligence to any industry with powerful vision
            and AR capabilities detect, measure, and understand everything in
            real time. From sports to healthcare to retail, our SDK adapts to
            every environment turning visual data into instant, actionable
            insights.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <div className="w-screen overflow-hidden">
          <div className="space-y-6 sm:space-y-8">
            <CarouselRow items={rows[0]} duration={42} />
            <CarouselRow items={rows[1]} reverse duration={48} />
          </div>
        </div>
      </div>

      {/* Make styles global so .carousel-track is always matched */}
      <style jsx global>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .carousel-track {
          animation: scroll-left var(--duration, 45s) linear infinite;
        }

        .carousel-track--reverse {
          animation-name: scroll-right;
        }
      `}</style>
    </section>
  );
};

export default UpcomingUseCasesSection;
