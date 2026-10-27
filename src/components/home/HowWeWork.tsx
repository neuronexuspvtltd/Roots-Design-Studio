"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const PROCESS_STEPS = [
  {
    step: "01",
    name: "Discover",
    subtitle: "Dialogue & Lifestyle Analysis",
    description:
      "We begin with a deep exploration of how you live, your aesthetic sensibilities, functional non-negotiables, and budget parameters.",
  },
  {
    step: "02",
    name: "Concept",
    subtitle: "Spatial Strategy & Material Moodboards",
    description:
      "We translate insights into preliminary spatial layouts, mood boards, daylight studies, and an authentic natural material palette.",
  },
  {
    step: "03",
    name: "Design",
    subtitle: "Detailed Drawings & Visualizations",
    description:
      "We refine architectural millwork, bespoke lighting plans, plumbing fixture schedules, and photorealistic 3D spatial models.",
  },
  {
    step: "04",
    name: "Deliver",
    subtitle: "Design Direction & Realization",
    description:
      "We coordinate closely with specialist artisans, craftspeople, and project teams to ensure the design intent is faithfully translated into reality.",
  },
];

export const HowWeWork: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-ivory text-charcoal border-t border-stone-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-3 mb-4">
            <span className="w-8 h-[1px] bg-olive" />
            <span className="text-xs uppercase tracking-[0.25em] text-olive font-medium">
              Methodology
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-charcoal">
            How We Work
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-stone font-light">
            A structured, collaborative approach ensuring creative clarity from the first dialogue to the finished space.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="p-8 border border-stone-border bg-beige/10 flex flex-col justify-between hover:bg-beige/30 transition-all duration-300"
            >
              <div>
                <span className="font-mono text-3xl font-light text-olive block mb-6">
                  {step.step}
                </span>
                <h3 className="font-serif text-2xl font-light text-charcoal mb-1">
                  {step.name}
                </h3>
                <span className="text-[11px] uppercase tracking-luxury text-muted-stone block mb-4 font-medium">
                  {step.subtitle}
                </span>
                <p className="text-sm text-muted-stone font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-8 mt-6 border-t border-stone-border/60">
                <span className="text-[10px] uppercase tracking-luxury text-olive font-semibold">
                  Phase {step.step}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-luxury font-medium text-charcoal border border-charcoal px-7 py-3.5 rounded-full hover:bg-charcoal hover:text-white transition-all"
          >
            <span>Discuss Your Space With Us</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
