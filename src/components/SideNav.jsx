"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Briefcase,
  Sliders,
  Cpu,
  Compass,
  Camera,
  MessageSquareQuote,
  Mail,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Navigation,
} from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "Intro & Overview", num: "01", icon: Home, short: "Hero" },
  { id: "work", label: "Selected Work", num: "02", icon: Briefcase, short: "Work" },
  { id: "experience", label: "Motion Timeline", num: "03", icon: Sliders, short: "Timeline" },
  { id: "skills", label: "Synthesizer Deck", num: "04", icon: Cpu, short: "Skills" },
  { id: "process", label: "Work Process", num: "05", icon: Compass, short: "Process" },
  { id: "photography", label: "Lens Archive", num: "06", icon: Camera, short: "Photos" },
  { id: "reviews", label: "Client Reviews", num: "07", icon: MessageSquareQuote, short: "Reviews" },
  { id: "contact", label: "Initiate Contact", num: "08", icon: Mail, short: "Contact" },
];

export default function SideNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDockHovered, setIsDockHovered] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);

  // Scroll section tracking via IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const isVisible = isDockHovered || isExpanded;

  return (
    <aside
      aria-label="Side navigation"
      onMouseEnter={() => setIsDockHovered(true)}
      onMouseLeave={() => {
        setIsDockHovered(false);
      }}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center select-none pl-6 pr-3 py-6"
    >
      
      {/* TUCKED REVEAL HANDLE — FUNKY LIGHT THEME (VISIBLE WHEN DOCK IS HIDDEN) */}
      <AnimatePresence>
        {!isVisible && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            onClick={() => {
              setIsDockHovered(true);
              setIsExpanded(true);
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/95 text-slate-900 border border-r-0 border-slate-200/90 py-3.5 px-2 rounded-l-2xl shadow-xl shadow-slate-900/10 hover:bg-white hover:text-blue-600 transition-all flex flex-col items-center gap-1.5 cursor-pointer group"
            title="Click or hover to reveal Navigation"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <Navigation className="w-4 h-4 text-slate-800 group-hover:text-blue-600 group-hover:scale-110 transition-all" />
            <span className="text-[9px] font-mono font-extrabold text-slate-700 writing-vertical uppercase tracking-wider">
              NAV
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* FLOATING LIGHT THEME NAVIGATION DOCK & DRAWER */}
      <motion.div
        animate={{
          x: isVisible ? 0 : 80,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.95,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="flex items-center"
      >
        {/* EXPANDED SIDE DRAWER NAVIGATION PANEL — LIGHT THEME FUNKY VIBE */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="mr-3 bg-white/95 backdrop-blur-xl border border-slate-200/90 text-slate-900 rounded-3xl p-4 sm:p-5 shadow-2xl shadow-slate-900/15 w-64 sm:w-72 relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-600">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Quick Navigation</span>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                  title="Close side menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Links List */}
              <div className="space-y-1.5">
                {SECTIONS.map((sec) => {
                  const IconComponent = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => {
                        scrollToSection(sec.id);
                        setIsExpanded(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between text-xs font-semibold transition-all group cursor-pointer ${
                        isActive
                          ? "bg-slate-900 text-white shadow-md font-bold"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-[10px] font-mono font-bold ${
                            isActive ? "text-blue-400" : "text-blue-600 group-hover:text-blue-700"
                          }`}
                        >
                          {sec.num}
                        </span>
                        <IconComponent
                          className={`w-4 h-4 ${
                            isActive ? "text-white" : "text-slate-500 group-hover:text-slate-900"
                          }`}
                        />
                        <span>{sec.label}</span>
                      </div>

                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-blue-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Drawer Footer Status */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>ACTIVE: #{activeSection.toUpperCase()}</span>
                </span>
                <span className="text-[10px] text-slate-400 font-bold">8 SECTIONS</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* COMPACT FLOATING DOCK BAR — LIGHT THEME FUNKY VIBE */}
        <div className="flex flex-col items-center gap-2 bg-white/95 backdrop-blur-md p-2 rounded-full border border-slate-200/90 shadow-xl shadow-slate-900/10">
          
          {/* Toggle Drawer Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isExpanded
                ? "bg-blue-600 text-white rotate-180"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
            title={isExpanded ? "Close Drawer" : "Open Navigation Drawer"}
          >
            {isExpanded ? <ChevronRight className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          <div className="w-5 h-[1px] bg-slate-200 my-0.5" />

          {/* Section Dots */}
          <div className="flex flex-col gap-2 relative">
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              const IconComponent = sec.icon;

              return (
                <div
                  key={sec.id}
                  className="relative flex items-center justify-center"
                  onMouseEnter={() => setHoveredSection(sec.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  {/* FLOATING HOVER TOOLTIP CARD — LIGHT THEME */}
                  <AnimatePresence>
                    {hoveredSection === sec.id && !isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, x: -10, scale: 0.9 }}
                        animate={{ opacity: 1, x: -18, scale: 1 }}
                        exit={{ opacity: 0, x: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-full top-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap bg-white text-slate-900 text-xs font-extrabold px-3 py-1.5 rounded-xl border border-slate-200 shadow-xl shadow-slate-900/10 flex items-center gap-2 z-50"
                      >
                        <span className="text-blue-600 font-mono text-[10px] font-bold">{sec.num}</span>
                        <span>{sec.label}</span>
                        <div className="w-2 h-2 rotate-45 bg-white border-t border-r border-slate-200 absolute -right-1 top-1/2 -translate-y-1/2" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Section Dot / Pill */}
                  <button
                    onClick={() => scrollToSection(sec.id)}
                    className={`relative flex items-center justify-center transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "w-8 h-8 rounded-full bg-slate-900 text-white font-bold shadow-md shadow-slate-900/20 scale-110"
                        : "w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 hover:scale-105"
                    }`}
                    aria-label={`Jump to ${sec.label}`}
                  >
                    <IconComponent className={isActive ? "w-4 h-4 text-blue-400" : "w-3.5 h-3.5"} />
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </motion.div>

    </aside>
  );
}
