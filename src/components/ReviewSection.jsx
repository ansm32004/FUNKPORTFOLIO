"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading, Accent, Pin, Tape } from "./Stationery";

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
    tag: "Attendance Product & Fullstack",
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
    tag: "Compliance Dashboard UX",
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
    tag: "Web Experience & UX",
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
    tag: "User Research & Product",
    verified: true,
    content:
      "What I really value about working with Anshuman is how deeply he thinks about the user. We worked together on creating experiences for Gen Z as well as users from Tier-3 cities and Bharat, where assumptions about how people use digital products can easily lead to the wrong design decisions. Anshuman brought a very practical approach to simplifying those experiences while still keeping them modern and engaging. He doesn't just design screens — he thinks about how real people will actually use the product.",
    likes: 29,
    angle: "rotate-2",
  },
];

export default function ReviewSection() {
  return (
    <section
      id="reviews"
      className="relative z-10 py-16 sm:py-24 px-4 sm:px-12 md:px-20 bg-cutting-mat"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          index="06"
          label="Kind words"
          title={<>What people <Accent>say</Accent></>}
          aside={<span className="block max-w-sm md:ml-auto">From founders, product leads and the people I&apos;ve shipped things with.</span>}
        />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {REVIEWS.map((rev, index) => (
            <motion.figure
              key={rev.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`paper relative flex flex-col p-6 sm:p-10 ${index % 2 ? "md:rotate-[0.6deg]" : "md:-rotate-[0.4deg]"}`}
            >
              {index % 2 ? (
                <Tape className="-top-3 left-1/2 -translate-x-1/2" rotate={-2} />
              ) : (
                <Pin className="-top-2 left-1/2 -translate-x-1/2" />
              )}

              <span aria-hidden className="font-serif text-[64px] leading-[0.6] text-ink-3/50">“</span>

              <blockquote className="mb-8 mt-2 text-[16px] sm:text-[17px] leading-[1.6] text-ink-2">
                {rev.content}
              </blockquote>

              <figcaption className="mt-auto flex items-center gap-3.5 border-t border-rule pt-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper-2 text-[12px] font-semibold text-ink ring-1 ring-rule">
                  {rev.avatar}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-medium text-ink">{rev.name}</div>
                  <div className="truncate text-[13px] text-ink-3">
                    {rev.role}, {rev.company}
                  </div>
                </div>
                <div className="hidden text-right text-[12px] text-ink-3 sm:block">
                  <div>{rev.tag}</div>
                  <div className="tabular-nums">{rev.date}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
