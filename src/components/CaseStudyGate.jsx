"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Pin, Accent } from "./Stationery";
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
          visible: targetVisible
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
            visible: true
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
      <div className="bg-cutting-mat flex min-h-screen flex-col px-4 py-6 font-sans sm:px-8">
        <header className="mx-auto flex w-full max-w-5xl items-center justify-between text-[13px] text-chalk-2">
          <Link href="/" className="inline-flex items-center gap-2 transition-colors hover:text-chalk">
            <ArrowLeft className="h-4 w-4" />
            Portfolio
          </Link>
          <span>Private case study</span>
        </header>

        <main className="mx-auto my-auto w-full max-w-md py-16">
          <div className="paper relative -rotate-1 p-8 sm:p-10">
            <Pin className="-top-2 left-1/2 -translate-x-1/2" />

            <p className="flex items-center gap-2 text-[13px] text-ink-3">
              <Lock className="h-3.5 w-3.5" />
              Not public yet
            </p>
            <h1 className="mt-4 text-[34px] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
              Still in the <Accent>drawer.</Accent>
            </h1>
            <p className="mt-3 text-[15px] text-ink-2">{title}</p>
            <p className="mt-4 text-[14px] leading-relaxed text-ink-3">
              This case study is being polished and is hidden for now. Check back soon — or, if you&apos;re the author, unlock it below.
            </p>

            <form onSubmit={handleQuickUnlock} className="mt-6 flex items-center gap-2">
              <input
                type="password"
                aria-label="Admin password"
                placeholder="Password"
                value={unlockPassword}
                onChange={(e) => setUnlockPassword(e.target.value)}
                className="w-full rounded-full border border-rule bg-paper-2 px-4 py-2.5 text-[16px] text-ink placeholder:text-ink-3 focus:border-ink/40 focus:outline-none sm:text-[14px]"
              />
              <button
                type="submit"
                disabled={isUnlocking || !unlockPassword}
                className="shrink-0 cursor-pointer rounded-full bg-ink px-4 py-2.5 text-[14px] font-medium text-paper transition-colors hover:bg-black disabled:opacity-40"
              >
                {isUnlocking ? "…" : "Unhide"}
              </button>
            </form>
            {unlockError && <p className="mt-2 text-[13px] text-pin">{unlockError}</p>}

            <div className="mt-8 flex items-center justify-between border-t border-dashed border-rule pt-5 text-[14px]">
              <Link href="/#work" className="text-ink transition-colors hover:text-pin">
                ← See other work
              </Link>
              <Link href="/admin" className="inline-flex items-center gap-1.5 text-ink-3 transition-colors hover:text-ink">
                <Shield className="h-3.5 w-3.5" />
                Admin
              </Link>
            </div>
          </div>

          <div className="shadow-note note-texture relative mx-auto -mt-4 ml-auto w-48 rotate-3 rounded-[2px] bg-note-yellow px-4 py-3">
            <p className="font-handwriting text-[19px] leading-tight text-[#3d3209]">
              good things take a few more passes.
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Case 2: Render children. If admin is viewing a HIDDEN case study, show an amber reminder bar with a Publish button.
  return (
    <div className="relative">
      {isAdmin && !isVisible && (
        <div className="sticky top-0 z-[60] border-b border-[#3d3209]/20 bg-note-yellow px-4 py-2.5 text-[13px] text-[#3d3209]">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-pin" />
              <span className="font-medium">Admin view:</span>
              <span>this case study is hidden from the public.</span>
              {feedback && (
                <span className="inline-flex items-center gap-1 rounded-full bg-ink px-2 py-0.5 text-[12px] text-paper">
                  <CheckCircle2 className="w-3 h-3" /> {feedback}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggle(true)}
                disabled={isUpdating}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-[13px] font-medium text-paper transition-colors hover:bg-black disabled:opacity-50"
              >
                {isUpdating ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Make public</span>
                  </>
                )}
              </button>

              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#3d3209]/25 px-3 py-1 text-[13px] transition-colors hover:bg-[#3d3209]/10"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin panel</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {children}
    </div>
  );
}
