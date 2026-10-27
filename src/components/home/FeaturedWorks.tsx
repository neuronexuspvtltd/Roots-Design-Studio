"use client";

import React from "react";
import Link from "next/link";
import { Project } from "@/types";
import { ProjectCard } from "../projects/ProjectCard";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface FeaturedWorksProps {
  projects: Project[];
}

export const FeaturedWorks: React.FC<FeaturedWorksProps> = ({ projects }) => {
  const publishedProjects = projects.filter((p) => p.status === "published");
  // Prioritize featured ones, otherwise top 4
  const featured = publishedProjects.filter((p) => p.featured);
  const displayProjects = (featured.length >= 3 ? featured : publishedProjects).slice(0, 4);

  return (
    <section className="py-16 sm:py-32 bg-ivory-warm/40 border-t border-stone-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-3 mb-4">
              <span className="w-8 h-[1px] bg-olive" />
              <span className="text-xs uppercase tracking-[0.25em] text-olive font-medium">
                Portfolio
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-charcoal">
              Selected Works
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-stone font-light">
              A closer look at spaces shaped by thoughtful design and meaningful details.
            </p>
          </div>

          <div className="mt-8 md:mt-0">
            <Link
              href="/projects"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-luxury font-medium text-charcoal border-b border-charcoal pb-1 hover:text-olive hover:border-olive transition-colors group"
            >
              <span>View All Projects ({publishedProjects.length})</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Project Grid */}
        {displayProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            {displayProjects.map((project, index) => {
              // Asymmetrical editorial rhythm: first is wide 7 cols, second is 5 cols, third is 5 cols, fourth is 7 cols
              const spanClass =
                index % 4 === 0
                  ? "md:col-span-7"
                  : index % 4 === 1
                  ? "md:col-span-5"
                  : index % 4 === 2
                  ? "md:col-span-5"
                  : "md:col-span-7";

              const aspect =
                index % 4 === 0
                  ? "landscape"
                  : index % 4 === 1
                  ? "portrait"
                  : index % 4 === 2
                  ? "portrait"
                  : "landscape";

              return (
                <div key={project.id} className={spanClass}>
                  <ProjectCard
                    project={project}
                    aspectRatio={aspect}
                    priority={index < 2}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-stone-border p-12 bg-beige/20">
            <Sparkles className="w-8 h-8 text-olive mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-charcoal mb-2">Portfolio in Curation</h3>
            <p className="text-sm text-muted-stone max-w-md mx-auto mb-6">
              Our latest architectural and interior case studies are being documented. Check back shortly or explore our bespoke services.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-luxury text-charcoal border border-charcoal px-6 py-3 rounded-full hover:bg-charcoal hover:text-white transition-colors"
            >
              <span>Enquire Directly</span>
            </Link>
          </div>
        )}

        {/* Bottom CTA Link */}
        {displayProjects.length > 0 && (
          <div className="mt-16 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center space-x-3 bg-charcoal text-white text-xs uppercase tracking-luxury font-medium px-8 py-4 rounded-full hover:bg-olive transition-colors duration-300"
            >
              <span>Explore Complete Portfolio</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedWorks;
