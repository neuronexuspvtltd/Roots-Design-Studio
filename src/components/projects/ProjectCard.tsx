"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  aspectRatio?: "landscape" | "portrait" | "square" | "tall";
  className?: string;
  priority?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  aspectRatio = "landscape",
  className = "",
  priority = false,
}) => {
  const aspectClasses = {
    landscape: "aspect-[16/10]",
    portrait: "aspect-[4/5]",
    square: "aspect-square",
    tall: "aspect-[3/4]",
  }[aspectRatio];

  return (
    <article className={`group flex flex-col ${className}`}>
      <Link
        href={`/projects/${project.slug}`}
        className="block overflow-hidden relative bg-stone-border/20 cursor-pointer"
        aria-label={`View project ${project.title}`}
      >
        <div className={`relative w-full ${aspectClasses} overflow-hidden`}>
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            quality={85}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Subtle gradient vignette on hover */}
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/15 transition-colors duration-500" />

          {/* Quick arrow icon appearing on hover */}
          <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-ivory/90 backdrop-blur-sm text-charcoal flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-sm">
            <ArrowUpRight className="w-4 h-4 text-charcoal" />
          </div>

          {/* Subtle Demonstration tag if demo */}
          {project.isDemo && (
            <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/50 backdrop-blur-sm text-[9px] uppercase tracking-luxury text-white/80 rounded">
              Demo Concept
            </div>
          )}
        </div>
      </Link>

      {/* Meta details */}
      <div className="pt-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs uppercase tracking-luxury text-muted-stone mb-1 font-light">
          <span>{project.category}</span>
          {project.location && <span>{project.location}</span>}
        </div>

        <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-light group-hover:text-olive transition-colors leading-snug">
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>

        {project.shortDescription && (
          <p className="mt-1.5 text-xs sm:text-sm text-muted-stone font-light line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
