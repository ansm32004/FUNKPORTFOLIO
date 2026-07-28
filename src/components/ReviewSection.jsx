"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MessageSquareQuote,
  PlusCircle,
  CheckCircle2,
  ThumbsUp,
  X,
  UserCheck,
  Sparkles,
  Send,
  Building2,
  Award,
} from "lucide-react";

// Default Initial Reviews
const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    name: "Siddharth Verma",
    role: "Head of Product",
    company: "Nexus Labs",
    avatar: "SV",
    avatarBg: "bg-blue-600",
    rating: 5,
    date: "July 2026",
    tag: "🚀 Product & Motion",
    verified: true,
    content:
      "Anshuman has that rare combination of top-tier visual polish and deep engineering logic. He didn't just design our interface—he built keyframe timeline interactions that blew our users away. 10/10 would hire again.",
    likes: 14,
    angle: "-rotate-1",
  },
  {
    id: "rev-2",
    name: "Elena Rostova",
    role: "Lead Design Engineer",
    company: "Synthetix Studio",
    avatar: "ER",
    avatarBg: "bg-purple-600",
    rating: 5,
    date: "June 2026",
    tag: "⚡ Frontend Architecture",
    verified: true,
    content:
      "Most designers hand off Figma files with missing states. Anshuman hands off production React code with 60fps animations, tokenized CSS variables, and dark mode ready out of the box. Absolutely legendary work ethic.",
    likes: 21,
    angle: "rotate-1",
  },
  {
    id: "rev-3",
    name: "Arjun Mehta",
    role: "Co-Founder & CTO",
    company: "ChronoTask",
    avatar: "AM",
    avatarBg: "bg-emerald-700",
    rating: 5,
    date: "May 2026",
    tag: "🎨 Design System",
    verified: true,
    content:
      "Working with Anshuman was seamless. He takes raw requirements and converts them into tactile, delightful web apps that users actually love interacting with. Plus, his micro-interactions are chef's kiss 🤌.",
    likes: 18,
    angle: "-rotate-2",
  },
  {
    id: "rev-4",
    name: "Priya Sundaram",
    role: "Senior UX Researcher",
    company: "Tasveer Photography",
    avatar: "PS",
    avatarBg: "bg-rose-600",
    rating: 5,
    date: "April 2026",
    tag: "📷 Brand & Photography",
    verified: true,
    content:
      "The spatial interactive viewfinder and film contact sheet Anshuman designed for Tasveer redefined how our community browses photographer portfolios. Highly creative, highly responsive!",
    likes: 9,
    angle: "rotate-2",
  },
];

