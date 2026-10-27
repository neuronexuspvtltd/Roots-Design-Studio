"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { Logo } from "@/components/common/Logo";
import {
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/projects/new", label: "Add Project", icon: PlusCircle },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout, isFirebaseActive } = useAuth();

  return (
    <aside className="w-64 bg-charcoal text-white flex flex-col justify-between border-r border-stone-border/20 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10">
          <Logo variant="light" size="sm" />
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-luxury text-white/50">
              Admin Studio Suite
            </span>
            <span
              className={`text-[9px] px-2 py-0.5 rounded-full ${
                isFirebaseActive
                  ? "bg-green-900/60 text-green-300 border border-green-700/50"
                  : "bg-amber-900/50 text-amber-200 border border-amber-700/50"
              }`}
              title={
                isFirebaseActive
                  ? "Connected to Live Firebase"
                  : "Running in Interactive Demo Mode with Local Storage"
              }
            >
              {isFirebaseActive ? "Firebase Live" : "Demo Storage"}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5" aria-label="Admin Navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-xs uppercase tracking-luxury font-medium transition-all ${
                  isActive
                    ? "bg-olive text-white shadow-sm"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer User Info & Controls */}
      <div className="p-4 border-t border-white/10 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between w-full px-4 py-2 text-xs text-white/70 hover:text-white hover:bg-white/5 rounded transition-colors"
        >
          <span>View Public Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <div className="px-4 py-2 bg-white/5 rounded-lg flex items-center justify-between">
          <div className="truncate mr-2">
            <span className="block text-xs text-white font-medium truncate">
              {user?.displayName || "Studio Admin"}
            </span>
            <span className="block text-[10px] text-white/50 truncate">
              {user?.email || "admin@roots.studio"}
            </span>
          </div>

          <button
            onClick={() => logout()}
            className="p-1.5 text-white/60 hover:text-red-400 hover:bg-white/10 rounded transition-colors"
            title="Sign Out"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
