"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Folder, Eye, EyeOff, ShieldCheck } from "lucide-react";
import Link from "next/link";

const PROJECTS = [
  {
    id: "employee-dash",
    title: "💼 Employee Dash — Unified Growth",
    category: "L&D Platform",
    subtitle: "Connecting learning, coaching, and reflection",
    description:
      "A desktop-first employee growth platform that unifies long-term progression, task execution, modular learning, coaching, and contextual AI reflection into a coherent workspace.",
    tag: "Product Concept",
    stickyColor: "bg-[#6744C3] text-white",
    angle: "rotate-1",
    link: "/case-study/employee-dash"
  },
  {
    id: "govt-election",
    title: "🗳️ Govt Election Event Reporting",
    category: "GIS Analytics",
    subtitle: "Geospatial monitoring & verification at scale",
    description:
      "A high-scale geospatial analytics dashboard designed to validate field report authenticity, detect outside-boundary location activity, and track activity density across 4 administrative tiers.",
    tag: "Featured Case Study",
    stickyColor: "bg-[#0F172A] text-white",
    angle: "-rotate-1",
    link: "/case-study/govt-election"
  },
  {
    id: "vammy",
    title: "🦇 Vammy — The Finance Buddy",
    category: "Mobile & FinTech",
    subtitle: "A finance tracking app that actually cares",
    description:
      "Modern, intuitive finance tracking mobile app built around Vammy, a vampire mascot gauge that gives real-time visual feedback on monthly spending & budgets.",
    tag: "Featured Case Study",
    stickyColor: "bg-[#2563EB] text-white",
    angle: "rotate-1",
    link: "/case-study/vammy"
  }
];

