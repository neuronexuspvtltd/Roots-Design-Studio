"use client";

import React from "react";
import Image from "next/image";

const PHILOSOPHY_PILLARS = [
  {
    num: "01",
    title: "Thoughtful Spatial Planning",
    desc: "We prioritize natural circulation, light penetration, and proportional balance before considering surface ornamentation.",
  },
  {
    num: "02",
    title: "Honest, Natural Materials",
    desc: "Unsealed limestone, fluted solid oak, hand-thrown ceramics, and tactile linen that age with grace and enrich sensory living.",
  },
  {
    num: "03",
    title: "Timeless Restraint",
    desc: "Resisting fleeting trends in favor of calm, enduring aesthetics that remain relevant and soothing for decades.",
  },
  {
    num: "04",
    title: "Artisanal Detailing",
    desc: "Every shadow gap, cabinet pull, and joinery reveal is designed with intentional precision and bespoke execution.",
  },
];

export const DesignPhilosophy: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-beige/30 border-t border-stone-border text-charcoal">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Collage */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6">
            <div className="relative aspect-[3/4] overflow-hidden bg-stone-border/30">
              <Image
                src="/images/philosophy/phil-1.jpg"
                alt="Tactile wood and natural ceramic details"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden bg-stone-border/30 mt-8">
              <Image
                src="/images/philosophy/phil-2.jpg"
                alt="Architectural daylight and limewash textures"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: Text & Pillars */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <div className="inline-flex items-center space-x-3 mb-4">
                <span className="w-8 h-[1px] bg-olive" />
                <span className="text-xs uppercase tracking-[0.25em] text-olive font-medium">
                  Core Ethos
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-charcoal leading-tight">
                Crafting Spaces That Age with Grace
              </h2>
              <p className="mt-4 text-base sm:text-lg text-muted-stone font-light leading-relaxed">
                We believe architecture and interior design are fundamentally about how a space feels at quiet moments. Our design ethos rejects artificial gloss in favor of tactile textures and quiet architectural proportion.
              </p>
            </div>

            {/* Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              {PHILOSOPHY_PILLARS.map((pillar) => (
                <div key={pillar.num} className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-luxury text-olive font-medium">
                    {pillar.num}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-charcoal">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-stone font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignPhilosophy;
