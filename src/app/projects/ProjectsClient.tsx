"use client";

import React, { useState, useMemo } from "react";
import { Project, Category } from "@/types";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Search, Filter } from "lucide-react";

interface ProjectsClientProps {
  initialProjects: Project[];
  categories: Category[];
}

export const ProjectsClient: React.FC<ProjectsClientProps> = ({
  initialProjects,
  categories,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // Must be published
      if (project.status !== "published") return false;

      // Category match
      const matchesCategory =
        selectedCategory === "all" ||
        project.category.toLowerCase() === selectedCategory.toLowerCase();

      // Search match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        (project.location && project.location.toLowerCase().includes(query)) ||
        (project.shortDescription &&
          project.shortDescription.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [initialProjects, selectedCategory, searchQuery]);

  return (
    <div className="py-16 sm:py-24">
      {/* Category Pills & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 mb-12 border-b border-stone-border">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2 text-xs uppercase tracking-luxury rounded-full transition-all duration-300 font-medium ${
              selectedCategory === "all"
                ? "bg-charcoal text-white shadow-sm"
                : "bg-beige/40 text-muted-stone hover:text-charcoal hover:bg-beige"
            }`}
          >
            All Works ({initialProjects.filter((p) => p.status === "published").length})
          </button>

          {categories
            .filter((c) => c.active)
            .map((cat) => {
              const count = initialProjects.filter(
                (p) =>
                  p.status === "published" &&
                  p.category.toLowerCase() === cat.name.toLowerCase()
              ).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-5 py-2 text-xs uppercase tracking-luxury rounded-full whitespace-nowrap transition-all duration-300 font-medium ${
                    selectedCategory.toLowerCase() === cat.name.toLowerCase()
                      ? "bg-charcoal text-white shadow-sm"
                      : "bg-beige/40 text-muted-stone hover:text-charcoal hover:bg-beige"
                  }`}
                >
                  {cat.name} {count > 0 && `(${count})`}
                </button>
              );
            })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-muted-stone absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or location..."
            className="w-full bg-ivory-warm/60 border border-stone-border rounded-full pl-10 pr-4 py-2 text-xs text-charcoal placeholder-muted-stone/70 focus:outline-none focus:border-olive transition-colors font-light"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-stone hover:text-charcoal"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredProjects.map((project, idx) => (
            <div key={project.id} className="fade-in">
              <ProjectCard
                project={project}
                aspectRatio="landscape"
                priority={idx < 4}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center border border-dashed border-stone-border p-12 bg-beige/10 max-w-2xl mx-auto">
          <Filter className="w-8 h-8 text-olive mx-auto mb-4" />
          <h3 className="font-serif text-2xl text-charcoal mb-2">No Projects Found</h3>
          <p className="text-sm text-muted-stone max-w-sm mx-auto mb-6 font-light">
            No projects matched your selected filter &ldquo;{selectedCategory !== "all" ? selectedCategory : searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-luxury text-charcoal border border-charcoal px-6 py-2.5 rounded-full hover:bg-charcoal hover:text-white transition-colors"
          >
            <span>Reset Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsClient;
