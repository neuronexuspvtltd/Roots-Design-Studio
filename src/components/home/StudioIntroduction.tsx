"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SiteSettings } from "@/types";

interface StudioIntroductionProps {
  settings?: SiteSettings | null;
}

export const StudioIntroduction: React.FC<StudioIntroductionProps> = ({ settings }) => {
  const headline = settings?.introHeadline || "Design with Purpose. Live with Feeling.";
  const bodyCopy =
    settings?.introCopy ||
    "At Roots Design Studio, we believe a thoughtfully designed space should feel as natural as it looks beautiful. We bring together considered layouts, tactile materials, and timeless details to create interiors that reflect the people who inhabit them.";
  const introImage =
    settings?.introImage || "/images/hero/studio-intro.jpg";

  return (
    <section id="introduction" className="py-16 sm:py-32 bg-ivory text-charcoal">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-8">
            <div className="inline-flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-olive" />
              <span className="text-xs uppercase tracking-[0.25em] text-olive font-medium">
                Studio Philosophy
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light leading-[1.12] text-balance text-charcoal">
              {headline}
            </h2>

            <div className="space-y-4 sm:space-y-6 text-sm sm:text-lg text-muted-stone font-light leading-relaxed max-w-xl">
              <p>{bodyCopy}</p>
              <p className="hidden sm:block text-sm sm:text-base text-muted-dark">
                Every project begins not with blueprints, but with quiet listening. We curate spaces that respond to your morning routines, evening rituals, and the innate desire for tactile sanctuary.
              </p>
            </div>

            <div className="pt-2 sm:pt-4 flex items-center space-x-6 sm:space-x-8">
              <Link
                href="/about"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-luxury text-charcoal font-semibold border-b border-charcoal pb-1 hover:text-olive hover:border-olive transition-colors group"
              >
                <span>Read Studio Story</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <div className="hidden sm:flex items-center space-x-4 text-xs tracking-luxury uppercase text-muted-stone font-light">
                <span>Natural Materials</span>
                <span>•</span>
                <span>Bespoke Proportion</span>
              </div>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-beige">
              <Image
                src={introImage}
                alt="Tactile natural materials and warm architectural space"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                quality={90}
                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>

            {/* Floating Architectural Annotation */}
            <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-beige/90 backdrop-blur-md border border-stone-border p-6 max-w-xs shadow-lg hidden sm:block">
              <p className="font-serif text-lg italic text-charcoal font-light">
                &ldquo;A space should feel as natural as it looks beautiful.&rdquo;
              </p>
              <span className="block mt-2 text-[10px] uppercase tracking-luxury text-muted-stone font-medium">
                Roots Design Studio
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioIntroduction;
