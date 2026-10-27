"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Eye, EyeOff, Shield, ArrowLeft, RefreshCw, CheckCircle2 } from "lucide-react";

export default function CaseStudyGate({
  slug,
  title,
  isVisible: initialIsVisible,
  isAdmin,
  children
}) {
  const [isVisible, setIsVisible] = useState(initialIsVisible);
  const [isUpdating, setIsUpdating] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleToggle = async (targetVisible) => {
    setIsUpdating(true);
    setFeedback("");
    try {
      const res = await fetch("/api/case-studies/visibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, visible: targetVisible })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsVisible(targetVisible);
        setFeedback(
          targetVisible
            ? "Case study published to public!"
            : "Case study hidden from public."
        );
        setTimeout(() => setFeedback(""), 4000);
      } else {
        alert(data.error || "Failed to update visibility");
      }
    } catch {
      alert("Failed to update visibility");
    } finally {
      setIsUpdating(false);
    }
  };

  // Case 1: Hidden and user is NOT admin -> Render Access Restricted View
  if (!isVisible && !isAdmin) {
    return (
      <div className="min-h-screen bg-[#122B1E] text-white flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden font-sans">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-cutting-mat opacity-90 pointer-events-none" />

        {/* Top bar */}
        <header className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between pb-6 border-b border-emerald-800/40">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
          <span className="text-xs font-mono text-emerald-300/60 uppercase tracking-widest">
            Portfolio Security Gate
          </span>
        </header>

        {/* Center Card */}
        <div className="relative z-10 max-w-lg mx-auto w-full my-auto py-12 text-center space-y-6">
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-3xl bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center text-emerald-400 shadow-2xl mx-auto backdrop-blur-md">
              <Lock className="w-10 h-10" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
              !
            </span>
          </div>

          <div className="space-y-2">
            <span className="inline-block text-[11px] font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-800">
              Access Restricted
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Case Study is Private
            </h1>
            <p className="text-base text-emerald-200/80 font-medium">
              {title}
            </p>
          </div>

          <p className="text-sm text-emerald-100/70 leading-relaxed max-w-md mx-auto">
            This project is temporarily hidden from public access while undergoing content updates or curation. Please explore the rest of the portfolio or return later.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-slate-900 hover:bg-emerald-300 transition-colors shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore Portfolio</span>
            </Link>
            <Link
              href="/admin"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Admin Sign In</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 max-w-5xl mx-auto w-full text-center pt-6 border-t border-emerald-800/40 text-xs font-mono text-emerald-400/60">
          Portfolio CMS Visibility Engine &bull; Private Case Study Mode
        </footer>
      </div>
    );
  }

  // Case 2: User is admin, or project is visible -> Render children with sticky admin bar if applicable
  return (
    <div className="relative">
      {isAdmin && (
        <div className={`sticky top-0 z-50 px-4 py-2.5 backdrop-blur-md border-b text-xs font-mono transition-colors ${
          isVisible
            ? "bg-slate-900/90 border-slate-700 text-slate-200"
            : "bg-amber-950/95 border-amber-600/60 text-amber-200"
        }`}>
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isVisible ? "bg-emerald-400 animate-pulse" : "bg-amber-400 animate-ping"}`} />
              <span className="font-bold">
                Admin Mode:
              </span>
              <span>
                {isVisible ? "This case study is PUBLIC." : "This case study is HIDDEN from the public."}
              </span>
              {feedback && (
                <span className="inline-flex items-center gap-1 font-bold text-white bg-emerald-600 px-2 py-0.5 rounded text-[10px]">
                  <CheckCircle2 className="w-3 h-3" /> {feedback}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggle(!isVisible)}
                disabled={isUpdating}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isVisible
                    ? "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40"
                    : "bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-extrabold shadow-sm"
                }`}
              >
                {isUpdating ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : isVisible ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hide From Public</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Publish (Make Visible)</span>
                  </>
                )}
              </button>

              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
              >
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Admin Panel</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {children}
    </div>
  );
}

