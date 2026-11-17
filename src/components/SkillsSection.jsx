"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Code, Gamepad2, Sparkles } from "lucide-react";
import { SectionHeading, Accent, Pin } from "./Stationery";

const SOUNDBOARD_PADS = [
  { name: "Figma", note: "Sa", swara: "Shadj (C4)", category: "Design", freq: 261.63 },
  { name: "Branding", note: "Re", swara: "Rishabh (D4)", category: "Brand", freq: 293.66 },
  { name: "Unity", note: "Ga", swara: "Gandhar (E4)", category: "Game Dev", freq: 329.63 },
  { name: "Motion", note: "Ma", swara: "Madhyam (F4)", category: "Animation", freq: 349.23 },
  { name: "React", note: "Pa", swara: "Pancham (G4)", category: "Frontend", freq: 392.00 },
  { name: "Python", note: "Dha", swara: "Dhaivat (A4)", category: "AI/ML", freq: 440.00 },
  { name: "GitHub", note: "Ni", swara: "Nishad (B4)", category: "Tech", freq: 493.88 },
  { name: "Cinematography", note: "Sa'", swara: "Taar Shadj (C5)", category: "Content", freq: 523.25 },
];

// Web Audio API Synthesizer Octave Engine (Sa Re Ga Ma Pa Dha Ni Sa')
let sharedAudioCtx = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!sharedAudioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      sharedAudioCtx = new AudioCtx();
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === "suspended") {
    sharedAudioCtx.resume();
  }
  return sharedAudioCtx;
}

function playOctaveSynthSound(padItem) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
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
    const ctx = getAudioContext();
    if (!ctx) return;
    
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
    id: "product-brand-design",
    channelNum: "CH 01",
    title: "Product & Brand Design",
    icon: Layers,
    iconColor: "text-amber-500",
    initialLevel: 98,
    apps: ["Figma", "UI/UX", "Design Systems", "Branding"],
    joke: "I move buttons until they feel right. Making ideas look as good as they work.",
    badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
  },
  {
    id: "ar-vr-motion",
    channelNum: "CH 02",
    title: "AR/VR, Motion & 3D",
    icon: Gamepad2,
    iconColor: "text-purple-500",
    initialLevel: 94,
    apps: ["Unity", "AR/VR", "Motion Design", "Blender"],
    joke: "I like building worlds people can step into. If it doesn't move, I'll probably animate it.",
    badgeBg: "bg-purple-100 text-purple-900 border-purple-300",
  },
  {
    id: "frontend-ai",
    channelNum: "CH 03",
    title: "Frontend & AI",
    icon: Code,
    iconColor: "text-blue-500",
    initialLevel: 88,
    apps: ["React", "Next.js", "Python", "Machine Learning"],
    joke: "Design it. Build it. Teaching machines to make sense of messy ideas.",
    badgeBg: "bg-blue-100 text-blue-900 border-blue-300",
  },
  {
    id: "creative-leadership",
    channelNum: "CH 04",
    title: "Creative Tech & Leadership",
    icon: Sparkles,
    iconColor: "text-cyan-500",
    initialLevel: 80,
    apps: ["Interactive Tech", "GitHub", "Content Creation", "Community"],
    joke: "Where design meets technology. Building things is better with people.",
    badgeBg: "bg-cyan-100 text-cyan-900 border-cyan-300",
  },
];

