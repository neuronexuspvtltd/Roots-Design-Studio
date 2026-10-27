import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ConsultationBanner from "@/components/home/ConsultationBanner";
import { getSiteSettings } from "@/lib/services/dataService";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Studio & Creative Philosophy",
  description:
    "Learn about Roots Design Studio. Rooted in natural materials, tactile simplicity, and architectural proportion to create enduring interior environments.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-32 sm:pt-40">
        {/* Intro Section */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20 sm:mb-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-3 mb-4">
              <span className="w-8 h-[1px] bg-olive" />
              <span className="text-xs uppercase tracking-[0.25em] text-olive font-medium">
                The Studio
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-charcoal leading-[1.1] mb-8 text-balance">
              Rooted in Nature. <br />
              Refined by Architecture.
            </h1>
            <p className="text-lg sm:text-2xl text-muted-stone font-light leading-relaxed max-w-3xl text-balance">
              Roots Design Studio is an interior architecture practice dedicated to the design of quiet, tactile, and enduring spaces. We shape environments that feel intuitive from the moment you step inside.
            </p>
          </div>
        </section>

        {/* Large Architectural Studio Photograph */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-24 sm:mb-32">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-beige">
            <Image
              src="/images/about/about-hero.jpg"
              alt="Roots Design Studio architectural interior composition"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </section>

        {/* Narrative & Principles */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-luxury text-olive font-semibold block">
                Our Narrative
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-charcoal leading-tight">
                An antidote to fleeting trends and sterile spaces.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-muted-stone font-light leading-relaxed">
              <p>
                Our studio was founded on a simple conviction: spaces should be designed for the human senses. In an era dominated by rapid synthetic finishes and transient internet trends, we choose permanence, tactile warmth, and organic materials.
              </p>
              <p>
                Every project is guided by restraint. We prioritize the way natural morning light washes across a limewash wall, the weight of a solid brass door lever, the grain underfoot of honest European oak, and the serene quietude of considered acoustics.
              </p>
              <p>
                We do not impose a repetitive house style. Instead, we listen intently to each client&apos;s daily rituals, crafting tailored environments that age gracefully and become beloved sanctuaries.
              </p>

              <div className="pt-6 border-t border-stone-border flex items-center space-x-6">
                <Link
                  href="/projects"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-luxury text-charcoal font-medium hover:text-olive border-b border-charcoal hover:border-olive pb-0.5 transition-colors"
                >
                  <span>Explore Selected Portfolio</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-luxury text-muted-stone font-medium hover:text-charcoal transition-colors"
                >
                  <span>Schedule Consultation</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Material Library & Craft Section */}
        <section className="py-24 bg-beige/30 border-y border-stone-border mb-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center space-x-3 mb-2">
                  <span className="w-8 h-[1px] bg-olive" />
                  <span className="text-xs uppercase tracking-[0.25em] text-olive font-medium">
                    Material Integrity
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl font-light text-charcoal">
                  Craftsmanship & Tactility
                </h2>
                <p className="text-base sm:text-lg text-muted-stone font-light leading-relaxed">
                  We collaborate with skilled local artisans, generational stonemasons, metalworkers, and timber joiners. By celebrating the natural grain of unlacquered wood and the raw beauty of natural stone, our spaces remain grounded and authentic.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4 text-xs tracking-luxury uppercase text-charcoal font-medium">
                  <div className="p-4 bg-ivory border border-stone-border">
                    <span>Honed Limestone & Quartzite</span>
                  </div>
                  <div className="p-4 bg-ivory border border-stone-border">
                    <span>Bleached & Smoked Oak</span>
                  </div>
                  <div className="p-4 bg-ivory border border-stone-border">
                    <span>Tactile Oatmeal Linens</span>
                  </div>
                  <div className="p-4 bg-ivory border border-stone-border">
                    <span>Organic Limewash Plaster</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 relative aspect-[4/3] bg-beige overflow-hidden">
                <Image
                  src="/images/about/material-library.jpg"
                  alt="Natural materials library at Roots Design Studio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Consultation Call to Action */}
        <ConsultationBanner settings={settings} />
      </main>

      <Footer />
    </div>
  );
}
