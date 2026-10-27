"use client";

import React, { useEffect, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminHeader from "@/components/admin/AdminHeader";
import { getSiteSettings, updateSiteSettings, uploadImageFile } from "@/lib/services/dataService";
import { SiteSettings } from "@/types";
import {
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingIntro, setUploadingIntro] = useState(false);

  useEffect(() => {
    getSiteSettings().then((s) => {
      setSettings(s);
      setLoading(false);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const updated = await updateSiteSettings(settings);
      setSettings(updated);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !settings) return;
    setUploadingHero(true);
    try {
      const url = await uploadImageFile(file, "site");
      setSettings({ ...settings, heroImage: url });
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingHero(false);
    }
  };

  const handleIntroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !settings) return;
    setUploadingIntro(true);
    try {
      const url = await uploadImageFile(file, "site");
      setSettings({ ...settings, introImage: url });
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingIntro(false);
    }
  };

  if (loading || !settings) {
    return (
      <AdminGuard>
        <div className="p-16 text-center text-xs text-muted-stone">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-olive mb-3" />
          <span>Loading settings...</span>
        </div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AdminHeader
        title="Website Content Settings"
        subtitle="Update studio branding, hero imagery, contact coordinates, and social configurations in real-time."
      />

      <form onSubmit={handleSave} className="p-6 sm:p-8 max-w-4xl space-y-8">
        {success && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs flex items-center space-x-2.5 rounded shadow-sm">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-green-600" />
            <span>Settings saved successfully! Public pages will now reflect these updates.</span>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2.5 rounded shadow-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Section 1: Hero Section Content */}
        <div className="bg-ivory border border-stone-border p-6 sm:p-8 rounded-lg space-y-6">
          <div className="flex items-center space-x-2 border-b border-stone-border pb-3">
            <Sparkles className="w-4 h-4 text-olive" />
            <h3 className="font-serif text-xl font-light text-charcoal">
              Homepage Hero Section
            </h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
                Main Hero Headline
              </label>
              <input
                type="text"
                required
                value={settings.heroHeadline}
                onChange={(e) =>
                  setSettings({ ...settings, heroHeadline: e.target.value })
                }
                className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-3 text-sm text-charcoal font-light"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
                Hero Supporting Copy
              </label>
              <textarea
                rows={3}
                required
                value={settings.heroSupportingText}
                onChange={(e) =>
                  setSettings({ ...settings, heroSupportingText: e.target.value })
                }
                className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-3 text-sm text-charcoal font-light resize-y"
              />
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium block">
                Hero Background Photograph
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="url"
                  value={settings.heroImage}
                  onChange={(e) =>
                    setSettings({ ...settings, heroImage: e.target.value })
                  }
                  className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-2 text-xs font-mono text-charcoal"
                />
                <label className="flex-shrink-0 px-4 py-2 border border-stone-border bg-beige hover:bg-ivory text-xs uppercase tracking-luxury text-charcoal rounded cursor-pointer transition-colors">
                  {uploadingHero ? "Uploading..." : "Upload New File"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleHeroImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Studio Introduction */}
        <div className="bg-ivory border border-stone-border p-6 sm:p-8 rounded-lg space-y-6">
          <h3 className="font-serif text-xl font-light text-charcoal border-b border-stone-border pb-3">
            Studio Introduction Section
          </h3>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
                Introduction Heading
              </label>
              <input
                type="text"
                required
                value={settings.introHeadline}
                onChange={(e) =>
                  setSettings({ ...settings, introHeadline: e.target.value })
                }
                className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-3 text-sm text-charcoal font-light"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
                Introduction Body Copy
              </label>
              <textarea
                rows={4}
                required
                value={settings.introCopy}
                onChange={(e) =>
                  setSettings({ ...settings, introCopy: e.target.value })
                }
                className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-3 text-sm text-charcoal font-light resize-y"
              />
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium block">
                Introduction Editorial Image
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="url"
                  value={settings.introImage}
                  onChange={(e) =>
                    setSettings({ ...settings, introImage: e.target.value })
                  }
                  className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-2 text-xs font-mono text-charcoal"
                />
                <label className="flex-shrink-0 px-4 py-2 border border-stone-border bg-beige hover:bg-ivory text-xs uppercase tracking-luxury text-charcoal rounded cursor-pointer transition-colors">
                  {uploadingIntro ? "Uploading..." : "Upload New File"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleIntroImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Studio Coordinates & Social */}
        <div className="bg-ivory border border-stone-border p-6 sm:p-8 rounded-lg space-y-6">
          <h3 className="font-serif text-xl font-light text-charcoal border-b border-stone-border pb-3">
            Contact Information & WhatsApp
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
                Studio Phone Number
              </label>
              <input
                type="text"
                required
                value={settings.phone}
                onChange={(e) =>
                  setSettings({ ...settings, phone: e.target.value })
                }
                className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-2.5 text-xs text-charcoal font-light"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
                Studio Email Address
              </label>
              <input
                type="email"
                required
                value={settings.email}
                onChange={(e) =>
                  setSettings({ ...settings, email: e.target.value })
                }
                className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-2.5 text-xs text-charcoal font-light"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
                Physical Studio Locations
              </label>
              <input
                type="text"
                required
                value={settings.address}
                onChange={(e) =>
                  setSettings({ ...settings, address: e.target.value })
                }
                className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-2.5 text-xs text-charcoal font-light"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
                WhatsApp Business Number (With Country Code)
              </label>
              <input
                type="text"
                required
                value={settings.whatsappNumber}
                onChange={(e) =>
                  setSettings({ ...settings, whatsappNumber: e.target.value })
                }
                placeholder="+919876543210"
                className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-2.5 text-xs text-charcoal font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
                Instagram Handle
              </label>
              <input
                type="text"
                value={settings.instagramHandle}
                onChange={(e) =>
                  setSettings({ ...settings, instagramHandle: e.target.value })
                }
                placeholder="@rootsdesignstudio"
                className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-2.5 text-xs text-charcoal"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
                Instagram Profile Link
              </label>
              <input
                type="url"
                value={settings.instagramUrl}
                onChange={(e) =>
                  setSettings({ ...settings, instagramUrl: e.target.value })
                }
                className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-2.5 text-xs text-charcoal font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Footer Copy */}
        <div className="bg-ivory border border-stone-border p-6 sm:p-8 rounded-lg space-y-6">
          <h3 className="font-serif text-xl font-light text-charcoal border-b border-stone-border pb-3">
            Footer Text & Copyright
          </h3>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
                Footer Studio Statement
              </label>
              <textarea
                rows={2}
                value={settings.footerAbout}
                onChange={(e) =>
                  setSettings({ ...settings, footerAbout: e.target.value })
                }
                className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-3 text-sm text-charcoal font-light resize-y"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
                Copyright Notice
              </label>
              <input
                type="text"
                value={settings.copyrightNotice}
                onChange={(e) =>
                  setSettings({ ...settings, copyrightNotice: e.target.value })
                }
                className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-2.5 text-xs text-charcoal"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center space-x-2 bg-charcoal text-white text-xs uppercase tracking-luxury font-medium px-8 py-3.5 rounded-full hover:bg-olive transition-colors disabled:opacity-50 shadow-md"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Settings...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Website Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </AdminGuard>
  );
}
