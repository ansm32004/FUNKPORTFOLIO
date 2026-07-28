"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sliders, Volume2, Layers, Code, Video, Cpu } from "lucide-react";

const SOUNDBOARD_PADS = [
  { name: "Figma", note: "Sa 🎵", swara: "Shadj (C4)", category: "Design", freq: 261.63 },
  { name: "React", note: "Re 🎵", swara: "Rishabh (D4)", category: "Frontend", freq: 293.66 },
  { name: "Next.js", note: "Ga 🎵", swara: "Gandhar (E4)", category: "Fullstack", freq: 329.63 },
  { name: "Tailwind", note: "Ma 🎵", swara: "Madhyam (F4)", category: "Styling", freq: 349.23 },
  { name: "After Effects", note: "Pa 🎵", swara: "Pancham (G4)", category: "Motion", freq: 392.00 },
  { name: "Rive", note: "Dha 🎵", swara: "Dhaivat (A4)", category: "Interactive", freq: 440.00 },
  { name: "Python", note: "Ni 🎵", swara: "Nishad (B4)", category: "AI/ML", freq: 493.88 },
  { name: "TypeScript", note: "Sa' 🎵", swara: "Taar Shadj (C5)", category: "Language", freq: 523.25 },
];

// Web Audio API Synthesizer Octave Engine (Sa Re Ga Ma Pa Dha Ni Sa')
function playOctaveSynthSound(padItem) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(padItem.freq, now);
    
    // Rich harmonic swell envelope for classical octave feel
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
    
    osc.start(now);
    osc.stop(now + 0.6);
  } catch (err) {
    // Audio Context handled silently if blocked by browser autoplay rules
  }
}

function playSliderFaderTone(val) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    const freq = 200 + (val / 100) * 600; // 200Hz to 800Hz Pitch Shift
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    
    osc.start(now);
    osc.stop(now + 0.12);
  } catch (e) {}
}

const INITIAL_CHANNELS = [
  {
    id: "product-design",
    channelNum: "CH 01",
    title: "Product Design & Design Systems",
    icon: Layers,
    iconColor: "text-amber-500",
    initialLevel: 98,
    apps: ["Figma", "Adobe XD", "Framer", "ProtoPie"],
    joke: "I move buttons until they 'feel right.' Operator factors in 8px spacing.",
    badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
  },
  {
    id: "frontend-dev",
    channelNum: "CH 02",
    title: "Frontend & React Architecture",
    icon: Code,
    iconColor: "text-blue-500",
    initialLevel: 95,
    apps: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    joke: "I know enough React to blame CSS. Enough CSS to blame JavaScript.",
    badgeBg: "bg-blue-100 text-blue-900 border-blue-300",
  },
  {
    id: "motion-graphics",
    channelNum: "CH 03",
    title: "Motion Graphics & Physics",
    icon: Video,
    iconColor: "text-purple-500",
    initialLevel: 92,
    apps: ["After Effects", "Premiere Pro", "Rive", "Blender"],
    joke: "If it doesn't move... I'll probably animate it.",
    badgeBg: "bg-purple-100 text-purple-900 border-purple-300",
  },
  {
    id: "ai-creative-tech",
    channelNum: "CH 04",
    title: "AI & Creative Technology",
    icon: Cpu,
    iconColor: "text-emerald-500",
    initialLevel: 90,
    apps: ["Python", "PyTorch", "Cursor", "OpenAI"],
    joke: "Teaching computers to think. Still working on teaching printers.",
    badgeBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
  },
];

