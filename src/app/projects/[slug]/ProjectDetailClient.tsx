"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { ImageLightbox } from "@/components/common/ImageLightbox";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ArrowLeft, ArrowUpRight, Calendar, MapPin, Maximize2 } from "lucide-react";

interface ProjectDetailClientProps {
  project: Project;
  relatedProjects: Project[];
}

export const ProjectDetailClient: React.FC<ProjectDetailClientProps> = ({
  project,
  relatedProjects,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combine cover image and gallery images for lightbox view
  const allImages = [
    project.coverImage,
    ...project.gallery.filter((img) => img !== project.coverImage),
  ];

  const openLightboxAt = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <article className="pb-24 sm:pb-32">
      {/* Lightbox */}
      <ImageLightbox
        images={allImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentImageIndex}
        title={project.title}
      />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 sm:pt-36 pb-8">
        <div className="flex items-center space-x-3 text-xs uppercase tracking-luxury text-muted-stone font-light">
          <Link
            href="/projects"
            className="hover:text-charcoal transition-colors inline-flex items-center space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Projects</span>
          </Link>
          <span>/</span>
          <span className="text-olive">{project.category}</span>
          <span>/</span>
          <span className="text-charcoal truncate max-w-xs">{project.title}</span>
        </div>
      </div>

      {/* Hero Header & Cover Image */}
      <header className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-stone-border">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] text-olive font-medium block mb-3">
              {project.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-[1.1]">
              {project.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-luxury text-muted-stone font-light">
            {project.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-olive" />
                <span>{project.location}</span>
              </div>
            )}
            {project.year && (
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-olive" />
                <span>Completed {project.year}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Cover Image with Lightbox Trigger */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-16 sm:mb-20">
        <div
          onClick={() => openLightboxAt(0)}
          className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-beige cursor-pointer group"
          role="button"
          tabIndex={0}
          aria-label="Enlarge cover photograph"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") openLightboxAt(0);
          }}
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            quality={92}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center space-x-2 px-4 py-2 bg-charcoal/80 text-white text-xs uppercase tracking-luxury rounded-full backdrop-blur-sm">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Click to Expand</span>
            </span>
          </div>
        </div>
      </div>

      {/* Project Narrative & Concept */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Description */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-charcoal">
              The Spatial Narrative
            </h2>
            <div className="prose prose-stone max-w-none text-base sm:text-lg text-muted-stone font-light leading-relaxed space-y-4">
              <p>{project.fullDescription || project.shortDescription}</p>
            </div>

            {project.designConcept && (
              <div className="pt-6 border-t border-stone-border/80">
                <h3 className="text-xs uppercase tracking-luxury text-olive font-medium mb-3">
                  Design Concept & Intent
                </h3>
                <p className="font-serif text-xl sm:text-2xl italic text-charcoal font-light leading-relaxed">
                  &ldquo;{project.designConcept}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Project Details Sidebar */}
          <div className="lg:col-span-4 bg-beige/30 p-8 border border-stone-border space-y-6 h-fit">
            <h3 className="text-xs uppercase tracking-luxury text-charcoal font-medium border-b border-stone-border pb-3">
              Project Specification
            </h3>

            <div className="space-y-4 text-sm font-light">
              <div>
                <span className="block text-[11px] uppercase tracking-luxury text-muted-stone">
                  Typology
                </span>
                <span className="text-charcoal font-medium">{project.category}</span>
              </div>

              {project.location && (
                <div>
                  <span className="block text-[11px] uppercase tracking-luxury text-muted-stone">
                    Location
                  </span>
                  <span className="text-charcoal">{project.location}</span>
                </div>
              )}

              {project.year && (
                <div>
                  <span className="block text-[11px] uppercase tracking-luxury text-muted-stone">
                    Year of Completion
                  </span>
                  <span className="text-charcoal">{project.year}</span>
                </div>
              )}

              {project.materials && project.materials.length > 0 && (
                <div>
                  <span className="block text-[11px] uppercase tracking-luxury text-muted-stone mb-2">
                    Materials & Finishes
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.materials.map((mat, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-ivory text-charcoal text-xs rounded border border-stone-border"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-stone-border">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center space-x-2 bg-charcoal text-white text-xs uppercase tracking-luxury font-medium py-3 rounded-full hover:bg-olive transition-colors"
              >
                <span>Enquire About a Similar Space</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 1 && (
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-24">
          <div className="mb-10 flex items-center justify-between pb-4 border-b border-stone-border">
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-charcoal">
              Project Gallery ({project.gallery.length} Perspectives)
            </h2>
            <span className="text-xs uppercase tracking-luxury text-muted-stone font-light">
              Click any photo to enlarge
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.gallery.map((image, index) => (
              <div
                key={index}
                onClick={() => openLightboxAt(index)}
                className="relative aspect-[4/3] bg-beige overflow-hidden cursor-pointer group"
                role="button"
                tabIndex={0}
                aria-label={`Enlarge photo ${index + 1}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openLightboxAt(index);
                }}
              >
                <Image
                  src={image}
                  alt={`${project.title} detail ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={88}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/25 transition-colors duration-300 flex items-center justify-center">
                  <Maximize2 className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 border-t border-stone-border">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-serif text-2xl sm:text-4xl font-light text-charcoal">
              Other Selected Works
            </h2>
            <Link
              href="/projects"
              className="text-xs uppercase tracking-luxury text-charcoal hover:text-olive transition-colors flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.slice(0, 3).map((rel) => (
              <ProjectCard key={rel.id} project={rel} aspectRatio="landscape" />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default ProjectDetailClient;
