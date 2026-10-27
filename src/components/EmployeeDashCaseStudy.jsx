"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CaseStudyHero from "@/components/CaseStudyHero";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Layers,
  LayoutGrid,
  CheckCircle2,
  TrendingUp,
  Compass,
  Target,
  Clock,
  BookOpen,
  Users,
  MessageSquare,
  Bookmark,
  Search,
  Filter,
  Maximize2,
  X,
  ChevronRight,
  Palette,
  Type,
  Sliders,
  Shield,
  HelpCircle,
  Eye,
  Check,
  Calendar,
  Award,
  FileText,
  Lightbulb,
  Cpu,
  AlertCircle,
  ShieldCheck,
  BarChart3,
  Zap,
  RefreshCw
} from "lucide-react";

// Centralized asset paths — each image is rendered once in the final showcase
const ASSETS = {
  dashboard: "/case-study/Employee Dash/V2• Employee dashboard(1).png",
  journey: "/case-study/Employee Dash/My Journey.png",
  tasks: "/case-study/Employee Dash/Tasks.png",
  assessments: "/case-study/Employee Dash/Assessments.png",
  learning: "/case-study/Employee Dash/Learning.png",
  coaching: "/case-study/Employee Dash/Coaching.png",
  aiConversations: "/case-study/Employee Dash/AI Conversations.png",
  resources: "/case-study/Employee Dash/Resources.png",
};

// 10 navigation dock items as required
const NAV_SECTIONS = [
  { id: "overview", label: "02 Overview", short: "Overview" },
  { id: "problem", label: "03 Problem", short: "Problem" },
  { id: "objectives", label: "04 Objectives", short: "Objectives" },
  { id: "process", label: "05 Process", short: "Process" },
  { id: "architecture", label: "06 Architecture", short: "Architecture" },
  { id: "journey", label: "07 Journey", short: "Journey" },
  { id: "decisions", label: "08 Decisions", short: "Decisions" },
  { id: "screens", label: "09 Screens", short: "Screens" },
  { id: "design-system", label: "11 Design System", short: "Design System" },
  { id: "reflection", label: "12 Reflection", short: "Reflection" },
];

