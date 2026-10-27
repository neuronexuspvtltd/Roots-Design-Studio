"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminHeader from "@/components/admin/AdminHeader";
import { getAllProjects, saveProject, deleteProject } from "@/lib/services/dataService";
import { Project } from "@/types";
import {
  Plus,
  Search,
  Star,
  Trash2,
  Edit3,
  Eye,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
} from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const data = await getAllProjects();
    setProjects(data);
    setLoading(false);
  };

  const handleTogglePublished = async (project: Project) => {
    const updatedStatus = project.status === "published" ? "draft" : "published";
    const updated = await saveProject({
      ...project,
      status: updatedStatus,
    });
    setProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleToggleFeatured = async (project: Project) => {
    const updated = await saveProject({
      ...project,
      featured: !project.featured,
    });
    setProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    await deleteProject(id);
    setIsDeleting(false);
    setDeleteConfirmId(null);
    setProjects(projects.filter((p) => p.id !== id));
  };

  const filteredProjects = projects.filter((p) => {
    const matchesStatus =
      statusFilter === "all" || p.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.location && p.location.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  return (
    <AdminGuard>
      <AdminHeader
        title="Project Management"
        subtitle={`Total of ${projects.length} architectural projects registered in database.`}
        actionText="Add Project"
        actionHref="/admin/projects/new"
      />

      <div className="p-6 sm:p-8 space-y-6">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-ivory border border-stone-border p-4 rounded-lg">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-muted-stone absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title, category, location..."
              className="w-full bg-ivory-warm/40 border border-stone-border rounded-full pl-10 pr-4 py-2 text-xs text-charcoal focus:outline-none focus:border-olive font-light"
            />
          </div>

          {/* Status Filters */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-luxury rounded-full font-medium ${
                statusFilter === "all"
                  ? "bg-charcoal text-white"
                  : "bg-beige/40 text-muted-stone hover:text-charcoal"
              }`}
            >
              All ({projects.length})
            </button>
            <button
              onClick={() => setStatusFilter("published")}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-luxury rounded-full font-medium ${
                statusFilter === "published"
                  ? "bg-olive text-white"
                  : "bg-beige/40 text-muted-stone hover:text-charcoal"
              }`}
            >
              Published ({projects.filter((p) => p.status === "published").length})
            </button>
            <button
              onClick={() => setStatusFilter("draft")}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-luxury rounded-full font-medium ${
                statusFilter === "draft"
                  ? "bg-charcoal text-white"
                  : "bg-beige/40 text-muted-stone hover:text-charcoal"
              }`}
            >
              Drafts ({projects.filter((p) => p.status === "draft").length})
            </button>
          </div>
        </div>

        {/* Project Table / List */}
        <div className="bg-ivory border border-stone-border rounded-lg overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-12 text-center text-xs text-muted-stone">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-olive" />
              <span>Loading projects...</span>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-beige/30 border-b border-stone-border text-charcoal uppercase tracking-luxury font-medium">
                    <th className="py-3.5 px-4">Project</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Location & Year</th>
                    <th className="py-3.5 px-4 text-center">Featured</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-border">
                  {filteredProjects.map((project) => (
                    <tr
                      key={project.id}
                      className="hover:bg-beige/15 transition-colors"
                    >
                      {/* Project info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative w-14 h-12 bg-beige rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={project.coverImage}
                              alt={project.title}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-serif text-base font-light text-charcoal block leading-tight">
                              {project.title}
                            </span>
                            <span className="text-[10px] text-muted-stone font-mono block">
                              /{project.slug}
                            </span>
                            {project.isDemo && (
                              <span className="inline-block mt-0.5 text-[9px] uppercase tracking-luxury bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-medium">
                                Demo Concept
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 text-charcoal font-medium">
                        {project.category}
                      </td>

                      {/* Location & Year */}
                      <td className="py-3.5 px-4 text-muted-stone font-light">
                        {project.location || "—"} {project.year && `(${project.year})`}
                      </td>

                      {/* Featured Toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleToggleFeatured(project)}
                          className={`p-1.5 rounded-full transition-colors ${
                            project.featured
                              ? "text-amber-500 bg-amber-50"
                              : "text-muted-stone/40 hover:text-muted-stone"
                          }`}
                          title={project.featured ? "Featured on Homepage" : "Click to feature"}
                          aria-label={project.featured ? "Featured" : "Not featured"}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              project.featured ? "fill-amber-500" : ""
                            }`}
                          />
                        </button>
                      </td>

                      {/* Status Toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleTogglePublished(project)}
                          className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-[10px] uppercase tracking-luxury font-medium transition-colors ${
                            project.status === "published"
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-stone-border/60 text-charcoal hover:bg-stone-border"
                          }`}
                        >
                          {project.status === "published" ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-green-700" />
                              <span>Published</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-muted-stone" />
                              <span>Draft</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center space-x-2">
                          <Link
                            href={`/projects/${project.slug}`}
                            target="_blank"
                            className="p-1.5 text-muted-stone hover:text-charcoal transition-colors"
                            title="Preview Public Page"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          <Link
                            href={`/admin/projects/${project.id}/edit`}
                            className="p-1.5 text-muted-stone hover:text-olive transition-colors"
                            title="Edit Project Details"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => setDeleteConfirmId(project.id)}
                            className="p-1.5 text-muted-stone hover:text-red-600 transition-colors"
                            title="Delete Project"
                            aria-label="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-muted-stone space-y-3">
              <p>No projects match your current filters.</p>
              <Link
                href="/admin/projects/new"
                className="inline-flex items-center space-x-1.5 text-olive font-medium underline"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Your First Project</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-ivory border border-stone-border p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center space-x-3 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-serif text-xl text-charcoal font-medium">
                Confirm Deletion
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-muted-stone font-light leading-relaxed">
              Are you sure you want to permanently delete this project? This will remove its metadata and references from the portfolio.
            </p>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-stone-border">
              <button
                disabled={isDeleting}
                onClick={() => setDeleteConfirmId(null)}
                className="px-5 py-2.5 border border-stone-border rounded-full text-xs uppercase tracking-luxury text-charcoal hover:bg-beige"
              >
                Cancel
              </button>
              <button
                disabled={isDeleting}
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-6 py-2.5 bg-red-600 text-white rounded-full text-xs uppercase tracking-luxury font-medium hover:bg-red-700 disabled:opacity-50 inline-flex items-center space-x-1.5"
              >
                {isDeleting ? "Deleting..." : "Delete Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminGuard>
  );
}