export default function SkillsSection() {
  const [channelLevels, setChannelLevels] = useState({
    "product-design": 98,
    "frontend-dev": 95,
    "motion-graphics": 92,
    "ai-creative-tech": 90,
  });

  const [activePad, setActivePad] = useState(null);

  const handleSliderChange = (id, val) => {
    setChannelLevels((prev) => ({ ...prev, [id]: Number(val) }));
    playSliderFaderTone(Number(val));
  };

  const handlePadClick = (padItem) => {
    setActivePad(padItem);
    playOctaveSynthSound(padItem);
    setTimeout(() => setActivePad(null), 1200);
  };

  return (
    <section id="skills" className="relative z-10 py-24 px-6 sm:px-12 md:px-20 bg-cutting-mat border-t border-emerald-950/80 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-emerald-800/40 gap-6"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <Sliders className="w-4 h-4" />
              <span>03 // Synthesizer Control Deck</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Interactive Skill Deck
            </h2>
          </div>
          <p className="text-sm sm:text-base text-emerald-100/70 max-w-md font-medium leading-relaxed">
            Play melodies across the 8 pads tuned to the musical octave (Sa Re Ga Ma Pa Dha Ni Sa')! 🎶
          </p>
        </motion.div>

        {/* SYNTHESIZER STUDIO CONTROL DECK (WHITE PAPER SHEET) */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 170, damping: 16 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-10 text-slate-900 relative overflow-hidden"
        >
          {/* Studio Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shadow-md">
                AM
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">AM_OCTAVE_SYNTH_v4.2.sys</h3>
                <p className="text-[10px] font-mono text-slate-400 font-semibold">8-PAD OCTAVE SAPTAK SOUNDBOARD (SA RE GA MA PA DHA NI SA')</p>
              </div>
            </div>

            {/* LED Status Bar */}
            <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-2xl border border-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              <span className="text-xs font-mono font-bold text-slate-700">
                🎶 8-NOTE OCTAVE TUNED (SA RE GA MA PA DHA NI SA')
              </span>
            </div>

            <div className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 hidden lg:block">
              🎹 Play tunes across the 8 saptak pads
            </div>
          </div>

          {/* 4-CHANNEL MIXER DECK */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-b border-slate-200">
            {INITIAL_CHANNELS.map((ch) => {
              const Icon = ch.icon;
              const level = channelLevels[ch.id];
              const activeSegments = Math.round((level / 100) * 10);

              return (
                <div
                  key={ch.id}
                  className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-5 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  {/* Channel Header */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400">
                      <span>{ch.channelNum}</span>
                      <span className="text-slate-900 font-extrabold">{level}%</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${ch.iconColor}`} />
                      <h4 className="text-base font-extrabold text-slate-900 leading-tight">
                        {ch.title}
                      </h4>
                    </div>
                  </div>

                  {/* Channel Fader Slider & LED VU Meter */}
                  <div className="flex items-center gap-4 py-2">
                    {/* Fader Slider */}
                    <div className="flex-1 space-y-1">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={level}
                        onChange={(e) => handleSliderChange(ch.id, e.target.value)}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                      />
                      <div className="flex items-center justify-between text-[9px] font-mono font-bold text-slate-400 pt-0.5">
                        <span>0dB</span>
                        <span>+12dB</span>
                      </div>
                    </div>

                    {/* Animated LED VU Meter Bar */}
                    <div className="flex flex-col gap-1 bg-slate-900 p-1.5 rounded-lg border border-slate-800 shrink-0">
                      {[...Array(10)].map((_, i) => {
                        const segIdx = 9 - i;
                        const isLit = segIdx < activeSegments;
                        let ledColor = "bg-emerald-500 shadow-emerald-500/50";
                        if (segIdx >= 7) ledColor = "bg-amber-400 shadow-amber-400/50";
                        if (segIdx >= 9) ledColor = "bg-rose-500 shadow-rose-500/50";

                        return (
                          <div
                            key={i}
                            className={`w-2.5 h-1 rounded-xs transition-all duration-150 ${
                              isLit ? `${ledColor} shadow-xs` : "bg-slate-800"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Software Stack Badges */}
                  <div className="space-y-2 pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {ch.apps.map((app, aIdx) => (
                        <span
                          key={aIdx}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${ch.badgeBg}`}
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium italic leading-relaxed pt-1">
                      "{ch.joke}"
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

          {/* OCTAVE SAPTAK 8-PAD STUDIO SOUNDBOARD (SA RE GA MA PA DHA NI SA') */}
          <div className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <Volume2 className="w-4 h-4 text-blue-600" />
                <span>Musical Octave Soundboard (Sa • Re • Ga • Ma • Pa • Dha • Ni • Sa') 🎹</span>
              </div>
              <span className="text-xs font-mono font-bold text-blue-600">
                {activePad ? `PLAYING: ${activePad.name} (${activePad.note}) 🎶` : "Tap pads to play Sa Re Ga Ma Pa Dha Ni Sa'"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {SOUNDBOARD_PADS.map((pad, pIdx) => {
                const isActive = activePad?.name === pad.name;
                return (
                  <motion.button
                    key={pIdx}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handlePadClick(pad)}
                    className={`relative p-3.5 rounded-2xl border text-center transition-all cursor-pointer shadow-xs flex flex-col items-center justify-center gap-1 ${
                      isActive
                        ? "bg-slate-900 text-white border-slate-900 ring-4 ring-blue-500/40 scale-105"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                    }`}
                  >
                    <span className="text-[10px] font-mono font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 block">
                      {pad.note}
                    </span>
                    <span className="text-xs font-extrabold block truncate pt-0.5">
                      {pad.name}
                    </span>
                    <span className="text-[9px] font-semibold text-slate-500 opacity-80">
                      {pad.swara}
                    </span>

                    {/* Active Wave Pulse Ring */}
                    {isActive && (
                      <motion.span
                        initial={{ scale: 0.8, opacity: 1 }}
                        animate={{ scale: 1.4, opacity: 0 }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="absolute inset-0 rounded-2xl border-2 border-blue-400 pointer-events-none"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