export default function SkillsSection() {
  const [channelLevels, setChannelLevels] = useState({
    "product-brand-design": 98,
    "ar-vr-motion": 94,
    "frontend-ai": 88,
    "creative-leadership": 80,
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
    <section id="skills" className="relative z-10 py-16 sm:py-24 px-4 sm:px-12 md:px-20 bg-cutting-mat select-none">
      <div className="max-w-7xl mx-auto">
        
        <SectionHeading
          index="03"
          label="Skills"
          title={<>The <Accent>skill</Accent> deck</>}
          aside={<span className="block max-w-sm md:ml-auto">A small mixing desk for what I do. Eight pads, tuned to the octave — Sa Re Ga Ma Pa Dha Ni Sa.</span>}
        />

        {/* SYNTHESIZER STUDIO CONTROL DECK (WHITE PAPER SHEET) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="paper relative p-5 text-ink sm:p-10"
        >
          <Pin className="-top-2 left-10" />
          <Pin className="-top-2 right-10" />
          {/* Studio Header Bar */}
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-6">
            <div>
              <h3 className="text-[15px] font-medium text-ink">Mixer</h3>
              <p className="mt-0.5 text-[13px] text-ink-3">Four channels, levelled by how much I lean on each one.</p>
            </div>
            <span className="font-handwriting text-[18px] text-ink-3">drag the faders — they make noise</span>
          </div>

          {/* 4-CHANNEL MIXER DECK */}
          <div className="grid grid-cols-1 border-b border-rule md:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-rule">
            {INITIAL_CHANNELS.map((ch) => {
              const Icon = ch.icon;
              const level = channelLevels[ch.id];
              const activeSegments = Math.round((level / 100) * 10);

              return (
                <div
                  key={ch.id}
                  className="flex flex-col justify-between space-y-4 border-rule py-6 [&:not(:first-child)]:border-t sm:space-y-6 sm:py-8 md:[&:nth-child(2)]:border-t-0 lg:border-t-0 lg:px-6 lg:first:pl-0 lg:last:pr-0"
                >
                  {/* Channel Header */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-mono text-[12px] text-ink-3">
                      <span>{ch.channelNum}</span>
                      <span className="tabular-nums text-ink">{level}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 shrink-0 text-ink-2" strokeWidth={1.75} />
                      <h4 className="text-[17px] font-medium leading-tight tracking-[-0.01em] text-ink">
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
                        className="h-1 w-full cursor-pointer appearance-none rounded-full bg-rule accent-[#1b1a17]"
                      />
                      <div className="flex items-center justify-between pt-1 font-mono text-[10px] text-ink-3">
                        <span>0dB</span>
                        <span>+12dB</span>
                      </div>
                    </div>

                    {/* Animated LED VU Meter Bar */}
                    <div className="flex shrink-0 flex-col gap-[3px] rounded-[3px] bg-ink p-1.5">
                      {[...Array(10)].map((_, i) => {
                        const segIdx = 9 - i;
                        const isLit = segIdx < activeSegments;
                        let ledColor = "bg-paper";
                        if (segIdx >= 7) ledColor = "bg-note-yellow";
                        if (segIdx >= 9) ledColor = "bg-pin";

                        return (
                          <div
                            key={i}
                            className={`w-2.5 h-1 rounded-xs transition-all duration-150 ${
                              isLit ? ledColor : "bg-white/10"
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
                          className="rounded-full border border-rule px-2 py-0.5 text-[11px] text-ink-2"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                    <p className="pt-1 text-[13px] leading-relaxed text-ink-3">
                      {ch.joke}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

          {/* OCTAVE SAPTAK 8-PAD STUDIO SOUNDBOARD (SA RE GA MA PA DHA NI SA') */}
          <div className="pt-6">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
              <div>
                <h3 className="text-[15px] font-medium text-ink">Soundboard</h3>
                <p className="mt-0.5 text-[13px] text-ink-3">One tool per note, tuned Sa to Sa&apos;.</p>
              </div>
              <span className="font-mono text-[12px] text-ink-3">
                {activePad ? `${activePad.name} · ${activePad.note}` : "tap to play"}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 lg:grid-cols-8">
              {SOUNDBOARD_PADS.map((pad, pIdx) => {
                const isActive = activePad?.name === pad.name;
                return (
                  <motion.button
                    key={pIdx}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handlePadClick(pad)}
                    className={`relative flex cursor-pointer flex-col items-start gap-4 rounded-[4px] border p-2.5 text-left transition-colors sm:gap-6 sm:p-3 ${
                      isActive
                        ? "border-ink bg-ink text-paper"
                        : "border-rule bg-paper-2/60 text-ink hover:border-ink/30"
                    }`}
                  >
                    <span className={`font-serif text-[22px] italic leading-none ${isActive ? "text-note-yellow" : "text-ink-3"}`}>
                      {pad.note}
                    </span>
                    <span className="block w-full truncate text-[11px] font-medium sm:text-[13px]">
                      {pad.name}
                    </span>

                    {/* Active Wave Pulse Ring */}
                    {isActive && (
                      <motion.span
                        initial={{ scale: 0.8, opacity: 1 }}
                        animate={{ scale: 1.15, opacity: 0 }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="pointer-events-none absolute inset-0 rounded-[4px] border border-ink"
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
