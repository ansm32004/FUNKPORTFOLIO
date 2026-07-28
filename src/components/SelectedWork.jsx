"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Folder } from "lucide-react";

const PROJECTS = [
  {
    id: "apple-music",
    title: "🍎 Apple Music Redesign",
    category: "UX Case Study & Playlist Architecture",
    subtitle: "What if finding playlists didn't feel like hide and seek?",
    description:
      "Apple made music beautiful. I wondered... 'What if finding your favorite playlist didn't feel like hide and seek?' So I redesigned the experience with cleaner navigation, better playback flow, and interactions that don't require a treasure map.",
    tag: "Case Study / UX",
    stickyColor: "bg-[#FF5C77] text-rose-950",
    angle: "-rotate-2",
  },
  {
    id: "tasveer",
    title: "📷 Tasveer",
    category: "Photography Community & Brand Identity",
    subtitle: "Instagram... without the JPEG yelling",
    description:
      "Instagram... but photographers won't yell at you for posting JPEGs. Built a visual-first community focused on storytelling, critique, and portfolios instead of dopamine.",
    tag: "Brand Identity / UI",
    stickyColor: "bg-[#EAF235] text-amber-950",
    angle: "rotate-2",
  },
  {
    id: "spatial-os",
    title: "🧠 Spatial OS",
    category: "Machine Learning & Spatial UI Workbench",
    subtitle: "Figma + Unity + Machine Learning",
    description:
      "Imagine Figma... Unity... Machine Learning... and one developer questioning all his life choices. That.",
    tag: "Spatial UI / ML",
    stickyColor: "bg-[#38BDF8] text-sky-950",
    angle: "-rotate-1",
  },
  {
    id: "gdsc",
    title: "Google DSC Event Identities",
    category: "Design System & Event Visuals",
    subtitle: "Lots of posters. Lots of deadlines. Even more coffee.",
    description:
      "Designed the visual identity behind hackathons, workshops, and events attended by hundreds of students. Lots of posters. Lots of deadlines. Even more coffee.",
    tag: "Design System",
    stickyColor: "bg-[#4ADE80] text-emerald-950",
    angle: "rotate-1",
  },
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
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
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
          ))}
        </div>
      </div>
    </section>
  );
}
