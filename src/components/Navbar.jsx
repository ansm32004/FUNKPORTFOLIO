"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-4 bg-[#F6F7F9]/80 backdrop-blur-md" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo: :: ChronoTask style */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="flex items-center gap-1.5 text-slate-800">
            <span className="font-extrabold text-slate-800 tracking-tighter text-lg">::</span>
            <div className="w-5 h-5 rounded-md bg-white shadow-chronotask-tile border border-slate-200 p-0.5 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-0.5 w-full h-full">
                <span className="rounded-full bg-blue-600" />
                <span className="rounded-full bg-slate-800" />
                <span className="rounded-full bg-slate-800" />
                <span className="rounded-full bg-slate-800" />
              </div>
            </div>
            <span className="font-bold text-slate-900 text-lg tracking-tight ml-0.5">
              ChronoTask
            </span>
          </div>
        </a>

        {/* Navigation Links (Matching Image: Features, Solutions, Resources, Pricing) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-slate-900 transition-colors">
            Features
          </a>
          <a href="#solutions" className="hover:text-slate-900 transition-colors">
            Solutions
          </a>
          <a href="#resources" className="hover:text-slate-900 transition-colors">
            Resources
          </a>
          <a href="#pricing" className="hover:text-slate-900 transition-colors">
            Pricing
          </a>
        </nav>

        {/* Actions (Sign in & Get demo button) */}
        <div className="flex items-center gap-5">
          <a
            href="#contact"
            className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors hidden sm:block"
          >
            Sign in
          </a>

          <a
            href="#contact"
            className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-full shadow-chronotask-tile transition-all hover:translate-y-[-1px]"
          >
            Get demo
          </a>
        </div>
      </div>
    </motion.header>
  );
}
