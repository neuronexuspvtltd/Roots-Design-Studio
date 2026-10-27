"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { isFirebaseConfigured, auth } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User as FirebaseUser,
} from "firebase/auth";

export interface StudioUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  isAdmin: boolean;
}

interface AuthContextType {
  user: StudioUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  isFirebaseActive: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => ({ success: false }),
  logout: async () => {},
  resetPassword: async () => ({ success: false }),
  isFirebaseActive: false,
});

const DEMO_ADMIN_KEY = "roots_demo_admin_session";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<StudioUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFirebaseActive, setIsFirebaseActive] = useState(false);

  useEffect(() => {
    const configured = isFirebaseConfigured();
    setIsFirebaseActive(configured);

    if (configured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
        if (fbUser) {
          setUser({
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName || "Studio Director",
            isAdmin: true,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Check demo admin session from localStorage
      try {
        const stored = localStorage.getItem(DEMO_ADMIN_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setUser(parsed);
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    if (isFirebaseActive && auth) {
      try {
        const res = await signInWithEmailAndPassword(auth, email, pass);
        setUser({
          uid: res.user.uid,
          email: res.user.email,
          displayName: res.user.displayName || "Studio Director",
          isAdmin: true,
        });
        return { success: true };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to sign in. Please verify your credentials.";
        return { success: false, error: message };
      }
    } else {
      // Local demo authentication for initial setup
      if (
        (email.trim().toLowerCase() === "admin@rootsdesignstudio.com" || email.trim().toLowerCase() === "director@roots.studio") &&
        pass.length >= 6
      ) {
        const demoUser: StudioUser = {
          uid: "demo-admin-director",
          email: email.trim(),
          displayName: "Creative Director",
          isAdmin: true,
        };
        localStorage.setItem(DEMO_ADMIN_KEY, JSON.stringify(demoUser));
        setUser(demoUser);
        return { success: true };
      } else if (email && pass.length >= 6) {
        // Allow user to log in during initial testing with their custom email
        const demoUser: StudioUser = {
          uid: `admin-${Date.now()}`,
          email: email.trim(),
          displayName: "Studio Admin",
          isAdmin: true,
        };
        localStorage.setItem(DEMO_ADMIN_KEY, JSON.stringify(demoUser));
        setUser(demoUser);
        return { success: true };
      } else {
        return {
          success: false,
          error: "Invalid credentials. Password must be at least 6 characters.",
        };
      }
    }
  };

  const logout = async (): Promise<void> => {
    if (isFirebaseActive && auth) {
      try {
        await fbSignOut(auth);
      } catch (err) {
        console.error("Sign out error:", err);
      }
    }
    localStorage.removeItem(DEMO_ADMIN_KEY);
    setUser(null);
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    if (isFirebaseActive && auth) {
      try {
        await sendPasswordResetEmail(auth, email);
        return { success: true };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Could not send password reset email.";
        return { success: false, error: message };
      }
    } else {
      // Simulated response
      return {
        success: true,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        resetPassword,
        isFirebaseActive,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
