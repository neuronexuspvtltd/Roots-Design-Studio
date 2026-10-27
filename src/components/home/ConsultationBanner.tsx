"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteSettings } from "@/types";

interface ConsultationBannerProps {
  settings?: SiteSettings | null;
}

export const ConsultationBanner: React.FC<ConsultationBannerProps> = ({ settings }) => {
  const whatsappNumber = settings?.whatsappNumber?.replace(/[^0-9]/g, "") || "919876543210";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20Roots%20Design%20Studio,%20I%20would%20like%20to%20discuss%20an%20interior%20design%20project.`;

  return (
    <section className="py-20 sm:py-36 bg-charcoal text-white relative overflow-hidden">
      {/* Subtle organic architectural ambient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(104,116,90,0.25),transparent_60%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
        <div className="inline-flex items-center space-x-3 mb-4 sm:mb-6">
          <span className="w-8 h-[1px] bg-olive-light" />
          <span className="text-xs uppercase tracking-[0.25em] text-olive-light font-medium">
            Begin Your Journey
          </span>
          <span className="w-8 h-[1px] bg-olive-light" />
        </div>

        <h2 className="font-serif text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-balance leading-tight mb-4 sm:mb-8">
          Let&apos;s Create a Space That Feels Like You.
        </h2>

        <p className="text-sm sm:text-xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-12 text-balance">
          Tell us about your space, your ideas, and what you envision. We would love to hear from you and craft a thoughtful proposal.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-white text-charcoal px-9 py-4 rounded-full text-xs uppercase tracking-luxury font-medium hover:bg-ivory hover:scale-[1.02] transition-all duration-300 shadow-xl"
          >
            <span>Start a Conversation</span>
            <ArrowUpRight className="w-4 h-4 text-charcoal" />
          </Link>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 border border-white/30 text-white px-8 py-4 rounded-full text-xs uppercase tracking-luxury font-medium hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            <span>Direct WhatsApp Inquiry</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ConsultationBanner;
