"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import { Pin, Tape, Accent } from "./Stationery";

export default function Footer() {
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
          hour12: false,
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmitNote = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "455b79f8-63f2-4f34-b6ab-e004c208e68c",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      alert("Error sending message!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="relative z-10 py-16 sm:py-24 px-4 sm:px-12 md:px-20 bg-cutting-mat">
      <div className="max-w-7xl mx-auto">
        <div className="paper relative p-6 sm:p-14">
          <Pin className="-top-2 left-12" />
          <Pin className="-top-2 right-12" />

          <div className="grid grid-cols-1 items-center gap-12 border-b border-rule pb-10 sm:gap-14 sm:pb-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="flex items-center gap-3 text-[13px] text-ink-3">
                <span className="tabular-nums text-ink">08</span>
                <span className="h-px w-6 bg-rule" />
                <span>Contact</span>
              </p>

              <h2 className="mt-5 text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl">
                Let&apos;s build something good.
                <br />
                <span className="text-ink-3">
                  Or argue about <Accent className="whitespace-nowrap text-ink">16px vs 20px.</Accent>
                </span>
              </h2>

              <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink-2">
                Email, DM, or send memes. Recruiters get priority.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="mailto:rkm32004@gmail.com"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14px] font-medium text-paper transition-colors hover:bg-black"
                >
                  rkm32004@gmail.com
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <span className="text-[14px] text-ink-3">New Delhi, India · {time || "IST"}</span>
              </div>
            </div>

            {/* Sticky-note contact form */}
            <div className="lg:col-span-5">
              <div className="shadow-note note-texture relative mx-auto max-w-md rotate-[1.5deg] rounded-[2px] bg-note-yellow p-6 sm:p-8">
                <Tape className="-top-3 left-1/2 -translate-x-1/2" rotate={-3} width={100} />
                <p className="font-handwriting text-[28px] leading-none text-[#3d3209]">Leave a note</p>

                {submitted ? (
                  <div className="py-10 text-center">
                    <p className="font-handwriting text-[26px] text-[#3d3209]">Got it — thank you!</p>
                    <p className="mt-1 text-[13px] text-[#3d3209]/70">I&apos;ll get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitNote} className="mt-4 space-y-2">
                    <input
                      type="text"
                      required
                      aria-label="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="your name"
                      className="w-full border-0 border-b border-[#3d3209]/25 bg-transparent px-0 py-2 font-handwriting text-[22px] text-[#3d3209] placeholder:text-[#3d3209]/45 focus:border-[#3d3209] focus:outline-none focus:ring-0"
                    />
                    <input
                      type="email"
                      required
                      aria-label="Your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your email"
                      className="w-full border-0 border-b border-[#3d3209]/25 bg-transparent px-0 py-2 font-handwriting text-[22px] text-[#3d3209] placeholder:text-[#3d3209]/45 focus:border-[#3d3209] focus:outline-none focus:ring-0"
                    />
                    <textarea
                      required
                      aria-label="Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="what's on your mind?"
                      rows={3}
                      className="w-full border-0 border-b border-[#3d3209]/25 bg-transparent px-0 py-2 font-handwriting text-[22px] text-[#3d3209] placeholder:text-[#3d3209]/45 focus:border-[#3d3209] focus:outline-none focus:ring-0 resize-none"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-4 w-full cursor-pointer rounded-full bg-[#3d3209] py-2.5 text-[14px] font-medium text-note-yellow transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? "Sending…" : "Send note"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 pt-8 text-[13px] text-ink-3 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-ink">Anshuman Mishra</span>
              <span className="mx-2">·</span>
              Designed. Developed. Overthought. Repeated.
              <p className="mt-1 text-[12px]">
                © 2026. No designers were harmed making this portfolio. Developers — we&apos;re still investigating.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
                Twitter
              </a>
              <a href="https://github.com/ansm32004" target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/ansmfx/" target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
                LinkedIn
              </a>
              <Link
                href="/admin"
                className="inline-flex items-center gap-1 transition-colors hover:text-ink"
                title="Admin"
              >
                <Lock className="h-3 w-3" />
                <span className="sr-only">Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
