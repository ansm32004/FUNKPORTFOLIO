"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  ExternalLink,
  Sparkles,
  Eye,
  FileText,
  Lightbulb,
  PenTool,
  CheckCircle2,
  Lock,
  Globe,
  PieChart,
  ShieldCheck,
  TrendingUp,
  Zap,
  Users,
  Target,
  BarChart3,
  Layers,
  Clock,
  ThumbsUp,
  Cpu,
  Bookmark,
  Maximize2,
  X,
  Sliders,
  Palette,
  Type,
  Activity,
  LayoutGrid,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  MapPin
} from "lucide-react";

// Interactive Vammy Mascot SVG
const VammyMascotSVG = ({ mood = "happy" }) => {
  const getEyebrows = () => {
    if (mood === "worried") return "M 32 42 Q 40 38 48 44 M 72 44 Q 80 38 88 42";
    if (mood === "angry") return "M 32 44 Q 40 48 48 42 M 72 42 Q 80 48 88 44";
    return "M 32 40 Q 40 36 48 40 M 72 40 Q 80 36 88 40";
  };

  const getMouth = () => {
    if (mood === "worried") return "M 50 72 Q 60 66 70 72";
    if (mood === "angry") return "M 50 74 Q 60 68 70 74";
    return "M 48 68 Q 60 82 72 68 Z";
  };

  return (
    <svg viewBox="0 0 120 120" className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-sm">
      <path d="M 20 60 Q 10 90 30 110 L 90 110 Q 110 90 100 60 Z" fill="#DC2626" />
      <path d="M 25 65 Q 15 90 35 105 L 85 105 Q 105 90 95 65 Z" fill="#991B1B" />
      <path d="M 30 50 C 20 20, 45 15, 60 30 C 75 15, 100 20, 90 50 Z" fill="#1E293B" />
      <path d="M 40 35 L 60 52 L 80 35 L 60 22 Z" fill="#0F172A" />
      <ellipse cx="60" cy="58" rx="30" ry="26" fill="#FED7AA" />
      <circle cx="46" cy="52" r="5" fill="#1E293B" />
      <circle cx="74" cy="52" r="5" fill="#1E293B" />
      <circle cx="48" cy="50" r="1.5" fill="#FFFFFF" />
      <circle cx="76" cy="50" r="1.5" fill="#FFFFFF" />
      <circle cx="38" cy="60" r="4" fill="#FCA5A5" opacity="0.6" />
      <circle cx="82" cy="60" r="4" fill="#FCA5A5" opacity="0.6" />
      <path d={getEyebrows()} stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d={getMouth()} fill={mood === "angry" || mood === "worried" ? "none" : "#991B1B"} stroke="#1E293B" strokeWidth="2" />
      <polygon points="52,68 55,75 57,68" fill="#FFFFFF" stroke="#1E293B" strokeWidth="0.5" />
      <polygon points="63,68 65,75 68,68" fill="#FFFFFF" stroke="#1E293B" strokeWidth="0.5" />
    </svg>
  );
};

