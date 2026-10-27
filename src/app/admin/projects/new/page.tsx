"use client";

import React from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminHeader from "@/components/admin/AdminHeader";
import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <AdminGuard>
      <AdminHeader
        title="Add New Project"
        subtitle="Catalog a completed residential interior, architectural build, or bespoke culinary space."
      />
      <ProjectForm />
    </AdminGuard>
  );
}
