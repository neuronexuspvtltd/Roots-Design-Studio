import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ConsultationBanner from "@/components/home/ConsultationBanner";
import HowWeWork from "@/components/home/HowWeWork";
import { getServices, getSiteSettings } from "@/lib/services/dataService";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Interior Architecture & Design Services",
  description:
    "Explore our comprehensive interior architecture services: bespoke residential residences, modular culinary spaces, material curation, and historic restoration.",
};

export const revalidate = 60;

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    getServices(),
    getSiteSettings(),
  ]);

  const activeServices = services.filter((s) => s.active);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-32 sm:pt-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="max-w-3xl mb-16 sm:mb-24">
            <div className="inline-flex items-center space-x-3 mb-4">
              <span className="w-8 h-[1px] bg-olive" />
              <span className="text-xs uppercase tracking-[0.25em] text-olive font-medium">
                Disciplines & Services
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-light text-charcoal leading-tight">
              Comprehensive Interior Architecture
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-stone font-light max-w-2xl leading-relaxed">
              We bridge visionary design direction with technical precision. Every service is calibrated to ensure your living environment balances timeless elegance with everyday practicality.
            </p>
          </div>

          {/* Services Detail List */}
          <div className="space-y-12 sm:space-y-16 mb-24">
            {activeServices.map((service, index) => (
              <div
                key={service.id}
                id={service.id.replace("serv-", "")}
                className="p-8 sm:p-12 border border-stone-border bg-beige/20 hover:bg-beige/40 transition-colors duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  <div className="lg:col-span-1">
                    <span className="font-mono text-2xl font-light text-olive">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <h2 className="font-serif text-2xl sm:text-4xl font-light text-charcoal">
                      {service.title}
                    </h2>
                    <p className="text-base text-muted-stone font-light leading-relaxed">
                      {service.fullDescription || service.shortDescription}
                    </p>
                  </div>

                  <div className="lg:col-span-6 space-y-6">
                    {service.features && service.features.length > 0 && (
                      <div className="space-y-3">
                        <span className="text-[11px] uppercase tracking-luxury text-charcoal font-medium block">
                          Included Deliverables
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {service.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start space-x-2.5 text-xs text-muted-stone">
                              <Check className="w-4 h-4 text-olive flex-shrink-0 mt-0.5" />
                              <span className="leading-snug">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-stone-border/80 flex items-center justify-between">
                      <span className="text-xs text-muted-stone font-light">
                        Custom scopes tailored upon consultation
                      </span>
                      <Link
                        href={`/contact?service=${encodeURIComponent(service.title)}`}
                        className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-luxury text-charcoal hover:text-olive font-medium transition-colors"
                      >
                        <span>Inquire About This Service</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How We Work Section */}
        <HowWeWork />

        {/* Consultation Call to Action */}
        <ConsultationBanner settings={settings} />
      </main>

      <Footer />
    </div>
  );
}
