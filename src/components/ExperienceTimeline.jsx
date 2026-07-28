"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Sliders, Eye, Lock, Layers, ChevronDown, ChevronUp } from "lucide-react";

// Funky Hover Jokes for Each Experience Bar
const FUNKY_HOVER_JOKES = {
  jarvis: "Strategy Consulting UX — Pushing pixels while consultants ask 'Can we make it pop?' 🎯",
  "gdsc-ncr": "Organizing events for 1,000+ devs — Managing Discord channels faster than my caffeine intake ☕",
  wraptax: "Making taxes feel human — Convinced tax accountants that 8px padding is non-negotiable 📉",
  onnoff: "Co-founder life — Wearing 14 different hats and debugging frontend at 3 AM 🚀",
  indidino: "Design + Code — React components so smooth they make developers cry tears of joy 💻",
  "local-network": "President duties — Hosting hybrid summits while maintaining 100% vibe integrity 💥",
  "southern-immigration": "User journeys smoother than airport security... okay, smoother than government portals ✈️",
  "gdsc-dtc": "Designing 120+ event posters faster than people could pick an event date 🎨",
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
      "Interface_System": "UED Frameworks",
      "Status": "Active Keyframe 🟢",
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
      "Events_Orchestrated": "Hackathons & Summits",
      "Execution_Speed": "Flawless ⚡",
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
      "Product_Scope": "Tax & Fintech UI",
      "Tax_Complexity": "Simplified 📉",
      "Design_Tokens": "Enforced",
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
      "Startup_Hats": "All of them 🎩",
      "Zero_To_One": "Executed 🚀",
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
      "Intersection": "Creativity & Code 💻",
      "Frontend_Dev": "Interactive Motion UI",
      "Branding": "Digital Assets",
      "Location": "Remote 🌐",
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
      "Leadership_Role": "President (1 yr)",
      "Organizer_Role": "Part-time (4 mos)",
      "Team_Impact": "High 💥",
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
      "User_Journeys": "100% Smooth",
      "Questions_Asked": "642 times",
      "Location": "Remote 🌐",
      "Status": "Shipped 🚀",
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
      "Posters_Exported": "120+ assets",
      "Export_Speed": "Ultra-fast ⚡",
      "Event_Attendees": "500+ students",
      "Location": "New Delhi, India",
    },
  },
];

