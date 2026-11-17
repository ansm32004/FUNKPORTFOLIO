"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { SectionHeading, Accent, Tape } from "./Stationery";

// Funky Hover Jokes for Each Experience Bar
const FUNKY_HOVER_JOKES = {
  jarvis: "Strategy Consulting UX — Pushing pixels while consultants ask 'Can we make it pop?'",
  "gdsc-ncr": "Organizing events for 1,000+ devs — Managing Discord channels faster than my caffeine intake",
  wraptax: "Making taxes feel human — Convinced tax accountants that 8px padding is non-negotiable",
  onnoff: "Co-founder life — Wearing 14 different hats and debugging frontend at 3 AM",
  indidino: "Design + Code — React components so smooth they make developers cry tears of joy",
  "local-network": "President duties — Hosting hybrid summits while maintaining 100% vibe integrity",
  "southern-immigration": "User journeys smoother than airport security... okay, smoother than government portals",
  "gdsc-dtc": "Designing 120+ event posters faster than people could pick an event date",
};

const TIMELINE_DATA = [
  {
    id: "jarvis",
    trackNumber: "01",
    role: "UI/UX Intern",
    company: "Jarvis Tech & Strategy Consulting",
    period: "Jun 2026 - Present",
    duration: "2 mos",
    location: "Noida, India",
    type: "Internship",
    startPct: 88,
    widthPct: 12,
    timePos: 94,
    yearLabel: "2026.06",
    barStyle: "bg-blue-100 border-blue-300 text-blue-900 hover:bg-blue-200",
    badgeStyle: "bg-blue-600 text-white",
    fullJoke: "Crafting UI/UX solutions for strategy consulting. Pushing pixels with strategic precision.",
    parameters: {
      "Domain": "Strategy & Consulting UX",
      "Interface system": "UED Frameworks",
      "Status": "Active",
      "Location": "Noida, India",
    },
  },
  {
    id: "gdsc-ncr",
    trackNumber: "02",
    role: "Organizer",
    company: "GDSC Delhi-NCR",
    period: "Mar 2024 - Jul 2026",
    duration: "2 yrs 5 mos",
    location: "New Delhi, India",
    type: "Self-employed",
    startPct: 12,
    widthPct: 76,
    timePos: 82,
    yearLabel: "2026.04",
    barStyle: "bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200",
    badgeStyle: "bg-amber-600 text-white",
    fullJoke: "Organizing ecosystem events across Delhi-NCR. Managing developer communities faster than Discord notifications.",
    parameters: {
      "Community": "1,000+ developers",
      "Events orchestrated": "Hackathons & Summits",
      "Execution speed": "Flawless",
      "Location": "New Delhi, India",
    },
  },
  {
    id: "wraptax",
    trackNumber: "03",
    role: "Product Design Intern",
    company: "WrapTax®",
    period: "Sep 2025 - Jan 2026",
    duration: "5 mos",
    location: "Gurugram, India",
    type: "Internship",
    startPct: 66,
    widthPct: 20,
    timePos: 72,
    yearLabel: "2025.10",
    barStyle: "bg-purple-100 border-purple-300 text-purple-900 hover:bg-purple-200",
    badgeStyle: "bg-purple-600 text-white",
    fullJoke: "Making tax workflows human-friendly. Simplifying complex financial interfaces with clean design systems.",
    parameters: {
      "Product scope": "Tax & Fintech UI",
      "Tax complexity": "Simplified",
      "Design tokens": "Enforced",
      "Location": "Gurugram, India",
    },
  },
  {
    id: "onnoff",
    trackNumber: "04",
    role: "Co-Founder",
    company: "OnnOff",
    period: "Oct 2024 - Nov 2025",
    duration: "1 yr 2 mos",
    location: "New Delhi, India",
    type: "Full-time",
    startPct: 34,
    widthPct: 40,
    timePos: 54,
    yearLabel: "2025.04",
    barStyle: "bg-rose-100 border-rose-300 text-rose-900 hover:bg-rose-200",
    badgeStyle: "bg-rose-600 text-white",
    fullJoke: "Building from zero to one. Wearing every hat from design to code and midnight architecture.",
    parameters: {
      "Startup hats": "All of them",
      "Zero_To_One": "Executed",
      "Architecture": "Full Stack & Design",
      "Location": "New Delhi, India",
    },
  },
  {
    id: "indidino",
    trackNumber: "05",
    role: "Design & Tech Intern",
    company: "IndiDino Ventures",
    period: "Mar 2025 - May 2025",
    duration: "3 mos",
    location: "Remote",
    type: "Internship",
    startPct: 48,
    widthPct: 12,
    timePos: 52,
    yearLabel: "2025.03",
    barStyle: "bg-emerald-100 border-emerald-300 text-emerald-900 hover:bg-emerald-200",
    badgeStyle: "bg-emerald-600 text-white",
    fullJoke: "Working at the intersection of creativity and technology. Designing user-centric experiences and collaborating on front-end tasks.",
    parameters: {
      "Intersection": "Creativity & Code",
      "Frontend dev": "Interactive Motion UI",
      "Branding": "Digital Assets",
      "Location": "Remote",
    },
  },
  {
    id: "local-network",
    trackNumber: "06",
    role: "President & Organizer",
    company: "Local Network",
    period: "Jul 2024 - Sep 2025",
    duration: "1 yr 3 mos",
    location: "Greater Delhi Area",
    type: "Full-time / Part-time",
    startPct: 26,
    widthPct: 44,
    timePos: 42,
    yearLabel: "2024.10",
    barStyle: "bg-sky-100 border-sky-300 text-sky-900 hover:bg-sky-200",
    badgeStyle: "bg-sky-600 text-white",
    fullJoke: "Leading regional student networks and organizing hybrid summits across Greater Delhi.",
    parameters: {
      "Leadership role": "President (1 yr)",
      "Organizer role": "Part-time (4 mos)",
      "Team impact": "High",
      "Location": "Greater Delhi Area",
    },
  },
  {
    id: "southern-immigration",
    trackNumber: "07",
    role: "Web Design Intern",
    company: "Southern Immigration",
    period: "Jul 2024 - Jan 2025",
    duration: "7 mos",
    location: "Remote",
    type: "Full-time",
    startPct: 26,
    widthPct: 24,
    timePos: 32,
    yearLabel: "2024.07",
    barStyle: "bg-teal-100 border-teal-300 text-teal-900 hover:bg-teal-200",
    badgeStyle: "bg-teal-600 text-white",
    fullJoke: "Designed user journeys smoother than airport security. (Okay... maybe smoother than government websites.)",
    parameters: {
      "User journeys": "100% Smooth",
      "Questions asked": "642 times",
      "Location": "Remote",
      "Status": "Shipped",
    },
  },
  {
    id: "gdsc-dtc",
    trackNumber: "08",
    role: "Graphic Designer",
    company: "GDSC-DTC",
    period: "Nov 2023 - Sep 2024",
    duration: "11 mos",
    location: "New Delhi, India",
    type: "Full-time",
    startPct: 0,
    widthPct: 34,
    timePos: 12,
    yearLabel: "2023.11",
    barStyle: "bg-indigo-100 border-indigo-300 text-indigo-900 hover:bg-indigo-200",
    badgeStyle: "bg-indigo-600 text-white",
    fullJoke: "Designed event identities. Created posters faster than people could decide the event date.",
    parameters: {
      "Posters exported": "120+ assets",
      "Export speed": "Ultra-fast",
      "Event attendees": "500+ students",
      "Location": "New Delhi, India",
    },
  },
];

