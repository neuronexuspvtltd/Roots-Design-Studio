"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const PageLoader: React.FC = () => {
  const pathname = usePathname();
  // null = evaluating on client, false = skip, true = show
  const [shouldShow, setShouldShow] = useState<boolean | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // 1. Never show on admin pages
    if (pathname.startsWith("/admin")) {
      setShouldShow(false);
      return;
    }

    // 2. Check if this is an internal page change (user clicked a link to change page)
    const isPageChange = sessionStorage.getItem("roots_page_change") === "true";
    sessionStorage.removeItem("roots_page_change");

    if (isPageChange) {
      // User is changing pages inside the site -> Do NOT show animation!
      setShouldShow(false);
      return;
    }

    // 3. User opened the site or refreshed the page -> Show animation!
    setShouldShow(true);

    // Automatically remove after animation completes (1.8s)
    const timer = setTimeout(() => {
      setShouldShow(false);
    }, 1800);

    // Escape key allows instant dismissal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDismissed(true);
        setTimeout(() => setShouldShow(false), 250);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pathname]);

  // Global listener: whenever user clicks ANY internal navigation link to change page,
  // flag it so the destination page knows this is a page change and skips the loader!
  useEffect(() => {
    const handleInternalLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore hash anchors on same page (e.g. #introduction) and external links
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http")) {
        return;
      }

      // If navigating to a different page route, mark as page change
      if (href !== pathname) {
        sessionStorage.setItem("roots_page_change", "true");
      }
    };

    document.addEventListener("click", handleInternalLinkClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleInternalLinkClick, { capture: true });
    };
  }, [pathname]);

  if (!shouldShow) return null;

  return (
    <>
      <style jsx global>{`
        @keyframes rootsBackdropFade {
          0% {
            opacity: 1;
            pointer-events: auto;
          }
          65% {
            opacity: 1;
            pointer-events: auto;
          }
          95% {
            opacity: 0;
            pointer-events: none;
          }
          100% {
            opacity: 0;
            pointer-events: none;
            visibility: hidden;
          }
        }

        @keyframes rootsContentSequence {
          0% {
            opacity: 0;
            transform: scale(0.96) translateY(6px);
          }
          16% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          65% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          85% {
            opacity: 0;
            transform: scale(1.02) translateY(0);
          }
          100% {
            opacity: 0;
            transform: scale(1.02) translateY(0);
          }
        }

        @keyframes rootsHairlineProgress {
          0% {
            transform: scaleX(0);
          }
          65% {
            transform: scaleX(1);
          }
          100% {
            transform: scaleX(1);
          }
        }

        .roots-loader-backdrop {
          animation: rootsBackdropFade 1.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          will-change: opacity;
        }

        .roots-loader-content {
          animation: rootsContentSequence 1.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          will-change: opacity, transform;
        }

        .roots-loader-progress {
          animation: rootsHairlineProgress 1.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          transform-origin: left center;
          will-change: transform;
        }
      `}</style>

      <div
        onClick={() => {
          setIsDismissed(true);
          setTimeout(() => setShouldShow(false), 200);
        }}
        role="status"
        aria-live="polite"
        aria-label="Roots Design Studio"
        className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#F7F4EE] select-none ${
          isDismissed
            ? "opacity-0 pointer-events-none transition-opacity duration-200"
            : "roots-loader-backdrop"
        }`}
      >
        {/* Subtle Ambient Radial Highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(233,224,211,0.55)_0%,transparent_75%)] pointer-events-none" />

        {/* Center Branding Showcase */}
        <div className={`relative z-10 flex flex-col items-center px-6 max-w-sm text-center ${isDismissed ? "opacity-0" : "roots-loader-content"}`}>
          {/* Logo Container */}
          <div className="relative w-48 sm:w-60 h-20 sm:h-24 flex items-center justify-center">
            <Image
              src="/images/logo-dark.png"
              alt="Roots Design Studio"
              width={240}
              height={96}
              priority
              quality={95}
              className="object-contain w-full h-full drop-shadow-xs"
            />
          </div>

          {/* Minimalist Architectural Hairline Track */}
          <div className="w-36 sm:w-44 h-[1.5px] bg-[#DDD7CC] rounded-full overflow-hidden mt-6 relative">
            <div className="h-full w-full bg-gradient-to-r from-[#77756E] via-[#56634B] to-[#292A25] rounded-full roots-loader-progress" />
          </div>

          {/* Editorial Subtitle */}
          <div className="mt-4 overflow-hidden">
            <span className="inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.28em] sm:tracking-[0.32em] text-[#77756E] font-medium">
              Interior Architecture &amp; Spaces
            </span>
          </div>
        </div>

        {/* Bottom Minimalist Studio Label */}
        <div className="absolute bottom-8 text-[9px] uppercase tracking-[0.25em] text-[#77756E]/60 font-light pointer-events-none">
          <span>Roots Design Studio</span>
        </div>
      </div>
    </>
  );
};

export default PageLoader;
