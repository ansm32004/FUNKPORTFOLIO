"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  Zap,
  Compass,
  Palette,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  LayoutGrid,
  Layers,
  Check,
} from "lucide-react";

const PROCESS_STEPS = [
  {
    id: "ideation",
    stepNum: "01",
    phaseName: "Ideation & Discovery",
    icon: Lightbulb,
    emoji: "💡",
    headline: "Asking 'Why?' approximately 642 times before opening Figma.",
    description:
      "Every great product begins with radical clarity. I dive deep into user interviews, competitive audits, problem framing, and mapping key friction points before pixels ever enter the chat.",
    deliverables: [
      "User Interviews",
      "Competitive Audits",
      "Problem Framing",
      "Target Persona Mapping",
    ],
    quote: "If the core problem isn't clear, no amount of glossy glassmorphism will save it.",
    badgeBg: "bg-amber-500/10 text-amber-700 border-amber-300",
    accentColor: "text-amber-500",
    cardBorder: "hover:border-amber-400",
    bgGradient: "from-amber-50 to-orange-50/40",
  },
  {
    id: "brainstorming",
    stepNum: "02",
    phaseName: "Brainstorming & Concept",
    icon: Zap,
    emoji: "⚡",
    headline: "Dumping 100 terrible ideas to find the 3 game-changers.",
    description:
      "Fast, unconstrained visual exploration. I run Crazy Eights, mind mapping, user flow charts, and feature prioritization matrices to distill messy ideas into crisp product strategies.",
    deliverables: [
      "Crazy Eights",
      "User Flow Diagrams",
      "Prioritization Matrix",
      "Concept Sketches",
    ],
    quote: "My digital whiteboard looks like a detective solving a cold case at 3 AM.",
    badgeBg: "bg-blue-500/10 text-blue-700 border-blue-300",
    accentColor: "text-blue-500",
    cardBorder: "hover:border-blue-400",
    bgGradient: "from-blue-50 to-sky-50/40",
  },
  {
    id: "wireframing",
    stepNum: "03",
    phaseName: "Low-Fi Wireframing",
    icon: Compass,
    emoji: "📐",
    headline: "Gray boxes and placeholder text are a designer's superpower.",
    description:
      "Structuring information architecture and layout hierarchy without visual distraction. Rapid paper sketches and interactive grayscale prototypes to test navigation flows early.",
    deliverables: [
      "Information Architecture",
      "Grayscale Wireframes",
      "Interactive Click-Dummy",
      "Usability Testing",
    ],
    quote: "If it works cleanly in grayscale with Lorem Ipsum, it's going to shine in high-res.",
    badgeBg: "bg-purple-500/10 text-purple-700 border-purple-300",
    accentColor: "text-purple-500",
    cardBorder: "hover:border-purple-400",
    bgGradient: "from-purple-50 to-indigo-50/40",
  },
  {
    id: "visual-design",
    stepNum: "04",
    phaseName: "Visual Design & Systems",
    icon: Palette,
    emoji: "🎨",
    headline: "Moving buttons 2px to the left until the universe feels balanced.",
    description:
      "Crafting production-ready UI systems. Tokenizing color palettes (60-30-10 rule), typography scales, spatial grids, 60fps micro-interactions, and pixel-perfect developer handoff specs.",
    deliverables: [
      "Design Tokens",
      "Component Library",
      "60fps Micro-Interactions",
      "Dev Handoff Spec",
    ],
    quote: "It's science. Trust me.",
    badgeBg: "bg-emerald-500/10 text-emerald-700 border-emerald-300",
    accentColor: "text-emerald-500",
    cardBorder: "hover:border-emerald-400",
    bgGradient: "from-emerald-50 to-teal-50/40",
  },
];

