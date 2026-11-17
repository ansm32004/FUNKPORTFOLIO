"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PhoneMockup from "./PhoneMockup";
import { SectionHeading, Accent, Pin, Tape } from "./Stationery";

/*
  Featured build — Sahayika.
  An engineering project rather than a UX case study, so it is presented as a
  newspaper-style "dispatch" pinned to the mat instead of a long case study.
*/

const LIVE_URL = "https://sahayika-frontend.onrender.com/";
const SOURCE_URL = "https://github.com/ansm32004/ASHA-GNANI";
const SHOT = (name) => `/featured/sahayika/${name}.jpg`;

// Screenshots are 366×793; their content starts ~35px from the top, so give the
// Dynamic Island a little room and fill it with each screen's own top colour.
const phone = { width: 366, height: 793, topInset: 4 };

const HERO_SCREENS = [
  { src: SHOT("06-voice-assistant-answer"), alt: "Sahayika voice assistant answering an ASHA worker in Hindi", color: "#e7eaf3", tilt: -6 },
  { src: SHOT("04-asha-home"), alt: "ASHA worker home screen with today's activity and upcoming visits", color: "#e4ebf5", tilt: 0 },
  { src: SHOT("19-community-home"), alt: "Community member home screen with voice help and reminders", color: "#e7eaf3", tilt: 6 },
];

const FLOW = [
  { src: SHOT("09-record-visit"), color: "#e4ebf1", title: "Speak the visit", text: "She records a voice note about the household visit — Hindi or English." },
  { src: SHOT("11-ai-extracted-visit"), color: "#e4ebf1", title: "AI drafts the record", text: "Gemini turns the note into a structured visit record for her to confirm." },
  { src: SHOT("13-tasks-with-auto-follow-up"), color: "#e7eaf3", title: "Follow-up, scheduled", text: "A follow-up task lands on her calendar automatically." },
  { src: SHOT("24-request-asha-visit"), color: "#8e919a", title: "A family asks for help", text: "Households can request a visit or a call straight from the app." },
  { src: SHOT("26-asha-receives-request"), color: "#e4ebf1", title: "She's notified", text: "The request arrives in her notifications, flagged by urgency." },
];

const STACK = [
  ["App", "React Native + Expo"],
  ["Backend", "FastAPI (Python)"],
  ["Data", "Firebase · Firestore rules"],
  ["Voice", "GNANI speech services"],
  ["AI", "Google Gemini"],
  ["Hosting", "Render (web + API)"],
];

const EASE = [0.16, 1, 0.3, 1];

