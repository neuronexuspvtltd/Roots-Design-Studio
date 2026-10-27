import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ProjectsClient from "./ProjectsClient";
import { getPublishedProjects, getCategories } from "@/lib/services/dataService";

export const metadata: Metadata = {
  title: "Portfolio & Selected Works",
  description:
    "Explore our portfolio of luxury residential homes, bespoke modular kitchens, and architectural renovations crafted with timeless natural materials.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([
    getPublishedProjects(),
    getCategories(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-32 sm:pt-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Page Header */}
          <div className="max-w-3xl mb-4">
            <div className="inline-flex items-center space-x-3 mb-4">
              <span className="w-8 h-[1px] bg-olive" />
              <span className="text-xs uppercase tracking-[0.25em] text-olive font-medium">
                Portfolio
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-light text-charcoal leading-tight">
              Spaces Designed for Living
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-stone font-light max-w-2xl leading-relaxed">
              Every project is an exploration in material honesty, natural light, and quiet proportion. Browse our collection of residential and commercial spaces.
            </p>
          </div>

          {/* Interactive Client Gallery */}
          <ProjectsClient initialProjects={projects} categories={categories} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
