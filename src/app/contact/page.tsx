import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ContactForm from "@/components/contact/ContactForm";
import { getSiteSettings } from "@/lib/services/dataService";
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Consultations",
  description:
    "Get in touch with Roots Design Studio. Discuss your residential or commercial interior architecture project with our studio team.",
};

export const revalidate = 60;

interface ContactPageProps {
  searchParams: Promise<{ service?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { service } = await searchParams;
  const settings = await getSiteSettings();

  const phone = settings?.phone || "+91 98765 43210";
  const email = settings?.email || "studio@rootsdesignstudio.com";
  const address = settings?.address || "Studio 4B, The Guildhall, Off Lavelle Road, Bangalore & Bandra West, Mumbai";
  const whatsappNumber = settings?.whatsappNumber?.replace(/[^0-9]/g, "") || "919876543210";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20Roots%20Design%20Studio,%20I%20would%20like%20to%20discuss%20an%20interior%20design%20project.`;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-32 sm:pt-40 pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="max-w-3xl mb-16 sm:mb-20">
            <div className="inline-flex items-center space-x-3 mb-4">
              <span className="w-8 h-[1px] bg-olive" />
              <span className="text-xs uppercase tracking-[0.25em] text-olive font-medium">
                Dialogue
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-light text-charcoal leading-tight">
              Start Your Spatial Journey
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-stone font-light max-w-2xl leading-relaxed">
              Whether you are planning a complete residential build, redesigning a kitchen, or breathing new life into a historic bungalow, we look forward to hearing your thoughts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Contact Info & WhatsApp CTA */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 bg-beige/30 border border-stone-border space-y-6">
                <h3 className="text-xs uppercase tracking-luxury text-charcoal font-semibold">
                  Studio Contacts
                </h3>

                <div className="space-y-4 text-sm font-light text-muted-stone">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-olive flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-medium text-charcoal mb-0.5">Studio Addresses</span>
                      <span className="leading-relaxed">{address}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 pt-2">
                    <Mail className="w-5 h-5 text-olive flex-shrink-0" />
                    <div>
                      <span className="block font-medium text-charcoal mb-0.5">Email Inquiries</span>
                      <a href={`mailto:${email}`} className="hover:text-charcoal transition-colors">
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 pt-2">
                    <Phone className="w-5 h-5 text-olive flex-shrink-0" />
                    <div>
                      <span className="block font-medium text-charcoal mb-0.5">Direct Line</span>
                      <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-charcoal transition-colors">
                        {phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Action Card */}
                <div className="pt-6 border-t border-stone-border/80 space-y-3">
                  <div className="flex items-center space-x-2 text-charcoal">
                    <MessageCircle className="w-5 h-5 text-olive" />
                    <span className="text-xs uppercase tracking-luxury font-medium">Instant Consultation</span>
                  </div>
                  <p className="text-xs text-muted-stone font-light leading-relaxed">
                    Prefer immediate messaging? Connect directly with our design coordinators via WhatsApp.
                  </p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 w-full py-3 px-4 bg-olive text-white text-xs uppercase tracking-luxury font-medium rounded-full hover:bg-olive-dark transition-colors shadow-sm"
                  >
                    <span>Message on WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Consultation Hours */}
              <div className="p-6 bg-ivory border border-stone-border text-xs text-muted-stone space-y-2">
                <span className="block uppercase tracking-luxury text-charcoal font-medium">
                  Studio Consultation Hours
                </span>
                <p className="font-light">
                  Monday — Saturday: 10:00 AM – 7:00 PM IST <br />
                  Site visits and bespoke consultations by prior appointment.
                </p>
              </div>
            </div>

            {/* Right Detailed Form */}
            <div className="lg:col-span-7">
              <ContactForm initialService={service} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
