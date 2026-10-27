"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isHome = pathname === "/";
  const headerBgClass = isScrolled
    ? "bg-ivory/95 backdrop-blur-md border-b border-stone-border shadow-sm py-4"
    : isHome
    ? "bg-gradient-to-b from-black/40 via-black/20 to-transparent py-6 text-white"
    : "bg-ivory/90 backdrop-blur-sm border-b border-stone-border/60 py-6";

  const isLightText = !isScrolled && isHome;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${headerBgClass}`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Logo variant={isLightText ? "light" : "dark"} size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 py-1 ${
                    isLightText
                      ? isActive
                        ? "text-white font-semibold"
                        : "text-white/80 hover:text-white"
                      : isActive
                      ? "text-charcoal font-semibold"
                      : "text-muted-stone hover:text-charcoal"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${
                        isLightText ? "bg-white" : "bg-olive"
                      } transition-all duration-300`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <Link
              href="/contact"
              className={`hidden sm:inline-flex items-center space-x-2 text-xs uppercase tracking-[0.16em] font-medium px-5 py-2.5 rounded-full border transition-all duration-300 ${
                isLightText
                  ? "border-white/40 text-white hover:bg-white hover:text-charcoal hover:border-white"
                  : "border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-white hover:border-charcoal"
              }`}
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-olive ${
                isLightText ? "text-white hover:bg-white/10" : "text-charcoal hover:bg-stone-border/30"
              }`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-ivory z-50 p-8 shadow-2xl flex flex-col justify-between transition-transform duration-400 ease-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-stone-border">
            <Logo variant="dark" size="sm" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-charcoal hover:bg-beige rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="mt-10 flex flex-col space-y-6" aria-label="Mobile navigation links">
            {NAV_LINKS.map((link, idx) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-2xl font-serif tracking-wide transition-colors flex items-center justify-between ${
                    isActive ? "text-olive font-normal" : "text-charcoal hover:text-olive"
                  }`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-olive" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-8 border-t border-stone-border space-y-4">
          <Link
            href="/contact"
            className="w-full inline-flex items-center justify-center space-x-2 bg-charcoal text-white text-xs uppercase tracking-[0.18em] font-medium py-3.5 rounded-full hover:bg-olive transition-colors"
          >
            <span>Start Your Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <p className="text-xs text-muted-stone text-center tracking-wider uppercase">
            Roots Design Studio • Architecture & Interiors
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
