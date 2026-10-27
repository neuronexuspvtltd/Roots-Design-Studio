"use client";

import React, { useState } from "react";
import { submitEnquiry } from "@/lib/services/dataService";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

const PROJECT_TYPES = [
  "Complete Residential Architecture",
  "Modular Kitchen Design",
  "Living Room & Spatial Planning",
  "Master Bedroom Suite",
  "Boutique Commercial / Studio",
  "Heritage Renovation",
  "Other / Custom Scope",
];

const PROPERTY_TYPES = [
  "Apartment / Flat",
  "Penthouse",
  "Independent Villa / Bungalow",
  "Commercial / Office Suite",
  "Historic / Heritage Property",
  "Other",
];

const BUDGET_RANGES = [
  "₹15L — ₹25L",
  "₹25L — ₹50L",
  "₹50L — ₹1 Crore",
  "₹1 Crore+",
  "Discuss Upon Consultation",
];

export const ContactForm: React.FC<{ initialService?: string }> = ({
  initialService,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    projectType: initialService || PROJECT_TYPES[0],
    propertyType: PROPERTY_TYPES[0],
    location: "",
    budgetRange: BUDGET_RANGES[1],
    preferredDate: "",
    description: "",
    consent: false,
    honeypot: "", // anti-spam field
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Spam honeypot check
    if (formData.honeypot) {
      return;
    }

    // Client-side validations
    if (!formData.fullName.trim()) {
      setErrorMessage("Please provide your full name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 8) {
      setErrorMessage("Please enter a valid contact phone number.");
      return;
    }
    if (!formData.location.trim()) {
      setErrorMessage("Please provide your project city or location.");
      return;
    }
    if (!formData.description.trim() || formData.description.length < 10) {
      setErrorMessage("Please describe your space requirements (minimum 10 characters).");
      return;
    }

    setLoading(true);

    try {
      await submitEnquiry({
        fullName: formData.fullName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        email: formData.email.trim(),
        projectType: formData.projectType,
        propertyType: formData.propertyType,
        location: formData.location.trim(),
        budgetRange: formData.budgetRange,
        preferredDate: formData.preferredDate || undefined,
        description: formData.description.trim(),
      });

      setSuccess(true);
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        projectType: PROJECT_TYPES[0],
        propertyType: PROPERTY_TYPES[0],
        location: "",
        budgetRange: BUDGET_RANGES[1],
        preferredDate: "",
        description: "",
        consent: false,
        honeypot: "",
      });
    } catch (err: unknown) {
      console.error("Submission failed:", err);
      setErrorMessage("Could not submit your enquiry. Please verify your details or connect via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-ivory border border-stone-border p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6">
        <CheckCircle2 className="w-12 h-12 text-olive mx-auto" />
        <h3 className="font-serif text-3xl font-light text-charcoal">
          Thank You for Reaching Out
        </h3>
        <p className="text-base text-muted-stone font-light leading-relaxed">
          Your project details have been received by the studio team. We review each enquiry personally and will respond within 24–48 business hours to discuss your space.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-luxury text-charcoal border border-charcoal px-6 py-3 rounded-full hover:bg-charcoal hover:text-white transition-colors"
        >
          <span>Submit Another Enquiry</span>
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-ivory border border-stone-border p-8 sm:p-12 space-y-6 max-w-3xl mx-auto shadow-sm"
      noValidate
    >
      {/* Honeypot field for anti-spam */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g. Vikram Malhotra"
            className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-3 text-sm text-charcoal placeholder-muted-stone/60 focus:outline-none focus:border-olive transition-colors font-light"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. vikram@example.com"
            className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-3 text-sm text-charcoal placeholder-muted-stone/60 focus:outline-none focus:border-olive transition-colors font-light"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
            Phone / WhatsApp Number *
          </label>
          <input
            type="tel"
            required
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            placeholder="+91 98000 00000"
            className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-3 text-sm text-charcoal placeholder-muted-stone/60 focus:outline-none focus:border-olive transition-colors font-light"
          />
        </div>

        {/* Project Location */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
            Project City / Location *
          </label>
          <input
            type="text"
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="e.g. Worli, Mumbai / Indiranagar, Bangalore"
            className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-3 text-sm text-charcoal placeholder-muted-stone/60 focus:outline-none focus:border-olive transition-colors font-light"
          />
        </div>

        {/* Project Scope */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
            Project Type
          </label>
          <select
            value={formData.projectType}
            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
            className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-olive transition-colors font-light"
          >
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
            Property Typology
          </label>
          <select
            value={formData.propertyType}
            onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
            className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-olive transition-colors font-light"
          >
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Budget Range */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
            Approximate Budget Range
          </label>
          <select
            value={formData.budgetRange}
            onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
            className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-olive transition-colors font-light"
          >
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred Consultation Timeline */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
            Target Timeline / Handover (Optional)
          </label>
          <input
            type="text"
            value={formData.preferredDate}
            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
            placeholder="e.g. Immediate / Handover in 2 months"
            className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-3 text-sm text-charcoal placeholder-muted-stone/60 focus:outline-none focus:border-olive transition-colors font-light"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
          Tell Us About Your Space & Vision *
        </label>
        <textarea
          rows={4}
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the square footage, lifestyle requirements, aesthetic tastes, or current condition of the space..."
          className="w-full bg-ivory-warm/40 border border-stone-border px-4 py-3 text-sm text-charcoal placeholder-muted-stone/60 focus:outline-none focus:border-olive transition-colors font-light resize-y"
        />
      </div>

      {/* Consent & Submit */}
      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <label className="flex items-center space-x-2.5 text-xs text-muted-stone cursor-pointer select-none">
          <input
            type="checkbox"
            checked={formData.consent}
            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            className="rounded border-stone-border text-olive focus:ring-olive"
          />
          <span>I agree to receive a personal consultation response from the studio.</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-charcoal text-white text-xs uppercase tracking-luxury font-medium px-8 py-4 rounded-full hover:bg-olive transition-all duration-300 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting...</span>
            </>
          ) : (
            <>
              <span>Send Project Enquiry</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
