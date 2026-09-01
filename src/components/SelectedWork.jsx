"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Folder } from "lucide-react";

import Link from "next/link";

const PROJECTS = [
  {
    id: "govt-election",
    title: "🗳️ Govt Election Event Reporting",
    category: "GIS Admin Analytics & UX Case Study",
    subtitle: "Geospatial monitoring & verification at scale",
    description:
      "A high-scale geospatial analytics dashboard designed to validate field report authenticity, detect outside-boundary location activity, and track activity density across 4 administrative tiers.",
    tag: "Featured Case Study",
    stickyColor: "bg-[#0F172A] text-white",
    angle: "rotate-1",
    link: "/case-study/govt-election"
  },
  {
    id: "vammy",
    title: "🦇 Vammy — The Finance Buddy",
    category: "UX Case Study & Mobile App",
    subtitle: "A finance tracking app that actually cares",
    description:
      "Modern, intuitive finance tracking mobile app built around Vammy, a vampire mascot gauge that gives real-time visual feedback on monthly spending & budgets.",
    tag: "Featured Case Study",
    stickyColor: "bg-[#2563EB] text-white",
    angle: "-rotate-1",
    link: "/case-study/vammy"
  }
];

export default function SelectedWork() {
  return (
    <section id="work" className="relative z-10 py-24 px-6 sm:px-12 md:px-20 bg-cutting-mat border-t border-emerald-950/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-emerald-800/40 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <Folder className="w-4 h-4" />
              <span>01 // Selected Work</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Things I've Built & Questioned
            </h2>
          </div>
          <p className="text-sm sm:text-base text-emerald-100/70 max-w-md font-medium leading-relaxed">
            Every project crafted with purpose, humor, and an unhealthy attention to 8px spacing.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {PROJECTS.map((project, index) => {
            const CardWrapper = project.link ? Link : "div";
            const wrapperProps = project.link ? { href: project.link } : {};

            return (
              <CardWrapper key={project.id} {...wrapperProps} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  className={`group relative rounded-3xl bg-white p-8 shadow-2xl border border-slate-200 transform ${project.angle} hover:rotate-0 hover:scale-[1.02] transition-transform duration-300 cursor-pointer`}
                >
                  {/* Paper Clip Accent */}
                  <div className="absolute -top-3 left-8 w-8 h-8 rounded-full bg-slate-100 border border-slate-300 shadow-sm flex items-center justify-center text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                  </div>

                  {/* Top Metadata Header Bar */}
                  <div className="flex items-center justify-between mb-6 pt-1">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full shadow-xs ${project.stickyColor}`}>
                      {project.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {project.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-all">
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
