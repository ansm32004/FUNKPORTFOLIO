"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Zap, Compass, Palette, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

const PROCESS_TABS = [
  {
    id: "ideation",
    stepNum: "01",
    tabTitle: "01 // Ideation & Discovery 💡",
    icon: Lightbulb,
    headline: "Asking 'Why?' approximately 642 times before opening Figma.",
    description:
      "Every great product begins with radical clarity. I dive deep into user interviews, competitive audits, problem framing, and mapping key friction points before pixels ever enter the chat.",
    deliverables: ["User Interviews", "Competitive Audits", "Problem Framing", "Target Persona Mapping"],
    quote: "If the core problem isn't clear, no amount of glossy glassmorphism will save it.",
    accentColor: "text-amber-500",
    badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
    illustrationEmoji: "💡",
  },
  {
    id: "brainstorming",
    stepNum: "02",
    tabTitle: "02 // Brainstorming & Concept ⚡",
    icon: Zap,
    headline: "Dumping 100 terrible ideas to find the 3 game-changers.",
    description:
      "Fast, unconstrained visual exploration. I run Crazy Eights, mind mapping, user flow charts, and feature prioritization matrices to distill messy ideas into crisp product strategies.",
    deliverables: ["Crazy Eights", "User Flow Diagrams", "Feature Prioritization Matrix", "Concept Sketches"],
    quote: "My digital whiteboard looks like a detective solving a cold case at 3 AM.",
    accentColor: "text-blue-500",
    badgeBg: "bg-blue-100 text-blue-900 border-blue-300",
    illustrationEmoji: "⚡",
  },
  {
    id: "wireframing",
    stepNum: "03",
    tabTitle: "03 // Low-Fi Wireframing 📐",
    icon: Compass,
    headline: "Gray boxes and placeholder text are a designer's superpower.",
    description:
      "Structuring information architecture and layout hierarchy without visual distraction. Rapid paper sketches and interactive grayscale prototypes to test navigation flows early.",
    deliverables: ["Information Architecture", "Grayscale Wireframes", "Interactive Click-Dummy", "Usability Testing"],
    quote: "If it works cleanly in grayscale with Lorem Ipsum, it's going to shine in high-res.",
    accentColor: "text-purple-500",
    badgeBg: "bg-purple-100 text-purple-900 border-purple-300",
    illustrationEmoji: "📐",
  },
  {
    id: "visual-design",
    stepNum: "04",
    tabTitle: "04 // Visual Design & Systems 🎨",
    icon: Palette,
    headline: "Moving buttons 2px to the left until the universe feels balanced.",
    description:
      "Crafting production-ready UI systems. Tokenizing color palettes (60-30-10 rule), typography scales, spatial grids, 60fps micro-interactions, and pixel-perfect developer handoff specs.",
    deliverables: ["Design Tokens", "Component Library", "60fps Micro-Interactions", "Dev Handoff Spec"],
    quote: "It's science. Trust me.",
    accentColor: "text-emerald-500",
    badgeBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
    illustrationEmoji: "🎨",
  },
];

export default function Philosophy() {
  const [activeTabId, setActiveTabId] = useState("ideation");

  const currentTab = PROCESS_TABS.find((t) => t.id === activeTabId) || PROCESS_TABS[0];
  const IconComponent = currentTab.icon;

  return (
    <section id="process" className="relative z-10 py-24 px-6 sm:px-12 md:px-20 bg-cutting-mat border-t border-emerald-950/80 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-emerald-800/40 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>04 // Behind the Pixels: Work Process</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              My Design Workflow
            </h2>
          </div>
          <p className="text-sm sm:text-base text-emerald-100/70 max-w-md font-medium leading-relaxed">
            From raw discovery to wireframing and pixel-perfect design handoff.
          </p>
        </div>

        {/* Tab Buttons (Folder Tab System - FLUSH WITHOUT 1-PIXEL GAP) */}
        <div className="flex items-end gap-2 overflow-x-auto relative z-20 -mb-px px-2">
          {PROCESS_TABS.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTabId === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`px-6 py-3 rounded-t-2xl font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-white text-slate-900 border-t border-x border-slate-200 border-b-white relative z-30 shadow-xs translate-y-[1px]"
                    : "bg-emerald-950/70 text-emerald-200/80 hover:text-white border-t border-x border-emerald-800/60 mb-[1px]"
                }`}
              >
                <TabIcon className={`w-4 h-4 ${isActive ? tab.accentColor : "text-emerald-400"}`} />
                <span>{tab.tabTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Box (White Paper Sheet - Continuous Top Border) */}
        <div
          className={`bg-white p-8 sm:p-12 shadow-2xl border border-slate-200 relative z-10 ${
            activeTabId === "ideation" ? "rounded-b-3xl rounded-tr-3xl rounded-tl-none" : "rounded-3xl"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Process Details */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Step Badge */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-wider">
                    PHASE {currentTab.stepNum}
                  </span>
                  <span className={`text-xs font-bold ${currentTab.accentColor} uppercase tracking-wider flex items-center gap-1.5`}>
                    <IconComponent className="w-4 h-4" />
                    {currentTab.tabTitle.split("//")[1]}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {currentTab.headline}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                  {currentTab.description}
                </p>

                {/* Deliverables List */}
                <div className="pt-2 space-y-2">
                  <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Key Deliverables & Artifacts
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentTab.deliverables.map((item, idx) => (
                      <span
                        key={idx}
                        className={`text-xs font-extrabold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 ${currentTab.badgeBg}`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quote / Witty Take Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold italic flex items-center gap-3">
                  <span className="text-xl">💬</span>
                  <span>"{currentTab.quote}"</span>
                </div>

              </div>

              {/* Right Column: Visual Stage Badge & Illustration */}
              <div className="lg:col-span-4">
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm relative overflow-hidden group">
                  <span className="text-6xl block transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    {currentTab.illustrationEmoji}
                  </span>
                  
                  <div>
                    <h4 className="text-lg font-extrabold text-slate-900">
                      Step {currentTab.stepNum} Output
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      Verified & Validated before moving to Phase {Number(currentTab.stepNum) < 4 ? `0${Number(currentTab.stepNum) + 1}` : "04 Handoff"}
                    </p>
                  </div>

                  {Number(currentTab.stepNum) < 4 && (
                    <button
                      onClick={() => {
                        const nextTab = PROCESS_TABS[Number(currentTab.stepNum)];
                        if (nextTab) setActiveTabId(nextTab.id);
                      }}
                      className="inline-flex items-center gap-2 text-xs font-extrabold text-blue-600 hover:text-blue-700 pt-2 cursor-pointer"
                    >
                      <span>Next Phase: {PROCESS_TABS[Number(currentTab.stepNum)].tabTitle.split("//")[1]}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
