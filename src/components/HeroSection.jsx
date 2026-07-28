"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Anshuman Mishra Logo Mark
function BrandLogo({ className = "w-7 h-7" }) {
  return (
    <div className={`${className} rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs shadow-xs tracking-tighter`}>
      AM
    </div>
  );
}

// Metallic Paperclip SVG
function PaperclipIcon({ className = "w-8 h-8" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

// Wooden/Metal Binder Clip SVG
function BinderClipIcon({ className = "w-8 h-8" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <path d="M12 4L14 14H18L20 4" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="8" y="14" width="16" h="10" rx="2" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
      <rect x="10" y="16" width="12" h="6" rx="1" fill="#92400E" />
    </svg>
  );
}

// Interactive Hover Word Component (Clean Semi-Bold Typography with Subtle Twist & Color Shift)
function InteractiveWord({ children, className = "", hoverColor = "hover:text-blue-600", rotateDeg = "hover:-rotate-2" }) {
  return (
    <span
      className={`inline-block transition-all duration-300 ease-out cursor-pointer hover:scale-105 ${rotateDeg} ${hoverColor} ${className}`}
    >
      {children}
    </span>
  );
}

export default function HeroSection() {
  const containerRef = useRef(null);

  // Scroll Driven Animations for 3D Perspective Lift
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const paperScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const paperY = useTransform(scrollYProgress, [0, 0.8], [0, 40]);
  const paperRotateX = useTransform(scrollYProgress, [0, 0.8], [0, 5]);

  return (
    <section id="hero" ref={containerRef} className="relative w-full overflow-hidden select-none m-0 p-0 perspective-[1200px]">
      
      {/* 1. TOP SECTION: Full-Bleed Elevated White Paper Sheet (3D Scroll Perspective Lift) */}
      <motion.div
        style={{
          scale: paperScale,
          y: paperY,
          rotateX: paperRotateX,
          transformOrigin: "top center",
        }}
        className="relative w-full bg-white pt-8 pb-20 px-6 sm:px-12 md:px-20 rounded-b-[40px] sm:rounded-b-[56px] shadow-elevated-paper z-20"
      >
        {/* Paper Sheet Header Navbar */}
        <div className="max-w-7xl mx-auto flex items-center justify-between pb-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 font-bold text-slate-900 tracking-tight group">
            <BrandLogo className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
              Anshuman Mishra
            </span>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-9 text-sm font-semibold text-slate-600">
            <a href="#work" className="hover:text-slate-900 transition-colors">Selected Work</a>
            <a href="#about" className="hover:text-slate-900 transition-colors">Who Am I?</a>
            <a href="#experience" className="hover:text-slate-900 transition-colors">Experience</a>
            <a href="#skills" className="hover:text-slate-900 transition-colors">Skills</a>
            <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>
          </nav>

          {/* Black Pill Button */}
          <a
            href="#contact"
            className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-600 rounded-full transition-all shadow-xs hover:scale-105"
          >
            Get In Touch
          </a>
        </div>

        {/* Central Hero Pitch inside White Paper (Clean Semi-Bold + Subtle Funkiness) */}
        <div className="max-w-4xl mx-auto text-center pt-2 pb-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-semibold text-slate-900 tracking-tight leading-[1.15]"
          >
            I make{" "}
            <InteractiveWord hoverColor="hover:text-blue-600" rotateDeg="hover:-rotate-2" className="font-semibold text-slate-900">
              pixels
            </InteractiveWord>{" "}
            behave. <br />
            <span className="text-slate-500 font-normal">
              Sometimes{" "}
              <InteractiveWord hoverColor="hover:text-rose-500" rotateDeg="hover:rotate-2" className="font-semibold text-slate-800">
                people
              </InteractiveWord>{" "}
              too. 😉
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base sm:text-lg font-normal text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            I design products, build them, break them, redesign them, question every pixel, and somehow end up shipping things people actually enjoy using.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-xs sm:text-sm font-medium text-slate-400 max-w-xl mx-auto leading-normal"
          >
            Currently mixing{" "}
            <InteractiveWord hoverColor="hover:text-blue-600" className="font-medium text-slate-700">Product Design</InteractiveWord>,{" "}
            <InteractiveWord hoverColor="hover:text-indigo-600" className="font-medium text-slate-700">Frontend</InteractiveWord>,{" "}
            <InteractiveWord hoverColor="hover:text-purple-600" className="font-medium text-slate-700">AI</InteractiveWord>,{" "}
            <InteractiveWord hoverColor="hover:text-rose-500" className="font-medium text-slate-700">Motion</InteractiveWord>,{" "}
            <InteractiveWord hoverColor="hover:text-emerald-600" className="font-medium text-slate-700">Branding</InteractiveWord>, and a dangerous amount of caffeine ☕.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            href="#work"
            className="mt-8 px-7 py-3 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-blue-600 rounded-full transition-all duration-300 shadow-md hover:scale-105 hover:-rotate-1 inline-block"
          >
            Judge My Work
          </motion.a>
        </div>
      </motion.div>

      {/* 2. BOTTOM SECTION: Full-Bleed Dark Green Cutting Mat Layer */}
      <div className="relative w-full bg-cutting-mat pt-16 pb-32 px-6 sm:px-12 md:px-20 z-10">
        
        {/* Slack Chat Popover Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.85 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-slate-200/90 max-w-sm sm:max-w-md mx-auto relative z-30 mb-14 flex items-start gap-3.5 hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          {/* User Avatar */}
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs border border-slate-800">
            AM
          </div>
          
          <div className="flex-1 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Anshuman</span>
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>probably designing instead of sleeping</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-snug mt-1.5">
              Welcome to the portfolio. <br />
              <span className="text-rose-600 font-semibold">Warning:</span> This website contains excessive animations, questionable humour, and unhealthy attention to 8px spacing.
            </p>
          </div>
        </motion.div>

        {/* Central White Headline on Green Cutting Mat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 180, damping: 15, delay: 0.1 }}
          className="text-center max-w-2xl mx-auto mb-24 relative z-20"
        >
          <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight">
            Built with ❤️ curiosity, ☕ caffeine, 😭 deadlines
          </h2>
          <p className="mt-4 text-sm sm:text-base text-emerald-100/75 font-medium max-w-md mx-auto leading-relaxed">
            Designed with intention. Crafted to be felt.
          </p>
        </motion.div>

        {/* PINNED STICKY NOTES WITH 3D POP & ROTATE BLAST ENTRANCE */}
        
        {/* 1. PINK STICKY NOTE (Bottom-Left Blast) */}
        <motion.div
          initial={{ opacity: 0, x: -80, y: 40, rotate: -20, scale: 0.8 }}
          whileInView={{ opacity: 1, x: 0, y: 0, rotate: -6, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.2 }}
          className="hidden sm:block absolute bottom-12 left-8 md:left-20 w-64 md:w-72 z-20"
        >
          <div className="relative bg-[#FF5C77] rounded-3xl p-7 shadow-cast-pink border border-rose-400/50 transform hover:rotate-2 hover:scale-110 transition-transform duration-300 cursor-pointer">
            {/* Wooden/Metal Binder Clip (Top Right) */}
            <div className="absolute -top-5 right-8 z-30 transform rotate-12">
              <BinderClipIcon className="w-10 h-10" />
            </div>

            <p className="font-handwriting text-2xl text-rose-950 font-bold leading-snug pt-2">
              "Trust the process." <br />
              <span className="text-lg font-medium opacity-90">(unless the process was designed by me at 2 AM.)</span>
            </p>
          </div>
        </motion.div>

        {/* 2. YELLOW STICKY NOTE (Bottom-Right Blast) */}
        <motion.div
          initial={{ opacity: 0, x: 80, y: 40, rotate: 20, scale: 0.8 }}
          whileInView={{ opacity: 1, x: 0, y: 0, rotate: 5, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.3 }}
          className="hidden sm:block absolute bottom-12 right-8 md:right-20 w-64 md:w-72 z-20"
        >
          <div className="relative bg-[#EAF235] rounded-3xl p-7 shadow-cast-yellow border border-yellow-300/60 transform hover:-rotate-2 hover:scale-110 transition-transform duration-300 cursor-pointer">
            {/* Metallic Paperclip (Top Left) */}
            <div className="absolute -top-5 -left-3 z-30 transform -rotate-45">
              <PaperclipIcon className="w-11 h-11 text-slate-600" />
            </div>

            <p className="font-handwriting text-2xl text-amber-950 font-bold leading-snug pt-2">
              "Every designer has a favorite font." <br />
              <span className="text-lg font-medium opacity-90">Mine changes every Tuesday.</span>
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
