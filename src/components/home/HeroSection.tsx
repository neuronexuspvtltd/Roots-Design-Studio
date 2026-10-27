"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { SiteSettings } from "@/types";

interface HeroSectionProps {
  settings?: SiteSettings | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings }) => {
  const headline = settings?.heroHeadline || "Spaces That Feel Like Home.";
  const supportingText =
    settings?.heroSupportingText ||
    "Thoughtfully designed interiors that bring together natural materials, timeless aesthetics, and the way you love to live.";
  const heroImage =
    settings?.heroImage || "/images/hero/hero-architectural.jpg";

  return (
    <section className="relative w-full min-h-[100svh] lg:min-h-screen flex items-end pb-12 sm:pb-24 pt-24 sm:pt-32 overflow-hidden bg-charcoal">
      {/* Background Image with Layered Architectural Dimming */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Roots Design Studio Architecture & Interior Space"
          fill
          priority
          sizes="100vw"
          quality={92}
          className="object-cover object-center scale-[1.02] transition-transform duration-1000 ease-out"
        />
        {/* Editorial Gradients for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25" />
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full text-white">
        <div className="max-w-3xl">
          {/* Subtle Studio Label */}
          <div className="inline-flex items-center space-x-2.5 sm:space-x-3 mb-3 sm:mb-6">
            <span className="h-[1px] w-6 sm:w-8 bg-white/70" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-medium text-white/85 whitespace-nowrap">
              Interior Design • Spaces That Inspire
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-[34px] sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.12] sm:leading-[1.05] tracking-[-0.015em] sm:tracking-[-0.02em] text-white text-balance mb-3.5 sm:mb-8">
            {headline}
          </h1>

          {/* Supporting Copy - Refined, balanced proportion for mobile & desktop */}
          <p className="text-[13px] sm:text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-[340px] sm:max-w-2xl mb-6 sm:mb-10 text-balance">
            {supportingText}
          </p>

          {/* Action CTAs - Symmetrical, clean alignment on mobile and desktop */}
          <div className="flex flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center space-x-2 bg-white text-charcoal px-5 sm:px-8 py-3.5 sm:py-4 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-luxury font-medium hover:bg-ivory hover:scale-[1.02] transition-all duration-300 shadow-lg text-center whitespace-nowrap"
            >
              <span className="hidden sm:inline">Explore Our Projects</span>
              <span className="sm:hidden">Explore Works</span>
              <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-charcoal flex-shrink-0" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center space-x-2 border border-white/50 text-white px-5 sm:px-7 py-3.5 sm:py-4 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-luxury font-medium hover:bg-white/10 hover:border-white transition-all duration-300 text-center whitespace-nowrap backdrop-blur-xs"
            >
              <span className="hidden sm:inline">Start Your Project</span>
              <span className="sm:hidden">Start Project</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Natural Material Notes & Scroll Cue (Desktop only) */}
        <div className="hidden sm:flex mt-8 sm:mt-24 pt-4 sm:pt-8 border-t border-white/20 items-center justify-between text-xs text-white/70 tracking-luxury uppercase font-light">
          <div className="flex items-center space-x-6">
            <span>Natural Stone</span>
            <span>•</span>
            <span>Bleached Oak</span>
            <span>•</span>
            <span>Tactile Linens</span>
          </div>

          <a
            href="#introduction"
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll down to introduction"
          >
            <span>Scroll to Discover</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
