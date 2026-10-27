"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  Unlock,
  Eye,
  EyeOff,
  LogOut,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Shield,
  Sparkles,
  RefreshCw,
  Folder
} from "lucide-react";

const CASE_STUDIES_METADATA = [
  {
    id: "employee-dash",
    title: "💼 Employee Dash — Unified Growth",
    category: "L&D Growth Workspace",
    route: "/case-study/employee-dash",
    desc: "Desktop employee growth platform bringing goals, tasks, learning, and coaching into one workspace."
  },
  {
    id: "govt-election",
    title: "🗳️ Govt Election Event Reporting",
    category: "GIS & Geospatial Analytics",
    route: "/case-study/govt-election",
    desc: "Geospatial analytics dashboard verifying field report authenticity across administrative levels."
  },
  {
    id: "vammy",
    title: "🦇 Vammy — The Finance Buddy",
    category: "Mobile App & FinTech",
    route: "/case-study/vammy",
    desc: "Intuitive finance tracking app with mascot gauge giving visual feedback on spending."
  }
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // Login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Visibility state
  const [visibility, setVisibility] = useState({
    "employee-dash": true,
    "govt-election": true,
    "vammy": true
  });
  const [updatingId, setUpdatingId] = useState(null);

  const refreshStatus = async () => {
    try {
      const res = await fetch(`/api/case-studies/visibility?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" }
      });
      const data = await res.json();
      if (data.visibility) {
        setVisibility(data.visibility);
      }
      setIsAuthenticated(Boolean(data.isAdmin));
    } catch (err) {
      console.error("Failed to load admin status:", err);
    }
  };

  // Check auth and initial visibility on mount
  useEffect(() => {
    let isMounted = true;
    fetch(`/api/case-studies/visibility?t=${Date.now()}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" }
    })
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.visibility) {
          setVisibility(data.visibility);
        }
        setIsAuthenticated(Boolean(data.isAdmin));
      })
      .catch((err) => {
        console.error("Failed to load admin status:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Invalid username or password");
        setSubmitting(false);
        return;
      }

      setIsAuthenticated(true);
      setPassword("");
      // Refresh visibility status
      refreshStatus();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsAuthenticated(false);
      refreshStatus();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const toggleVisibility = async (id, currentVisible) => {
    const nextState = !currentVisible;
    setUpdatingId(id);
    setStatusMessage("");

    try {
      const res = await fetch("/api/case-studies/visibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: id, visible: nextState })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setVisibility(data.visibility);
        setStatusMessage(
          `Updated: ${id} is now ${nextState ? "VISIBLE" : "HIDDEN"}`
        );
        setTimeout(() => setStatusMessage(""), 4000);
      } else {
        alert(data.error || "Failed to update visibility");
      }
    } catch {
      alert("Failed to update visibility");
    } finally {
      setUpdatingId(null);
    }
  };

  const setAllVisibility = async (makeVisible) => {
    setStatusMessage("");
    const newMap = {
      "employee-dash": makeVisible,
      "govt-election": makeVisible,
      "vammy": makeVisible
    };

    try {
      const res = await fetch("/api/case-studies/visibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visibility: newMap })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setVisibility(data.visibility);
        setStatusMessage(`All case studies set to ${makeVisible ? "VISIBLE" : "HIDDEN"}`);
        setTimeout(() => setStatusMessage(""), 4000);
      }
    } catch {
      alert("Failed to update all case studies");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#122B1E] flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 animate-spin text-emerald-400" />
          <span className="font-mono text-sm">Verifying session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#122B1E] text-slate-800 font-sans p-6 sm:p-12 relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-cutting-mat opacity-90 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto space-y-8 pt-4">
        {/* Top Header Bar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-800/40 text-white">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              prefetch={false}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio</span>
            </Link>
            <span className="text-emerald-700">&bull;</span>
            <span className="text-xs font-mono text-emerald-200/70">
              Admin Control Panel
            </span>
          </div>

          {isAuthenticated && (
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                User: ansm
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </header>

        {/* ─────────────────────────────────────────────────────────────────
            VIEW 1: LOGIN FORM (If not authenticated)
        ───────────────────────────────────────────────────────────────── */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto pt-8">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 space-y-6">
              <div className="space-y-2 text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto shadow-xs border border-emerald-100">
                  <Shield className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Admin Sign In
                </h1>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Authenticate to manage case study visibility across the portfolio.
                </p>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider block">
                    User ID
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="ansm"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider block">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Unlock Controls</span>
                    </>
                  )}
                </button>
              </form>

              <div className="pt-2 border-t border-slate-100 text-center text-[11px] font-mono text-slate-400">
                Single-user credentials: <strong className="text-slate-600">ansm</strong>
              </div>
            </div>
          </div>
        ) : (
          /* ─────────────────────────────────────────────────────────────────
              VIEW 2: VISIBILITY CONTROL CENTER (When authenticated)
          ───────────────────────────────────────────────────────────────── */
          <div className="space-y-6">
            {/* Title & Bulk Controls */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
                  <Folder className="w-4 h-4" />
                  <span>Case Study Visibility Manager</span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Control Portfolio Case Studies
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                  Toggle each case study to hide or unhide it. Hidden case studies are immediately
                  removed from the homepage for public visitors and locked from direct access.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  onClick={() => setAllVisibility(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  Unhide All
                </button>
                <button
                  onClick={() => setAllVisibility(false)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  Hide All
                </button>
              </div>
            </div>

            {/* Status Toast */}
            {statusMessage && (
              <div className="p-3.5 rounded-2xl bg-emerald-500 text-white text-xs font-bold shadow-lg flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{statusMessage}</span>
                </div>
                <span className="font-mono text-[10px] opacity-80">Saved to backend</span>
              </div>
            )}

            {/* List of Case Studies */}
            <div className="grid grid-cols-1 gap-4">
              {CASE_STUDIES_METADATA.map((cs) => {
                const isVisible = visibility[cs.id] ?? true;
                const isUpdating = updatingId === cs.id;

                return (
                  <div
                    key={cs.id}
                    className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all ${
                      isVisible
                        ? "border-slate-200 shadow-xl"
                        : "border-amber-300/80 bg-amber-50/20 shadow-md"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Left: Project Info */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                              isVisible
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                : "bg-amber-100 text-amber-800 border border-amber-300"
                            }`}
                          >
                            {isVisible ? "● Visible on Portfolio" : "○ Hidden from Public"}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            {cs.category}
                          </span>
                        </div>

                        <h3 className="text-lg font-extrabold text-slate-900">
                          {cs.title}
                        </h3>

                        <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                          {cs.desc}
                        </p>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-3 shrink-0">
                        {/* Preview link */}
                        <Link
                          href={cs.route}
                          target="_blank"
                          className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                          title="Preview Case Study Page"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        {/* Toggle Button */}
                        <button
                          onClick={() => toggleVisibility(cs.id, isVisible)}
                          disabled={isUpdating}
                          className={`px-5 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer disabled:opacity-50 ${
                            isVisible
                              ? "bg-slate-900 hover:bg-rose-700 text-white"
                              : "bg-emerald-600 hover:bg-emerald-700 text-white"
                          }`}
                        >
                          {isUpdating ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Saving...</span>
                            </>
                          ) : isVisible ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Hide Case Study</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>Make Visible</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Information Card */}
            <div className="p-6 rounded-3xl bg-emerald-950/60 border border-emerald-800/60 text-white space-y-2 text-xs">
              <span className="font-mono font-bold text-emerald-400 block uppercase">
                How It Works:
              </span>
              <p className="text-emerald-100/80 leading-relaxed font-normal">
                When you click <strong>Hide Case Study</strong>, the project card disappears from the
                portfolio home page for standard visitors. Anyone attempting to navigate directly to the URL
                will see a protected screen. As an authenticated admin, you will always be able to view and preview
                the hidden case studies with a persistent admin status bar.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
