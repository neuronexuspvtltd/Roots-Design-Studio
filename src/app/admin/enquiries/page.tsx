"use client";

import React, { useEffect, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from "@/lib/services/dataService";
import { Enquiry, EnquiryStatus } from "@/types";
import {
  Search,
  Trash2,
  X,
  Loader2,
} from "lucide-react";

const STATUS_OPTIONS: EnquiryStatus[] = [
  "New",
  "Contacted",
  "Consultation Scheduled",
  "Converted",
  "Closed",
];

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [internalNotesInput, setInternalNotesInput] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    setLoading(true);
    const data = await getAllEnquiries();
    setEnquiries(data);
    setLoading(false);
  };

  const handleOpenDetails = (enq: Enquiry) => {
    setSelectedEnquiry(enq);
    setInternalNotesInput(enq.internalNotes || "");
  };

  const handleStatusChange = async (newStatus: EnquiryStatus) => {
    if (!selectedEnquiry) return;
    setIsUpdatingStatus(true);
    await updateEnquiryStatus(selectedEnquiry.id, newStatus, internalNotesInput);
    const updated = {
      ...selectedEnquiry,
      status: newStatus,
      internalNotes: internalNotesInput,
    };
    setSelectedEnquiry(updated);
    setEnquiries(enquiries.map((e) => (e.id === updated.id ? updated : e)));
    setIsUpdatingStatus(false);
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setIsUpdatingStatus(true);
    await updateEnquiryStatus(
      selectedEnquiry.id,
      selectedEnquiry.status,
      internalNotesInput
    );
    const updated = {
      ...selectedEnquiry,
      internalNotes: internalNotesInput,
    };
    setSelectedEnquiry(updated);
    setEnquiries(enquiries.map((e) => (e.id === updated.id ? updated : e)));
    setIsUpdatingStatus(false);
  };

  const handleDelete = async (id: string) => {
    await deleteEnquiry(id);
    setEnquiries(enquiries.filter((e) => e.id !== id));
    if (selectedEnquiry?.id === id) {
      setSelectedEnquiry(null);
    }
    setDeleteConfirmId(null);
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesStatus =
      statusFilter === "all" || e.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      e.fullName.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.phoneNumber.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q) ||
      e.projectType.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <AdminGuard>
      <AdminHeader
        title="Client Inquiries & Consultations"
        subtitle={`Total of ${enquiries.length} inquiries received across residential and commercial briefs.`}
      />

      <div className="p-6 sm:p-8 space-y-6">
        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-ivory border border-stone-border p-4 rounded-lg">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-muted-stone absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name, email, phone, city..."
              className="w-full bg-ivory-warm/40 border border-stone-border rounded-full pl-10 pr-4 py-2 text-xs text-charcoal focus:outline-none focus:border-olive font-light"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 text-xs uppercase tracking-luxury rounded-full font-medium ${
                statusFilter === "all"
                  ? "bg-charcoal text-white"
                  : "bg-beige/40 text-muted-stone hover:text-charcoal"
              }`}
            >
              All ({enquiries.length})
            </button>
            {STATUS_OPTIONS.map((st) => {
              const count = enquiries.filter((e) => e.status === st).length;
              return (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-luxury rounded-full whitespace-nowrap font-medium ${
                    statusFilter === st
                      ? "bg-olive text-white"
                      : "bg-beige/40 text-muted-stone hover:text-charcoal"
                  }`}
                >
                  {st} {count > 0 && `(${count})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Enquiries Table */}
        <div className="bg-ivory border border-stone-border rounded-lg overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-12 text-center text-xs text-muted-stone">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-olive" />
              <span>Fetching inquiries...</span>
            </div>
          ) : filteredEnquiries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-beige/30 border-b border-stone-border text-charcoal uppercase tracking-luxury font-medium">
                    <th className="py-3.5 px-4">Client</th>
                    <th className="py-3.5 px-4">Typology & Location</th>
                    <th className="py-3.5 px-4">Budget Range</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-border">
                  {filteredEnquiries.map((enq) => {
                    const statusBg =
                      enq.status === "New"
                        ? "bg-olive text-white"
                        : enq.status === "Contacted"
                        ? "bg-blue-100 text-blue-800"
                        : enq.status === "Consultation Scheduled"
                        ? "bg-purple-100 text-purple-800"
                        : enq.status === "Converted"
                        ? "bg-green-100 text-green-800"
                        : "bg-stone-border text-charcoal";

                    return (
                      <tr
                        key={enq.id}
                        className="hover:bg-beige/15 transition-colors cursor-pointer"
                        onClick={() => handleOpenDetails(enq)}
                      >
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-charcoal block text-sm">
                            {enq.fullName}
                          </span>
                          <span className="text-[11px] text-muted-stone block font-light">
                            {enq.email} • {enq.phoneNumber}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-medium text-charcoal block">
                            {enq.projectType}
                          </span>
                          <span className="text-[11px] text-muted-stone font-light">
                            {enq.propertyType} • {enq.location}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 font-mono text-charcoal">
                          {enq.budgetRange}
                        </td>

                        <td className="py-3.5 px-4 text-muted-stone font-light">
                          {new Date(enq.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-luxury font-medium ${statusBg}`}
                          >
                            {enq.status}
                          </span>
                        </td>

                        <td
                          className="py-3.5 px-4 text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="inline-flex items-center space-x-2">
                            <button
                              onClick={() => handleOpenDetails(enq)}
                              className="px-3 py-1 bg-ivory border border-stone-border rounded text-[11px] text-charcoal hover:bg-beige"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(enq.id)}
                              className="p-1.5 text-muted-stone hover:text-red-600 rounded"
                              title="Delete enquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-muted-stone">
              No inquiries found matching your filters.
            </div>
          )}
        </div>
      </div>

      {/* Inquiry Detail Drawer / Modal */}
      {selectedEnquiry && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-ivory w-full max-w-xl h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-stone-border">
            {/* Drawer Header */}
            <div className="p-6 border-b border-stone-border flex items-center justify-between bg-beige/20">
              <div>
                <span className="text-[10px] uppercase tracking-luxury text-olive font-semibold block">
                  Inquiry Details
                </span>
                <h3 className="font-serif text-2xl font-light text-charcoal">
                  {selectedEnquiry.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 text-charcoal hover:bg-beige rounded-full"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 space-y-6 flex-1">
              {/* Status Update Control */}
              <div className="p-4 bg-beige/30 border border-stone-border rounded space-y-2">
                <label className="text-[11px] uppercase tracking-luxury text-charcoal font-semibold block">
                  Update Inquiry Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((st) => (
                    <button
                      key={st}
                      disabled={isUpdatingStatus}
                      onClick={() => handleStatusChange(st)}
                      className={`px-3 py-1.5 text-[11px] uppercase tracking-luxury rounded font-medium transition-all ${
                        selectedEnquiry.status === st
                          ? "bg-olive text-white shadow-sm"
                          : "bg-ivory border border-stone-border text-charcoal hover:bg-beige"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Client Contact Info */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-luxury text-charcoal font-semibold border-b border-stone-border pb-2">
                  Client Coordinates
                </h4>
                <div className="grid grid-cols-2 gap-4 text-xs font-light">
                  <div className="space-y-1">
                    <span className="text-muted-stone block text-[10px] uppercase tracking-luxury">
                      Email
                    </span>
                    <a
                      href={`mailto:${selectedEnquiry.email}`}
                      className="text-olive hover:underline font-medium"
                    >
                      {selectedEnquiry.email}
                    </a>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-stone block text-[10px] uppercase tracking-luxury">
                      Phone / WhatsApp
                    </span>
                    <a
                      href={`tel:${selectedEnquiry.phoneNumber.replace(/\s+/g, "")}`}
                      className="text-olive hover:underline font-medium"
                    >
                      {selectedEnquiry.phoneNumber}
                    </a>
                  </div>
                </div>
              </div>

              {/* Scope & Spatial Details */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-luxury text-charcoal font-semibold border-b border-stone-border pb-2">
                  Spatial Parameters
                </h4>
                <div className="grid grid-cols-2 gap-4 text-xs font-light">
                  <div>
                    <span className="text-muted-stone block text-[10px] uppercase tracking-luxury">
                      Project Type
                    </span>
                    <span className="text-charcoal font-medium">
                      {selectedEnquiry.projectType}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-stone block text-[10px] uppercase tracking-luxury">
                      Property Typology
                    </span>
                    <span className="text-charcoal">{selectedEnquiry.propertyType}</span>
                  </div>
                  <div>
                    <span className="text-muted-stone block text-[10px] uppercase tracking-luxury">
                      Location
                    </span>
                    <span className="text-charcoal">{selectedEnquiry.location}</span>
                  </div>
                  <div>
                    <span className="text-muted-stone block text-[10px] uppercase tracking-luxury">
                      Budget Range
                    </span>
                    <span className="text-charcoal font-mono">
                      {selectedEnquiry.budgetRange}
                    </span>
                  </div>
                  {selectedEnquiry.preferredDate && (
                    <div className="col-span-2">
                      <span className="text-muted-stone block text-[10px] uppercase tracking-luxury">
                        Target Timeline
                      </span>
                      <span className="text-charcoal">{selectedEnquiry.preferredDate}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Full Description / Brief */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-luxury text-charcoal font-semibold border-b border-stone-border pb-2">
                  Client Brief & Vision
                </h4>
                <div className="p-4 bg-ivory-warm/40 border border-stone-border text-xs text-charcoal leading-relaxed font-light whitespace-pre-wrap">
                  {selectedEnquiry.description}
                </div>
              </div>

              {/* Internal Notes */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] uppercase tracking-luxury text-charcoal font-semibold">
                    Studio Internal Notes
                  </label>
                  <button
                    onClick={handleSaveNotes}
                    disabled={isUpdatingStatus}
                    className="text-xs uppercase tracking-luxury text-olive hover:underline font-medium"
                  >
                    Save Notes
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={internalNotesInput}
                  onChange={(e) => setInternalNotesInput(e.target.value)}
                  placeholder="Record call logs, designer assignment, follow-up dates, or preliminary design impressions..."
                  className="w-full bg-ivory-warm/40 border border-stone-border p-3 text-xs text-charcoal focus:outline-none focus:border-olive font-light"
                />
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-stone-border bg-beige/10 flex items-center justify-between">
              <span className="text-[10px] text-muted-stone font-light">
                Submitted on {new Date(selectedEnquiry.createdAt).toLocaleString()}
              </span>

              <button
                onClick={() => setDeleteConfirmId(selectedEnquiry.id)}
                className="text-xs text-red-600 hover:text-red-800 font-medium inline-flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Inquiry</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-ivory border border-stone-border p-6 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="font-serif text-xl text-charcoal">Delete Inquiry?</h3>
            <p className="text-xs text-muted-stone leading-relaxed">
              This will permanently delete this client inquiry from your database.
            </p>
            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-stone-border">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 border border-stone-border rounded-full text-xs uppercase tracking-luxury text-charcoal"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-5 py-2 bg-red-600 text-white rounded-full text-xs uppercase tracking-luxury font-medium hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminGuard>
  );
}
