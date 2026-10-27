import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ProjectDetailClient from "./ProjectDetailClient";
import { getProjectBySlug, getPublishedProjects } from "@/lib/services/dataService";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project || project.status !== "published") {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Roots Design Studio`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — Roots Design Studio`,
      description: project.shortDescription,
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project || project.status !== "published") {
    notFound();
  }

  const allProjects = await getPublishedProjects();
  const related = allProjects.filter(
    (p) => p.id !== project.id && p.status === "published"
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <ProjectDetailClient project={project} relatedProjects={related} />
      </main>
      <Footer />
    </div>
  );
}