export default function Philosophy() {
  const [activeStepId, setActiveStepId] = useState("ideation");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'pipeline'

  const activeStep =
    PROCESS_STEPS.find((s) => s.id === activeStepId) || PROCESS_STEPS[0];
  const ActiveIcon = activeStep.icon;

  return (
    <section
      id="process"
      className="relative z-10 py-24 px-6 sm:px-12 md:px-20 bg-cutting-mat border-t border-emerald-950/80 select-none"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-emerald-800/40 pb-6 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>04 // Behind the Pixels: Work Process</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              My Design Workflow
            </h2>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-3">
            <p className="text-sm text-emerald-100/70 max-w-xs font-medium hidden lg:block leading-relaxed">
              From discovery to wireframing and pixel-perfect developer handoff.
            </p>

            <div className="flex items-center gap-1 bg-emerald-950/80 p-1.5 rounded-2xl border border-emerald-800/60">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-slate-900 shadow-md"
                    : "text-emerald-300 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>4-Phase Grid 📐</span>
              </button>

              <button
                onClick={() => setViewMode("pipeline")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === "pipeline"
                    ? "bg-white text-slate-900 shadow-md"
                    : "text-emerald-300 hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Spotlight View ⚡</span>
              </button>
            </div>
          </div>
        </div>

        {/* --- VIEW MODE 1: 4-PHASE CARDS GRID VIEW --- */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROCESS_STEPS.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white rounded-3xl p-7 sm:p-9 shadow-2xl border border-slate-200/90 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group ${step.cardBorder}`}
                >
                  {/* Subtle Top Gradient Accent */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${step.bgGradient}`}
                  />

                  {/* Top Bar: Phase Pill & Emoji */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-wider">
                        PHASE {step.stepNum}
                      </span>
                      <span
                        className={`text-xs font-extrabold px-3 py-1 rounded-full border flex items-center gap-1.5 ${step.badgeBg}`}
                      >
                        <StepIcon className="w-3.5 h-3.5" />
                        <span>{step.phaseName}</span>
                      </span>
                    </div>

                    <span className="text-2xl transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                      {step.emoji}
                    </span>
                  </div>

                  {/* Headline & Description */}
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                      {step.headline}
                    </h3>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Key Deliverables
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {step.deliverables.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Witty Quote Note Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 italic flex items-center gap-3">
                    <span className="text-base shrink-0">💬</span>
                    <span>"{step.quote}"</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* --- VIEW MODE 2: SPOTLIGHT PIPELINE STAGE VIEW --- */
          <div className="space-y-8">
            {/* Horizontal Stage Stepper Pills */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {PROCESS_STEPS.map((step) => {
                const StepIcon = step.icon;
                const isActive = activeStepId === step.id;

                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStepId(step.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                      isActive
                        ? "bg-white border-blue-500 shadow-xl ring-2 ring-blue-500/20 text-slate-900 scale-[1.02]"
                        : "bg-emerald-950/70 border-emerald-800/60 text-emerald-200/80 hover:text-white hover:border-emerald-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-full uppercase ${
                          isActive
                            ? "bg-slate-900 text-white"
                            : "bg-emerald-900 text-emerald-300"
                        }`}
                      >
                        PHASE {step.stepNum}
                      </span>
                      <span className="text-lg">{step.emoji}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <StepIcon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? step.accentColor : "text-emerald-400"
                        }`}
                      />
                      <span className="text-xs sm:text-sm font-extrabold truncate">
                        {step.phaseName}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Spotlight Content Box */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200/90 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  {/* Left Column: Details */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-wider">
                        PHASE {activeStep.stepNum}
                      </span>
                      <span
                        className={`text-xs font-extrabold px-3 py-1 rounded-full border flex items-center gap-1.5 ${activeStep.badgeBg}`}
                      >
                        <ActiveIcon className="w-3.5 h-3.5" />
                        <span>{activeStep.phaseName}</span>
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                      {activeStep.headline}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                      {activeStep.description}
                    </p>

                    {/* Deliverables */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                        Key Deliverables & Artifacts
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeStep.deliverables.map((item, idx) => (
                          <span
                            key={idx}
                            className={`text-xs font-extrabold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 ${activeStep.badgeBg}`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{item}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-700 italic flex items-center gap-3">
                      <span className="text-xl">💬</span>
                      <span>"{activeStep.quote}"</span>
                    </div>
                  </div>

                  {/* Right Column: Output Card */}
                  <div className="lg:col-span-4">
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm relative overflow-hidden group">
                      <span className="text-6xl block transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                        {activeStep.emoji}
                      </span>

                      <div>
                        <h4 className="text-lg font-extrabold text-slate-900">
                          Phase {activeStep.stepNum} Validation
                        </h4>
                        <p className="text-xs text-slate-500 font-medium mt-1">
                          Verified before moving to Phase{" "}
                          {Number(activeStep.stepNum) < 4
                            ? `0${Number(activeStep.stepNum) + 1}`
                            : "04 Handoff"}
                        </p>
                      </div>

                      {Number(activeStep.stepNum) < 4 && (
                        <button
                          onClick={() => {
                            const nextStep =
                              PROCESS_STEPS[Number(activeStep.stepNum)];
                            if (nextStep) setActiveStepId(nextStep.id);
                          }}
                          className="inline-flex items-center gap-2 text-xs font-extrabold text-blue-600 hover:text-blue-700 pt-2 cursor-pointer"
                        >
                          <span>
                            Next:{" "}
                            {PROCESS_STEPS[Number(activeStep.stepNum)].phaseName}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
