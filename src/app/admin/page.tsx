"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminHeader from "@/components/admin/AdminHeader";
import { getAllProjects, getAllEnquiries } from "@/lib/services/dataService";
import { Project, Enquiry } from "@/types";
import {
  FolderKanban,
  FileEdit,
  Inbox,
  Clock,
  Info,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    Promise.all([getAllProjects(), getAllEnquiries()])
      .then(([p, e]) => {
        setProjects(p);
        setEnquiries(e);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const publishedCount = projects.filter((p) => p.status === "published").length;
  const draftCount = projects.filter((p) => p.status === "draft").length;
  const newEnquiriesCount = enquiries.filter((e) => e.status === "New").length;
  const totalEnquiriesCount = enquiries.length;
  const demoCount = projects.filter((p) => p.isDemo).length;

  return (
    <AdminGuard>
      <AdminHeader
        title="Studio Overview"
        subtitle="Manage portfolio architecture, client inquiries, and live website settings."
        actionText="Add New Project"
        actionHref="/admin/projects/new"
      />

      <div className="p-6 sm:p-8 space-y-8">
        {/* Demo Content Disclosure Banner */}
        {demoCount > 0 && (
          <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg flex items-start space-x-3">
            <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-semibold block text-amber-900">
                Demonstration Portfolio Active ({demoCount} Sample Projects)
              </span>
              <p className="text-amber-800 font-light leading-relaxed">
                As required, stock photography is currently clearly labeled as demonstration content and never represented as completed studio commissions. You can replace, edit, or delete these sample projects anytime from the Projects manager.
              </p>
              <Link
                href="/admin/projects"
                className="inline-flex items-center space-x-1 font-medium text-amber-900 underline hover:text-amber-950 mt-1"
              >
                <span>Manage & Replace Sample Projects →</span>
              </Link>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Published Projects */}
          <div className="p-6 bg-ivory border border-stone-border rounded-lg flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[11px] uppercase tracking-luxury text-muted-stone font-medium">
                Published Works
              </span>
              <div className="font-serif text-3xl sm:text-4xl font-light text-charcoal mt-1">
                {publishedCount}
              </div>
              <span className="text-[10px] text-muted-stone mt-1 block">
                Visible on public portfolio
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-olive/10 text-olive flex items-center justify-center">
              <FolderKanban className="w-6 h-6" />
            </div>
          </div>

          {/* Draft Projects */}
          <div className="p-6 bg-ivory border border-stone-border rounded-lg flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[11px] uppercase tracking-luxury text-muted-stone font-medium">
                Draft Projects
              </span>
              <div className="font-serif text-3xl sm:text-4xl font-light text-charcoal mt-1">
                {draftCount}
              </div>
              <span className="text-[10px] text-muted-stone mt-1 block">
                Unpublished private drafts
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-stone-border/40 text-charcoal flex items-center justify-center">
              <FileEdit className="w-6 h-6" />
            </div>
          </div>

          {/* New Enquiries */}
          <div className="p-6 bg-ivory border border-stone-border rounded-lg flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[11px] uppercase tracking-luxury text-muted-stone font-medium">
                New Inquiries
              </span>
              <div className="font-serif text-3xl sm:text-4xl font-light text-olive mt-1">
                {newEnquiriesCount}
              </div>
              <span className="text-[10px] text-muted-stone mt-1 block">
                Awaiting studio response
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-olive/15 text-olive flex items-center justify-center">
              <Inbox className="w-6 h-6" />
            </div>
          </div>

          {/* Total Inquiries */}
          <div className="p-6 bg-ivory border border-stone-border rounded-lg flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[11px] uppercase tracking-luxury text-muted-stone font-medium">
                Total Inquiries
              </span>
              <div className="font-serif text-3xl sm:text-4xl font-light text-charcoal mt-1">
                {totalEnquiriesCount}
              </div>
              <span className="text-[10px] text-muted-stone mt-1 block">
                All time client submissions
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-beige text-charcoal flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Recent Projects & Enquiries Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recently Updated Projects */}
          <div className="lg:col-span-7 bg-ivory border border-stone-border p-6 rounded-lg space-y-6">
            <div className="flex items-center justify-between border-b border-stone-border pb-4">
              <h2 className="font-serif text-xl font-light text-charcoal">
                Recently Updated Projects
              </h2>
              <Link
                href="/admin/projects"
                className="text-xs uppercase tracking-luxury text-olive hover:underline"
              >
                View All ({projects.length})
              </Link>
            </div>

            <div className="divide-y divide-stone-border">
              {projects.slice(0, 5).map((project) => (
                <div
                  key={project.id}
                  className="py-3.5 flex items-center justify-between hover:bg-beige/20 px-2 rounded transition-colors"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="relative w-12 h-12 bg-beige rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="truncate">
                      <h4 className="text-sm font-medium text-charcoal truncate">
                        {project.title}
                      </h4>
                      <div className="flex items-center space-x-2 text-[11px] text-muted-stone">
                        <span>{project.category}</span>
                        <span>•</span>
                        <span
                          className={`capitalize ${
                            project.status === "published"
                              ? "text-olive font-medium"
                              : "text-amber-700"
                          }`}
                        >
                          {project.status}
                        </span>
                        {project.isDemo && (
                          <span className="text-[9px] bg-stone-border/60 px-1.5 py-0.2 rounded">
                            Demo
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="p-2 text-xs uppercase tracking-luxury text-charcoal hover:text-olive border border-stone-border rounded hover:bg-ivory transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Inquiries */}
          <div className="lg:col-span-5 bg-ivory border border-stone-border p-6 rounded-lg space-y-6">
            <div className="flex items-center justify-between border-b border-stone-border pb-4">
              <h2 className="font-serif text-xl font-light text-charcoal">
                Recent Inquiries
              </h2>
              <Link
                href="/admin/enquiries"
                className="text-xs uppercase tracking-luxury text-olive hover:underline"
              >
                View All ({enquiries.length})
              </Link>
            </div>

            {enquiries.length > 0 ? (
              <div className="space-y-4">
                {enquiries.slice(0, 4).map((enq) => (
                  <div
                    key={enq.id}
                    className="p-4 border border-stone-border bg-beige/10 rounded space-y-2 hover:bg-beige/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-charcoal">
                        {enq.fullName}
                      </span>
                      <span
                        className={`text-[10px] uppercase tracking-luxury px-2 py-0.5 rounded-full font-medium ${
                          enq.status === "New"
                            ? "bg-olive text-white"
                            : "bg-stone-border text-charcoal"
                        }`}
                      >
                        {enq.status}
                      </span>
                    </div>
                    <div className="text-xs text-muted-stone flex items-center justify-between">
                      <span>{enq.projectType}</span>
                      <span>{enq.location}</span>
                    </div>
                    <p className="text-xs text-muted-stone/80 line-clamp-1 italic font-light">
                      &ldquo;{enq.description}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-muted-stone">
                No inquiries received yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
