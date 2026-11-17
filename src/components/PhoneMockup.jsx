"use client";

import React from "react";
import Image from "next/image";

/*
  A realistic iPhone (15/16 Pro proportions) drawn in CSS.

  Everything is sized in container-query units (cqw) relative to the phone's own
  width, so bezels, corner radii, the Dynamic Island and the buttons stay in
  proportion at any size.

  - The screen is a fixed 402×874 viewport. Taller "scroll capture" screenshots
    scroll inside it, like a real phone.
  - `statusBar`: draw an iOS status bar for screenshots that don't include one.
*/

function StatusBar() {
  return (
    <div className="pointer-events-none sticky top-0 z-10 flex h-[12.5cqw] items-center justify-between bg-[#f7f7f7]/90 px-[7.5cqw] pt-[1.5cqw] text-[#111] backdrop-blur-sm">
      <span className="text-[3.9cqw] font-semibold tracking-tight">9:41</span>
      <span className="flex items-center gap-[1.4cqw]">
        {/* signal */}
        <svg viewBox="0 0 18 12" className="h-[2.9cqw]" fill="currentColor" aria-hidden>
          <rect x="0" y="8" width="3" height="4" rx="0.8" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" />
          <rect x="10" y="3" width="3" height="9" rx="0.8" />
          <rect x="15" y="0" width="3" height="12" rx="0.8" />
        </svg>
        {/* wifi */}
        <svg viewBox="0 0 16 12" className="h-[2.9cqw]" fill="currentColor" aria-hidden>
          <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.2A10.2 10.2 0 0 0 8 .5C5.2.5 2.7 1.6.8 3.4L2 4.6a8.5 8.5 0 0 1 6-2.4Zm0 3.4c1.4 0 2.6.5 3.6 1.4l1.2-1.2A6.8 6.8 0 0 0 8 3.9c-1.8 0-3.5.7-4.8 1.9l1.2 1.2c1-.9 2.2-1.4 3.6-1.4Zm0 3.4c-.6 0-1.2.2-1.6.6L8 11.2l1.6-1.6c-.4-.4-1-.6-1.6-.6Z" />
        </svg>
        {/* battery */}
        <svg viewBox="0 0 27 12" className="h-[2.9cqw]" aria-hidden>
          <rect x="0.5" y="0.5" width="23" height="11" rx="3.2" fill="none" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="18" height="8" rx="2" fill="currentColor" />
          <path d="M25 4v4c.8-.3 1.4-1.1 1.4-2s-.6-1.7-1.4-2Z" fill="currentColor" opacity="0.4" />
        </svg>
      </span>
    </div>
  );
}

export default function PhoneMockup({
  src,
  alt,
  width = 402,
  height = 874,
  statusBar = false,
  priority = false,
  onClick,
  className = "",
  tilt = 0,
  // Extra space (in cqw) above screenshots whose content starts too close to the
  // top, so the Dynamic Island doesn't sit on it. Filled with `insetColor`.
  topInset = 0,
  insetColor = "#f7f7f7",
}) {
  const scrolls = height / width > 874 / 402 + 0.02;

  return (
    <div
      className={`relative mx-auto w-full [container-type:inline-size] ${className}`}
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
    >
      {/* Side buttons (sit just outside the frame) */}
      <span aria-hidden className="absolute -left-[0.9cqw] top-[17cqw] h-[6cqw] w-[1.1cqw] rounded-l-[0.6cqw] bg-gradient-to-r from-[#3a3a3c] to-[#1c1c1e]" />
      <span aria-hidden className="absolute -left-[0.9cqw] top-[28cqw] h-[11cqw] w-[1.1cqw] rounded-l-[0.6cqw] bg-gradient-to-r from-[#3a3a3c] to-[#1c1c1e]" />
      <span aria-hidden className="absolute -left-[0.9cqw] top-[41.5cqw] h-[11cqw] w-[1.1cqw] rounded-l-[0.6cqw] bg-gradient-to-r from-[#3a3a3c] to-[#1c1c1e]" />
      <span aria-hidden className="absolute -right-[0.9cqw] top-[33cqw] h-[17cqw] w-[1.1cqw] rounded-r-[0.6cqw] bg-gradient-to-l from-[#3a3a3c] to-[#1c1c1e]" />

      {/* Titanium frame */}
      <div
        onClick={onClick}
        className={`relative rounded-[15.5cqw] p-[0.9cqw] shadow-[0_2px_3px_rgb(0_0_0/0.25),0_30px_50px_-20px_rgb(0_0_0/0.55),0_12px_20px_-12px_rgb(0_0_0/0.35)] ${onClick ? "cursor-zoom-in" : ""}`}
        style={{
          background:
            "linear-gradient(145deg, #5b5b5f 0%, #2a2a2d 18%, #1a1a1c 50%, #2e2e31 82%, #57575b 100%)",
        }}
      >
        {/* Black bezel */}
        <div className="rounded-[14.6cqw] bg-black p-[2.6cqw] shadow-[inset_0_0_0_0.3cqw_rgb(255_255_255/0.06)]">
          {/* Screen */}
          <div
            data-lenis-prevent
            className={`relative aspect-[402/874] overflow-x-hidden rounded-[12cqw] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              scrolls ? "overflow-y-auto overscroll-contain" : "overflow-hidden"
            }`}
            style={{ backgroundColor: insetColor, paddingTop: topInset ? `${topInset}cqw` : undefined }}
          >
            {statusBar && <StatusBar />}
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              unoptimized
              priority={priority}
              className={`block w-full ${scrolls ? "h-auto" : "h-full object-cover object-top"}`}
            />
          </div>

          {/* Dynamic Island */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[5.6cqw] z-20 flex h-[8.6cqw] w-[30cqw] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-[2.6cqw]"
          >
            <span className="h-[2.6cqw] w-[2.6cqw] rounded-full bg-[radial-gradient(circle_at_35%_35%,#2b3550,#0a0c12_70%)]" />
          </span>

          {/* Home indicator */}
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-[5cqw] left-1/2 z-20 h-[1.3cqw] w-[34cqw] -translate-x-1/2 rounded-full bg-black/80"
          />

          {/* Glass reflection */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-[3.5cqw] z-10 rounded-[12cqw] bg-[linear-gradient(115deg,rgb(255_255_255/0.14)_0%,rgb(255_255_255/0.04)_28%,transparent_42%)]"
          />
        </div>
      </div>

      {scrolls && (
        <p className="mt-3 text-center font-handwriting text-[17px] text-ink-3">scroll the screen ↕</p>
      )}
    </div>
  );
}
