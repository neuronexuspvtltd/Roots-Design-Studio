"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Project, Category } from "@/types";
import { saveProject, getCategories, uploadImageFile } from "@/lib/services/dataService";
import {
  Upload,
  X,
  Plus,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  ArrowLeft,
  Image as ImageIcon,
} from "lucide-react";

interface ProjectFormProps {
  initialData?: Project;
  isEdit?: boolean;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  isEdit = false,
}) => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    category: initialData?.category || "Residential",
    location: initialData?.location || "",
    year: initialData?.year || new Date().getFullYear().toString(),
    shortDescription: initialData?.shortDescription || "",
    fullDescription: initialData?.fullDescription || "",
    designConcept: initialData?.designConcept || "",
    materialsInput: initialData?.materials?.join(", ") || "",
    coverImage: initialData?.coverImage || "",
    gallery: initialData?.gallery || [],
    featured: initialData?.featured ?? false,
    status: initialData?.status || "published",
    isDemo: initialData?.isDemo ?? false,
  });

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  // Auto-generate slug when title changes (if creating or slug not manually customized)
  const handleTitleChange = (val: string) => {
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: !isEdit || prev.slug === "" ? generatedSlug : prev.slug,
    }));
  };

  // Cover image file upload handler
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    setErrorMessage(null);
    try {
      const url = await uploadImageFile(file, "projects");
      setFormData((prev) => ({
        ...prev,
        coverImage: url,
        gallery: prev.gallery.includes(url) ? prev.gallery : [url, ...prev.gallery],
      }));
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to upload cover image.");
    } finally {
      setUploadingCover(false);
    }
  };

  // Gallery images multi-file upload handler
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingGallery(true);
    setErrorMessage(null);
    try {
      const newUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadImageFile(files[i], "projects");
        newUrls.push(url);
      }
      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...newUrls],
      }));
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to upload gallery images.");
    } finally {
      setUploadingGallery(false);
    }
  };

  const removeGalleryImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!formData.title.trim()) {
      setErrorMessage("Please specify a project title.");
      return;
    }
    if (!formData.slug.trim()) {
      setErrorMessage("Please specify a URL slug.");
      return;
    }
    if (!formData.coverImage.trim()) {
      setErrorMessage("Please upload or provide a cover photograph.");
      return;
    }
    if (!formData.shortDescription.trim()) {
      setErrorMessage("Please write a short editorial description.");
      return;
    }

    setIsSubmitting(true);

    try {
      const materialsArray = formData.materialsInput
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean);

      const galleryImages =
        formData.gallery.length > 0
          ? formData.gallery
          : [formData.coverImage];

      await saveProject({
        id: initialData?.id,
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        category: formData.category,
        location: formData.location.trim() || undefined,
        year: formData.year.trim() || undefined,
        shortDescription: formData.shortDescription.trim(),
        fullDescription: formData.fullDescription.trim() || formData.shortDescription.trim(),
        designConcept: formData.designConcept.trim() || undefined,
        materials: materialsArray.length > 0 ? materialsArray : undefined,
        coverImage: formData.coverImage.trim(),
        gallery: galleryImages,
        featured: formData.featured,
        status: formData.status as "published" | "draft",
        order: initialData?.order ?? 1,
        isDemo: formData.isDemo,
      });

      setSuccessMessage(
        isEdit
          ? "Project updated successfully!"
          : "New project created and cataloged successfully!"
      );

      setTimeout(() => {
        router.push("/admin/projects");
      }, 1000);
    } catch (err: unknown) {
      console.error(err);
      setErrorMessage("An error occurred while saving the project to the database.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 max-w-5xl space-y-8">
      {/* Top Bar Navigation & Actions */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-border">
        <Link
          href="/admin/projects"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-luxury text-muted-stone hover:text-charcoal font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>

        <div className="flex items-center space-x-4">
          {initialData?.slug && (
            <Link
              href={`/projects/${initialData.slug}`}
              target="_blank"
              className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-luxury text-charcoal hover:text-olive px-3 py-1.5 border border-stone-border rounded-full"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </Link>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center space-x-2 bg-charcoal text-white text-xs uppercase tracking-luxury font-medium px-7 py-3 rounded-full hover:bg-olive transition-colors disabled:opacity-50 shadow-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving to Database...</span>
              </>
            ) : (
              <span>{isEdit ? "Update Project" : "Publish Project"}</span>
            )}
          </button>
        </div>
      </div>

      {/* Messages */}
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs flex items-start space-x-2.5 rounded">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs flex items-start space-x-2.5 rounded">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-green-600 mt-0.5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Section 1: Basic Information */}
      <div className="bg-ivory border border-stone-border p-6 sm:p-8 rounded-lg space-y-6">
        <h3 className="font-serif text-xl font-light text-charcoal border-b border-stone-border pb-3">
          1. Project Identity & Categorization
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. The Stone Pavilion Residence"
              className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-olive font-light"
            />
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
              URL Slug *
            </label>
            <div className="flex items-center">
              <span className="px-3 py-3 bg-stone-border/30 border border-r-0 border-stone-border text-xs text-muted-stone font-mono">
                /projects/
              </span>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="the-stone-pavilion-residence"
                className="w-full bg-ivory-warm/40 border border-stone-border px-3 py-3 text-sm text-charcoal focus:outline-none focus:border-olive font-mono text-xs"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
              Typology / Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-olive font-light"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
              <option value="Residential">Residential</option>
              <option value="Living Room">Living Room</option>
              <option value="Modular Kitchen">Modular Kitchen</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Commercial">Commercial</option>
              <option value="Renovation">Renovation</option>
            </select>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
              Geographic Location (Optional)
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Alibaug, Maharashtra / Bandra, Mumbai"
              className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-olive font-light"
            />
          </div>

          {/* Year */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
              Completion Year
            </label>
            <input
              type="text"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              placeholder="2024"
              className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-olive font-light"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Narrative & Concept */}
      <div className="bg-ivory border border-stone-border p-6 sm:p-8 rounded-lg space-y-6">
        <h3 className="font-serif text-xl font-light text-charcoal border-b border-stone-border pb-3">
          2. Narrative, Concept & Materiality
        </h3>

        {/* Short Description */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
            Short Portfolio Summary (1-2 sentences) *
          </label>
          <textarea
            rows={2}
            required
            value={formData.shortDescription}
            onChange={(e) =>
              setFormData({ ...formData, shortDescription: e.target.value })
            }
            placeholder="A serene coastal sanctuary blending travertine stone, limewash walls, and raw teakwood millwork."
            className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-olive font-light resize-y"
          />
        </div>

        {/* Full Description */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
            Full Project Narrative & Spatial Story
          </label>
          <textarea
            rows={4}
            value={formData.fullDescription}
            onChange={(e) =>
              setFormData({ ...formData, fullDescription: e.target.value })
            }
            placeholder="Detailed architectural description detailing daylighting, layout choreography, and bespoke interior selections..."
            className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-olive font-light resize-y"
          />
        </div>

        {/* Design Concept */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
            Design Philosophy / Concept Statement
          </label>
          <input
            type="text"
            value={formData.designConcept}
            onChange={(e) =>
              setFormData({ ...formData, designConcept: e.target.value })
            }
            placeholder="e.g. Organic Brutalism balanced with warm minimalism."
            className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-olive font-light"
          />
        </div>

        {/* Materials */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
            Materials & Finishes (Comma-separated)
          </label>
          <input
            type="text"
            value={formData.materialsInput}
            onChange={(e) =>
              setFormData({ ...formData, materialsInput: e.target.value })
            }
            placeholder="Travertine Stone, Bleached Teakwood, Natural Linen, Limewash Plaster"
            className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-olive font-light"
          />
        </div>
      </div>

      {/* Section 3: Photography & Image Management */}
      <div className="bg-ivory border border-stone-border p-6 sm:p-8 rounded-lg space-y-6">
        <h3 className="font-serif text-xl font-light text-charcoal border-b border-stone-border pb-3">
          3. Photography & Visual Assets
        </h3>

        {/* Cover Image */}
        <div className="space-y-3">
          <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium block">
            Cover Photograph *
          </label>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            {formData.coverImage ? (
              <div className="relative w-full sm:w-64 aspect-[16/10] bg-beige rounded overflow-hidden border border-stone-border group flex-shrink-0">
                <Image
                  src={formData.coverImage}
                  alt="Cover preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, coverImage: "" })}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                  aria-label="Remove cover image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="w-full sm:w-64 aspect-[16/10] bg-beige/40 border-2 border-dashed border-stone-border flex flex-col items-center justify-center text-muted-stone p-4 text-center rounded flex-shrink-0">
                <ImageIcon className="w-8 h-8 text-muted-stone/60 mb-2" />
                <span className="text-xs">No cover image selected</span>
              </div>
            )}

            <div className="flex-1 space-y-3 w-full">
              <div>
                <span className="text-xs text-muted-stone block mb-1 font-light">
                  Option A: Upload image from device (Storage)
                </span>
                <label className="inline-flex items-center space-x-2 px-4 py-2.5 bg-ivory border border-stone-border hover:bg-beige text-xs uppercase tracking-luxury font-medium text-charcoal rounded cursor-pointer transition-colors">
                  {uploadingCover ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-olive" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 text-olive" />
                      <span>Select Cover File</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    disabled={uploadingCover}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <span className="text-xs text-muted-stone block mb-1 font-light">
                  Option B: Or enter direct image URL
                </span>
                <input
                  type="url"
                  value={formData.coverImage}
                  onChange={(e) =>
                    setFormData({ ...formData, coverImage: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-ivory-warm/40 border border-stone-border px-3 py-2 text-xs text-charcoal font-mono focus:outline-none focus:border-olive"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Images */}
        <div className="space-y-4 pt-6 border-t border-stone-border">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium block">
                Gallery Perspectives ({formData.gallery.length} Images)
              </label>
              <span className="text-xs text-muted-stone font-light">
                Add multiple high-resolution room angles, millwork details, and spatial perspectives.
              </span>
            </div>

            <label className="inline-flex items-center space-x-2 px-4 py-2 bg-charcoal text-white hover:bg-olive text-xs uppercase tracking-luxury font-medium rounded-full cursor-pointer transition-colors shadow-sm">
              {uploadingGallery ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Gallery Photos</span>
                </>
              )}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleGalleryUpload}
                disabled={uploadingGallery}
                className="hidden"
              />
            </label>
          </div>

          {/* Gallery Previews Grid */}
          {formData.gallery.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
              {formData.gallery.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] bg-beige rounded overflow-hidden border border-stone-border group"
                >
                  <Image
                    src={imgUrl}
                    alt={`Gallery ${idx + 1}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, coverImage: imgUrl })}
                      className="px-2 py-1 bg-white text-charcoal text-[9px] uppercase tracking-luxury font-medium rounded"
                      title="Set as Cover Image"
                    >
                      Make Cover
                    </button>
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(idx)}
                      className="p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 border border-dashed border-stone-border text-center text-xs text-muted-stone rounded">
              No gallery images added yet. Upload multiple photos above to populate the interactive lightbox.
            </div>
          )}
        </div>
      </div>

      {/* Section 4: Publishing & Visibility */}
      <div className="bg-ivory border border-stone-border p-6 sm:p-8 rounded-lg space-y-6">
        <h3 className="font-serif text-xl font-light text-charcoal border-b border-stone-border pb-3">
          4. Publication Status & Features
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Status Radio */}
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-luxury text-charcoal font-medium block">
              Publication Visibility
            </span>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 text-xs text-charcoal cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={formData.status === "published"}
                  onChange={() => setFormData({ ...formData, status: "published" })}
                  className="text-olive focus:ring-olive"
                />
                <span className="font-medium text-green-800">Published (Visible Publicly)</span>
              </label>

              <label className="flex items-center space-x-2 text-xs text-charcoal cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={formData.status === "draft"}
                  onChange={() => setFormData({ ...formData, status: "draft" })}
                  className="text-olive focus:ring-olive"
                />
                <span className="text-muted-stone">Draft (Private)</span>
              </label>
            </div>
          </div>

          {/* Featured Checkbox */}
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-luxury text-charcoal font-medium block">
              Homepage Highlight
            </span>
            <label className="flex items-center space-x-2 text-xs text-charcoal cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded border-stone-border text-olive focus:ring-olive"
              />
              <span>Feature this project in the Homepage &ldquo;Selected Works&rdquo; grid</span>
            </label>
          </div>
        </div>
      </div>

      {/* Bottom Submit */}
      <div className="flex items-center justify-end space-x-4 pt-4 border-t border-stone-border">
        <Link
          href="/admin/projects"
          className="px-6 py-3 border border-stone-border rounded-full text-xs uppercase tracking-luxury text-charcoal hover:bg-beige transition-colors font-medium"
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center space-x-2 bg-charcoal text-white text-xs uppercase tracking-luxury font-medium px-8 py-3.5 rounded-full hover:bg-olive transition-colors disabled:opacity-50 shadow-md"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <span>{isEdit ? "Save Project Changes" : "Create & Publish Project"}</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
