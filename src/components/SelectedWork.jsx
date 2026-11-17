"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Folder, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Pin, SectionHeading, Accent } from "./Stationery";
import Link from "next/link";

const PROJECTS = [
  {
    id: "employee-dash",
    title: "Employee Dash",
    category: "L&D Platform",
    subtitle: "Connecting learning, coaching, and reflection",
    description:
      "A desktop-first employee growth platform that unifies long-term progression, task execution, modular learning, coaching, and contextual AI reflection into a coherent workspace.",
    tag: "Concept",
    note: "bg-note-blue",
    year: "2026",
    angle: "rotate-[0.6deg]",
    link: "/case-study/employee-dash"
  },
  {
    id: "govt-election",
    title: "Election Event Reporting",
    category: "GIS Analytics",
    subtitle: "Geospatial monitoring & verification at scale",
    description:
      "A high-scale geospatial analytics dashboard designed to validate field report authenticity, detect outside-boundary location activity, and track activity density across 4 administrative tiers.",
    tag: "Case study",
    note: "bg-note-yellow",
    year: "2025",
    angle: "-rotate-[0.8deg]",
    link: "/case-study/govt-election"
  },
  {
    id: "vammy",
    title: "Vammy",
    category: "Mobile & FinTech",
    subtitle: "A finance tracking app that actually cares",
    description:
      "Modern, intuitive finance tracking mobile app built around Vammy, a vampire mascot gauge that gives real-time visual feedback on monthly spending & budgets.",
    tag: "Case study",
    note: "bg-note-pink",
    year: "2025",
    angle: "rotate-[0.4deg]",
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
          visible: targetVisible
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
    <section id="work" className="relative z-10 py-16 sm:py-24 px-4 sm:px-12 md:px-20 bg-cutting-mat">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          index="01"
          label="Selected work"
          title={<>Things I&apos;ve built <Accent>&amp; questioned</Accent></>}
          aside={
            <>
              <span className="block max-w-sm md:ml-auto">
                Each one shipped with purpose, a little humour, and an unhealthy attention to 8px spacing.
              </span>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-[12px] text-chalk transition-colors hover:bg-white/10"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Admin · manage in panel
                </Link>
              )}
            </>
          }
        />

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
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {displayedProjects.map((project, index) => {
            const isHidden = visibility[project.id] === false;
            const isBusy = updatingSlug === project.id;
            const CardWrapper = project.link ? Link : "div";
            const wrapperProps = project.link ? { href: project.link } : {};

            return (
              <CardWrapper key={project.id} {...wrapperProps} className="block h-full">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`paper group relative flex h-full cursor-pointer flex-col p-5 sm:p-7 transition-transform duration-500 ease-out ${project.angle} hover:-translate-y-1 hover:rotate-0 ${
                    isAdmin && isHidden ? "ring-2 ring-note-yellow" : ""
                  }`}
                >
                  <Pin className="-top-2 left-1/2 -translate-x-1/2" />

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

                  {/* Cover: a sticky-note swatch with the project number */}
                  <div className={`note-texture relative mb-7 flex aspect-[16/10] items-end justify-between rounded-[3px] p-5 ${project.note}`}>
                    <span className="font-serif text-[72px] italic leading-none text-ink/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[12px] text-ink/60">{project.category}</span>
                  </div>

                  <div className="flex items-center justify-between text-[12px] text-ink-3">
                    <span>{project.tag}</span>
                    <span className="tabular-nums">{project.year}</span>
                  </div>

                  <h3 className="mt-3 flex items-start justify-between gap-4 text-[26px] font-medium leading-tight tracking-[-0.02em] text-ink">
                    {project.title}
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-ink-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pin" />
                  </h3>
                  <p className="mt-1 text-[15px] text-ink-2">{project.subtitle}</p>
                  <p className="mt-4 text-[14px] leading-relaxed text-ink-3">{project.description}</p>

                  <div className="mt-auto pt-6">
                    <div className="relative h-11 border-t border-dashed border-rule pt-3 font-handwriting text-[19px] text-ink-3">
                      <span className="absolute transition-opacity duration-300 group-hover:opacity-0">
                        read the case study →
                      </span>
                      <span className="absolute text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        I worked way too hard on this →
                      </span>
                    </div>
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