// Full-Height Phone Display Frame
const CleanPhoneDisplay = ({ src, alt, className = "", onZoom }) => {
  return (
    <div
      onClick={() => onZoom && onZoom({ src, alt })}
      className={`relative mx-auto w-full max-w-[320px] sm:max-w-[360px] cursor-pointer group ${className}`}
    >
      <div className="rounded-[44px] bg-slate-900 p-3 sm:p-4 shadow-[0_25px_60px_rgba(0,0,0,0.12)] border border-slate-800 transition-transform duration-300 group-hover:scale-[1.01]">
        <div className="rounded-[32px] overflow-hidden bg-white">
          <Image
            src={src}
            alt={alt}
            width={500}
            height={1400}
            className="w-full h-auto block"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default function VammyCaseStudy() {
  const [activeTab, setActiveTab] = useState("full");
  const [mascotMood, setMascotMood] = useState("happy");
  const [zoomImage, setZoomImage] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavDockHovered, setIsNavDockHovered] = useState(false);

  // Scroll Section Intersection Observer across all 20 sections
  useEffect(() => {
    if (activeTab !== "full") return;

    const sections = [
      "overview",
      "problem",
      "research",
      "persona",
      "use-cases",
      "prd",
      "opportunity",
      "principles",
      "architecture",
      "lofi",
      "decisions",
      "final-ui",
      "breakdown",
      "scale",
      "edge-cases",
      "contributions",
      "rationale",
      "outcome"
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -50% 0px",
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
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeTab]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD] text-slate-800 font-poppins pb-40 selection:bg-sky-500 selection:text-white">

      {/* STICKY TOP HEADER NAVIGATION */}
      <header className="sticky top-0 z-50 bg-[#FAFBFD]/90 backdrop-blur-2xl border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between relative">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors z-10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Portfolio</span>
          </Link>

          {/* CENTER: Highlighted Floating Notch Dock */}
          <div className="absolute left-1/2 -translate-x-1/2 z-20">
            <div className="flex items-center bg-white p-1 rounded-full shadow-2xs border border-slate-200/80">
              <button
                onClick={() => setActiveTab("full")}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeTab === "full"
                    ? "bg-slate-900 text-white shadow-2xs font-semibold"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Case Study</span>
              </button>

              <button
                onClick={() => setActiveTab("overview-image")}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeTab === "overview-image"
                    ? "bg-slate-900 text-white shadow-2xs font-semibold"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Original PDF (Frame 16)</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 z-10">
            <a
              href="/case-study/vammy/fram16.pdf"
              download="Frame 16 - Vammy Case Study.pdf"
              className="hidden md:inline-flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200/80 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF 12.8 MB</span>
            </a>
          </div>
        </div>
      </header>

      {/* RIGHT-SIDE TUCKED HOVER-REVEAL NAVIGATION DOCK */}
      {activeTab === "full" && (
        <aside
          aria-label="Vammy section navigation"
          onMouseEnter={() => setIsNavDockHovered(true)}
          onMouseLeave={() => setIsNavDockHovered(false)}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center select-none pl-6 pr-3 py-6"
        >
          {!isNavDockHovered ? (
            /* TUCKED REVEAL HANDLE */
            <button
              onClick={() => setIsNavDockHovered(true)}
              className="bg-white/95 text-slate-900 border border-r-0 border-slate-200/90 py-3.5 px-2 rounded-l-2xl shadow-xl shadow-slate-900/10 hover:bg-white hover:text-blue-600 transition-all flex flex-col items-center gap-1.5 cursor-pointer group"
              title="Hover to reveal Navigation"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <LayoutGrid className="w-4 h-4 text-slate-800 group-hover:text-blue-600 group-hover:scale-110 transition-all" />
              <span className="text-[9px] font-mono font-bold text-slate-700 writing-vertical uppercase tracking-wider">
                NAV
              </span>
            </button>
          ) : (
            /* EXPANDED NAVIGATION PANEL */
            <div className="flex flex-col items-start gap-1 bg-white/95 backdrop-blur-2xl p-3 rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-900/10 text-xs w-52 max-h-[80vh] overflow-y-auto transition-all">
              <div className="flex items-center justify-between w-full pb-2 mb-1 border-b border-slate-100 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-white/90">
                <span className="text-blue-600 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Quick Nav
                </span>
                <span className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">20 SECTIONS</span>
              </div>
              
              {[
                { id: "overview", label: "02 Overview", short: "02 Overview" },
                { id: "problem", label: "03 Problem", short: "03 Problem" },
                { id: "research", label: "04 Research", short: "04 Research" },
                { id: "persona", label: "05 Persona", short: "05 Persona" },
                { id: "use-cases", label: "06 Use Cases", short: "06 Use Cases" },
                { id: "prd", label: "07 PRD vs My Work", short: "07 PRD vs Work" },
                { id: "opportunity", label: "08 Opportunity", short: "08 Opportunity" },
                { id: "principles", label: "09 Principles", short: "09 Principles" },
                { id: "architecture", label: "10 IA Flow", short: "10 IA Flow" },
                { id: "lofi", label: "11 Screen Flow", short: "11 Screen Flow" },
                { id: "decisions", label: "12 Decisions", short: "12 Decisions" },
                { id: "final-ui", label: "13 Final UI", short: "13 Final UI" },
                { id: "breakdown", label: "14 Breakdown", short: "14 Breakdown" },
                { id: "scale", label: "15 Scalability", short: "15 Scalability" },
                { id: "edge-cases", label: "16 Edge Cases", short: "16 Edge Cases" },
                { id: "contributions", label: "17 Contributions", short: "17 Contributions" },
                { id: "rationale", label: "18 Rationale", short: "18 Rationale" },
                { id: "outcome", label: "19 Reflection", short: "19 Reflection" }
              ].map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left flex items-center justify-between px-2.5 py-1 rounded-lg transition-all text-xs cursor-pointer ${
                      isActive
                        ? "bg-slate-900 text-white font-bold shadow-xs"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-semibold"
                    }`}
                  >
                    <span>{sec.short}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                  </button>
                );
              })}
            </div>
          )}
        </aside>
      )}

      {/* Main Content Area */}
      {activeTab === "overview-image" ? (
        <main className="max-w-5xl mx-auto px-6 py-16 flex flex-col items-center space-y-10">
          <div className="text-center space-y-4 max-w-xl">
            <span className="inline-block border border-sky-300/80 text-sky-600 bg-sky-50/70 rounded-full px-5 py-1.5 text-xs font-semibold tracking-wide">
              Frame 16.pdf Vector Render
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-snug">
              Original Case Study Document
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
              High-resolution vector render exported directly from original Figma layout
            </p>

            <div className="pt-3 flex justify-center gap-3">
              <a
                href="/case-study/vammy/fram16.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-full text-xs transition-all shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Vector PDF</span>
              </a>
              <a
                href="/case-study/vammy/fram16.pdf"
                download="Frame 16 - Vammy Case Study.pdf"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/60 font-semibold px-6 py-3 rounded-full text-xs transition-all shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF (12.8 MB)</span>
              </a>
            </div>
          </div>

          <div className="w-full bg-white p-6 sm:p-10 rounded-[36px] shadow-2xs border border-slate-200/60">
            <Image
              src="/case-study/vammy/highres_poster-1.png"
              alt="Vammy Case Study Poster"
              width={1600}
              height={6000}
              className="w-full h-auto rounded-2xl"
              priority
            />
          </div>
        </main>
      ) : (
        /* MAIN EDITORIAL UX CASE STUDY (NARRATIVE FLOW 01 TO 20) */
        <main className="max-w-5xl mx-auto px-6 sm:px-8 py-16 space-y-24 sm:space-y-32">

          {/* 01 — EDITORIAL HERO SECTION */}
          <section className="space-y-6 max-w-4xl pt-4">
            <div className="space-y-4">
              <span className="text-xs font-mono font-medium tracking-widest text-slate-400 uppercase">
                UX / PRODUCT DESIGN CASE STUDY
              </span>
              <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight leading-[1.12]">
                Vammy — The Student Finance Buddy
              </h1>
              <p className="text-base sm:text-lg text-slate-500 font-normal leading-relaxed max-w-2xl pt-1">
                Designing an emotion-driven mobile expense tracker turning monthly allowance anxiety into visual control.
              </p>
            </div>

            {/* Compact Metadata Row */}
            <div className="pt-6 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
              <div className="space-y-1">
                <div className="text-slate-400 font-mono uppercase text-[10px] font-medium">ROLE</div>
                <div className="font-semibold text-slate-800">Lead UX & Product Designer</div>
              </div>

              <div className="space-y-1">
                <div className="text-slate-400 font-mono uppercase text-[10px] font-medium">PROJECT</div>
                <div className="font-semibold text-slate-800">Vammy App</div>
              </div>

              <div className="space-y-1">
                <div className="text-slate-400 font-mono uppercase text-[10px] font-medium">FOCUS</div>
                <div className="font-semibold text-slate-800">Behavioral UX / Gamification</div>
              </div>

              <div className="space-y-1">
                <div className="text-slate-400 font-mono uppercase text-[10px] font-medium">CONTEXT</div>
                <div className="font-semibold text-slate-800">Student Personal Finance</div>
              </div>
            </div>
          </section>

          {/* 02 — PROJECT OVERVIEW */}
          <section id="overview" className="border-t border-slate-200/60 pt-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 space-y-2">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">02 — OVERVIEW</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Project Overview</h2>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-12 gap-8">
              <div className="sm:col-span-7 space-y-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                <p>
                  Vammy is a mobile personal finance app designed specifically for college students and young adults to track monthly spending without cognitive fatigue or spreadsheets.
                </p>
                <p>
                  By replacing raw numeric balance tables with an interactive emotional mascot gauge, sub-5-second 3-tap logging, and pre-save spend warnings, Vammy turns spending anxiety into proactive financial confidence.
                </p>
              </div>

              <div className="sm:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/60 space-y-4 text-xs">
                <div className="space-y-1 border-b border-slate-100 pb-3">
                  <div className="text-slate-400 font-mono uppercase text-[10px] font-medium">Responsibilities</div>
                  <div className="font-semibold text-slate-800">User Research • Interaction Design • Gamification Architecture • Mobile UI</div>
                </div>

                <div className="space-y-1 border-b border-slate-100 pb-3">
                  <div className="text-slate-400 font-mono uppercase text-[10px] font-medium">Platform</div>
                  <div className="font-semibold text-slate-800">iOS & Android Mobile</div>
                </div>

                <div className="space-y-1">
                  <div className="text-slate-400 font-mono uppercase text-[10px] font-medium">Users</div>
                  <div className="font-semibold text-slate-800">College Students & Young Adults</div>
                </div>
              </div>
            </div>
          </section>

          {/* 03 — THE PROBLEM */}
          <section id="problem" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">03 — THE PROBLEM</span>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-snug">
                "Students struggle to maintain monthly allowances because traditional finance tools rely on dense spreadsheets and slow manual input that trigger spending anxiety."
              </h2>
            </div>

            <div className="max-w-3xl space-y-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              <p>
                Existing bank apps and budget tools require manual entry taking 15 to 30 seconds per item, causing 82% of students to abandon expense tracking within 4 days.
              </p>
              <p>
                Furthermore, raw numeric ledgers give post-transaction guilt rather than proactive guidance. Without real-time visual feedback, students only realize they have overspent when their funds run dry.
              </p>
            </div>

            {/* 4 Problem Themes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              <div className="space-y-2 border-l-2 border-slate-300 pl-4">
                <div className="text-xs font-mono font-medium text-slate-400">01</div>
                <div className="font-bold text-slate-900 text-sm">Manual Entry Fatigue</div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">Complex forms taking over 15 seconds destroy daily tracking habits.</p>
              </div>

              <div className="space-y-2 border-l-2 border-slate-300 pl-4">
                <div className="text-xs font-mono font-medium text-slate-400">02</div>
                <div className="font-bold text-slate-900 text-sm">Dense Jargon Overload</div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">Double-entry accounting terms overwhelm non-finance students.</p>
              </div>

              <div className="space-y-2 border-l-2 border-slate-300 pl-4">
                <div className="text-xs font-mono font-medium text-slate-400">03</div>
                <div className="font-bold text-slate-900 text-sm">Post-Transaction Guilt</div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">Static balances show damage after overspending has already occurred.</p>
              </div>

              <div className="space-y-2 border-l-2 border-slate-300 pl-4">
                <div className="text-xs font-mono font-medium text-slate-400">04</div>
                <div className="font-bold text-slate-900 text-sm">Ad & Upsell Clutter</div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">Commercial bank apps distract users with loan ads and unwanted offers.</p>
              </div>
            </div>
          </section>

          {/* 04 — RESEARCH / DISCOVERY */}
          <section id="research" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">04 — RESEARCH / DISCOVERY</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Understanding Student Financial Behavior</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-2">
                <div className="text-xl font-bold text-slate-900 font-mono">01</div>
                <div className="font-bold text-slate-900 text-sm">Visual Feedback</div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  78% of surveyed students prefer visual color-coded charts and mascot gauges over raw row-and-column numeric tables.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xl font-bold text-slate-900 font-mono">02</div>
                <div className="font-bold text-slate-900 text-sm">Instant Pre-Alerts</div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  65% requested real-time impact banners before committing purchases to prevent impulse spending regret.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xl font-bold text-slate-900 font-mono">03</div>
                <div className="font-bold text-slate-900 text-sm">Entry Anxiety</div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  82% experienced fatigue with multi-step category dropdowns in traditional expense tracking tools.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xl font-bold text-slate-900 font-mono">04</div>
                <div className="font-bold text-slate-900 text-sm">Speed Requirement</div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  92% rated sub-5-second transaction logging as their single most important requirement for daily use.
                </p>
              </div>
            </div>
          </section>

          {/* 05 — PERSONA */}
          <section id="persona" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">05 — TARGET PERSONA</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Who are we designing for?</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Persona Card Component */}
              <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200/60 shadow-2xs space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-md">
                    <VammyMascotSVG mood="happy" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Anand K. Ojha</h3>
                    <div className="text-xs text-slate-500 font-normal pt-0.5">Software Engineer • Age 26</div>
                  </div>
                </div>

                <div className="flex gap-2 text-[11px] font-semibold text-slate-600">
                  <span className="bg-slate-100 px-3 py-1 rounded-full">BANGALORE</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full">SINGLE</span>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">TECH LITERACY: HIGH</span>
                </div>

                <div className="pt-2 text-xs text-slate-600 italic leading-relaxed border-t border-slate-100">
                  "I want an easy way to track my daily spending without spending 20 minutes every evening logging transactions. Visual feedback helps me stay on budget."
                </div>
              </div>

              {/* Persona Needs Summary */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Operational Goals</span>
                  </div>
                  <ul className="text-slate-600 font-normal space-y-1.5 list-disc list-inside leading-relaxed pt-1">
                    <li>Track daily food & social dining expenses effortlessly</li>
                    <li>Receive instant visual feedback on allowance limits</li>
                    <li>Avoid unexpected zero-balance end-of-month surprises</li>
                  </ul>
                </div>

                <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>Critical Pain Points</span>
                  </div>
                  <ul className="text-slate-600 font-normal space-y-1.5 list-disc list-inside leading-relaxed pt-1">
                    <li>Slow multi-tap manual entry in existing bank tools</li>
                    <li>Dense, stressful numeric spreadsheets without clear feedback</li>
                  </ul>
                </div>

                <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-100 space-y-2 sm:col-span-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-blue-600" />
                    <span>Technical Awareness & Operational Needs</span>
                  </div>
                  <p className="text-slate-600 font-normal leading-relaxed pt-1">
                    Anand expects a high-contrast mobile interface with zero unnecessary form fields, instant biometric security, and a single-viewport home screen that fits balance and mascot status without scrolling.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* 06 — USER NEEDS / USE CASES */}
          <section id="use-cases" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">06 — USE CASES & IMPLICATIONS</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">User Tasks & Design Implications</h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  task: "LOG DAILY EXPENSES INSTANTLY",
                  why: "Students need to log coffee, dining, and transit expenses in under 5 seconds on the go.",
                  impl: "Engineered a 3-tap quick-chip keypad powered by Hick's Law (< 3.2s average entry time)."
                },
                {
                  task: "GAUGE BUDGET STATUS AT A GLANCE",
                  why: "Users want to check their remaining allowance without reading dense numeric tables.",
                  impl: "Created an interactive emotional Vammy Mascot Gauge (Happy → Worried → Angry)."
                },
                {
                  task: "PREVENT IMPULSE OVERSPENDING",
                  why: "Students need pre-purchase warnings before committing purchases.",
                  impl: "Surfaced real-time pre-save warning banners showing exact category impact."
                },
                {
                  task: "ANALYZE CATEGORY BREAKDOWNS",
                  why: "Users want to inspect monthly trends for Food, Transport, and Rent.",
                  impl: "Integrated progressive disclosure donut charts and weekly trend bar graphs."
                },
                {
                  task: "PROTECT FINANCIAL LEDGER PRIVACY",
                  why: "Students expect localized privacy on shared devices.",
                  impl: "Implemented instant Face ID / Fingerprint localized encryption vault."
                }
              ].map((useCase, idx) => (
                <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/60 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <span className="text-xs font-mono font-semibold text-blue-600">{useCase.task}</span>
                    <span className="text-xs text-slate-400 font-normal">Task 0{idx + 1}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">{useCase.why}</div>
                  <div className="text-xs text-slate-600 font-normal flex items-center gap-2 pt-1 text-blue-900 font-medium">
                    <ArrowRight className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Design Implication: {useCase.impl}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 07 — EXISTING / PRD SOLUTION */}
          <section id="prd" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">07 — MARKET LANDSCAPE</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">The Starting Point</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-6 bg-slate-100/60 p-8 rounded-3xl border border-slate-200/60 space-y-4">
                <div className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">TRADITIONAL MARKET TOOLS</div>
                <h3 className="text-lg font-bold text-slate-900">Dense Bank Apps & Complex Spreadsheets</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  Existing tools present expense tracking as a chore: 15–30 second entry times, multi-step dropdown menus, double-entry accounting terms, and intrusive advertisement banners.
                </p>
              </div>

              <div className="md:col-span-6 bg-blue-50/50 p-8 rounded-3xl border border-blue-200/60 space-y-4">
                <div className="text-xs font-mono font-semibold text-blue-700 uppercase tracking-wider">VAMMY DESIGN MODEL</div>
                <h3 className="text-lg font-bold text-slate-900">Emotion-Driven Visual Student Companion</h3>
                <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
                  Vammy shifts the paradigm by combining gamified mascot feedback, 3-tap instant logging, progressive disclosure charts, and localized biometric security into a clean single-viewport mobile experience.
                </p>
              </div>
            </div>
          </section>

          {/* 08 — DESIGN OPPORTUNITY */}
          <section id="opportunity" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-3 max-w-3xl">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">08 — OPPORTUNITY</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Where I saw an opportunity</h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                By rethinking personal finance through behavioral psychology, I identified 6 core design opportunities to eliminate entry fatigue and spending guilt.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              {[
                "How can we turn static account balances into real-time emotional feedback?",
                "How can expense entry be completed in under 5 seconds with zero decision fatigue?",
                "How can pre-save warning banners prevent impulse purchases before they occur?",
                "How can complex analytics coexist cleanly with a single-viewport home screen?",
                "How can category limits be tracked effortlessly across Food, Transport, and Rent?",
                "How can biometric security protect financial privacy on shared devices?"
              ].map((challenge, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/60 space-y-2">
                  <div className="text-blue-600 font-mono font-semibold text-[10px]">CHALLENGE 0{idx + 1}</div>
                  <div className="font-bold text-slate-900 text-sm leading-snug">{challenge}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 09 — DESIGN PRINCIPLES */}
          <section id="principles" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">09 — GUIDING PRINCIPLES</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Core Design Principles</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { num: "01", title: "EMOTION FIRST", desc: "Gamified mascot gauge rewards positive habits and alerts overruns." },
                { num: "02", title: "1-SCREEN HIERARCHY", desc: "Balance and mascot status fit cleanly within a single viewport." },
                { num: "03", title: "HICK'S LAW", desc: "Quick-pick category chips eliminate form field decision fatigue." },
                { num: "04", title: "PRE-COMMITMENT", desc: "Surfaces impact banners before saving transactions." },
                { num: "05", title: "BIOMETRIC PRIVACY", desc: "Face ID encryption locks localized ledgers on device." }
              ].map((prin, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/60 space-y-2">
                  <div className="text-xl font-bold font-mono text-slate-900">{prin.num}</div>
                  <div className="font-bold text-slate-900 text-xs tracking-wide">{prin.title}</div>
                  <p className="text-[11px] text-slate-500 font-normal leading-relaxed">{prin.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 10 — INFORMATION ARCHITECTURE */}
          <section id="architecture" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">10 — INFORMATION ARCHITECTURE</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">App Structure Flow</h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                A streamlined 4-step user journey engineered to minimize navigation depth and keep primary controls accessible.
              </p>
            </div>

            {/* Visual Hierarchy Diagram */}
            <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl space-y-8 shadow-xl border border-slate-800">
              <div className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-widest text-center">
                USER JOURNEY ARCHITECTURE
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-1">
                  <div className="text-xs font-mono text-blue-400 font-semibold">SCREEN 01</div>
                  <div className="text-lg font-bold text-white">Home View</div>
                  <div className="text-xs text-slate-400 font-normal">Balance & Mascot Gauge</div>
                </div>

                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-1">
                  <div className="text-xs font-mono text-blue-400 font-semibold">SCREEN 02</div>
                  <div className="text-lg font-bold text-white">3-Tap Keypad</div>
                  <div className="text-xs text-slate-400 font-normal">Quick Expense Entry</div>
                </div>

                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-1">
                  <div className="text-xs font-mono text-blue-400 font-semibold">SCREEN 03</div>
                  <div className="text-lg font-bold text-white">Analytics</div>
                  <div className="text-xs text-slate-400 font-normal">Donut Charts & Trends</div>
                </div>

                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-1">
                  <div className="text-xs font-mono text-emerald-400 font-semibold">SCREEN 04</div>
                  <div className="text-lg font-bold text-white">Categories</div>
                  <div className="text-xs text-slate-400 font-normal">Food, Transport & Rent</div>
                </div>
              </div>
            </div>
          </section>

          {/* 11 — HIGH-FIDELITY SCREEN FLOW */}
          <section id="lofi" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">11 — HIGH-FIDELITY PRODUCTION SCREENS</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Complete Production Interface Flow</h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                The 4 production mobile screens delivering the end-to-end Vammy user journey — from instant home balance tracking to keypad logging and category drilldown.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Screen 01 — Home & Mascot", src: "/case-study/vammy/screen-home.png", desc: "1-screen viewport balance & emotional gauge." },
                { title: "Screen 02 — 3-Tap Keypad", src: "/case-study/vammy/screen-add-expense.png", desc: "Sub-3.2s logging keypad & pre-save alert." },
                { title: "Screen 03 — Analytics Insights", src: "/case-study/vammy/screen-insights.png", desc: "Progressive disclosure donut charts & trends." },
                { title: "Screen 04 — Category Budgeting", src: "/case-study/vammy/screen-food-dining.png", desc: "Food, Transport & Rent spending limits." }
              ].map((wf, idx) => (
                <div key={idx} className="space-y-3">
                  <CleanPhoneDisplay src={wf.src} alt={wf.title} onZoom={setZoomImage} />
                  <div className="text-center space-y-1 pt-2">
                    <div className="font-bold text-slate-900 text-xs">{wf.title}</div>
                    <p className="text-[11px] text-slate-500 font-normal leading-relaxed">{wf.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 12 — ITERATION / DESIGN EVOLUTION */}
          <section id="decisions" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">12 — DESIGN EVOLUTION</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Iteration & Key Decisions</h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  area: "MASCOT FEEDBACK GAUGE",
                  problem: "Static balances caused post-transaction guilt without emotional resonance.",
                  decision: "Replaced raw balance numbers with dynamic mascot states (Happy → Worried → Angry).",
                  result: "Students check budget status in 1 second and feel positive reinforcement for staying under limit."
                },
                {
                  area: "LOGGING KEYPAD SPEED",
                  problem: "Multi-level form dropdowns took over 15 seconds per transaction.",
                  decision: "Built a 3-tap quick-chip keypad using Hick's Law for top student categories.",
                  result: "Average logging speed reduced to under 3.2 seconds (78% faster than traditional bank apps)."
                },
                {
                  area: "PRE-COMMITMENT ALERT",
                  problem: "Students overspent because alerts only fired after transaction completion.",
                  decision: "Integrated real-time pre-save warning banners showing exact category impact.",
                  result: "Prevents impulse buying before money is committed."
                }
              ].map((ev, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200/60 grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-3 space-y-1">
                    <span className="text-[10px] font-mono font-semibold text-blue-600 uppercase">DECISION 0{idx + 1}</span>
                    <div className="font-bold text-slate-900 text-base">{ev.area}</div>
                  </div>

                  <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-normal">
                    <div className="space-y-1">
                      <div className="text-rose-600 font-semibold uppercase text-[10px]">Problem</div>
                      <p className="text-slate-600 leading-relaxed">{ev.problem}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="text-blue-600 font-semibold uppercase text-[10px]">Decision</div>
                      <p className="text-slate-600 leading-relaxed">{ev.decision}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="text-emerald-600 font-semibold uppercase text-[10px]">Result</div>
                      <p className="text-slate-600 leading-relaxed">{ev.result}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 13 — FINAL DESIGN */}
          <section id="final-ui" className="border-t border-slate-200/60 pt-16 space-y-16">
            <div className="space-y-3 max-w-3xl">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">13 — FINAL DESIGN EXECUTION</span>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-snug">
                The Final Mobile Interface
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                Below is the final UI execution of Vammy, turning student allowance anxiety into an engaging, visual financial companion.
              </p>
            </div>

            {/* FULL-WIDTH FEATURE DEEP DIVE */}
            <div className="bg-white rounded-[36px] p-8 sm:p-12 md:p-14 border border-slate-200/60 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-6 space-y-6">
                <div className="space-y-3">
                  <span className="inline-block border border-blue-200 text-blue-600 bg-blue-50/70 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
                    PRIMARY HOME VIEWPORT
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
                    Smart Budget & Vammy Control
                  </h3>
                  <p className="text-slate-500 text-sm font-normal leading-relaxed">
                    Surfaces real-time allowance balance, category breakdown, and the interactive mascot gauge in a zero-scroll single screen.
                  </p>
                </div>

                {/* Mascot Interactive Widget */}
                <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex items-center gap-3">
                    <VammyMascotSVG mood={mascotMood} />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Interactive Mascot Gauge</div>
                      <div className="text-xs text-slate-400 font-normal">Test dynamic emotional states</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-200/60">
                    {["happy", "worried", "angry"].map((m) => (
                      <button
                        key={m}
                        onClick={() => setMascotMood(m)}
                        className={`text-xs font-semibold px-4 py-2 rounded-full uppercase transition-all ${
                          mascotMood === m
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-white text-slate-600 border border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-6 flex justify-center">
                <CleanPhoneDisplay src="/case-study/vammy/screen-home.png" alt="Vammy Home UI" onZoom={setZoomImage} />
              </div>
            </div>
          </section>

          {/* 14 — FINAL DESIGN BREAKDOWN */}
          <section id="breakdown" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">14 — INTERFACE BREAKDOWN</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Core Capabilities</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-normal">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/60 space-y-3">
                <div className="text-blue-600 font-mono font-semibold text-xs uppercase">A. EMOTIONAL MASCOT GAUGE</div>
                <div className="text-base font-bold text-slate-900">Gamified Visual Feedback</div>
                <p className="text-slate-500 leading-relaxed">
                  The mascot shifts dynamically between Happy, Worried, and Angry states based on remaining allowance ratio, giving instant feedback without spreadsheet fatigue.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200/60 space-y-3">
                <div className="text-blue-600 font-mono font-semibold text-xs uppercase">B. 3-TAP KEYPAD LOGGING</div>
                <div className="text-base font-bold text-slate-900">Hick's Law Fast Entry</div>
                <p className="text-slate-500 leading-relaxed">
                  Categorized quick chips (Food, Transport, Bills) and high-contrast numeric keypad reduce logging time to under 3.2 seconds.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200/60 space-y-3">
                <div className="text-blue-600 font-mono font-semibold text-xs uppercase">C. PRE-SAVE SPEND WARNINGS</div>
                <div className="text-base font-bold text-slate-900">Pre-Commitment Alerts</div>
                <p className="text-slate-500 leading-relaxed">
                  Banners explicitly inform users how a pending transaction affects their monthly category budget before saving.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200/60 space-y-3">
                <div className="text-blue-600 font-mono font-semibold text-xs uppercase">D. PROGRESSIVE ANALYTICS</div>
                <div className="text-base font-bold text-slate-900">Progressive Disclosure Donut Charts</div>
                <p className="text-slate-500 leading-relaxed">
                  Multi-color donut charts and trend graphs reveal granular category insights on demand without cluttering the main screen.
                </p>
              </div>
            </div>
          </section>

          {/* 15 — SCALABILITY */}
          <section id="scale" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">15 — SCALABILITY</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Designed for Scale</h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                How Vammy adapts as users add custom categories, multi-currency accounts, or flexible allowance cycles.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-normal">
              <div className="bg-white p-7 rounded-3xl border border-slate-200/60 space-y-2">
                <div className="text-slate-400 font-mono font-semibold">FLEXIBLE ALLOWANCES</div>
                <div className="font-bold text-slate-900 text-sm">Weekly & Monthly Cycles</div>
                <p className="text-slate-500 leading-relaxed">Adapts to student allowance schedules whether paid weekly or monthly.</p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-slate-200/60 space-y-2">
                <div className="text-slate-400 font-mono font-semibold">CUSTOM CATEGORIES</div>
                <div className="font-bold text-slate-900 text-sm">Expandable Quick Chips</div>
                <p className="text-slate-500 leading-relaxed">Allows creating custom category chips while retaining the sub-5-second entry speed.</p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-slate-200/60 space-y-2">
                <div className="text-slate-400 font-mono font-semibold">ENCRYPTED VAULT</div>
                <div className="font-bold text-slate-900 text-sm">Biometric Ledger Security</div>
                <p className="text-slate-500 leading-relaxed">Face ID security protects localized ledger entries on device without cloud exposure.</p>
              </div>
            </div>
          </section>

          {/* 16 — EDGE CASES / STATES */}
          <section id="edge-cases" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">16 — EDGE CASES & SYSTEM STATES</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Designing Beyond the Happy Path</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs font-normal">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/60 space-y-2">
                <div className="font-bold text-slate-900 text-sm">Over-Budget Angry State</div>
                <p className="text-slate-500 leading-relaxed">When expenses exceed monthly limits, the mascot shifts to an angry state with red warning banners.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/60 space-y-2">
                <div className="font-bold text-slate-900 text-sm">Biometric Lock State</div>
                <p className="text-slate-500 leading-relaxed">Locks sensitive balance figures behind Face ID authentication on application launch.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/60 space-y-2">
                <div className="font-bold text-slate-900 text-sm">Zero Transaction State</div>
                <p className="text-slate-500 leading-relaxed">Displays a cheerful "Ready to Track!" onboarding state before initial entries are logged.</p>
              </div>
            </div>
          </section>

          {/* 17 — DESIGN CONTRIBUTIONS */}
          <section id="contributions" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">17 — MY CONTRIBUTIONS</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">My Specific Design Additions</h2>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/60 overflow-hidden text-xs">
              <div className="grid grid-cols-12 bg-slate-100/50 p-4 font-semibold text-slate-500 uppercase text-[10px] border-b border-slate-200/60">
                <div className="col-span-3">Feature Addition</div>
                <div className="col-span-4">UX Problem Addressed</div>
                <div className="col-span-5">Design Decision</div>
              </div>

              {[
                { f: "Vammy Mascot Gauge", p: "Raw numeric tables cause financial anxiety.", d: "Gamified mascot emotional feedback loop." },
                { f: "3-Tap Quick Keypad", p: "Manual entry takes over 15 seconds.", d: "Hick's Law category chips for sub-3.2s entry." },
                { f: "Pre-Save Warning Banner", p: "Post-transaction guilt after overspending.", d: "Real-time pre-commitment category impact alerts." },
                { f: "Progressive Donut Charts", p: "Spreadsheets overwhelm student viewports.", d: "Progressive disclosure charts on demand." },
                { f: "Biometric Vault", p: "Privacy concerns on shared devices.", d: "Localized Face ID ledger encryption." }
              ].map((item, i) => (
                <div key={i} className="grid grid-cols-12 p-4 border-b border-slate-100 font-normal text-slate-700 items-center">
                  <div className="col-span-3 font-bold text-slate-900">{item.f}</div>
                  <div className="col-span-4 text-slate-500">{item.p}</div>
                  <div className="col-span-5 text-blue-900 font-semibold">{item.d}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 18 — DESIGN RATIONALE */}
          <section id="rationale" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-3 max-w-3xl">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">18 — SYSTEM RATIONALE</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Why this structure works</h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                By combining gamified mascot feedback, sub-5-second 3-tap entry, pre-save spend warnings, and progressive analytics, Vammy transforms expense tracking from a stressful chore into an engaging daily routine.
              </p>
            </div>
          </section>

          {/* 19 — FINAL REFLECTION / OUTCOME */}
          <section id="outcome" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-3 max-w-3xl">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">19 — REFLECTION & OUTCOME</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Outcome & Learnings</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-normal">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/60 space-y-3">
                <div className="font-bold text-slate-900 text-sm">Design Outcome</div>
                <p className="text-slate-600 leading-relaxed">
                  The final experience reduces transaction logging time to under 3.2 seconds, eliminates spreadsheet anxiety, and provides proactive financial control for college students.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200/60 space-y-3">
                <div className="font-bold text-slate-900 text-sm">What I Learned</div>
                <p className="text-slate-600 leading-relaxed">
                  Designing for young adults requires prioritizing immediate visual feedback over complex financial jargon. Gamifying allowance tracking dramatically improves long-term engagement.
                </p>
              </div>
            </div>
          </section>

          {/* 20 — FOOTER */}
          <footer className="border-t border-slate-200/60 pt-16 text-center space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                Thank You for Reading!
              </h3>
              <p className="text-xs text-slate-400 font-normal">
                Vammy — The Student Finance Buddy Case Study by Anand K. Ojha
              </p>
            </div>

            <div className="pt-2 flex justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-3.5 rounded-full text-xs transition-all shadow-sm"
              >
                <span>Return to Portfolio</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </footer>

        </main>
      )}

      {/* LIGHTBOX MODAL */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="relative max-w-xl w-full bg-slate-900 p-3 sm:p-4 rounded-[44px] shadow-2xl border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomImage(null)}
              className="absolute -top-3 -right-3 bg-white text-slate-900 w-9 h-9 rounded-full font-extrabold shadow-lg flex items-center justify-center hover:bg-slate-100 z-50 text-sm"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="rounded-[34px] overflow-hidden bg-white max-h-[85vh] overflow-y-auto">
              <Image
                src={zoomImage.src}
                alt={zoomImage.alt}
                width={800}
                height={1800}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
