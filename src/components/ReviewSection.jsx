"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquareQuote, UserCheck, ThumbsUp } from "lucide-react";

// 4 Authentic Client & Peer Testimonials
const REVIEWS = [
  {
    id: "rev-1",
    name: "Devansh",
    role: "Director",
    company: "ADS Architects",
    avatar: "DV",
    avatarBg: "bg-blue-600",
    rating: 5,
    date: "August 2026",
    tag: "🏢 Attendance Product & Fullstack",
    verified: true,
    content:
      "Working with Anshuman was a great experience. He took ownership of the attendance product end-to-end, from understanding the workflow and designing the UX to building both the frontend and backend. What stood out was his ability to think beyond just the interface — he understood the operational requirements and translated them into a practical, easy-to-use product. He brings a rare combination of design thinking and technical execution.",
    likes: 18,
    angle: "-rotate-1",
  },
  {
    id: "rev-2",
    name: "Deepak Tayal",
    role: "Founder",
    company: "Wraptax",
    avatar: "DT",
    avatarBg: "bg-emerald-600",
    rating: 5,
    date: "July 2026",
    tag: "📊 Compliance Dashboard UX",
    verified: true,
    content:
      "Anshuman helped us design the Notice Board compliance dashboard with a strong focus on making a complex operational workflow simple and understandable. He was able to look at the product from the user's perspective, structure the information clearly, and turn complicated compliance data into an experience that felt much easier to navigate. His attention to detail and ability to think through the complete user journey really stood out.",
    likes: 24,
    angle: "rotate-1",
  },
  {
    id: "rev-3",
    name: "Deepak Garg",
    role: "Founder",
    company: "Southern Immigration",
    avatar: "DG",
    avatarBg: "bg-purple-600",
    rating: 5,
    date: "June 2026",
    tag: "🌐 Web Experience & UX",
    verified: true,
    content:
      "Anshuman completely changed the way we approached our digital experience. He worked on the UX and web experience for our immigration and study-abroad programs, making the information much clearer and the overall journey more approachable for prospective students and clients. He understands how to balance business goals with user needs and has a strong eye for creating interfaces that feel modern without becoming complicated.",
    likes: 19,
    angle: "-rotate-2",
  },
  {
    id: "rev-4",
    name: "Sandeep Choudhary",
    role: "Freelance Product Builder",
    company: "Bharat & Gen Z UX",
    avatar: "SC",
    avatarBg: "bg-rose-600",
    rating: 5,
    date: "May 2026",
    tag: "💡 User Research & Product",
    verified: true,
    content:
      "What I really value about working with Anshuman is how deeply he thinks about the user. We worked together on creating experiences for Gen Z as well as users from Tier-3 cities and Bharat, where assumptions about how people use digital products can easily lead to the wrong design decisions. Anshuman brought a very practical approach to simplifying those experiences while still keeping them modern and engaging. He doesn't just design screens — he thinks about how real people will actually use the product.",
    likes: 29,
    angle: "rotate-2",
  },
];

export default function ReviewSection() {
  const [likedMap, setLikedMap] = useState({});
  const [likesState, setLikesState] = useState(
    REVIEWS.reduce((acc, r) => ({ ...acc, [r.id]: r.likes }), {})
  );

  const handleLike = (id) => {
    if (likedMap[id]) return;
    setLikedMap((prev) => ({ ...prev, [id]: true }));
    setLikesState((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  return (
    <section
      id="reviews"
      className="relative z-10 py-24 px-6 sm:px-12 md:px-20 bg-cutting-mat border-t border-emerald-950/80 select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-emerald-800/40 gap-6"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <MessageSquareQuote className="w-4 h-4" />
              <span>07 // Client & Peer Endorsements</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              What People Say
            </h2>
          </div>

          <p className="text-sm text-emerald-100/70 max-w-md font-medium leading-relaxed">
            Honest feedback from founders, product leaders, design peers, and client partners.
          </p>
        </motion.div>

        {/* TESTIMONIAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REVIEWS.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white rounded-3xl p-7 sm:p-8 shadow-2xl border border-slate-200 hover:border-slate-300 transition-all hover:-translate-y-1"
            >
              {/* Paperclip Accent Top Left */}
              <div className="absolute -top-3 left-8 w-6 h-10 bg-slate-300 rounded-full border border-slate-400 shadow-sm opacity-60 pointer-events-none transform -rotate-12" />

              {/* Card Header: Avatar + Rating */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-2xl ${rev.avatarBg} text-white font-extrabold text-sm flex items-center justify-center shadow-md tracking-tight`}
                  >
                    {rev.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                        {rev.name}
                      </h3>
                      {rev.verified && (
                        <span
                          className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200"
                          title="Verified Collaboration"
                        >
                          <UserCheck className="w-3 h-3 text-emerald-600" />
                          <span>Verified</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      {rev.role} {rev.company ? `• ${rev.company}` : ""}
                    </p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200/80">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Tag & Date */}
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-4 pb-3 border-b border-slate-100">
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700">
                  {rev.tag}
                </span>
                <span className="font-mono text-slate-400">{rev.date}</span>
              </div>

              {/* Review Content */}
              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed mb-6">
                "{rev.content}"
              </p>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-semibold">
                <span className="text-[11px] text-slate-400 font-medium">
                  Endorsement
                </span>

                <button
                  onClick={() => handleLike(rev.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    likedMap[rev.id]
                      ? "bg-emerald-50 text-emerald-700 font-bold border border-emerald-200"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
                  }`}
                >
                  <ThumbsUp
                    className={`w-3.5 h-3.5 ${
                      likedMap[rev.id] ? "fill-emerald-600 text-emerald-600" : ""
                    }`}
                  />
                  <span>{likesState[rev.id]}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
