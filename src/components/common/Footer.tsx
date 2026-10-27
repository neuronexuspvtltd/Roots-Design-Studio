"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { getSiteSettings } from "@/lib/services/dataService";
import { SiteSettings } from "@/types";
import { ArrowUpRight, Phone, Mail, MapPin, Lock } from "lucide-react";
import { InstagramIcon } from "./InstagramIcon";

export const Footer: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    getSiteSettings().then(setSettings).catch(console.error);
  }, []);

  const studioName = settings?.studioName || "Roots Design Studio";
  const email = settings?.email || "studio@rootsdesignstudio.com";
  const phone = settings?.phone || "+91 98765 43210";
  const address = settings?.address || "Mumbai & Bangalore, India";
  const instagramUrl = settings?.instagramUrl || "https://instagram.com";
  const whatsappNumber = settings?.whatsappNumber?.replace(/[^0-9]/g, "") || "919876543210";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20Roots%20Design%20Studio,%20I%20would%20like%20to%20discuss%20an%20interior%20design%20project.`;

  return (
    <footer className="bg-beige/40 border-t border-stone-border mt-auto pt-10 sm:pt-20 pb-8 sm:pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-8 gap-x-6 sm:gap-12 lg:gap-16 pb-8 sm:pb-16 border-b border-stone-border/80">
          {/* Brand Column - Full width on mobile, 5 cols on desktop */}
          <div className="col-span-2 md:col-span-5 space-y-3 sm:space-y-6">
            <div className="hidden sm:block">
              <Logo size="lg" />
            </div>
            <div className="sm:hidden">
              <Logo size="md" />
            </div>
            <p className="text-xs sm:text-sm text-muted-stone leading-relaxed max-w-sm font-light">
              {settings?.footerAbout ||
                "Roots Design Studio creates warm, tactile, and architecturally considered interiors. Based in India, working worldwide."}
            </p>
            <div className="flex items-center space-x-2.5 pt-1 sm:pt-2">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-stone-border flex items-center justify-center text-charcoal hover:bg-olive hover:text-white hover:border-olive transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 sm:space-x-2 text-[11px] sm:text-xs uppercase tracking-luxury text-charcoal border border-stone-border px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full hover:bg-olive hover:text-white hover:border-olive transition-all duration-300 font-medium"
              >
                <span>WhatsApp Studio</span>
                <ArrowUpRight className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              </a>
            </div>
          </div>

          {/* Navigation Links - 1 col on mobile (side-by-side with Services), 2 cols on desktop */}
          <div className="col-span-1 md:col-span-2 space-y-2.5 sm:space-y-4">
            <h4 className="text-[11px] sm:text-xs uppercase tracking-luxury font-medium text-charcoal">
              Explore
            </h4>
            <ul className="space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-stone hover:text-charcoal transition-colors font-light"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-muted-stone hover:text-charcoal transition-colors font-light"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-stone hover:text-charcoal transition-colors font-light"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-stone hover:text-charcoal transition-colors font-light"
                >
                  About Studio
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-stone hover:text-charcoal transition-colors font-light"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links - 1 col on mobile (side-by-side with Explore), 2 cols on desktop */}
          <div className="col-span-1 md:col-span-2 space-y-2.5 sm:space-y-4">
            <h4 className="text-[11px] sm:text-xs uppercase tracking-luxury font-medium text-charcoal">
              Services
            </h4>
            <ul className="space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/services#residential"
                  className="text-muted-stone hover:text-charcoal transition-colors font-light"
                >
                  Residential
                </Link>
              </li>
              <li>
                <Link
                  href="/services#kitchen"
                  className="text-muted-stone hover:text-charcoal transition-colors font-light"
                >
                  Modular Kitchens
                </Link>
              </li>
              <li>
                <Link
                  href="/services#space-planning"
                  className="text-muted-stone hover:text-charcoal transition-colors font-light"
                >
                  Space Planning
                </Link>
              </li>
              <li>
                <Link
                  href="/services#materials"
                  className="text-muted-stone hover:text-charcoal transition-colors font-light"
                >
                  Material Curation
                </Link>
              </li>
              <li>
                <Link
                  href="/services#renovation"
                  className="text-muted-stone hover:text-charcoal transition-colors font-light"
                >
                  Renovation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details - Full width on mobile, 3 cols on desktop */}
          <div className="col-span-2 md:col-span-3 space-y-2.5 sm:space-y-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-border/60">
            <h4 className="text-[11px] sm:text-xs uppercase tracking-luxury font-medium text-charcoal">
              Studio Presence
            </h4>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm font-light text-muted-stone">
              <div className="flex items-start space-x-2.5 sm:space-x-3">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-olive flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{address}</span>
              </div>
              <div className="flex items-center space-x-2.5 sm:space-x-3">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-olive flex-shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="hover:text-charcoal transition-colors"
                >
                  {email}
                </a>
              </div>
              <div className="flex items-center space-x-2.5 sm:space-x-3">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-olive flex-shrink-0" />
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="hover:text-charcoal transition-colors"
                >
                  {phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-muted-stone font-light space-y-3 sm:space-y-0 text-center sm:text-left">
          <p>
            {settings?.copyrightNotice ||
              `© ${new Date().getFullYear()} ${studioName}. All rights reserved.`}
          </p>

          <div className="flex items-center space-x-4 sm:space-x-6">
            <span className="hidden sm:inline hover:text-charcoal transition-colors">
              Interior Design • Spaces That Inspire
            </span>
            <span className="hidden sm:inline">•</span>
            {/* Unobtrusive Admin Login */}
            <Link
              href="/admin/login"
              className="inline-flex items-center space-x-1.5 text-muted-stone/70 hover:text-charcoal transition-colors py-1 px-2 rounded hover:bg-stone-border/30"
              title="Studio Management Area"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