export default function ExperienceTimeline() {
  const [activeId, setActiveId] = useState("jarvis");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  const visibleData = TIMELINE_DATA;
  const activeItem = TIMELINE_DATA.find((item) => item.id === activeId) || TIMELINE_DATA[0];

  // Auto-play playback loop when play button is active
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveId((prev) => {
          const currentIndex = TIMELINE_DATA.findIndex((item) => item.id === prev);
          const nextIndex = (currentIndex + 1) % TIMELINE_DATA.length;
          return TIMELINE_DATA[nextIndex].id;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section id="experience" className="relative z-10 py-16 sm:py-24 px-4 sm:px-12 md:px-20 bg-cutting-mat select-none">
      <div className="max-w-7xl mx-auto">
        
        <SectionHeading
          index="02"
          label="Experience"
          title={<>Work, on a <Accent>timeline</Accent></>}
          aside={<span className="block max-w-sm md:ml-auto">Laid out like a motion editor — bar length is time spent. Hit play, or hover (tap, on a phone) a role for the honest version.</span>}
        />

        {/* MOTION DESIGN SOFTWARE SHELL — CLEAN WHITE PAPER THEME */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="paper relative p-5 text-ink sm:p-8"
        >
          <Tape className="-top-3 left-10" rotate={-5} />
          <Tape className="-top-3 right-10" rotate={4} />
          {/* Top Software Toolbar Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-rule">
            {/* Mac Window Dots + Title */}
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-medium text-ink">experience.timeline</span>
              <span className="text-[12px] text-ink-3">
                {TIMELINE_DATA.length} roles
              </span>
            </div>

            {/* Center Timecode & Play Controls */}
            <div className="flex items-center gap-3 rounded-full border border-rule bg-paper-2 py-1 pl-1 pr-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-medium transition-colors ${
                  isPlaying ? "bg-pin text-white" : "bg-ink text-paper hover:bg-black"
                }`}
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </button>

              <span className="font-mono text-[12px] tabular-nums text-ink-2">
                {activeItem.yearLabel}
              </span>

              <button
                onClick={() => {
                  setIsPlaying(false);
                  setActiveId("jarvis");
                }}
                className="text-ink-3 hover:text-ink transition-colors cursor-pointer"
                title="Reset Timeline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Instruction Badge */}
            <span className="hidden font-handwriting text-[18px] text-ink-3 sm:inline">hover a bar ↓</span>
          </div>

          {/* TIMELINE TRACKS AREA */}
          <div className="relative hidden grid-cols-12 gap-0 border-b border-rule py-6 sm:grid">
            
            {/* Left Track Names Column */}
            <div className="col-span-5 sm:col-span-4 space-y-3 pr-4 border-r border-rule">
              <div className="pb-1 text-[11px] text-ink-3">Company</div>

              {visibleData.map((item) => {
                const isSelected = activeId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                    className={`flex h-8 cursor-pointer items-center justify-between rounded-[4px] px-2.5 text-[13px] transition-colors ${
                      isSelected
                        ? "bg-ink text-paper"
                        : "text-ink-2 hover:bg-paper-2 hover:text-ink"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-[11px] tabular-nums opacity-50">{item.trackNumber}</span>
                      <span className="truncate">{item.company}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Horizontal Ruler & Proportional Keyframe Bars */}
            <div className="col-span-7 sm:col-span-8 pl-4 relative">
              
              {/* Ruler Header */}
              <div className="mb-3 flex items-center justify-between pb-1 font-mono text-[11px] text-ink-3">
                <span>Nov 2023</span>
                <span>Jul 2024</span>
                <span>Jan 2025</span>
                <span>Sep 2025</span>
                <span>Jun 2026</span>
              </div>

              {/* Red Playhead Indicator */}
              <motion.div
                animate={{ left: `${activeItem.timePos}%` }}
                transition={{ type: "spring", stiffness: 250, damping: 22 }}
                className="absolute top-0 bottom-0 w-px bg-pin z-30 pointer-events-none"
              >
                <div className="h-3 w-3 -translate-x-[5.5px] -translate-y-1 rounded-full bg-pin shadow-[0_2px_4px_rgb(0_0_0/0.3)]" />
              </motion.div>

              {/* Proportional Keyframe Bars */}
              <div className="space-y-3 pt-1">
                {visibleData.map((item) => {
                  const isSelected = activeId === item.id;
                  const isHovered = hoveredId === item.id;
                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="relative flex h-8 items-center rounded-[4px] bg-paper-2/70"
                    >
                      <button
                        onClick={() => setActiveId(item.id)}
                        style={{
                          left: `${item.startPct}%`,
                          width: `${item.widthPct}%`,
                        }}
                        className={`absolute flex h-6 cursor-pointer items-center justify-between rounded-[3px] px-2 text-[12px] transition-colors ${
                          isSelected
                            ? "z-20 bg-ink text-paper"
                            : "z-10 border border-ink/15 bg-paper text-ink-2 hover:border-ink/40 hover:text-ink"
                        }`}
                      >
                        {/* Keyframe Diamond + Role Title */}
                        <div className="flex items-center gap-1.5 truncate">
                          <span className={`inline-block h-1.5 w-1.5 shrink-0 rotate-45 ${isSelected ? "bg-note-yellow" : "bg-ink/40"}`} />
                          <span className="truncate text-[11px]">{item.role}</span>
                        </div>

                        <span className="hidden shrink-0 font-mono text-[11px] opacity-60 lg:inline">
                          {item.duration}
                        </span>
                      </button>

                      {/* FUNKY HOVER POPOVER TOOLTIP ON EXPERIENCE BAR */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: -36, rotate: -1 }}
                            animate={{ opacity: 1, y: -44, rotate: -1 }}
                            exit={{ opacity: 0, y: -38, rotate: -1 }}
                            transition={{ duration: 0.2 }}
                            style={{ left: `${item.startPct}%` }}
                            className="shadow-note pointer-events-none absolute -top-10 z-40 max-w-xs whitespace-normal rounded-[2px] bg-note-yellow px-3.5 py-2.5 font-handwriting text-[17px] leading-tight text-[#3d3209]"
                          >
                            <p>{FUNKY_HOVER_JOKES[item.id] || item.fullJoke}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* PHONES: stacked roles, each with a mini track on the shared time axis */}
          <ol className="border-b border-rule py-4 sm:hidden">
            {TIMELINE_DATA.map((item) => {
              const isSelected = activeId === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveId(item.id)}
                    aria-expanded={isSelected}
                    className={`w-full rounded-[4px] px-3 py-3 text-left transition-colors ${isSelected ? "bg-paper-2" : ""}`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="min-w-0 truncate text-[15px] text-ink">{item.company}</span>
                      <span className="shrink-0 font-mono text-[11px] text-ink-3">{item.duration}</span>
                    </div>
                    <div className="mt-0.5 text-[13px] text-ink-3">{item.role}</div>
                    <div className="relative mt-2.5 h-1.5 rounded-full bg-rule/70">
                      <span
                        className={`absolute inset-y-0 rounded-full ${isSelected ? "bg-ink" : "bg-ink/30"}`}
                        style={{ left: `${item.startPct}%`, width: `${Math.max(item.widthPct, 3)}%` }}
                      />
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="shadow-note mx-3 my-3 -rotate-1 rounded-[2px] bg-note-yellow px-3.5 py-2.5 font-handwriting text-[18px] leading-tight text-[#3d3209]">
                          {FUNKY_HOVER_JOKES[item.id] || item.fullJoke}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
            <li className="flex justify-between px-3 pt-2 font-mono text-[10px] text-ink-3">
              <span>Nov 2023</span>
              <span>Jun 2026</span>
            </li>
          </ol>

          {/* KEYFRAME INSPECTOR PANEL (Bottom Clean Details Box) */}
          <div className="pt-6 sm:pt-8">


            <div className="grid grid-cols-1 items-start gap-8 pt-2 lg:grid-cols-12">
              
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-2">
                <p className="text-[13px] text-ink-3">
                  {activeItem.period} · {activeItem.duration} · {activeItem.type}
                </p>

                <h3 className="pt-1 text-[32px] font-medium leading-tight tracking-[-0.02em] text-ink">
                  {activeItem.role}
                </h3>

                <p className="text-[15px] text-ink-2">
                  {activeItem.company} • {activeItem.location}
                </p>

                <p className="max-w-lg pt-2 text-[15px] leading-relaxed text-ink-3">
                  {activeItem.fullJoke}
                </p>
              </div>

              {/* Right Keyframe Parameters Grid */}
              <dl className="lg:col-span-5 divide-y divide-rule border-y border-rule text-[13px]">

                {Object.entries(activeItem.parameters).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between gap-4 py-2">
                    <dt className="text-ink-3">{key}</dt>
                    <dd className="text-right text-ink">{val}</dd>
                  </div>
                ))}
              </dl>

            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
