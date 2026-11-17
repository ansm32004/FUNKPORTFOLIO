"use client";

import React from "react";
import Image from "next/image";
import { ChevronDown, Maximize2 } from "lucide-react";
import PhoneMockup from "@/components/PhoneMockup";

export default function CaseStudyHero({
  category = "PRODUCT DESIGN",
  title,
  subtitle,
  metadata = [],
  deviceType = "laptop", // "laptop" | "phone"
  mainImage,
  floatingElements = [],
  accentColor = "#2563EB",
  accentClass = "text-ink",
  badgeBgClass = "bg-note-yellow/40 text-ink border-note-yellow",
  onImageClick,
  scrollTargetId = "overview",
  customGraphic = null,
}) {
  const scrollToNext = () => {
    const el = document.getElementById(scrollTargetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full pt-4 sm:pt-8 pb-12 sm:pb-16 space-y-10 sm:space-y-14">
      {/* ───────────────────────────────────────────────────────────────────
          A. MINIMAL EDITORIAL INTRODUCTION
      ─────────────────────────────────────────────────────────────────── */}
      <div className="space-y-4 max-w-3xl">
        {/* Category Label */}
        <p className="inline-flex items-center gap-2 text-[13px] text-ink-2">
          <span className="h-1.5 w-1.5 rounded-full bg-pin" />
          {category}
        </p>

        {/* Confident 1-2 Line Headline */}
        <h1 className="text-[40px] font-medium leading-[1.04] tracking-[-0.035em] text-ink sm:text-6xl md:text-[72px]">
          {title}
        </h1>

        {/* Concise 1-2 Sentence Subtitle */}
        {subtitle && (
          <p className="max-w-2xl pt-1 text-[17px] leading-relaxed text-ink-2">
            {subtitle}
          </p>
        )}

        {/* Compact Metadata Row */}
        {metadata.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-rule pt-5 text-[14px] sm:grid-cols-4">
            {metadata.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <span className="text-[12px] text-ink-3">
                  {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
                </span>
                <p className="text-ink">{item.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ───────────────────────────────────────────────────────────────────
          B. CENTRAL PRODUCT SHOWCASE WITH RESTRAINED FLOATING ELEMENTS
      ─────────────────────────────────────────────────────────────────── */}
      <div className="relative w-full pt-2">
        {/* DESKTOP / LAPTOP DEVICE FRAME */}
        {deviceType === "laptop" && (
          <div className="relative mx-auto w-full max-w-4xl group">
            {/* Monitor / Laptop Screen Lid */}
            <div
              onClick={() => onImageClick && onImageClick(mainImage)}
              className="relative rounded-t-2xl sm:rounded-t-3xl bg-ink p-2 sm:p-3 md:p-3.5 shadow-2xl border border-slate-800 cursor-pointer transition-transform duration-300 group-hover:scale-[1.005]"
            >
              {/* Webcam dot */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-700 ring-1 ring-slate-800" />

              {/* Screen Frame */}
              <div className="rounded-lg sm:rounded-[4px] overflow-hidden bg-slate-950 border border-slate-800/80 relative">
                {/* Browser Sub-Header URL Bar */}
                <div className="bg-slate-900/90 px-3 py-1.5 flex items-center justify-between border-b border-slate-800/70 text-[10px] text-ink-3 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-ink-3 truncate hidden sm:inline">
                      {mainImage.urlText || "app.internal/dashboard"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-ink-3 hover:text-white transition-colors">
                    <Maximize2 className="w-3 h-3" />
                    <span className="hidden sm:inline">Click to Expand</span>
                  </div>
                </div>

                {/* Main Product Screenshot */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/10.2] overflow-hidden bg-slate-950">
                  <Image
                    src={mainImage.src}
                    alt={mainImage.alt}
                    width={mainImage.width || 1800}
                    height={mainImage.height || 1100}
                    className="w-full h-full object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Laptop Base / Deck */}
            <div className="relative -mt-0.5 mx-auto h-3.5 sm:h-4.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 rounded-b-xl sm:rounded-b-2xl shadow-xl flex items-center justify-center border-t border-slate-600/50">
              <div className="w-16 sm:w-20 h-1 sm:h-1.5 bg-slate-950/80 rounded-b-md" />
            </div>

            {/* Ambient Base Shadow */}
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-8 blur-2xl -z-10 rounded-full bg-black opacity-25"
            />
          </div>
        )}

        {/* MOBILE SMARTPHONE DEVICE FRAME */}
        {deviceType === "phone" && (
          <PhoneMockup
            src={mainImage.src}
            alt={mainImage.alt}
            width={mainImage.width || 402}
            height={mainImage.height || 874}
            statusBar={mainImage.statusBar}
            priority
            onClick={onImageClick ? () => onImageClick(mainImage) : undefined}
            className="max-w-[260px] sm:max-w-[300px]"
          />
        )}

        {/* ─────────────────────────────────────────────────────────────────
            C. RESTRAINED FLOATING SUPPORTING ELEMENTS
            (Absolute on large desktop with breathing room; flow naturally below on mobile/tablet)
        ───────────────────────────────────────────────────────────────── */}
        {floatingElements.length > 0 && (
          <>
            {/* Desktop Floating Badges (Hidden on mobile/tablet to avoid obscuring mockup) */}
            <div className="hidden lg:block">
              {floatingElements.map((elem, idx) => {
                const positionStyles = {
                  "top-left": "absolute -top-3 -left-6 max-w-xs",
                  "top-right": "absolute -top-3 -right-6 max-w-xs",
                  "bottom-left": "absolute -bottom-4 -left-8 max-w-xs",
                  "bottom-right": "absolute -bottom-4 -right-8 max-w-xs",
                  "center-left": "absolute top-1/2 -translate-y-1/2 -left-12 max-w-xs",
                  "center-right": "absolute top-1/2 -translate-y-1/2 -right-12 max-w-xs",
                }[elem.position || "top-right"];

                return (
                  <div
                    key={idx}
                    className={`${positionStyles} z-20 bg-paper/95 backdrop-blur-xl p-3.5 rounded-[6px] border border-rule shadow-xl shadow-black/20 space-y-1`}
                  >
                    <div className="flex items-center gap-2">
                      {elem.icon && (
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-ink shrink-0"
                          style={{ backgroundColor: accentColor }}
                        >
                          {elem.icon}
                        </div>
                      )}
                      <span className="text-[12px] font-medium text-ink leading-tight">
                        {elem.title}
                      </span>
                    </div>
                    {elem.subtitle && (
                      <p className="text-[10px] text-ink-3 leading-relaxed pl-8">
                        {elem.subtitle}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile & Tablet Supporting Elements Row (Neat Horizontal Stack) */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-6">
              {floatingElements.map((elem, idx) => (
                <div
                  key={idx}
                  className="bg-paper/90 p-3 rounded-[6px] border border-rule flex items-center gap-2.5 text-left"
                >
                  {elem.icon && (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-ink shrink-0"
                      style={{ backgroundColor: accentColor }}
                    >
                      {elem.icon}
                    </div>
                  )}
                  <div className="space-y-0.5">
                    <span className="text-[13px] font-medium text-ink block leading-tight">
                      {elem.title}
                    </span>
                    {elem.subtitle && (
                      <span className="text-[10px] text-ink-3 block leading-snug">
                        {elem.subtitle}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Custom graphic slot (e.g. interactive Vammy Mascot) */}
        {customGraphic && (
          <div className="pt-4 flex justify-center">{customGraphic}</div>
        )}
      </div>

      {/* ───────────────────────────────────────────────────────────────────
          D. SUBTLE SCROLL CUE TRANSITION INTO CASE STUDY
      ─────────────────────────────────────────────────────────────────── */}
      <div className="pt-4 sm:pt-6 flex flex-col items-center justify-center text-center space-y-1.5">
        <button
          onClick={scrollToNext}
          className="group inline-flex cursor-pointer items-center gap-1.5 font-handwriting text-[20px] text-ink-3 transition-colors hover:text-ink"
        >
          <span>read on</span>
          <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
        </button>
        <div className="h-6 w-px bg-rule" />
      </div>
    </section>
  );
}