export default function EmployeeDashCaseStudy() {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavDockHovered, setIsNavDockHovered] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);

  // Scroll section tracking via IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -55% 0px",
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

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Keyboard accessibility for lightbox modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && zoomImage) {
        setZoomImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [zoomImage]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 font-sans pb-40 selection:bg-[#6744C3] selection:text-white">
      {/* ───────────────────────────────────────────────────────────────────────
          STICKY TOP HEADER NAVIGATION (Matches Vammy & Govt Election Structure)
      ─────────────────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-2xl border-b border-slate-200/70">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between relative">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors z-10"
          >
            <ArrowLeft className="w-4 h-4 text-[#6744C3]" />
            <span className="hidden sm:inline">Portfolio</span>
          </Link>

          {/* CENTER: Floating Pill Badge Dock */}
          <div className="absolute left-1/2 -translate-x-1/2 z-20">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-2xs border border-slate-200/80 gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6744C3] animate-pulse" />
              <span className="text-xs font-semibold text-slate-800">
                Editorial Product Design Case Study
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 z-10">
            <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest hidden md:inline">
              CONCEPT / 2026
            </span>
          </div>
        </div>
      </header>

      {/* ───────────────────────────────────────────────────────────────────────
          RIGHT-SIDE TUCKED HOVER-REVEAL NAVIGATION DOCK
      ─────────────────────────────────────────────────────────────────────── */}
      <aside
        aria-label="Case study navigation dock"
        onMouseEnter={() => setIsNavDockHovered(true)}
        onMouseLeave={() => setIsNavDockHovered(false)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center select-none pl-6 pr-3 py-6"
      >
        {!isNavDockHovered ? (
          /* TUCKED REVEAL HANDLE */
          <button
            onClick={() => setIsNavDockHovered(true)}
            className="bg-white/95 text-slate-900 border border-r-0 border-slate-200/90 py-3.5 px-2 rounded-l-2xl shadow-xl shadow-slate-900/10 hover:bg-white hover:text-[#6744C3] transition-all flex flex-col items-center gap-1.5 cursor-pointer group"
            title="Hover to reveal Navigation"
            aria-label="Open case study navigation dock"
          >
            <span className="w-2 h-2 rounded-full bg-[#6744C3] animate-pulse" />
            <LayoutGrid className="w-4 h-4 text-slate-800 group-hover:text-[#6744C3] group-hover:scale-110 transition-all" />
            <span className="text-[9px] font-mono font-bold text-slate-700 writing-vertical uppercase tracking-wider">
              NAV
            </span>
          </button>
        ) : (
          /* EXPANDED NAVIGATION PANEL */
          <div className="flex flex-col items-start gap-1 bg-white/95 backdrop-blur-2xl p-3 rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-900/10 text-xs w-52 max-h-[80vh] overflow-y-auto transition-all">
            <div className="flex items-center justify-between w-full pb-2 mb-1 border-b border-slate-100 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-white/90">
              <span className="text-[#6744C3] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" /> Quick Nav
              </span>
              <span className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-semibold">
                10 SECTIONS
              </span>
            </div>

            {NAV_SECTIONS.map((sec) => {
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
                  <span>{sec.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />}
                </button>
              );
            })}
          </div>
        )}
      </aside>

      {/* ───────────────────────────────────────────────────────────────────────
          MAIN EDITORIAL CASE STUDY (NARRATIVE FLOW 01 TO 13)
      ─────────────────────────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 sm:px-8 py-16 space-y-24 sm:space-y-32">

        {/* ═══════════════════════════════════════════════════════════════════
            01 — EDITORIAL HERO SECTION
        ═══════════════════════════════════════════════════════════════════ */}
        {/* 01 — PRODUCT-LED HERO SECTION */}
        <CaseStudyHero
          category="EMPLOYEE EXPERIENCE · PRODUCT DESIGN"
          title="A connected experience for employee growth."
          subtitle="Bringing development goals, tasks, assessments, learning, and coaching into one workspace."
          metadata={[
            { label: "ROLE", value: "Product Designer" },
            { label: "PROJECT", value: "Employee Dash" },
            { label: "PLATFORM", value: "Desktop Web Application" },
            { label: "STATUS", value: "Personal Concept" },
          ]}
          deviceType="laptop"
          mainImage={{
            src: ASSETS.dashboard,
            alt: "Employee Dash — Main Dashboard Workspace",
            width: 1440,
            height: 2027,
            urlText: "app.employeedash.internal/dashboard",
          }}
          accentColor="#6744C3"
          accentClass="text-[#6744C3]"
          badgeBgClass="bg-[#F7F0FF] text-[#6744C3] border-[#EADBFF]"
          floatingElements={[
            {
              position: "top-left",
              icon: <TrendingUp className="w-3.5 h-3.5" />,
              title: "12-Month Progression",
              subtitle: "Continuous roadmap arc & milestones",
            },
            {
              position: "top-right",
              icon: <Target className="w-3.5 h-3.5" />,
              title: "Actionable Tasks",
              subtitle: "Goals linked to daily execution backlog",
            },
            {
              position: "bottom-right",
              icon: <Sparkles className="w-3.5 h-3.5" />,
              title: "AI Growth Partner",
              subtitle: "Contextual reflection & 1:1 prep",
            },
          ]}
          onImageClick={(img) => setZoomImage(img)}
          scrollTargetId="overview"
        />

        {/* ═══════════════════════════════════════════════════════════════════
            02 — PROJECT OVERVIEW
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="overview" className="border-t border-slate-200/60 pt-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4 space-y-2">
            <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">02 — OVERVIEW</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Project Overview</h2>
          </div>

          <div className="md:col-span-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-8">
              <div className="sm:col-span-7 space-y-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                <p>
                  In most modern organizations, personal growth is fractured across disconnected tools:
                  an enterprise LMS for mandatory compliance, a spreadsheet for annual goal setting,
                  a calendar for 1:1 coaching, and separate forms for performance evaluations.
                </p>
                <p>
                  <strong>Employee Dash</strong> explores how these disparate activities can be brought
                  together into one coherent, human-centered workspace &mdash; helping employees understand
                  their current progress, identify their next developmental step, and access the right resources.
                </p>
              </div>

              <div className="sm:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/60 space-y-4 text-xs">
                <div className="space-y-1 border-b border-slate-100 pb-3">
                  <div className="text-slate-400 font-mono uppercase text-[10px] font-medium">Responsibilities</div>
                  <div className="font-semibold text-slate-800">
                    Product Framing &bull; Information Architecture &bull; Interaction Design &bull; Design System
                  </div>
                </div>

                <div className="space-y-1 border-b border-slate-100 pb-3">
                  <div className="text-slate-400 font-mono uppercase text-[10px] font-medium">Platform</div>
                  <div className="font-semibold text-slate-800">Desktop Web Application</div>
                </div>

                <div className="space-y-1">
                  <div className="text-slate-400 font-mono uppercase text-[10px] font-medium">Primary Users</div>
                  <div className="font-semibold text-slate-800">Individual Contributors &amp; Emerging Leaders</div>
                </div>
              </div>
            </div>

            {/* Visual Ecosystem Architecture Topology Map (SVG / Web Visual) */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-[#6744C3] font-bold">ECOSYSTEM TOPOLOGY</span>
                  <h4 className="text-sm font-bold text-slate-900">How the Eight Areas Connect</h4>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Hub &amp; Spoke Information Model</span>
              </div>

              {/* Central Hub and Radial Domains */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAF8FC] border border-[#EADBFF] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#6744C3]">
                    <TrendingUp className="w-4 h-4" />
                    <span>01. Orientation Layer</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Home:</strong> High-priority signal hub &amp; executive overview.
                    <br />
                    <strong>My Journey:</strong> 12-month long-term progression timeline &amp; goals.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8FC] border border-[#EADBFF] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#6744C3]">
                    <Target className="w-4 h-4" />
                    <span>02. Execution &amp; Feedback</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Tasks:</strong> Tactical day-to-day action items &amp; due dates.
                    <br />
                    <strong>Assessments:</strong> Assigned evaluations &amp; skills snapshot radar.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8FC] border border-[#EADBFF] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#6744C3]">
                    <Sparkles className="w-4 h-4" />
                    <span>03. Growth &amp; Support</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Learning &amp; Coaching:</strong> Continuous courses &amp; 1:1 mentorship prep.
                    <br />
                    <strong>AI &amp; Resources:</strong> Contextual reflection &amp; curated knowledge library.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            03 — THE PROBLEM
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="problem" className="border-t border-slate-200/60 pt-16 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">03 — THE PROBLEM</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-snug">
              &quot;Professional growth is more than a list of courses &mdash; yet traditional employee tools treat learning, assessments, coaching, and goals as disconnected chores.&quot;
            </h2>
          </div>

          <div className="max-w-3xl space-y-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            <p>
              When employee development activities are isolated into separate vendor platforms, employees
              experience high friction trying to translate long-term aspirations into weekly momentum.
            </p>
            <p>
              The case study explores how to overcome this fragmentation through three core design hypotheses:
            </p>
          </div>

          {/* 3 Core Problem Themes (Border-L-2 style matching Govt Election / Vammy) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="space-y-2 border-l-2 border-[#6744C3] pl-4">
              <div className="text-xs font-mono font-medium text-slate-400">01</div>
              <div className="font-bold text-slate-900 text-sm">Fragmented Activities</div>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Learning courses, coaching sessions, skill evaluations, and daily tasks live in separate portals with no shared narrative.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-[#6744C3] pl-4">
              <div className="text-xs font-mono font-medium text-slate-400">02</div>
              <div className="font-bold text-slate-900 text-sm">Unclear Next Steps</div>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Without a persistent visual reference of where they currently stand, employees struggle to identify immediate priorities for the week.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-[#6744C3] pl-4">
              <div className="text-xs font-mono font-medium text-slate-400">03</div>
              <div className="font-bold text-slate-900 text-sm">Disconnected Goals &amp; Action</div>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Long-term development goals remain dormant unless directly connected to practical tasks, modular lessons, and mentor agendas.
              </p>
            </div>
          </div>

          {/* Visual Comparison: Traditional Silos vs Employee Dash Model */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
            <div className="md:col-span-6 bg-slate-100/70 p-6 sm:p-8 rounded-3xl border border-slate-200/60 space-y-3">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                TRADITIONAL ENTERPRISE ECOSYSTEM
              </span>
              <h3 className="text-base font-bold text-slate-900">Scattered Silos &amp; Passive Checklists</h3>
              <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">&times;</span>
                  <span>Separate LMS login requiring multi-step navigation to find active lessons</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">&times;</span>
                  <span>Quarterly review spreadsheets disconnected from daily task backlogs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">&times;</span>
                  <span>Calendar invites with zero shared agenda preparation or follow-up notes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">&times;</span>
                  <span>Generic AI chat with no developmental context or privacy boundaries</span>
                </li>
              </ul>
            </div>

            <div className="md:col-span-6 bg-[#F7F0FF]/60 p-6 sm:p-8 rounded-3xl border border-[#EADBFF] space-y-3">
              <span className="text-[10px] font-mono font-bold text-[#6744C3] uppercase tracking-wider">
                EMPLOYEE DASH DESIGN HYPOTHESIS
              </span>
              <h3 className="text-base font-bold text-slate-900">Unified Progression &amp; Action Hub</h3>
              <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6744C3] shrink-0 mt-0.5" />
                  <span>Single dashboard surfacing continue-learning cards with 1-click resumption</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6744C3] shrink-0 mt-0.5" />
                  <span>My Journey milestones bound directly to categorized task backlogs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6744C3] shrink-0 mt-0.5" />
                  <span>360&deg; coaching hub integrating pre-meeting checklists and past mentor takeaways</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6744C3] shrink-0 mt-0.5" />
                  <span>Grounded AI growth prompts with private reflection bookmarking</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            04 — DESIGN OBJECTIVES
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="objectives" className="border-t border-slate-200/60 pt-16 space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">04 — DESIGN OBJECTIVES</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">What should the experience make easier?</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                num: "01",
                obj: "Establish a clear overview of the employee's development journey.",
                why: "Employees need instant situational awareness upon logging in &mdash; their current role, program completion progress, and immediate focus areas.",
                impl: "Surface global progress metrics, current stage badges, and prioritized tasks on the Home dashboard."
              },
              {
                num: "02",
                obj: "Connect long-term goals to actionable activities.",
                why: "Annual growth objectives stall when they lack day-to-day execution hooks.",
                impl: "Make overall progression, upcoming milestones, and related actionable tasks visible together with status labels."
              },
              {
                num: "03",
                obj: "Make learning, assessments, coaching, and resources easier to discover.",
                why: "Employees need both quick resumption of active lessons and frictionless browsing of developmental resources.",
                impl: "Provide prominent continue-learning cards, category-filtered carousels, and dedicated resource search."
              },
              {
                num: "04",
                obj: "Support reflection and personalized development through an AI conversation experience.",
                why: "Open-ended chatbots intimidate employees; AI needs explicit growth scaffolding and safety.",
                impl: "Provide suggested conversation starters, contextual reflection prompts, saved notes, and clear privacy guidance."
              }
            ].map((item) => (
              <div key={item.num} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/60 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <span className="text-xs font-mono font-semibold text-[#6744C3]">OBJECTIVE {item.num}</span>
                  <span className="text-xs text-slate-400 font-normal">Design Mandate</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900">{item.obj}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{item.why}</p>
                <div className="text-xs text-[#30254D] font-medium flex items-center gap-2 pt-1">
                  <ArrowRight className="w-4 h-4 text-[#6744C3] shrink-0" />
                  <span><strong>Design Implication:</strong> {item.impl}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            05 — MY DESIGN PROCESS
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="process" className="border-t border-slate-200/60 pt-16 space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">05 — DESIGN PROCESS</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">From product structure to interface decisions</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="space-y-2 border-l-2 border-[#6744C3] pl-4">
              <div className="text-xs font-mono font-bold text-[#6744C3]">PHASE 01</div>
              <div className="font-bold text-slate-900 text-sm">Understand</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Frame the product problem, target employee audience, and professional development journey through design hypotheses.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-[#6744C3] pl-4">
              <div className="text-xs font-mono font-bold text-[#6744C3]">PHASE 02</div>
              <div className="font-bold text-slate-900 text-sm">Structure</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Define the persistent navigation, information architecture, and core relationships between the eight destinations.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-[#6744C3] pl-4">
              <div className="text-xs font-mono font-bold text-[#6744C3]">PHASE 03</div>
              <div className="font-bold text-slate-900 text-sm">Explore</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Develop page layouts, typographic hierarchy, responsive grid structures, and reusable interaction patterns.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-[#6744C3] pl-4">
              <div className="text-xs font-mono font-bold text-[#6744C3]">PHASE 04</div>
              <div className="font-bold text-slate-900 text-sm">Design</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Build the high-fidelity visual interface and apply the purple design system token language across all eight screens.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-[#6744C3] pl-4">
              <div className="text-xs font-mono font-bold text-[#6744C3]">PHASE 05</div>
              <div className="font-bold text-slate-900 text-sm">Refine</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Review cross-screen visual consistency, contrast legibility, density balance, and responsive desktop behavior.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            06 — INFORMATION ARCHITECTURE
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="architecture" className="border-t border-slate-200/60 pt-16 space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">06 — INFORMATION ARCHITECTURE</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Eight destinations. One connected experience.</h2>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/60 space-y-8">
            {/* Visual IA Tree Diagram */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm tracking-wide shadow-xs">
                Employee Dash &mdash; Workspace Root
              </div>
              <div className="w-px h-6 bg-[#6744C3]" />
              <div className="w-full max-w-xl h-px bg-slate-200" />
            </div>

            {/* Flat 8 Navigation Destinations */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs font-semibold">
              <div className="p-2.5 rounded-xl bg-[#F7F0FF] text-[#6744C3] border border-[#EADBFF]">01. Home</div>
              <div className="p-2.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-200/70">02. My Journey</div>
              <div className="p-2.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-200/70">03. Tasks</div>
              <div className="p-2.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-200/70">04. Assessments</div>
              <div className="p-2.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-200/70">05. Learning</div>
              <div className="p-2.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-200/70">06. Coaching</div>
              <div className="p-2.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-200/70">07. AI Convos</div>
              <div className="p-2.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-200/70">08. Resources</div>
            </div>

            {/* 4 Conceptual Pillars */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Four Conceptual Groupings (Product Framework)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#FAF8FC] border border-[#EADBFF] space-y-2">
                  <span className="text-[10px] font-mono font-bold text-[#6744C3] uppercase tracking-wider">PILLAR 01</span>
                  <h4 className="text-sm font-bold text-slate-900">Orientation &amp; Progress</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Long-term roadmap, career milestones, and executive state comprehension.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-medium text-[#6744C3]">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#EADBFF]">Home</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#EADBFF]">My Journey</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8FC] border border-[#EADBFF] space-y-2">
                  <span className="text-[10px] font-mono font-bold text-[#6744C3] uppercase tracking-wider">PILLAR 02</span>
                  <h4 className="text-sm font-bold text-slate-900">Action &amp; Evaluation</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tactical task backlog, assigned reviews, and skills snapshot radar.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-medium text-[#6744C3]">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#EADBFF]">Tasks</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#EADBFF]">Assessments</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8FC] border border-[#EADBFF] space-y-2">
                  <span className="text-[10px] font-mono font-bold text-[#6744C3] uppercase tracking-wider">PILLAR 03</span>
                  <h4 className="text-sm font-bold text-slate-900">Skill Development</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Modular course consumption and 360&deg; 1:1 mentorship preparation.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-medium text-[#6744C3]">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#EADBFF]">Learning</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#EADBFF]">Coaching</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8FC] border border-[#EADBFF] space-y-2">
                  <span className="text-[10px] font-mono font-bold text-[#6744C3] uppercase tracking-wider">PILLAR 04</span>
                  <h4 className="text-sm font-bold text-slate-900">Personalized Support</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Guided AI reflection, prompt starters, and curated reference toolkits.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-medium text-[#6744C3]">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#EADBFF]">AI Convos</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#EADBFF]">Resources</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
              <strong>Architectural Note:</strong> These four pillars represent conceptual relationships.
              In the implemented UI, navigation remains a clean, flat 8-item sidebar to eliminate menu nesting
              and maintain 1-click access across all destinations.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            07 — THE EMPLOYEE JOURNEY
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="journey" className="border-t border-slate-200/60 pt-16 space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">07 — USER JOURNEY</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">From seeing progress to taking the next step</h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-3xl">
            The employee journey is structured as a continuous loop. Instead of browsing aimlessly,
            employees start with clear orientation and transition smoothly into action, capability building, and reflection.
          </p>

          {/* Visual Step-by-Step Journey Cards with Connectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#6744C3] bg-[#F7F0FF] px-2.5 py-1 rounded-md">STEP 01</span>
                <span className="text-[10px] font-mono text-slate-400">Home Hub</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Understand Current State</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                The employee reviews their role, overall program progress (68%), current stage, and immediate priorities.
              </p>
              <div className="text-[11px] font-mono text-[#6744C3] pt-2 border-t border-slate-100">
                Trigger: Weekly workspace login
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#6744C3] bg-[#F7F0FF] px-2.5 py-1 rounded-md">STEP 02</span>
                <span className="text-[10px] font-mono text-slate-400">Tasks &amp; Review</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Identify Next Action</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Program tasks and pending assessments surface specific deliverables requiring attention before the weekend.
              </p>
              <div className="text-[11px] font-mono text-[#6744C3] pt-2 border-t border-slate-100">
                Trigger: Due date urgency badges
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#6744C3] bg-[#F7F0FF] px-2.5 py-1 rounded-md">STEP 03</span>
                <span className="text-[10px] font-mono text-slate-400">Learning &amp; 1:1</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Explore Development</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Active learning modules, 1:1 coaching prep, and curated reference toolkits provide resources to level up skills.
              </p>
              <div className="text-[11px] font-mono text-[#6744C3] pt-2 border-t border-slate-100">
                Trigger: Skill gap discovery
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#6744C3] bg-[#F7F0FF] px-2.5 py-1 rounded-md">STEP 04</span>
                <span className="text-[10px] font-mono text-slate-400">AI Reflection</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Reflect &amp; Continue</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                My Journey timeline updates, and AI conversations help summarize takeaways and prepare for manager reviews.
              </p>
              <div className="text-[11px] font-mono text-[#6744C3] pt-2 border-t border-slate-100">
                Trigger: Milestone completion
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            08 — KEY DESIGN DECISIONS (Analytical Matrix Without Duplicate Images)
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="decisions" className="border-t border-slate-200/60 pt-16 space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">08 — DESIGN DECISIONS</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">The decisions behind the experience</h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-3xl">
            Below are the seven foundational design decisions. Each addresses a direct user challenge,
            articulates the interaction decision, and identifies the interface evidence showcased in Section 09.
          </p>

          <div className="space-y-4">
            {[
              {
                num: "01",
                area: "PROGRESS VISIBILITY",
                challenge: "Long-term development can feel abstract and demotivating when progress is spread across multiple LMS and goal portals.",
                decision: "Bring program completion metrics, the current developmental stage, milestones, and upcoming tasks into the primary Home dashboard.",
                evidence: "Screen 01 (Home) & Screen 02 (My Journey)"
              },
              {
                num: "02",
                area: "CONNECT GOALS TO ACTION",
                challenge: "Strategic career goals stall when employees cannot identify what tangible micro-tasks they should execute this week.",
                decision: "Directly link strategic growth milestones in My Journey to an actionable task backlog with priority chips and due dates.",
                evidence: "Screen 02 (My Journey) & Screen 03 (Tasks)"
              },
              {
                num: "03",
                area: "SEPARATE UPCOMING VS COMPLETED ASSESSMENTS",
                challenge: "Employees confuse pending assigned assessments with historical completed results, triggering evaluation fatigue.",
                decision: "Segment the workspace into Assigned Assessments, Completed Assessments, and a high-level Skills Snapshot radar.",
                evidence: "Screen 04 (Assessments)"
              },
              {
                num: "04",
                area: "ACTIONABLE LEARNING RESUMPTION",
                challenge: "Massive course catalogs overwhelm employees who simply want to resume their in-progress 15-minute lesson.",
                decision: "Prioritize prominent Continue-Learning resume cards at the top, followed by organized category discovery carousels below.",
                evidence: "Screen 05 (Learning)"
              },
              {
                num: "05",
                area: "360° COACHING WORKFLOW",
                challenge: "Coaching software often stops at calendar booking, ignoring critical pre-session preparation and post-session accountability.",
                decision: "Integrate upcoming session timing, mentor profile, talking points agenda, preparation checklist, and past session summaries.",
                evidence: "Screen 06 (Coaching)"
              },
              {
                num: "06",
                area: "CONTEXTUAL AI FOR GROWTH",
                challenge: "Generic chatbot boxes create cognitive friction for employees unsure how AI can assist their professional development.",
                decision: "Provide guided growth topic prompts ('Prepare for 1:1', 'Reflect on Feedback'), saved reflection notes, and clear privacy guidance.",
                evidence: "Screen 07 (AI Conversations)"
              },
              {
                num: "07",
                area: "RESOURCE DISCOVERABILITY",
                challenge: "Valuable reference guides and templates get buried across intranets and chat bookmarks.",
                decision: "Build a structured library combining global search, category pill filters, read-time badges, and 1-click bookmarks.",
                evidence: "Screen 08 (Resources)"
              }
            ].map((d) => (
              <div key={d.num} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3 space-y-1">
                  <span className="text-[10px] font-mono font-semibold text-[#6744C3] uppercase">DECISION {d.num}</span>
                  <div className="font-bold text-slate-900 text-sm sm:text-base">{d.area}</div>
                  <div className="text-[11px] font-mono text-[#8B5CF6] pt-1">
                    Evidence &rarr; {d.evidence}
                  </div>
                </div>

                <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-normal">
                  <div className="space-y-1">
                    <div className="text-rose-600 font-semibold uppercase text-[10px] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Challenge
                    </div>
                    <p className="text-slate-600 leading-relaxed">{d.challenge}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[#6744C3] font-semibold uppercase text-[10px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Design Decision
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed">{d.decision}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            09 — FINAL DESIGN SHOWCASE (ALL 8 SCREENS IN FULL HEIGHT, ONCE)
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="screens" className="border-t border-slate-200/60 pt-16 space-y-24">
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">
              09 — FINAL DESIGN SHOWCASE
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-snug">
              Inside Employee Dash
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Every screen is showcased below in full resolution without height truncation.
              Click any interface to expand it in the high-resolution lightbox.
            </p>
          </div>

          {/* SCREEN 01 — HOME DASHBOARD */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
              <div>
                <span className="text-xs font-mono font-semibold text-[#6744C3] uppercase">SCREEN 01 // HOME DASHBOARD</span>
                <h3 className="text-xl font-bold text-slate-900">Unified Progression &amp; Action Hub</h3>
              </div>
              <button
                onClick={() => setZoomImage({ src: ASSETS.dashboard, alt: "Screen 01 — Home Dashboard", title: "Screen 01: Home Dashboard", desc: "Centralized workspace synthesizing overall development progress, stage milestones, priority tasks, and upcoming coaching." })}
                className="text-xs font-semibold text-slate-900 hover:text-[#6744C3] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#6744C3]" />
                <span>View Full-Res UI</span>
              </button>
            </div>

            {/* Desktop Browser Window Header */}
            <div
              onClick={() => setZoomImage({ src: ASSETS.dashboard, alt: "Screen 01 — Home Dashboard", title: "Screen 01: Home Dashboard", desc: "Centralized workspace synthesizing overall development progress, stage milestones, priority tasks, and upcoming coaching." })}
              className="rounded-3xl overflow-hidden bg-white border border-slate-200/80 cursor-pointer shadow-md hover:border-[#6744C3]/40 transition-all group"
            >
              <div className="bg-slate-100/90 px-4 py-3 border-b border-slate-200/70 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="ml-2 font-mono text-[11px] text-slate-600">app.employeedash.internal/dashboard</span>
                </div>
                <span className="text-[11px] font-mono text-[#6744C3] group-hover:underline">1440 &times; 2027 Desktop Hi-Fi</span>
              </div>

              {/* Full Image (Unconstrained Height) */}
              <Image
                src={ASSETS.dashboard}
                alt="Screen 01 — Home Dashboard"
                width={1440}
                height={2027}
                className="w-full h-auto block"
                priority
              />
            </div>

            {/* 3-Column Structured Analysis */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">01. What the user sees</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Employee profile and current role, global program progress indicator (68%), current stage badge, prioritized task checklist, pending assessments summary, and action center calendar.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">02. Why structured this way</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Employs progressive disclosure: the top region delivers immediate reassurance through high-level metrics, while the lower modules group tactical obligations to eliminate cognitive fatigue.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">03. Relationship to journey</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Acts as the operational cockpit. Employees begin each week here to understand their current state and branch smoothly into My Journey, Tasks, or Coaching with 1-click precision.
                </p>
              </div>
            </div>
          </div>

          {/* SCREEN 02 — MY JOURNEY */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
              <div>
                <span className="text-xs font-mono font-semibold text-[#6744C3] uppercase">SCREEN 02 // MY JOURNEY</span>
                <h3 className="text-xl font-bold text-slate-900">12-Month Development Timeline &amp; Goals</h3>
              </div>
              <button
                onClick={() => setZoomImage({ src: ASSETS.journey, alt: "Screen 02 — My Journey", title: "Screen 02: My Journey", desc: "One-year timeline mapping progressive growth stages, developmental goals, and key milestone targets." })}
                className="text-xs font-semibold text-slate-900 hover:text-[#6744C3] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#6744C3]" />
                <span>View Full-Res UI</span>
              </button>
            </div>

            <div
              onClick={() => setZoomImage({ src: ASSETS.journey, alt: "Screen 02 — My Journey", title: "Screen 02: My Journey", desc: "One-year timeline mapping progressive growth stages, developmental goals, and key milestone targets." })}
              className="rounded-3xl overflow-hidden bg-white border border-slate-200/80 cursor-pointer shadow-md hover:border-[#6744C3]/40 transition-all group"
            >
              <div className="bg-slate-100/90 px-4 py-3 border-b border-slate-200/70 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="ml-2 font-mono text-[11px] text-slate-600">app.employeedash.internal/journey</span>
                </div>
                <span className="text-[11px] font-mono text-[#6744C3] group-hover:underline">1452 &times; 1443 Desktop Hi-Fi</span>
              </div>

              <Image
                src={ASSETS.journey}
                alt="Screen 02 — My Journey"
                width={1452}
                height={1443}
                className="w-full h-auto block"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">01. What the user sees</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  A visual one-year development timeline with quarterly stages, active development goals with progress percentage bars, and upcoming milestone achievement dates.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">02. Why structured this way</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Converts abstract annual performance reviews into tangible quarterly phases. Past stages provide reflection evidence, while future stages motivate forward momentum.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">03. Relationship to journey</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Provides the high-altitude career map. While Home handles daily triage, My Journey anchors the employee in their overall multi-month development trajectory.
                </p>
              </div>
            </div>
          </div>

          {/* SCREEN 03 — TASKS */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
              <div>
                <span className="text-xs font-mono font-semibold text-[#6744C3] uppercase">SCREEN 03 // TASKS</span>
                <h3 className="text-xl font-bold text-slate-900">Actionable Activity &amp; Backlog Management</h3>
              </div>
              <button
                onClick={() => setZoomImage({ src: ASSETS.tasks, alt: "Screen 03 — Tasks", title: "Screen 03: Tasks & Activity Management", desc: "Prioritized task backlog with metric status cards, category filtering, and due date labels." })}
                className="text-xs font-semibold text-slate-900 hover:text-[#6744C3] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#6744C3]" />
                <span>View Full-Res UI</span>
              </button>
            </div>

            <div
              onClick={() => setZoomImage({ src: ASSETS.tasks, alt: "Screen 03 — Tasks", title: "Screen 03: Tasks & Activity Management", desc: "Prioritized task backlog with metric status cards, category filtering, and due date labels." })}
              className="rounded-3xl overflow-hidden bg-white border border-slate-200/80 cursor-pointer shadow-md hover:border-[#6744C3]/40 transition-all group"
            >
              <div className="bg-slate-100/90 px-4 py-3 border-b border-slate-200/70 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="ml-2 font-mono text-[11px] text-slate-600">app.employeedash.internal/tasks</span>
                </div>
                <span className="text-[11px] font-mono text-[#6744C3] group-hover:underline">1452 &times; 1631 Desktop Hi-Fi</span>
              </div>

              <Image
                src={ASSETS.tasks}
                alt="Screen 03 — Tasks"
                width={1452}
                height={1631}
                className="w-full h-auto block"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">01. What the user sees</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Task status summary KPI cards (Total, In Progress, Completed, Overdue), keyword search, category filter chips (Learning, Milestones, Check-ins), priority badges, and due dates.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">02. Why structured this way</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Prevents cognitive overload through clear status metrics up top, followed by cleanly grouped task rows with standardized 8px padding and recognizable due date labels.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">03. Relationship to journey</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Converts high-level goals into tactical work. Completing tasks in this view directly updates progress indicators on Home and My Journey.
                </p>
              </div>
            </div>
          </div>

          {/* SCREEN 04 — ASSESSMENTS */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
              <div>
                <span className="text-xs font-mono font-semibold text-[#6744C3] uppercase">SCREEN 04 // ASSESSMENTS</span>
                <h3 className="text-xl font-bold text-slate-900">Assigned Evaluations &amp; Skills Snapshot</h3>
              </div>
              <button
                onClick={() => setZoomImage({ src: ASSETS.assessments, alt: "Screen 04 — Assessments", title: "Screen 04: Assessments & Results", desc: "Clear separation between assigned evaluations and completed skill feedback snapshots." })}
                className="text-xs font-semibold text-slate-900 hover:text-[#6744C3] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#6744C3]" />
                <span>View Full-Res UI</span>
              </button>
            </div>

            <div
              onClick={() => setZoomImage({ src: ASSETS.assessments, alt: "Screen 04 — Assessments", title: "Screen 04: Assessments & Results", desc: "Clear separation between assigned evaluations and completed skill feedback snapshots." })}
              className="rounded-3xl overflow-hidden bg-white border border-slate-200/80 cursor-pointer shadow-md hover:border-[#6744C3]/40 transition-all group"
            >
              <div className="bg-slate-100/90 px-4 py-3 border-b border-slate-200/70 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="ml-2 font-mono text-[11px] text-slate-600">app.employeedash.internal/assessments</span>
                </div>
                <span className="text-[11px] font-mono text-[#6744C3] group-hover:underline">1452 &times; 1460 Desktop Hi-Fi</span>
              </div>

              <Image
                src={ASSETS.assessments}
                alt="Screen 04 — Assessments"
                width={1452}
                height={1460}
                className="w-full h-auto block"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">01. What the user sees</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Pending assigned assessments with due dates, completed assessments with score summaries, and an interactive Skills Snapshot radar breaking down core competencies.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">02. Why structured this way</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Separating pending obligations from retrospective skill feedback removes evaluation dread, fostering a constructive growth mindset rather than anxiety.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">03. Relationship to journey</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Validates capability growth. Skill feedback here informs what courses to select in Learning and what talking points to bring to 1:1 Coaching meetings.
                </p>
              </div>
            </div>
          </div>

          {/* SCREEN 05 — LEARNING */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
              <div>
                <span className="text-xs font-mono font-semibold text-[#6744C3] uppercase">SCREEN 05 // LEARNING</span>
                <h3 className="text-xl font-bold text-slate-900">Active Courses &amp; Skill Acquisition</h3>
              </div>
              <button
                onClick={() => setZoomImage({ src: ASSETS.learning, alt: "Screen 05 — Learning", title: "Screen 05: Learning Courses & Progress", desc: "Top continue-learning cards with category discovery carousels and upcoming modules." })}
                className="text-xs font-semibold text-slate-900 hover:text-[#6744C3] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#6744C3]" />
                <span>View Full-Res UI</span>
              </button>
            </div>

            <div
              onClick={() => setZoomImage({ src: ASSETS.learning, alt: "Screen 05 — Learning", title: "Screen 05: Learning Courses & Progress", desc: "Top continue-learning cards with category discovery carousels and upcoming modules." })}
              className="rounded-3xl overflow-hidden bg-white border border-slate-200/80 cursor-pointer shadow-md hover:border-[#6744C3]/40 transition-all group"
            >
              <div className="bg-slate-100/90 px-4 py-3 border-b border-slate-200/70 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="ml-2 font-mono text-[11px] text-slate-600">app.employeedash.internal/learning</span>
                </div>
                <span className="text-[11px] font-mono text-[#6744C3] group-hover:underline">1452 &times; 1486 Desktop Hi-Fi</span>
              </div>

              <Image
                src={ASSETS.learning}
                alt="Screen 05 — Learning"
                width={1452}
                height={1486}
                className="w-full h-auto block"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">01. What the user sees</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Continue-learning cards with active progress bars, estimated completion times, category clusters (Leadership, Strategy, Execution), and recently completed certifications.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">02. Why structured this way</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Prioritizes 1-click continuation at the top to eliminate drop-off, while supporting exploratory learning through clean category discovery cards below.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">03. Relationship to journey</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  The primary knowledge acquisition engine. Lessons completed here reflect directly in Assessment scores and prepare the employee for milestone advancement.
                </p>
              </div>
            </div>
          </div>

          {/* SCREEN 06 — COACHING */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
              <div>
                <span className="text-xs font-mono font-semibold text-[#6744C3] uppercase">SCREEN 06 // COACHING</span>
                <h3 className="text-xl font-bold text-slate-900">1:1 Mentorship Hub &amp; Preparation</h3>
              </div>
              <button
                onClick={() => setZoomImage({ src: ASSETS.coaching, alt: "Screen 06 — Coaching", title: "Screen 06: Coaching Sessions & Prep", desc: "Complete 1:1 coaching workspace covering preparation, talking points, and past notes." })}
                className="text-xs font-semibold text-slate-900 hover:text-[#6744C3] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#6744C3]" />
                <span>View Full-Res UI</span>
              </button>
            </div>

            <div
              onClick={() => setZoomImage({ src: ASSETS.coaching, alt: "Screen 06 — Coaching", title: "Screen 06: Coaching Sessions & Prep", desc: "Complete 1:1 coaching workspace covering preparation, talking points, and past notes." })}
              className="rounded-3xl overflow-hidden bg-white border border-slate-200/80 cursor-pointer shadow-md hover:border-[#6744C3]/40 transition-all group"
            >
              <div className="bg-slate-100/90 px-4 py-3 border-b border-slate-200/70 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="ml-2 font-mono text-[11px] text-slate-600">app.employeedash.internal/coaching</span>
                </div>
                <span className="text-[11px] font-mono text-[#6744C3] group-hover:underline">1452 &times; 1424 Desktop Hi-Fi</span>
              </div>

              <Image
                src={ASSETS.coaching}
                alt="Screen 06 — Coaching"
                width={1452}
                height={1424}
                className="w-full h-auto block"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">01. What the user sees</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Upcoming session metadata with mentor avatar and date, pre-session preparation checklist, editable talking points list, and an archive of past meeting notes with recorded action items.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">02. Why structured this way</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Moves beyond passive calendar bookings. By embedding prep checklists and talking points, both parties arrive aligned, maximizing the impact of 30-minute coaching conversations.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">03. Relationship to journey</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  The human dialogue catalyst. Bridges digital self-study and real-world execution into agreed action commitments with experienced mentors.
                </p>
              </div>
            </div>
          </div>

          {/* SCREEN 07 — AI CONVERSATIONS */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
              <div>
                <span className="text-xs font-mono font-semibold text-[#6744C3] uppercase">SCREEN 07 // AI CONVERSATIONS</span>
                <h3 className="text-xl font-bold text-slate-900">AI Development Companion &amp; Reflection</h3>
              </div>
              <button
                onClick={() => setZoomImage({ src: ASSETS.aiConversations, alt: "Screen 07 — AI Conversations", title: "Screen 07: AI Conversations", desc: "Contextual reflection prompts, conversation history, and bookmarkable reflection takeaways." })}
                className="text-xs font-semibold text-slate-900 hover:text-[#6744C3] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#6744C3]" />
                <span>View Full-Res UI</span>
              </button>
            </div>

            <div
              onClick={() => setZoomImage({ src: ASSETS.aiConversations, alt: "Screen 07 — AI Conversations", title: "Screen 07: AI Conversations", desc: "Contextual reflection prompts, conversation history, and bookmarkable reflection takeaways." })}
              className="rounded-3xl overflow-hidden bg-white border border-slate-200/80 cursor-pointer shadow-md hover:border-[#6744C3]/40 transition-all group"
            >
              <div className="bg-slate-100/90 px-4 py-3 border-b border-slate-200/70 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="ml-2 font-mono text-[11px] text-slate-600">app.employeedash.internal/ai-conversations</span>
                </div>
                <span className="text-[11px] font-mono text-[#6744C3] group-hover:underline">1452 &times; 1212 Desktop Hi-Fi</span>
              </div>

              <Image
                src={ASSETS.aiConversations}
                alt="Screen 07 — AI Conversations"
                width={1452}
                height={1212}
                className="w-full h-auto block"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">01. What the user sees</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Timestamped conversation history sidebar, suggested growth prompts (&quot;Prepare for 1:1&quot;, &quot;Reflect on Feedback&quot;), structured responses, reflection saving actions, and a clear data privacy guarantee.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">02. Why structured this way</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Grounds AI in professional growth psychology. Rather than an intimidating blank prompt box, suggested topics provide safe on-ramps for vulnerable self-reflection and goal ideation.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">03. Relationship to journey</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Acts as a safe, 24/7 thinking partner. Employees can brainstorm sensitive talking points or synthesize complex feedback before meeting their human coach.
                </p>
              </div>
            </div>
          </div>

          {/* SCREEN 08 — RESOURCES */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
              <div>
                <span className="text-xs font-mono font-semibold text-[#6744C3] uppercase">SCREEN 08 // RESOURCES</span>
                <h3 className="text-xl font-bold text-slate-900">Curated Knowledge &amp; Reference Library</h3>
              </div>
              <button
                onClick={() => setZoomImage({ src: ASSETS.resources, alt: "Screen 08 — Resources", title: "Screen 08: Resources Library", desc: "Centralized knowledge library with category filtering, reading times, and bookmarks." })}
                className="text-xs font-semibold text-slate-900 hover:text-[#6744C3] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#6744C3]" />
                <span>View Full-Res UI</span>
              </button>
            </div>

            <div
              onClick={() => setZoomImage({ src: ASSETS.resources, alt: "Screen 08 — Resources", title: "Screen 08: Resources Library", desc: "Centralized knowledge library with category filtering, reading times, and bookmarks." })}
              className="rounded-3xl overflow-hidden bg-white border border-slate-200/80 cursor-pointer shadow-md hover:border-[#6744C3]/40 transition-all group"
            >
              <div className="bg-slate-100/90 px-4 py-3 border-b border-slate-200/70 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="ml-2 font-mono text-[11px] text-slate-600">app.employeedash.internal/resources</span>
                </div>
                <span className="text-[11px] font-mono text-[#6744C3] group-hover:underline">1452 &times; 1682 Desktop Hi-Fi</span>
              </div>

              <Image
                src={ASSETS.resources}
                alt="Screen 08 — Resources"
                width={1452}
                height={1682}
                className="w-full h-auto block"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">01. What the user sees</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Recommended resource banner, search bar with category filter chips (Guides, Templates, Videos, Frameworks), saved favorites tab, read-time badges, and structured reference cards with bookmark shortcuts.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">02. Why structured this way</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Unlike sequential learning courses, reference material requires ad-hoc discovery. Explicit read times (&quot;5 min read&quot;) and format tags allow quick value extraction during busy workdays.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[11px]">03. Relationship to journey</div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Supports self-directed learning. Provides immediate toolkits, templates, and frameworks needed to complete daily tasks and prep for developmental milestones.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            10 — CROSS-SCREEN CONSISTENCY
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="consistency" className="border-t border-slate-200/60 pt-16 space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">10 — CONSISTENCY</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">One product, consistent interaction patterns</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 space-y-2">
              <span className="text-xs font-mono font-bold text-[#6744C3] block">PATTERN 01</span>
              <h3 className="text-sm font-bold text-slate-900">Persistent Left Navigation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                The 240px sidebar remains fixed across all eight destinations, anchoring the employee with recognizable icons and active state indicators.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 space-y-2">
              <span className="text-xs font-mono font-bold text-[#6744C3] block">PATTERN 02</span>
              <h3 className="text-sm font-bold text-slate-900">Unified Utility Header</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                A standardized top bar integrates search, activity notifications, and profile status across every single screen.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 space-y-2">
              <span className="text-xs font-mono font-bold text-[#6744C3] block">PATTERN 03</span>
              <h3 className="text-sm font-bold text-slate-900">Purposeful Purple Accent</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                The primary purple token (<code className="text-[#6744C3] font-mono">#6744C3</code>) is reserved strictly for primary actions, active navigation, and key progress fills.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 space-y-2">
              <span className="text-xs font-mono font-bold text-[#6744C3] block">PATTERN 04</span>
              <h3 className="text-sm font-bold text-slate-900">Restrained Neutral Surfaces</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Soft canvas backgrounds (<code className="text-[#6744C3] font-mono">#FAF9F6</code>), clean white card containers, and delicate borders maintain high readability without aggressive shadows.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            11 — DESIGN SYSTEM
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="design-system" className="border-t border-slate-200/60 pt-16 space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">11 — DESIGN SYSTEM</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">The visual language of Employee Dash</h2>
          </div>

          {/* Color Tokens Palette */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/60 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#6744C3] uppercase">
              <Palette className="w-4 h-4" />
              <span>Sampled Color Tokens</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-4 rounded-2xl border border-slate-200/60 space-y-3">
                <div className="w-full h-14 rounded-xl bg-[#6744C3] shadow-xs" />
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-900 block">Purple Primary</span>
                  <span className="text-[11px] font-mono text-slate-400">#6744C3</span>
                  <span className="text-[10px] text-slate-500 block">Primary actions &amp; active fills</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200/60 space-y-3">
                <div className="w-full h-14 rounded-xl bg-[#F7F0FF] border border-[#EADBFF]" />
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-900 block">Pale Lavender</span>
                  <span className="text-[11px] font-mono text-slate-400">#F7F0FF</span>
                  <span className="text-[10px] text-slate-500 block">Surfaces &amp; active tags</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200/60 space-y-3">
                <div className="w-full h-14 rounded-xl bg-[#E9DEFF] border border-[#D9C4FF]" />
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-900 block">Active Lavender</span>
                  <span className="text-[11px] font-mono text-slate-400">#E9DEFF</span>
                  <span className="text-[10px] text-slate-500 block">Hover states &amp; chips</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200/60 space-y-3">
                <div className="w-full h-14 rounded-xl bg-[#FFFDF6] border border-slate-200/60" />
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-900 block">Warm Canvas</span>
                  <span className="text-[11px] font-mono text-slate-400">#FFFDF6</span>
                  <span className="text-[10px] text-slate-500 block">Canvas background</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200/60 space-y-3">
                <div className="w-full h-14 rounded-xl bg-[#30254D]" />
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-900 block">Deep Purple</span>
                  <span className="text-[11px] font-mono text-slate-400">#30254D</span>
                  <span className="text-[10px] text-slate-500 block">Primary headings</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200/60 space-y-3">
                <div className="w-full h-14 rounded-xl bg-[#EDE8F5]" />
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-900 block">Neutral Border</span>
                  <span className="text-[11px] font-mono text-slate-400">#EDE8F5</span>
                  <span className="text-[10px] text-slate-500 block">Container dividers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Typography Specimen */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/60 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#6744C3] uppercase">
              <Type className="w-4 h-4" />
              <span>Typography Hierarchy (Poppins &bull; Plus Jakarta Sans)</span>
            </div>

            <div className="space-y-6 divide-y divide-slate-100">
              <div className="pt-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <span className="text-xs font-mono text-slate-400 w-36">Display &bull; 32&ndash;36px</span>
                <span className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Designing a Connected Growth Journey
                </span>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <span className="text-xs font-mono text-slate-400 w-36">Heading &bull; 20&ndash;24px</span>
                <span className="text-lg sm:text-xl font-bold text-slate-900">
                  One workspace. A more connected employee experience.
                </span>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <span className="text-xs font-mono text-slate-400 w-36">Body &bull; 14&ndash;16px</span>
                <span className="text-sm text-slate-600 max-w-xl leading-relaxed">
                  Employee Dash unifies progression milestones, daily tasks, modular learning courses,
                  coaching prep, and guided self-reflection into a cohesive environment.
                </span>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <span className="text-xs font-mono text-slate-400 w-36">Microcopy &bull; 11&ndash;12px</span>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                  STATUS: IN PROGRESS &bull; DUE IN 3 DAYS &bull; ESTIMATED TIME: 20 MIN
                </span>
              </div>
            </div>
          </div>

          {/* Component Anatomy & Spatial Framework */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/60 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#6744C3] uppercase">
                <Sliders className="w-4 h-4" />
                <span>Component Anatomy</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6744C3] shrink-0 mt-0.5" />
                  <span><strong>Navigation Items:</strong> Active pills with purple fill and contrast text.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6744C3] shrink-0 mt-0.5" />
                  <span><strong>Status Badges:</strong> Standardized In Progress, Completed, Due Soon pills.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6744C3] shrink-0 mt-0.5" />
                  <span><strong>Progress Bars:</strong> Smooth 8px rounded track with solid purple fill.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6744C3] shrink-0 mt-0.5" />
                  <span><strong>Cards:</strong> 16px corner radius, white background, and subtle hover borders.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/60 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#6744C3] uppercase">
                <Layers className="w-4 h-4" />
                <span>Spatial Framework</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6744C3] shrink-0 mt-0.5" />
                  <span><strong>Persistent Sidebar:</strong> 240px width housing navigation and workspace switcher.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6744C3] shrink-0 mt-0.5" />
                  <span><strong>Header Zone:</strong> 72px fixed height housing search, alerts, and profile.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6744C3] shrink-0 mt-0.5" />
                  <span><strong>Content Canvas:</strong> Responsive 12-column grid with standardized gutters.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6744C3] shrink-0 mt-0.5" />
                  <span><strong>8px Baseline Grid:</strong> Consistent padding scale across buttons and containers.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            12 — REFLECTION & FUTURE OPPORTUNITIES
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="reflection" className="border-t border-slate-200/60 pt-16 space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">12 — REFLECTION</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">What I would explore next</h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-3xl">
            As a self-initiated concept project, Employee Dash provides a coherent architectural blueprint.
            If this concept were to advance to exploratory prototyping with real users, the following
            areas represent the top validation priorities:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 space-y-2">
              <span className="text-xs font-mono font-bold text-[#6744C3]">01 &bull; IA VALIDATION</span>
              <h3 className="text-sm font-bold text-slate-900">Information Architecture Testing</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Run open and closed card sorting tests with individual contributors and managers to verify
                whether the flat 8-item navigation matches natural employee mental models.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 space-y-2">
              <span className="text-xs font-mono font-bold text-[#6744C3]">02 &bull; TASK VELOCITY</span>
              <h3 className="text-sm font-bold text-slate-900">Next Action Identification Speed</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Conduct unmoderated usability tasks to measure how quickly users can locate upcoming assessments,
                resume active learning, or review coaching talking points from the Home dashboard.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 space-y-2">
              <span className="text-xs font-mono font-bold text-[#6744C3]">03 &bull; DENSITY BALANCING</span>
              <h3 className="text-sm font-bold text-slate-900">Dashboard Information Density</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Evaluate whether the Home dashboard strikes the optimal balance between high-level summary metrics
                and granular task rows, particularly on smaller 13-inch laptop displays.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 space-y-2">
              <span className="text-xs font-mono font-bold text-[#6744C3]">04 &bull; EVALUATION CLARITY</span>
              <h3 className="text-sm font-bold text-slate-900">Feedback Comprehension</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Test whether employees accurately interpret the Skills Snapshot radar in Assessments and feel
                empowered to select relevant courses rather than feeling judged.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 space-y-2">
              <span className="text-xs font-mono font-bold text-[#6744C3]">05 &bull; ACCESSIBILITY</span>
              <h3 className="text-sm font-bold text-slate-900">Accessibility &amp; Responsive Scaling</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Conduct thorough WCAG AAA contrast audits, verify keyboard focus traps for modals,
                and refine tablet and mobile responsive adaptations for managers on the go.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 space-y-2">
              <span className="text-xs font-mono font-bold text-[#6744C3]">06 &bull; AI TRUST &amp; PRIVACY</span>
              <h3 className="text-sm font-bold text-slate-900">AI Reflection Boundaries</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Validate employee psychological safety regarding conversation data privacy, ensuring users trust
                that reflections remain private from their direct managers unless explicitly shared.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/60 space-y-3">
            <h3 className="text-base font-bold text-slate-900">Closing Designer Reflection</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Designing Employee Dash reinforced that unifying fragmented enterprise workflows is fundamentally
              an information architecture challenge, not merely a visual restyling. By providing a dependable anchor
              in the Home dashboard and maintaining strict visual and interaction consistency across all seven specialized
              destinations, the interface transforms professional growth from a disjointed chore into a continuous,
              empowering narrative.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            13 — CLOSING SECTION
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="closing" className="border-t border-slate-200/60 pt-16 pb-12 space-y-8 text-center">
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono font-bold text-[#6744C3] tracking-widest uppercase bg-[#F7F0FF] px-3.5 py-1.5 rounded-full border border-[#EADBFF]">
              EMPLOYEE DASH &mdash; PRODUCT DESIGN CONCEPT
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Growth is a journey, not a single task.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              Employee Dash explores how progress, learning, action, and reflection can work together
              in one connected development experience.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 hover:bg-[#6744C3] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <span>Return to Portfolio</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/case-study/govt-election"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200/80 transition-all hover:border-[#6744C3]/40 cursor-pointer"
            >
              <span>Next: Govt Election Dashboard</span>
              <ChevronRight className="w-4 h-4 text-[#6744C3]" />
            </Link>
          </div>
        </section>

      </main>

      {/* ───────────────────────────────────────────────────────────────────────
          HIGH-RESOLUTION LIGHTBOX ZOOM MODAL
      ─────────────────────────────────────────────────────────────────────── */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setZoomImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={zoomImage.title || "Interface Inspection"}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-900 p-3 sm:p-4 rounded-[40px] shadow-2xl border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 px-3 border-b border-slate-800 text-white">
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold">{zoomImage.title || "Interface Inspection"}</h4>
                <p className="text-xs text-slate-400">{zoomImage.desc || "Click outside or press Escape to close"}</p>
              </div>
              <button
                onClick={() => setZoomImage(null)}
                className="w-8 h-8 rounded-full bg-white text-slate-900 font-bold flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer"
                title="Close modal (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-[28px] overflow-hidden bg-white max-h-[85vh] overflow-y-auto mt-2">
              <Image
                src={zoomImage.src}
                alt={zoomImage.alt || "High resolution screen inspection"}
                width={1452}
                height={2027}
                className="w-full h-auto block"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