export default function ReviewSection() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [showModal, setShowModal] = useState(false);
  const [likedMap, setLikedMap] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    rating: 5,
    tag: "🚀 Product & Motion",
    content: "",
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleLike = (id) => {
    if (likedMap[id]) return;
    setLikedMap((prev) => ({ ...prev, [id]: true }));
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.content.trim()) return;

    // Generate Initials
    const nameParts = formData.name.trim().split(" ");
    const initials =
      nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
        : nameParts[0].substring(0, 2).toUpperCase();

    const colors = [
      "bg-amber-600",
      "bg-emerald-600",
      "bg-indigo-600",
      "bg-rose-600",
      "bg-teal-600",
      "bg-blue-600",
    ];
    const randomBg = colors[Math.floor(Math.random() * colors.length)];

    const newReview = {
      id: `rev-${Date.now()}`,
      name: formData.name.trim(),
      role: formData.role.trim() || "Collaborator",
      company: formData.company.trim() || "Verified Client",
      avatar: initials,
      avatarBg: randomBg,
      rating: formData.rating,
      date: "Just now",
      tag: formData.tag,
      verified: true,
      content: formData.content.trim(),
      likes: 1,
      isNew: true,
      angle: "rotate-0",
    };

    setReviews([newReview, ...reviews]);
    setSubmittedSuccess(true);

    setTimeout(() => {
      setSubmittedSuccess(false);
      setShowModal(false);
      setFormData({
        name: "",
        role: "",
        company: "",
        rating: 5,
        tag: "🚀 Product & Motion",
        content: "",
      });
    }, 1800);
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

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm text-emerald-100/70 max-w-sm font-medium leading-relaxed">
              Honest feedback from founders, product leaders, design peers, and engineers.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-full shadow-lg shadow-emerald-400/20 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Your Review</span>
            </button>
          </div>
        </motion.div>

        {/* TESTIMONIAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white rounded-3xl p-7 sm:p-8 shadow-2xl border border-slate-200 hover:border-slate-300 transition-all hover:-translate-y-1 ${
                rev.isNew ? "ring-2 ring-emerald-500 shadow-emerald-500/10" : ""
              }`}
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

              {/* Card Footer: Helpful Upvote Button */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-semibold">
                <span className="text-[11px] text-slate-400 font-medium">
                  {rev.isNew ? "✨ Newly Submitted Review" : "Endorsement"}
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
                  <span>{rev.likes}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MODAL / DRAWER FORM FOR ADDING REVIEWS */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white rounded-3xl p-6 sm:p-10 max-w-lg w-full shadow-2xl border border-slate-200 relative overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {submittedSuccess ? (
                  <div className="py-12 text-center space-y-4">
                    <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
                    <h3 className="text-2xl font-extrabold text-slate-900">
                      Review Added! 🎉
                    </h3>
                    <p className="text-sm text-slate-600 font-medium max-w-xs mx-auto">
                      Thank you for your feedback! Your endorsement is now live on the site.
                    </p>
                  </div>
                ) : (
                  <div>
                    {/* Modal Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
                        <Sparkles className="w-4 h-4" />
                        <span>Leave Your Feedback</span>
                      </div>
                      <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        Add a Review / Endorsement
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        Worked together or checked out the portfolio? Share your thoughts below!
                      </p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      {/* Interactive Star Selection */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Rating
                        </label>
                        <div className="flex items-center gap-2 bg-amber-50/80 p-3 rounded-2xl border border-amber-200">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              onClick={() => setFormData({ ...formData, rating: star })}
                              className="p-1 transition-transform hover:scale-125 cursor-pointer"
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  star <= (hoverRating || formData.rating)
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-slate-300"
                                }`}
                              />
                            </button>
                          ))}
                          <span className="ml-2 text-xs font-bold text-amber-900">
                            {formData.rating} / 5 Stars
                          </span>
                        </div>
                      </div>

                      {/* Inputs Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="e.g. Rahul Sharma"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Role & Company
                          </label>
                          <input
                            type="text"
                            value={formData.role}
                            onChange={(e) =>
                              setFormData({ ...formData, role: e.target.value })
                            }
                            placeholder="e.g. Design Lead @ Tech"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      {/* Tag Selector */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Category Tag
                        </label>
                        <select
                          value={formData.tag}
                          onChange={(e) =>
                            setFormData({ ...formData, tag: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="🚀 Product & Motion">🚀 Product & Motion</option>
                          <option value="⚡ Frontend Architecture">⚡ Frontend Architecture</option>
                          <option value="🎨 Design System">🎨 Design System</option>
                          <option value="📷 Brand & Photography">📷 Brand & Photography</option>
                          <option value="🤝 General Review">🤝 General Review</option>
                        </select>
                      </div>

                      {/* Review Text */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Review Message *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formData.content}
                          onChange={(e) =>
                            setFormData({ ...formData, content: e.target.value })
                          }
                          placeholder="Share your experience working together or feedback on the portfolio..."
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                        />
                      </div>

                      {/* Submit CTA */}
                      <button
                        type="submit"
                        className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                      >
                        <span>Post Review</span>
                        <Send className="w-4 h-4 text-emerald-400" />
                      </button>
                    </form>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
