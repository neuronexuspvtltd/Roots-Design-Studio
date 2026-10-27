"use client";

import React from "react";
import Link from "next/link";
import { ServiceItem } from "@/types";
import { ArrowUpRight } from "lucide-react";

interface ServicesOverviewProps {
  services: ServiceItem[];
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ services }) => {
  const activeServices = services.filter((s) => s.active);

  return (
    <section className="py-24 sm:py-32 bg-ivory text-charcoal border-t border-stone-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-3 mb-4">
              <span className="w-8 h-[1px] bg-olive" />
              <span className="text-xs uppercase tracking-[0.25em] text-olive font-medium">
                Capabilities
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-tight">
              Design Services Tailored to How You Live
            </h2>
          </div>

          <p className="mt-6 lg:mt-0 text-base sm:text-lg text-muted-stone font-light max-w-md">
            From initial spatial reconfigurations to tactile finishes and custom joinery, we guide your project through disciplined creative direction.
          </p>
        </div>

        {/* Services List / Grid */}
        <div className="divide-y divide-stone-border">
          {activeServices.map((service, index) => (
            <div
              key={service.id}
              className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline group hover:bg-beige/20 px-4 sm:px-6 transition-colors duration-300"
            >
              {/* Number */}
              <div className="md:col-span-2 text-xs uppercase tracking-luxury text-muted-stone font-mono">
                {(index + 1).toString().padStart(2, "0")}
              </div>

              {/* Title */}
              <div className="md:col-span-4">
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-charcoal group-hover:text-olive transition-colors">
                  {service.title}
                </h3>
              </div>

              {/* Description */}
              <div className="md:col-span-5 text-sm sm:text-base text-muted-stone font-light leading-relaxed">
                {service.shortDescription}
              </div>

              {/* Arrow */}
              <div className="md:col-span-1 flex justify-end">
                <Link
                  href="/services"
                  className="w-10 h-10 rounded-full border border-stone-border flex items-center justify-center text-charcoal group-hover:bg-charcoal group-hover:text-white group-hover:border-charcoal transition-all"
                  aria-label={`Learn more about ${service.title}`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-stone-border flex flex-col sm:flex-row items-center justify-between text-sm text-muted-stone">
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
