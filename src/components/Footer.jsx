"use client";

import React, { useState, useEffect } from "react";
import { Mail, Send, CheckCircle2, MessageSquare, MapPin } from "lucide-react";

export default function Footer() {
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZoneName: "short",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmitNote = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setSubmitted(true);
  };

  return (
    <footer id="contact" className="relative z-10 py-20 px-6 sm:px-12 md:px-20 bg-cutting-mat border-t border-emerald-950/80">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-slate-200 relative overflow-hidden">

          {/* Main CTA Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-12 border-b border-slate-200">

            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600">
                <Mail className="w-4 h-4" />
                <span>08 // Initiate Contact</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Let's build something cool. <br className="hidden sm:inline" />
                <span className="text-emerald-700">Or argue whether 16px is better than 20px.</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 font-medium max-w-lg leading-relaxed">
                Email me. Message me. Send memes. Recruiters get priority.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="mailto:contact@anshumanmishra.com"
                  className="px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-full shadow-lg transition-all inline-block"
                >
                  contact@anshumanmishra.com
                </a>

                <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span>New Delhi, India</span>
                </div>
              </div>
            </div>

            {/* Pinned Yellow Note */}
            <div className="lg:col-span-5">
              <div className="relative bg-[#EAF235] rounded-3xl p-7 shadow-cast-yellow border border-yellow-300 transform rotate-2">
                <div className="flex items-center gap-2 mb-3 text-amber-950">
                  <MessageSquare className="w-4 h-4 text-amber-900" />
                  <span className="text-xs font-bold uppercase tracking-wider">Pin a Quick Message / Meme</span>
                </div>

                {submitted ? (
                  <div className="py-6 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                    <p className="text-xs font-bold text-slate-900">Note Pinned!</p>
                    <p className="text-[11px] text-slate-700">Thanks for reaching out. I'll get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitNote} className="space-y-3">
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Type your message, offer, or meme link here..."
                      rows={3}
                      className="w-full bg-yellow-100/80 border border-yellow-300 rounded-xl p-3 text-xs font-medium text-amber-950 placeholder-amber-800/50 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-amber-950 hover:bg-black text-amber-50 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Pin Note</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

          {/* Footer Meta Details */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 gap-6 text-xs font-semibold text-slate-500">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <span className="text-slate-900 font-bold">ANSHUMAN MISHRA</span>
                <span>•</span>
                <span>Designed. Developed. Overthought. Repeated.</span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal">
                © 2026 Anshuman Mishra. No designers were harmed while making this portfolio. (Developers... we're still investigating.)
              </p>
            </div>

            <div className="flex items-center gap-5 text-slate-600">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">
                Twitter / X
              </a>
              <a href="https://github.com/ansm32004" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com/ansmfx" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">
                LinkedIn
              </a>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 text-[11px] font-bold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>IST: {time || "10:58:06 IST"}</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
