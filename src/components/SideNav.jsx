"use client";

import React, { useState, useEffect } from "react";
const SECTIONS = [
  { id: "hero", label: "Intro", num: "00" },
  { id: "work", label: "Selected work", num: "01" },
  { id: "featured", label: "Featured build", num: "02" },
  { id: "experience", label: "Experience", num: "03" },
  { id: "skills", label: "Skills", num: "04" },
  { id: "process", label: "Process", num: "05" },
  { id: "photography", label: "Photography", num: "06" },
  { id: "reviews", label: "Kind words", num: "07" },
  { id: "contact", label: "Contact", num: "08" },
];

export default function SideNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll section tracking via IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
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

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const current = SECTIONS.find((s) => s.id === activeSection) || SECTIONS[0];

  return (
    <>
      {/* Phones: floating pill + pinned paper menu */}
      <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 md:hidden">
        {menuOpen && (
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/40"
          />
        )}
        <div className="relative w-full max-w-xs">
          {menuOpen && (
            <nav
              aria-label="Sections"
              className="paper absolute inset-x-0 bottom-full mb-3 origin-bottom -rotate-1 px-2 py-3"
            >
              <span aria-hidden className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-pin shadow-[0_2px_4px_rgb(0_0_0/0.35)]" />
              <ol>
                {SECTIONS.map((sec) => (
                  <li key={sec.id}>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        scrollToSection(sec.id);
                      }}
                      className={`flex w-full items-center gap-3 rounded-[4px] px-3 py-2.5 text-left text-[15px] ${
                        activeSection === sec.id ? "bg-paper-2 text-ink" : "text-ink-2"
                      }`}
                    >
                      <span className="w-5 font-mono text-[12px] tabular-nums text-ink-3">{sec.num}</span>
                      {sec.label}
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            className="relative mx-auto flex w-fit items-center gap-3 rounded-full bg-paper py-2.5 pl-4 pr-5 text-[14px] text-ink shadow-[0_8px_24px_-6px_rgb(0_0_0/0.55)]"
          >
            <span className="flex flex-col gap-[3px]" aria-hidden>
              <span className={`block h-px w-3.5 bg-ink transition-transform ${menuOpen ? "translate-y-[2px] rotate-45" : ""}`} />
              <span className={`block h-px w-3.5 bg-ink transition-transform ${menuOpen ? "-translate-y-[2px] -rotate-45" : ""}`} />
            </span>
            <span className="font-mono text-[12px] tabular-nums text-ink-3">{current.num}</span>
            {current.label}
          </button>
        </div>
      </div>

    <aside
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 select-none md:block"
    >
      <ol className="flex flex-col items-end gap-1">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <li key={sec.id}>
              <button
                onClick={() => scrollToSection(sec.id)}
                aria-label={`Jump to ${sec.label}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex cursor-pointer items-center gap-3 py-1"
              >
                <span
                  className={`whitespace-nowrap rounded-full bg-paper px-2.5 py-0.5 text-[12px] text-ink shadow-[0_4px_12px_-4px_rgb(0_0_0/0.5)] transition-all duration-200 ${
                    isActive
                      ? "translate-x-0 opacity-100"
                      : "pointer-events-none translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                >
                  <span className="mr-1.5 tabular-nums text-ink-3">{sec.num}</span>
                  {sec.label}
                </span>
                <span
                  className={`block h-px transition-all duration-300 ${
                    isActive ? "w-6 bg-chalk" : "w-3 bg-white/35 group-hover:w-5 group-hover:bg-white/70"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ol>
    </aside>
    </>
  );
}
