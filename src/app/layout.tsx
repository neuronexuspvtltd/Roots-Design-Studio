import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/providers/ClientProviders";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F7F4EE",
  width: "device-width",
  initialScale: 1,
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://rootsdesignstudio.com");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Roots Design Studio",
    default: "Roots Design Studio | Interior Design • Spaces That Inspire",
  },
  description:
    "Thoughtfully designed interiors that bring together natural materials, timeless aesthetics, and the way you love to live. Interior Design • Spaces That Inspire.",
  keywords: [
    "Interior Design Studio",
    "Luxury Interior Architecture",
    "Residential Interior Design",
    "Modular Kitchen Design",
    "Custom Furniture Selection",
    "Architectural Space Planning",
  ],
  authors: [{ name: "Roots Design Studio" }],
  openGraph: {
    title: "Roots Design Studio | Interior Design • Spaces That Inspire",
    description:
      "Thoughtfully designed interiors that bring together natural materials, timeless aesthetics, and the way you love to live.",
    url: "https://rootsdesignstudio.com",
    siteName: "Roots Design Studio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Roots Design Studio",
    description:
      "Thoughtfully designed interiors that bring together natural materials, timeless aesthetics, and the way you love to live.",
    url: "https://rootsdesignstudio.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressLocality: "Bangalore & Mumbai",
    },
    priceRange: "₹₹₹₹",
    openingHours: "Mo,Tu,We,Th,Fr,Sa 10:00-19:00",
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-ivory text-charcoal min-h-screen antialiased flex flex-col selection:bg-olive selection:text-white">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
