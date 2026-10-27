"use client";

import React from "react";
import Image from "next/image";
import { ChevronDown, Maximize2 } from "lucide-react";

export default function CaseStudyHero({
  category = "PRODUCT DESIGN",
  title,
  subtitle,
  metadata = [],
  deviceType = "laptop", // "laptop" | "phone"
  mainImage,
  floatingElements = [],
  accentColor = "#2563EB",
  accentClass = "text-blue-600",
  badgeBgClass = "bg-blue-50 text-blue-700 border-blue-200/80",
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
        <div className="inline-flex items-center gap-2">
          <span
            className={`text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${badgeBgClass}`}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse"
              style={{ backgroundColor: accentColor }}
            />
            {category}
          </span>
        </div>

        {/* Confident 1-2 Line Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
          {title}
        </h1>

        {/* Concise 1-2 Sentence Subtitle */}
        {subtitle && (
          <p className="text-base sm:text-lg text-slate-500 font-normal leading-relaxed max-w-2xl pt-0.5">
            {subtitle}
          </p>
        )}

        {/* Compact Metadata Row */}
        {metadata.length > 0 && (
          <div className="pt-4 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-xs">
            {metadata.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <span className="text-slate-400 font-mono uppercase text-[10px] font-semibold tracking-wider">
                  {item.label}
                </span>
                <p className="font-bold text-slate-800 truncate">{item.value}</p>
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
              className="relative rounded-t-2xl sm:rounded-t-3xl bg-slate-900 p-2 sm:p-3 md:p-3.5 shadow-2xl border border-slate-800 cursor-pointer transition-transform duration-300 group-hover:scale-[1.005]"
            >
              {/* Webcam dot */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-700 ring-1 ring-slate-800" />

              {/* Screen Frame */}
              <div className="rounded-lg sm:rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 relative">
                {/* Browser Sub-Header URL Bar */}
                <div className="bg-slate-900/90 px-3 py-1.5 flex items-center justify-between border-b border-slate-800/70 text-[10px] text-slate-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-slate-400 truncate hidden sm:inline">
                      {mainImage.urlText || "app.internal/dashboard"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white transition-colors">
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
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-8 blur-2xl -z-10 rounded-full opacity-30"
              style={{ backgroundColor: accentColor }}
            />
          </div>
        )}

        {/* MOBILE SMARTPHONE DEVICE FRAME */}
        {deviceType === "phone" && (
          <div className="relative mx-auto w-full max-w-sm flex items-center justify-center group">
            {/* Phone Chassis */}
            <div
              onClick={() => onImageClick && onImageClick(mainImage)}
              className="relative w-full max-w-[280px] sm:max-w-[320px] rounded-[44px] bg-slate-900 p-3 sm:p-4 shadow-2xl border border-slate-800 cursor-pointer transition-transform duration-300 group-hover:scale-[1.01]"
            >
              {/* Dynamic Island */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-950 rounded-full z-20 flex items-center justify-end pr-2">
                <span className="w-2 h-2 rounded-full bg-slate-800" />
              </div>

              {/* Inner Screen */}
              <div className="rounded-[34px] overflow-hidden bg-white border border-slate-800/80 relative">
                <Image
                  src={mainImage.src}
                  alt={mainImage.alt}
                  width={mainImage.width || 500}
                  height={mainImage.height || 1080}
                  className="w-full h-auto block"
                  priority
                />
              </div>
            </div>

            {/* Ambient Glow */}
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 blur-2xl -z-10 rounded-full opacity-35"
              style={{ backgroundColor: accentColor }}
            />
          </div>
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
                    className={`${positionStyles} z-20 bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-900/10 space-y-1`}
                  >
                    <div className="flex items-center gap-2">
                      {elem.icon && (
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0"
                          style={{
                            backgroundColor: `${accentColor}15`,
                            color: accentColor,
                          }}
                        >
                          {elem.icon}
                        </div>
                      )}
                      <span className="text-[11px] font-bold text-slate-900 leading-tight">
                        {elem.title}
                      </span>
                    </div>
                    {elem.subtitle && (
                      <p className="text-[10px] text-slate-500 leading-relaxed pl-8">
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
                  className="bg-white/90 p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-2.5 text-left"
                >
                  {elem.icon && (
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0"
                      style={{
                        backgroundColor: `${accentColor}15`,
                        color: accentColor,
                      }}
                    >
                      {elem.icon}
                    </div>
                  )}
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900 block leading-tight">
                      {elem.title}
                    </span>
                    {elem.subtitle && (
                      <span className="text-[10px] text-slate-500 block leading-snug">
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
          className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-400 hover:text-slate-900 transition-colors group cursor-pointer"
        >
          <span>Explore Case Study</span>
          <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
        </button>
        <div className="w-px h-6 bg-gradient-to-b from-slate-200 to-transparent" />
      </div>
    </section>
  );
}

