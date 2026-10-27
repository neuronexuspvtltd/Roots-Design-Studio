import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import HeroSection from "@/components/home/HeroSection";
import StudioIntroduction from "@/components/home/StudioIntroduction";
import FeaturedWorks from "@/components/home/FeaturedWorks";
import ServicesOverview from "@/components/home/ServicesOverview";
import DesignPhilosophy from "@/components/home/DesignPhilosophy";
import HowWeWork from "@/components/home/HowWeWork";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import InstagramFeed from "@/components/home/InstagramFeed";
import ConsultationBanner from "@/components/home/ConsultationBanner";
import {
  getPublishedProjects,
  getServices,
  getSiteSettings,
} from "@/lib/services/dataService";

export const revalidate = 60; // Incremental Static Regeneration

export default async function HomePage() {
  const [projects, services, settings] = await Promise.all([
    getPublishedProjects(),
    getServices(),
    getSiteSettings(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection settings={settings} />
        <StudioIntroduction settings={settings} />
        <FeaturedWorks projects={projects} />
        <ServicesOverview services={services} />
        <DesignPhilosophy />
        <HowWeWork />
        <TestimonialsSection testimonials={[]} />
        <InstagramFeed settings={settings} />
        <ConsultationBanner settings={settings} />
      </main>
      <Footer />
    </div>
  );
}
