"use client";

import React from "react";
import Link from "next/link";
import { Plus, ExternalLink } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  actionHref?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  subtitle,
  actionText,
  actionHref,
}) => {
  return (
    <header className="bg-ivory border-b border-stone-border px-6 py-6 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-light text-charcoal">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm text-muted-stone font-light mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-3">
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center space-x-1.5 px-4 py-2 border border-stone-border rounded-full text-xs uppercase tracking-luxury text-charcoal hover:bg-beige transition-colors font-medium"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {actionText && actionHref && (
          <Link
            href={actionHref}
            className="inline-flex items-center space-x-1.5 px-5 py-2 bg-charcoal text-white rounded-full text-xs uppercase tracking-luxury font-medium hover:bg-olive transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{actionText}</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
