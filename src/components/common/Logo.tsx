"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light" | "auto";
  size?: "sm" | "md" | "lg" | "xl";
  priority?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  variant = "auto",
  size = "md",
  priority = false,
}) => {
  const isLight = variant === "light";

  // Use crisp transparent PNGs generated from the user's official logo
  // logo-light.png for dark backgrounds (hero header, dark footer)
  // logo-dark.png for light ivory/beige backgrounds (scrolled header, pages, admin panel)
  const logoSrc = isLight ? "/images/logo-light.png" : "/images/logo-dark.png";

  const sizeStyles = {
    sm: {
      width: 78,
      height: 38,
      className: "h-8 sm:h-9 w-auto",
    },
    md: {
      width: 108,
      height: 52,
      className: "h-11 sm:h-12 w-auto",
    },
    lg: {
      width: 148,
      height: 72,
      className: "h-14 sm:h-16 w-auto",
    },
    xl: {
      width: 196,
      height: 95,
      className: "h-20 sm:h-24 w-auto",
    },
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center group select-none transition-transform duration-300 hover:scale-[1.02] ${className}`}
      aria-label="Roots Design Studio - Spaces That Inspire"
    >
      <div className="relative flex items-center justify-center">
        <Image
          src={logoSrc}
          alt="Roots Design Studio - Interior Design • Spaces That Inspire"
          width={sizeStyles.width}
          height={sizeStyles.height}
          priority={priority || size === "md"}
          className={`${sizeStyles.className} object-contain transition-opacity duration-300 group-hover:opacity-90`}
        />
      </div>
    </Link>
  );
};

export default Logo;
