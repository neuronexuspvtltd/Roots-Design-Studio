"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { Logo } from "@/components/common/Logo";
import { Lock, Mail, ArrowRight, Loader2, AlertCircle, CheckCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, login, resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/admin");
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      router.push("/admin");
    } else {
      setError(res.error || "Unable to sign in. Please verify your credentials.");
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your registered email address.");
      return;
    }
    setLoading(true);
    const res = await resetPassword(email);
    setLoading(false);
    if (res.success) {
      setResetSuccess(true);
    } else {
      setError(res.error || "Password reset failed.");
    }
  };

  const fillDemoCredentials = () => {
    setEmail("admin@rootsdesignstudio.com");
    setPassword("RootsAdmin2024!");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-center items-center p-6 select-none">
      <div className="w-full max-w-md bg-ivory border border-stone-border p-8 sm:p-10 shadow-lg space-y-8">
        <div className="text-center space-y-3">
          <Logo size="md" className="justify-center" />
          <h2 className="font-serif text-2xl font-light text-charcoal pt-2">
            Studio Management Portal
          </h2>
          <p className="text-xs text-muted-stone font-light tracking-wide">
            Protected area for Roots Design Studio directors and curators
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs flex items-start space-x-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {resetSuccess && (
          <div className="p-3.5 bg-green-50 border border-green-200 text-green-800 text-xs flex items-start space-x-2.5">
            <CheckCircle className="w-4 h-4 flex-shrink-0 text-green-600 mt-0.5" />
            <span>Password reset instructions have been dispatched to your email.</span>
          </div>
        )}

        {!showReset ? (
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-stone absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@rootsdesignstudio.com"
                  className="w-full bg-ivory-warm/40 border border-stone-border pl-10 pr-4 py-2.5 text-xs text-charcoal focus:outline-none focus:border-olive transition-colors font-light"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowReset(true)}
                  className="text-[10px] uppercase tracking-luxury text-olive hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-stone absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-ivory-warm/40 border border-stone-border pl-10 pr-4 py-2.5 text-xs text-charcoal focus:outline-none focus:border-olive transition-colors font-light"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center space-x-2 bg-charcoal text-white text-xs uppercase tracking-luxury font-medium py-3.5 rounded-full hover:bg-olive transition-all duration-300 disabled:opacity-50 shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            {/* Quick Demo Credentials Assistant */}
            <div className="pt-4 border-t border-stone-border text-center">
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-xs text-muted-stone hover:text-charcoal inline-flex items-center space-x-1 underline decoration-dotted"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-olive" />
                <span>Fill Demonstration Credentials (Admin Mode)</span>
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-luxury text-charcoal font-medium">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-stone absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@rootsdesignstudio.com"
                  className="w-full bg-ivory-warm/40 border border-stone-border pl-10 pr-4 py-2.5 text-xs text-charcoal focus:outline-none focus:border-olive transition-colors font-light"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setShowReset(false)}
                className="w-1/2 py-3 border border-stone-border text-xs uppercase tracking-luxury text-charcoal rounded-full hover:bg-beige"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-1/2 bg-charcoal text-white py-3 rounded-full text-xs uppercase tracking-luxury font-medium hover:bg-olive transition-colors"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>
        )}

        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs uppercase tracking-luxury text-muted-stone hover:text-charcoal transition-colors font-light"
          >
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
