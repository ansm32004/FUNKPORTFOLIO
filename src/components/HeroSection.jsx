"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { Pin, Tape, Accent } from "./Stationery";

const EASE = [0.16, 1, 0.3, 1];

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

// Each discipline gets its own highlighter colour + tilt on hover.
const DISCIPLINES = [
  { label: "Product design", mark: "bg-note-yellow", tilt: "group-hover:-rotate-3" },
  { label: "Frontend", mark: "bg-note-blue", tilt: "group-hover:rotate-2" },
  { label: "AI", mark: "bg-note-pink", tilt: "group-hover:-rotate-6" },
  { label: "Motion", mark: "bg-note-yellow", tilt: "group-hover:rotate-3" },
  { label: "Branding", mark: "bg-note-blue", tilt: "group-hover:-rotate-2" },
];

// Playful hover on a word: lifts, tilts, and changes ink.
function HoverWord({ children, className = "", tilt = "hover:-rotate-2", color = "hover:text-pin" }) {
  return (
    <span
      className={`inline-block cursor-default transition-[transform,color] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:scale-[1.06] ${tilt} ${color} ${className}`}
    >
      {children}
    </span>
  );
}

function Monogram({ className = "" }) {
  return (
    <span
      className={`flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[11px] font-semibold tracking-tight text-paper ${className}`}
    >
      AM
    </span>
  );
}

export default function HeroSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const paperScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.96]);
  const paperY = useTransform(scrollYProgress, [0, 0.8], [0, 32]);
  const paperRotateX = useTransform(scrollYProgress, [0, 0.8], [0, 4]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative m-0 w-full overflow-hidden p-0 perspective-[1200px]"
    >
      {/* Paper sheet */}
      <motion.div
        style={{ scale: paperScale, y: paperY, rotateX: paperRotateX, transformOrigin: "top center" }}
        className="relative z-20 w-full rounded-b-[28px] bg-paper px-5 pb-16 pt-5 shadow-elevated-paper sm:px-12 sm:pb-24 sm:pt-7 md:px-20"
      >
        {/* Header */}
        <header className="mx-auto flex max-w-7xl items-center justify-between pb-14 sm:pb-28">
          <a href="#" className="flex items-center gap-3 text-ink">
            <Monogram />
            <span className="text-[15px] font-semibold tracking-tight">Anshuman Mishra</span>
          </a>

          <nav className="hidden items-center gap-8 text-[14px] text-ink-2 md:flex">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-ink">
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="rounded-full border border-ink/15 px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            Get in touch
          </a>
        </header>

        {/* Pitch */}
        <div className="mx-auto max-w-5xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2 text-[13px] text-ink-2 sm:mb-8"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-pin" />
            Product designer &amp; developer · New Delhi
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-[44px] font-medium leading-[1.02] tracking-[-0.04em] text-ink sm:text-7xl md:text-[96px]"
          >
            I make <HoverWord tilt="hover:-rotate-3">pixels</HoverWord>{" "}
            <HoverWord tilt="hover:rotate-2" color="hover:text-ink-2">behave.</HoverWord>
            <br />
            <span className="text-ink-3">
              Sometimes{" "}
              <HoverWord tilt="hover:rotate-3" color="hover:text-pin" className="text-ink">
                <Accent>people</Accent>
              </HoverWord>{" "}
              too.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="mx-auto mt-8 max-w-xl text-[17px] leading-relaxed text-ink-2"
          >
            I design products, build them, break them, redesign them, question every pixel — and
            somehow end up shipping things people actually enjoy using.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="mt-10 flex flex-col items-center gap-6"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14px] font-medium text-paper transition-colors hover:bg-black"
            >
              Judge my work
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>

            <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] text-ink-3">
              {DISCIPLINES.map((d, i) => (
                <li key={d.label} className="flex items-center gap-2">
                  {i > 0 && <span className="text-rule">/</span>}
                  <span className={`group relative inline-block cursor-default transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 ${d.tilt}`}>
                    <span
                      aria-hidden
                      className={`absolute -inset-x-1 bottom-0 top-1/2 -z-0 origin-left scale-x-0 rounded-[2px] opacity-80 transition-transform duration-300 group-hover:scale-x-100 ${d.mark}`}
                    />
                    <span className="relative transition-colors group-hover:text-ink">{d.label}</span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Cutting mat */}
      <div className="bg-cutting-mat relative z-10 w-full px-4 pb-20 pt-16 sm:px-12 sm:pb-28 sm:pt-24 md:px-20">
        {/* Pinned welcome slip */}
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="paper relative z-30 mx-auto mb-14 flex max-w-md items-start gap-4 p-5 sm:mb-20"
        >
          <Pin className="-top-2 left-1/2 -translate-x-1/2" />
          <Monogram className="mt-0.5 shrink-0" />
          <div className="text-left">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-[14px] font-semibold text-ink">Anshuman</span>
              <span className="text-[12px] text-ink-3">probably designing instead of sleeping</span>
            </div>
            <p className="mt-1.5 text-[14px] leading-snug text-ink-2">
              Welcome in. Fair warning: this site contains excessive animation, questionable humour,
              and an unhealthy attention to 8px spacing.
            </p>
          </div>
        </motion.div>

        {/* Mat headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative z-20 mx-auto max-w-3xl text-center"
        >
          <h2 className="text-4xl font-medium tracking-[-0.03em] text-chalk sm:text-6xl">
            Built with curiosity, caffeine
            <br className="hidden sm:block" /> <Accent className="text-note-yellow">&amp; deadlines.</Accent>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] text-chalk-2">
            Designed with intention. Crafted to be felt.
          </p>
        </motion.div>

        {/* Sticky notes */}
        <div className="mx-auto mt-12 flex max-w-5xl items-start justify-between gap-4 sm:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -10 }}
          whileInView={{ opacity: 1, y: 0, rotate: -5 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          className="relative z-20 w-[46%] max-w-64 sm:w-60 md:w-64"
        >
          <div className="shadow-note note-texture relative aspect-square rounded-[2px] bg-note-pink p-4 sm:p-6 transition-transform duration-500 hover:-rotate-2">
            <Pin className="-top-1.5 left-1/2 -translate-x-1/2" color="#2b2a27" />
            <p className="pt-3 font-handwriting text-[20px] leading-[1.1] sm:text-[26px] text-[#4a1420]">
              “Trust the process.”
            </p>
            <p className="mt-2 font-handwriting text-[15px] leading-snug sm:mt-3 sm:text-[19px] text-[#4a1420]/75">
              (unless the process was designed by me at 2 AM.)
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotate: 10 }}
          whileInView={{ opacity: 1, y: 0, rotate: 4 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          className="relative z-20 mt-8 w-[46%] max-w-64 sm:mt-10 sm:w-60 md:w-64"
        >
          <div className="shadow-note note-texture relative aspect-square rounded-[2px] bg-note-yellow p-4 sm:p-6 transition-transform duration-500 hover:rotate-1">
            <Tape className="-top-3 left-1/2 -translate-x-1/2" rotate={-4} width={72} />
            <p className="pt-3 font-handwriting text-[20px] leading-[1.1] sm:text-[26px] text-[#3d3209]">
              “Every designer has a favourite font.”
            </p>
            <p className="mt-2 font-handwriting text-[15px] leading-snug sm:mt-3 sm:text-[19px] text-[#3d3209]/75">
              Mine changes every Tuesday.
            </p>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
