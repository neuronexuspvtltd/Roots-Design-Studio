"use client";

import React from "react";
import Image from "next/image";
import { Testimonial } from "@/types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const published = testimonials.filter((t) => t.status === "published");

  // As per strict luxury brand & ethical guidelines:
  // Never fabricate client reviews. If none are published, hide the section on the public site.
  if (published.length === 0) {
    return null;
  }

  return (
    <section className="py-24 sm:py-32 bg-ivory text-charcoal border-t border-stone-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center space-x-3 mb-4">
            <span className="w-8 h-[1px] bg-olive" />
            <span className="text-xs uppercase tracking-[0.25em] text-olive font-medium">
              Client Perspectives
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-charcoal">
            Words From Inhabitants
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {published.map((item) => (
            <div
              key={item.id}
              className="p-8 bg-beige/30 border border-stone-border flex flex-col justify-between"
            >
              <blockquote className="font-serif text-lg sm:text-xl text-charcoal font-light leading-relaxed italic mb-8">
                &ldquo;{item.review}&rdquo;
              </blockquote>

              <div className="flex items-center space-x-4 pt-4 border-t border-stone-border/80">
                {item.photoUrl && (
                  <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={item.photoUrl}
                      alt={item.clientName}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-medium text-charcoal">{item.clientName}</h4>
                  {(item.locationOrProject) && (
                    <span className="text-xs text-muted-stone font-light">
                      {item.locationOrProject}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
