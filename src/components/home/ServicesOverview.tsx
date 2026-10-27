"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ServiceItem } from "@/types";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

interface ServicesOverviewProps {
  services: ServiceItem[];
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ services }) => {
  const activeServices = services.filter((s) => s.active);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate current slide index based on scroll position
    const cardWidth = sliderRef.current.firstElementChild
      ? (sliderRef.current.firstElementChild as HTMLElement).offsetWidth + 16
      : 320;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(0, index), activeServices.length - 1));
  }, [activeServices.length]);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  const scrollPrev = () => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.firstElementChild
      ? (sliderRef.current.firstElementChild as HTMLElement).offsetWidth + 20
      : 320;
    sliderRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
  };

  const scrollNext = () => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.firstElementChild
      ? (sliderRef.current.firstElementChild as HTMLElement).offsetWidth + 20
      : 320;
    sliderRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
  };

  const scrollToIndex = (index: number) => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.firstElementChild
      ? (sliderRef.current.firstElementChild as HTMLElement).offsetWidth + 20
      : 320;
    sliderRef.current.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  };

  return (
    <section className="py-20 sm:py-32 bg-ivory text-charcoal border-t border-stone-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-3 mb-3">
              <span className="w-8 h-[1px] bg-olive" />
              <span className="text-xs uppercase tracking-[0.25em] text-olive font-medium">
                Capabilities
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-tight">
              Design Services Tailored to How You Live
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-stone font-light leading-relaxed">
              From initial spatial reconfigurations to tactile finishes and custom joinery, we guide your project through disciplined creative direction.
            </p>
          </div>

          {/* Navigation Arrows & Counter */}
          <div className="mt-6 md:mt-0 flex items-center justify-between md:justify-end space-x-4">
            <div className="text-xs uppercase tracking-luxury text-muted-stone font-mono">
              <span className="text-charcoal font-semibold">
                {(activeIndex + 1).toString().padStart(2, "0")}
              </span>
              <span className="mx-1 text-stone-border">/</span>
              <span>{activeServices.length.toString().padStart(2, "0")}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canScrollLeft}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-stone-border flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-white hover:border-charcoal disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-charcoal transition-all duration-300"
                aria-label="Previous capability"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                disabled={!canScrollRight}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-stone-border flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-white hover:border-charcoal disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-charcoal transition-all duration-300"
                aria-label="Next capability"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Side-by-Side Horizontal Slider */}
        <div
          ref={sliderRef}
          onScroll={checkScroll}
          className="flex items-stretch overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-6 pt-2 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {activeServices.map((service, index) => (
            <div
              key={service.id}
              className="w-[84vw] sm:w-[340px] md:w-[380px] shrink-0 snap-start bg-[#FAF8F5] border border-stone-border hover:border-olive/60 p-7 sm:p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:shadow-md group relative"
            >
              <div>
                {/* Top Row: Index & Category Pill */}
                <div className="flex items-center justify-between text-xs uppercase tracking-luxury text-muted-stone font-mono mb-5 sm:mb-6">
                  <span>{(index + 1).toString().padStart(2, "0")}</span>
                  <span className="text-[10px] tracking-widest uppercase text-olive font-sans bg-olive/10 px-2.5 py-0.5 rounded-full font-medium">
                    Capability
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-charcoal group-hover:text-olive transition-colors leading-snug mb-3.5">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-stone font-light leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>

              {/* Bottom Action Row */}
              <div className="mt-8 pt-5 border-t border-stone-border/70 flex items-center justify-between">
                <Link
                  href="/services"
                  className="text-xs uppercase tracking-luxury font-medium text-charcoal group-hover:text-olive transition-colors inline-flex items-center space-x-1.5"
                >
                  <span>Explore Scope</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <Link
                  href="/services"
                  className="w-10 h-10 rounded-full border border-stone-border flex items-center justify-center text-charcoal group-hover:bg-charcoal group-hover:text-white group-hover:border-charcoal transition-all shadow-xs"
                  aria-label={`Learn more about ${service.title}`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Indicator Dots */}
        <div className="flex items-center justify-center space-x-2 mt-4 sm:mt-6">
          {activeServices.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                activeIndex === i ? "w-8 bg-olive" : "w-2 bg-stone-border hover:bg-muted-stone"
              }`}
              aria-label={`Go to capability ${i + 1}`}
            />
          ))}
        </div>

        {/* Tailored Scope Prompt */}
        <div className="mt-14 pt-8 border-t border-stone-border flex flex-col sm:flex-row items-center justify-between text-sm text-muted-stone">
          <span>Need a customized combination of services?</span>
          <Link
            href="/contact"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 text-xs uppercase tracking-luxury font-medium text-charcoal hover:text-olive border-b border-charcoal hover:border-olive pb-0.5 transition-colors"
          >
            <span>Request a Tailored Design Scope</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
