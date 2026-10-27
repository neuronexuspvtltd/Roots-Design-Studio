"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminHeader from "@/components/admin/AdminHeader";
import ProjectForm from "@/components/admin/ProjectForm";
import { getAllProjects } from "@/lib/services/dataService";
import { Project } from "@/types";
import { Loader2 } from "lucide-react";

export default function EditProjectPage() {
  const params = useParams();
  const id = params?.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getAllProjects().then((list) => {
        const found = list.find((p) => p.id === id);
        setProject(found || null);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <AdminGuard>
        <div className="p-16 text-center text-xs text-muted-stone">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-olive mb-3" />
          <span>Retrieving project data...</span>
        </div>
      </AdminGuard>
    );
  }

  if (!project) {
    return (
      <AdminGuard>
        <div className="p-16 text-center text-sm text-charcoal">
          <p>Project not found with ID: {id}</p>
        </div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AdminHeader
        title={`Edit: ${project.title}`}
        subtitle={`Typology: ${project.category} • Slug: /projects/${project.slug}`}
      />
      <ProjectForm initialData={project} isEdit={true} />
    </AdminGuard>
  );
}