export default function FeaturedBuild() {
  return (
    <section id="featured" className="bg-cutting-mat relative z-10 px-4 py-16 sm:px-12 sm:py-24 md:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="02"
          label="Featured build"
          title={<>Shipped, not just <Accent>sketched</Accent></>}
          aside={
            <span className="block max-w-sm md:ml-auto">
              A live, working product — app, backend, voice and AI — built as a team. Less case study, more front page.
            </span>
          }
        />

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="paper relative px-5 pb-10 pt-8 sm:px-10 sm:pb-14 sm:pt-10 lg:px-14"
        >
          <Pin className="-top-2 left-12" />
          <Pin className="-top-2 right-12" />

          {/* Masthead */}
          <header className="border-b-[3px] border-double border-ink/80 pb-4 text-center">
            <div className="flex items-center justify-between text-[11px] text-ink-3 sm:text-[12px]">
              <span>No. 01 · Featured build</span>
              <span className="hidden sm:inline">New Delhi</span>
              <span>Live · Nov 2026</span>
            </div>
            <p className="mt-3 font-serif text-[40px] italic leading-none tracking-[-0.01em] text-ink sm:text-[64px]">
              The Field Dispatch
            </p>
          </header>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-b border-rule py-2 text-[11px] text-ink-3 sm:justify-between sm:text-[12px]">
            <span>Health-tech</span>
            <span>Full-stack</span>
            <span>Voice + AI</span>
            <span>Team project</span>
          </div>

          {/* Lead story */}
          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <p className="text-[13px] text-ink-3">
                <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-pin" />
                Sahayika · सहायिका
              </p>
              <h3 className="mt-3 text-[34px] font-medium leading-[1.05] tracking-[-0.03em] text-ink sm:text-[48px]">
                A voice-first companion for India&apos;s <Accent>ASHA</Accent> health workers.
              </h3>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-2">
                One ASHA worker looks after an entire community — household visits, follow-ups,
                claims and paperwork. Sahayika lets her speak a visit instead of typing it, and lets
                families reach her directly.
              </p>

              {/* Newspaper columns */}
              <div className="mt-8 gap-8 border-t border-rule pt-6 text-[14px] leading-relaxed text-ink-2 sm:columns-2 [&_h4]:mb-1 [&_h4]:break-after-avoid [&_h4]:text-[13px] [&_h4]:font-medium [&_h4]:text-ink [&_p]:mb-5 [&_p]:break-inside-avoid-column">
                <h4>The problem</h4>
                <p>
                  ASHA workers are the bridge between communities and India&apos;s public healthcare
                  system. Their day is visits, follow-ups and admin — spread across paper registers and
                  memory.
                </p>
                <h4>What we built</h4>
                <p>
                  Two experiences behind one role-aware login: a workspace for ASHA workers
                  (households, visits, tasks, incentive claims) and a simpler app for families
                  (health guides, reminders, requesting a visit).
                </p>
                <h4>How it works</h4>
                <p>
                  A spoken note goes through GNANI&apos;s speech services, Gemini extracts a structured
                  visit record for her to confirm, and the follow-up is scheduled for her
                  automatically.
                </p>
                <h4>Built for Bharat</h4>
                <p>
                  Hindi-first, with English today and more Indian languages lined up in the picker.
                  AI output is treated as assistance — never clinical judgement.
                </p>
              </div>

              {/* Stack ledger + links */}
              <div className="mt-2 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <dl className="divide-y divide-rule border-y border-rule text-[13px]">
                  {STACK.map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 py-2">
                      <dt className="text-ink-3">{k}</dt>
                      <dd className="text-right text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="flex flex-col justify-between gap-6">
                  <blockquote className="font-serif text-[24px] italic leading-[1.2] text-ink">
                    “Not another healthcare dashboard. A companion for the people who care for
                    communities.”
                  </blockquote>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={LIVE_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-paper transition-colors hover:bg-black"
                    >
                      Open the live app
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                    <a
                      href={SOURCE_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-[14px] text-ink transition-colors hover:border-ink"
                    >
                      Source on GitHub
                      <ArrowUpRight className="h-4 w-4 text-ink-3 transition-colors group-hover:text-ink" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone fan */}
            <div className="relative lg:col-span-5">
              <div className="relative mx-auto flex max-w-[460px] items-start justify-center pt-4">
                {HERO_SCREENS.map((s, i) => (
                  <div
                    key={s.src}
                    className={`w-[40%] shrink-0 ${i === 1 ? "z-10 -mx-[6%] w-[44%]" : "mt-10"}`}
                  >
                    <PhoneMockup
                      {...phone}
                      src={s.src}
                      alt={s.alt}
                      insetColor={s.color}
                      tilt={s.tilt}
                    />
                  </div>
                ))}
              </div>

              <div className="shadow-note note-texture relative mx-auto mt-10 w-60 rotate-[-2deg] rounded-[2px] bg-note-yellow px-4 py-3 lg:ml-auto lg:mr-4">
                <Tape className="-top-3 left-1/2 -translate-x-1/2" rotate={3} width={64} />
                <p className="font-handwriting text-[19px] leading-tight text-[#3d3209]">
                  heads up: the free server naps — the first load can take ~30 seconds.
                </p>
              </div>
            </div>
          </div>

          {/* Workflow strip */}
          <div className="mt-14 border-t-[3px] border-double border-ink/80 pt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="text-[20px] font-medium tracking-[-0.01em] text-ink">
                From a spoken note to a scheduled follow-up
              </h4>
              <span className="font-handwriting text-[18px] text-ink-3 lg:hidden">swipe →</span>
            </div>

            <ol className="-mx-5 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-10 sm:px-10 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
              {FLOW.map((step, i) => (
                <li key={step.src} className="w-[62%] shrink-0 snap-center sm:w-[38%] lg:w-auto">
                  <PhoneMockup {...phone} src={step.src} alt={step.title} insetColor={step.color} />
                  <div className="mt-4 flex gap-3">
                    <span className="font-serif text-[28px] italic leading-none text-ink-3">{i + 1}</span>
                    <div>
                      <p className="text-[14px] font-medium text-ink">{step.title}</p>
                      <p className="mt-1 text-[13px] leading-snug text-ink-3">{step.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
