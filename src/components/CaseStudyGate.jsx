"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Eye, Shield, ArrowLeft, RefreshCw, CheckCircle2 } from "lucide-react";

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
  const [unlockPassword, setUnlockPassword] = useState("");
  const [unlockError, setUnlockError] = useState("");
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleToggle = async (targetVisible) => {
    setIsUpdating(true);
    setFeedback("");
    try {
      const res = await fetch("/api/case-studies/visibility", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          visible: targetVisible,
          username: "ansm",
          password: "ansmfx32004"
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsVisible(targetVisible);
        setFeedback(
          targetVisible
            ? "Case study unhidden and published!"
            : "Case study hidden from public."
        );
        setTimeout(() => {
          window.location.reload();
        }, 600);
      } else {
        alert(data.error || "Failed to update visibility");
      }
    } catch {
      alert("Failed to update visibility");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleQuickUnlock = async (e) => {
    e.preventDefault();
    setIsUnlocking(true);
    setUnlockError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "ansm", password: unlockPassword })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        // Also unhide this case study immediately
        await fetch("/api/case-studies/visibility", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug,
            visible: true,
            username: "ansm",
            password: "ansmfx32004"
          })
        });
        window.location.reload();
      } else {
        setUnlockError(data.error || "Incorrect password");
      }
    } catch {
      setUnlockError("Unlock failed. Check connection.");
    } finally {
      setIsUnlocking(false);
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
            This project is temporarily hidden from public view. If you are the author, you can unlock and unhide it below.
          </p>

          {/* Quick Unlock Form */}
          <form onSubmit={handleQuickUnlock} className="pt-2 max-w-xs mx-auto space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="password"
                placeholder="Enter password to unhide..."
                value={unlockPassword}
                onChange={(e) => setUnlockPassword(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-emerald-200/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 w-full"
              />
              <button
                type="submit"
                disabled={isUnlocking || !unlockPassword}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs whitespace-nowrap cursor-pointer disabled:opacity-50 transition-all shadow-md"
              >
                {isUnlocking ? "..." : "Unhide"}
              </button>
            </div>
            {unlockError && (
              <p className="text-[11px] font-medium text-rose-400">{unlockError}</p>
            )}
          </form>

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
              <span>Admin Dashboard</span>
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

  // Case 2: Render children. If admin is viewing a HIDDEN case study, show an amber reminder bar with a Publish button.
  return (
    <div className="relative">
      {isAdmin && !isVisible && (
        <div className="sticky top-0 z-50 px-4 py-2.5 backdrop-blur-md border-b text-xs font-mono bg-amber-950/95 border-amber-600/60 text-amber-200">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="font-bold">Admin Mode:</span>
              <span>This case study is HIDDEN from the public.</span>
              {feedback && (
                <span className="inline-flex items-center gap-1 font-bold text-white bg-emerald-600 px-2 py-0.5 rounded text-[10px]">
                  <CheckCircle2 className="w-3 h-3" /> {feedback}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggle(true)}
                disabled={isUpdating}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-extrabold shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                {isUpdating ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Unhide Case Study (Make Public)</span>
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