export default function ExperienceTimeline() {
  const [activeId, setActiveId] = useState("jarvis");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  const visibleData = showAll ? TIMELINE_DATA : TIMELINE_DATA.slice(0, 3);
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
    <section id="experience" className="relative z-10 py-24 px-6 sm:px-12 md:px-20 bg-cutting-mat border-t border-emerald-950/80 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-emerald-800/40 gap-6"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <Sliders className="w-4 h-4" />
              <span>02 // Motion Timeline Editor</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Work Experience Timeline
            </h2>
          </div>
          <p className="text-sm sm:text-base text-emerald-100/70 max-w-md font-medium leading-relaxed">
            Clean motion software UI with keyframe bar widths proportional to employment duration.
          </p>
        </motion.div>

        {/* MOTION DESIGN SOFTWARE SHELL — CLEAN WHITE PAPER THEME */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 170, damping: 16 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-5 sm:p-7 text-slate-800 relative overflow-hidden"
        >
          {/* Top Software Toolbar Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
            {/* Mac Window Dots + Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-700 pl-1 truncate">
                Anshuman_Experience_Timeline.aep
              </span>
              <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                {showAll ? "ALL 8 ROLES" : "TOP 3 ROLES"}
              </span>
            </div>

            {/* Center Timecode & Play Controls */}
            <div className="flex items-center gap-4 bg-slate-100 px-4 py-1.5 rounded-xl border border-slate-200">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isPlaying
                    ? "bg-rose-600 text-white hover:bg-rose-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </button>

              <span className="text-xs font-mono font-bold text-slate-800 tracking-wider">
                TC: {activeItem.yearLabel}
              </span>

              <button
                onClick={() => {
                  setIsPlaying(false);
                  setActiveId("jarvis");
                }}
                className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                title="Reset Timeline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Instruction Badge */}
            <div className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
              <span>🖱️ Hover keyframe bars to see witty takes</span>
            </div>
          </div>

          {/* TIMELINE TRACKS AREA */}
          <div className="grid grid-cols-12 gap-0 py-5 border-b border-slate-200 relative">
            
            {/* Left Track Names Column */}
            <div className="col-span-5 sm:col-span-4 space-y-3 pr-4 border-r border-slate-200">
              <div className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider pb-1">
                Track Layer
              </div>

              {visibleData.map((item) => {
                const isSelected = activeId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                    className={`p-2 rounded-xl flex items-center justify-between text-xs font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-md"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[10px] font-mono opacity-60">{item.trackNumber}</span>
                      <span className="truncate">{item.company}</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-60 shrink-0">
                      <Eye className="w-3 h-3" />
                      <Lock className="w-3 h-3" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Horizontal Ruler & Proportional Keyframe Bars */}
            <div className="col-span-7 sm:col-span-8 pl-4 relative">
              
              {/* Ruler Header */}
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 border-b border-slate-200 pb-2 mb-3">
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
                className="absolute top-0 bottom-0 w-0.5 bg-rose-500 z-30 pointer-events-none"
              >
                <div className="w-3.5 h-3.5 bg-rose-500 rotate-45 -translate-x-[6px] -translate-y-1.5 shadow-md flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>
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
                      className="relative h-8 flex items-center bg-slate-50/50 rounded-xl px-1"
                    >
                      <button
                        onClick={() => setActiveId(item.id)}
                        style={{
                          left: `${item.startPct}%`,
                          width: `${item.widthPct}%`,
                        }}
                        className={`absolute h-7 rounded-lg border px-2.5 flex items-center justify-between text-xs font-bold transition-all cursor-pointer shadow-2xs ${item.barStyle} ${
                          isSelected ? "ring-2 ring-slate-900 scale-[1.02] z-20" : "z-10"
                        }`}
                      >
                        {/* Keyframe Diamond + Role Title */}
                        <div className="flex items-center gap-1.5 truncate">
                          <span className={`w-2 h-2 rotate-45 ${item.badgeStyle} shrink-0 inline-block`} />
                          <span className="truncate text-[11px]">{item.role}</span>
                        </div>

                        <span className="text-[10px] font-mono opacity-80 hidden lg:inline shrink-0">
                          {item.duration}
                        </span>
                      </button>

                      {/* FUNKY HOVER POPOVER TOOLTIP ON EXPERIENCE BAR */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.9 }}
                            animate={{ opacity: 1, y: -45, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            style={{ left: `${item.startPct}%` }}
                            className="absolute -top-10 z-40 bg-slate-900 text-white rounded-xl px-3.5 py-2 shadow-2xl border border-slate-700 max-w-xs text-[11px] font-semibold leading-snug pointer-events-none whitespace-normal"
                          >
                            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[10px] uppercase mb-0.5">
                              <span>😜 Funky Take:</span>
                            </div>
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

          {/* TOGGLE EXPAND BUTTON (Top 3 vs All 8 Roles) */}
          <div className="pt-4 pb-2 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all inline-flex items-center gap-1.5 cursor-pointer border border-slate-200 shadow-2xs"
            >
              <span>{showAll ? "Collapse Experience Timeline" : "Show 5 More Work Experiences"}</span>
              {showAll ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* KEYFRAME INSPECTOR PANEL (Bottom Clean Details Box) */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Selected Keyframe Inspector</span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">
                Track #{activeItem.trackNumber} // {activeItem.id}
              </span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${activeItem.badgeStyle}`}>
                    {activeItem.period} ({activeItem.duration})
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-600 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                    {activeItem.type}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 pt-1">
                  {activeItem.role}
                </h3>

                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  {activeItem.company} • {activeItem.location}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed italic pt-1">
                  "{activeItem.fullJoke}"
                </p>
              </div>

              {/* Right Keyframe Parameters Grid */}
              <div className="lg:col-span-5 bg-white rounded-xl p-4 border border-slate-200 space-y-2 font-mono text-xs shadow-2xs">
                <div className="text-[10px] text-slate-400 font-bold uppercase pb-1 border-b border-slate-100">
                  Keyframe Parameters & Metadata
                </div>

                {Object.entries(activeItem.parameters).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">{key}:</span>
                    <span className="font-bold text-slate-900">{val}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