export default function SelectedWork({
  initialVisibility = null,
  isAdmin: initialIsAdmin = false
}) {
  const [visibility, setVisibility] = useState(
    initialVisibility || {
      "employee-dash": true,
      "govt-election": true,
      "vammy": true
    }
  );
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
  const [updatingSlug, setUpdatingSlug] = useState(null);

  // Always fetch fresh visibility on mount and on window focus (bypassing any browser cache)
  useEffect(() => {
    let isMounted = true;
    const fetchFreshVisibility = async () => {
      try {
        const res = await fetch("/api/case-studies/visibility", {
          cache: "no-store",
          credentials: "include",
          headers: { "Cache-Control": "no-cache" }
        });
        const data = await res.json();
        if (!isMounted) return;
        if (data.visibility) {
          setVisibility(data.visibility);
        }
        if (typeof data.isAdmin === "boolean") {
          setIsAdmin(data.isAdmin);
        }
      } catch (err) {
        console.error("Could not fetch case study visibility:", err);
      }
    };

    fetchFreshVisibility();

    const onFocus = () => fetchFreshVisibility();
    window.addEventListener("focus", onFocus);
    return () => {
      isMounted = false;
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  // Direct toggle on card (for Admin)
  const handleToggleFromCard = async (e, projectId, targetVisible) => {
    e.preventDefault();
    e.stopPropagation();
    setUpdatingSlug(projectId);

    try {
      const res = await fetch("/api/case-studies/visibility", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: projectId,
          visible: targetVisible,
          username: "ansm",
          password: "ansmfx32004"
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setVisibility(data.visibility);
      } else {
        alert(data.error || "Failed to update visibility");
      }
    } catch {
      alert("Failed to update visibility");
    } finally {
      setUpdatingSlug(null);
    }
  };

  // Filter projects:
  // - Public visitors: ONLY visible projects are displayed.
  // - Admin: All projects are shown so admin can unhide/hide directly on the card.
  const displayedProjects = PROJECTS.filter((project) => {
    if (isAdmin) return true;
    return visibility[project.id] !== false;
  });

  return (
    <section id="work" className="relative z-10 py-24 px-6 sm:px-12 md:px-20 bg-cutting-mat border-t border-emerald-950/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-emerald-800/40 gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4" />
                <span>01 // Selected Work</span>
              </div>

              {isAdmin && (
                <div className="flex items-center gap-2">
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-colors"
                  >
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Admin Active &bull; Manage in Panel
                  </Link>
                </div>
              )}
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Things I&apos;ve Built &amp; Questioned
            </h2>
          </div>
          <p className="text-sm sm:text-base text-emerald-100/70 max-w-md font-medium leading-relaxed">
            Every project crafted with purpose, humor, and an unhealthy attention to 8px spacing.
          </p>
        </div>

        {/* Empty State if All Hidden for Public */}
        {displayedProjects.length === 0 && (
          <div className="text-center py-20 px-6 rounded-3xl bg-white/5 border border-emerald-800/40 max-w-xl mx-auto space-y-4">
            <Folder className="w-12 h-12 text-emerald-400 mx-auto opacity-60" />
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Curating New Case Studies
            </h3>
            <p className="text-sm text-emerald-100/70 max-w-sm mx-auto leading-relaxed">
              Case studies are currently undergoing polish and private review. Check back shortly for updated work.
            </p>
            <div className="pt-2">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold bg-white text-slate-900 hover:bg-emerald-300 transition-colors shadow-md"
              >
                Sign In as Admin
              </Link>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => {
            const isHidden = visibility[project.id] === false;
            const isBusy = updatingSlug === project.id;
            const CardWrapper = project.link ? Link : "div";
            const wrapperProps = project.link ? { href: project.link } : {};

            return (
              <CardWrapper key={project.id} {...wrapperProps} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  className={`group relative rounded-3xl bg-white p-6 sm:p-7 md:p-8 shadow-2xl border border-slate-200 transform ${project.angle} hover:rotate-0 hover:scale-[1.02] transition-transform duration-300 cursor-pointer ${
                    isAdmin && isHidden ? "ring-2 ring-amber-400" : ""
                  }`}
                >
                  {/* Paper Clip Accent */}
                  <div className="absolute -top-3 left-8 w-8 h-8 rounded-full bg-slate-100 border border-slate-300 shadow-sm flex items-center justify-center text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                  </div>

                  {/* ADMIN DIRECT UNHIDE / HIDE CONTROL BAR */}
                  {isAdmin && (
                    <div className="mb-4">
                      {isHidden ? (
                        <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-between gap-2 shadow-xs">
                          <span className="text-[11px] font-mono font-bold text-amber-800 flex items-center gap-1.5">
                            <EyeOff className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            Hidden From Public
                          </span>
                          <button
                            onClick={(e) => handleToggleFromCard(e, project.id, true)}
                            disabled={isBusy}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold font-mono transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                          >
                            <Eye className="w-3 h-3" />
                            <span>{isBusy ? "Saving..." : "Click to Unhide"}</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end">
                          <button
                            onClick={(e) => handleToggleFromCard(e, project.id, false)}
                            disabled={isBusy}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono font-bold text-slate-400 hover:text-rose-600 hover:bg-rose-50 px-2 py-0.5 rounded-md flex items-center gap-1 cursor-pointer"
                            title="Click to hide this case study from public"
                          >
                            <EyeOff className="w-3 h-3" />
                            <span>{isBusy ? "..." : "Hide from Public"}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Top Metadata Header Bar */}
                  <div className="flex items-center justify-between gap-3 mb-5 pt-1 min-w-0">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full shadow-xs whitespace-nowrap shrink-0 ${project.stickyColor}`}>
                      {project.tag}
                    </span>
                    <span
                      className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider text-right truncate min-w-0"
                      title={project.category}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-all shrink-0">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {project.subtitle}
                    </p>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Hover Tooltip Microcopy */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 opacity-80 group-hover:opacity-100 transition-opacity">
                    <span>Click me.</span>
                    <span className="italic">I worked way too hard on this.</span>
                  </div>
                </motion.div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
