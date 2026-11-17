"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading, Accent, Pin, Tape } from "./Stationery";

const PROCESS_STEPS = [
  {
    id: "ideation",
    stepNum: "01",
    phaseName: "Ideation & Discovery",
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

  const notes = ["bg-note-yellow", "bg-note-blue", "bg-note-pink", "bg-note-yellow"];

  return (
    <section
      id="process"
      className="relative z-10 py-16 sm:py-24 px-4 sm:px-12 md:px-20 bg-cutting-mat select-none"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          index="05"
          label="Process"
          title={<>How I <Accent>work</Accent></>}
          aside={
            <div className="flex flex-col items-start gap-4 md:items-end">
              <span className="block max-w-sm">From the first awkward “why?” to a pixel-perfect developer handoff.</span>
              <div className="inline-flex rounded-full border border-white/15 p-1 text-[13px]">
                {[
                  ["grid", "All phases"],
                  ["pipeline", "One at a time"],
                ].map(([mode, label]) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`cursor-pointer rounded-full px-3.5 py-1 transition-colors ${
                      viewMode === mode ? "bg-chalk text-ink" : "text-chalk-2 hover:text-chalk"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          }
        />

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {PROCESS_STEPS.map((step, index) => (
              <motion.article
                key={step.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`paper relative flex flex-col p-6 sm:p-10 ${index % 2 ? "md:rotate-[0.5deg]" : "md:-rotate-[0.5deg]"}`}
              >
                <Pin className="-top-2 left-1/2 -translate-x-1/2" />

                <div className="flex items-baseline justify-between border-b border-rule pb-5">
                  <span className="font-serif text-[56px] italic leading-none text-ink">{step.stepNum}</span>
                  <span className="text-[13px] text-ink-3">{step.phaseName}</span>
                </div>

                <h3 className="mt-6 text-[26px] font-medium leading-[1.15] tracking-[-0.02em] text-ink">
                  {step.headline}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{step.description}</p>

                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-ink-2">
                  {step.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-ink-3" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <div className={`shadow-note note-texture relative -mb-2 ml-auto w-fit max-w-[85%] rotate-[-1.5deg] rounded-[2px] px-4 py-3 ${notes[index]}`}>
                    <Tape className="-top-2.5 left-1/2 -translate-x-1/2" rotate={3} width={56} />
                    <p className="font-handwriting text-[19px] leading-tight text-ink/85">{step.quote}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {PROCESS_STEPS.map((step) => {
                const isActive = activeStepId === step.id;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStepId(step.id)}
                    className={`flex cursor-pointer items-baseline gap-3 rounded-[4px] border px-4 py-3 text-left transition-colors ${
                      isActive
                        ? "border-chalk bg-chalk text-ink"
                        : "border-white/15 text-chalk-2 hover:border-white/30 hover:text-chalk"
                    }`}
                  >
                    <span className="font-serif text-[22px] italic leading-none">{step.stepNum}</span>
                    <span className="truncate text-[14px]">{step.phaseName}</span>
                  </button>
                );
              })}
            </div>

            <div className="paper relative overflow-hidden p-6 sm:p-12">
              <Pin className="-top-2 left-10" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 gap-10 lg:grid-cols-12"
                >
                  <div className="lg:col-span-8">
                    <p className="text-[13px] text-ink-3">
                      Phase {activeStep.stepNum} · {activeStep.phaseName}
                    </p>
                    <h3 className="mt-4 text-3xl font-medium leading-[1.1] tracking-[-0.025em] text-ink sm:text-[44px]">
                      {activeStep.headline}
                    </h3>
                    <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-ink-2">
                      {activeStep.description}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1.5 text-[14px] text-ink-2">
                      {activeStep.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-ink-3" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col justify-between gap-8 lg:col-span-4">
                    <div className={`shadow-note note-texture relative rotate-[1.5deg] rounded-[2px] p-6 ${notes[Number(activeStep.stepNum) - 1]}`}>
                      <Tape className="-top-3 left-1/2 -translate-x-1/2" rotate={-3} width={72} />
                      <p className="font-handwriting text-[24px] leading-tight text-ink/85">{activeStep.quote}</p>
                    </div>

                    {Number(activeStep.stepNum) < 4 && (
                      <button
                        onClick={() => {
                          const nextStep = PROCESS_STEPS[Number(activeStep.stepNum)];
                          if (nextStep) setActiveStepId(nextStep.id);
                        }}
                        className="group inline-flex cursor-pointer items-center gap-2 self-start text-[14px] text-ink-2 hover:text-ink"
                      >
                        Next: {PROCESS_STEPS[Number(activeStep.stepNum)].phaseName}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    )}
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
