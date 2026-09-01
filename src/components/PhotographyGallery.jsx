"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, MapPin, RotateCw, LayoutGrid, Shuffle } from "lucide-react";

const DESK_PHOTOS = [
  {
    id: "photo-1",
    title: "Street Geometry & Shadow Play",
    category: "Street",
    tagEmoji: "📸",
    location: "Delhi",
    exif: "35mm F1.4 • ISO 100 • f/2.8",
    src: "/photo/P1.jpeg",
    handwrittenNote:
      "Chasing afternoon light and sharp 45° geometric shadows along the avenue. Felt like a live painting.",
    tapeRotation: "rotate-3",
    initialRotation: -4,
  },
  {
    id: "photo-2",
    title: "Golden Hour Perspective",
    category: "Street",
    tagEmoji: "🌆",
    location: "Vrindavan",
    exif: "50mm F1.2 • ISO 200 • f/1.8",
    src: "/photo/P2.jpeg",
    handwrittenNote:
      "Dust particles floating in warm golden light as the city wakes up. Ran out of breath framing this moment!",
    tapeRotation: "-rotate-2",
    initialRotation: 3,
  },
  {
    id: "photo-3",
    title: "Minimalist Architectural Facade",
    category: "Minimal",
    tagEmoji: "📐",
    location: "Bihar",
    exif: "35mm F1.4 • ISO 100 • f/8.0",
    src: "/photo/P3.jpg",
    handwrittenNote:
      "Reflections forming clean, infinite grid lines. Structural clarity and balanced negative space.",
    tapeRotation: "rotate-4",
    initialRotation: -3,
  },
  {
    id: "photo-4",
    title: "Atmospheric Silhouette & Contrast",
    category: "Light & Shadows",
    tagEmoji: "💡",
    location: "Gorakhpur",
    exif: "85mm F1.4 • ISO 400 • f/2.0",
    src: "/photo/P4.jpeg",
    handwrittenNote:
      "High contrast shadow play. Seeing in monochrome helps focus purely on form, depth, and human scale.",
    tapeRotation: "-rotate-3",
    initialRotation: 5,
  },
  {
    id: "photo-5",
    title: "Brutalist Lines & Symmetry",
    category: "Concert",
    tagEmoji: "🏛️",
    location: "Delhi",
    exif: "24mm F1.4 • ISO 100 • f/5.6",
    src: "/photo/p5.jpeg",
    handwrittenNote:
      "Symmetry found in raw concrete forms and leading lines. Stood still for 15 minutes to center the axis.",
    tapeRotation: "rotate-2",
    initialRotation: -4,
  },
];

export default function PhotographyGallery() {
  const containerRef = useRef(null);
  const [isScatterView, setIsScatterView] = useState(true);
  const [flippedCards, setFlippedCards] = useState({});

  const toggleCardFlip = (id, e) => {
    if (e) e.stopPropagation();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderPhotoCard = (photo) => {
    const isFlipped = flippedCards[photo.id];
    const rotationDeg = isScatterView ? photo.initialRotation : 0;

    return (
      <motion.div
        key={photo.id}
        drag={isScatterView}
        dragConstraints={containerRef}
        dragElastic={0.15}
        whileHover={{ scale: 1.04, zIndex: 40 }}
        whileTap={{ cursor: "grabbing" }}
        style={{ rotate: rotationDeg }}
        className="relative cursor-grab group"
      >
        {/* Masking Tape Graphic Accent */}
        <div
          className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-amber-100/90 backdrop-blur-xs border border-amber-200/60 shadow-xs z-30 pointer-events-none ${photo.tapeRotation}`}
        />

        {/* 3D FLIPPABLE PHYSICAL PHOTO PRINT CARD */}
        <div
          onClick={(e) => toggleCardFlip(photo.id, e)}
          className="relative w-full bg-white rounded-2xl p-4 shadow-xl border border-slate-200/90 space-y-3 transition-shadow duration-300 group-hover:shadow-2xl overflow-hidden cursor-pointer"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative w-full"
          >
            {/* FRONT SIDE: PRINTED PHOTOGRAPH */}
            <div style={{ backfaceVisibility: "hidden" }} className="space-y-3">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                />

                <div className="absolute top-2.5 right-2.5 bg-slate-900/80 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-700/80 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>{photo.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 block">
                    {photo.tagEmoji} {photo.category}
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900 truncate max-w-[200px]">
                    {photo.title}
                  </h4>
                </div>

                <div
                  title="Click to flip photo for sharpie note on back"
                  className="p-2 rounded-xl bg-slate-100 group-hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors shrink-0"
                >
                  <RotateCw className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* BACK SIDE: HANDWRITTEN SHARPIE NOTES */}
            <div
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                position: "absolute",
                inset: 0,
              }}
              className="bg-amber-50 rounded-xl p-5 border border-amber-200 flex flex-col justify-between space-y-4 text-slate-900 shadow-inner"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
                  <span className="text-[10px] font-mono font-extrabold uppercase text-amber-800">
                    📷 SHOOTING NOTE
                  </span>
                  <span className="text-[10px] font-bold text-amber-800 flex items-center gap-1">
                    <RotateCw className="w-3 h-3" />
                    Flip Front
                  </span>
                </div>

                <p className="font-handwriting text-base sm:text-lg text-amber-950 font-bold leading-relaxed pt-1">
                  "{photo.handwrittenNote}"
                </p>
              </div>

              <div className="pt-2 border-t border-amber-200/80 flex items-center justify-between text-[10px] font-mono font-extrabold text-amber-800">
                <span>{photo.exif}</span>
                <span>{photo.location}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="photography" className="relative z-10 py-24 px-6 sm:px-12 md:px-20 bg-cutting-mat border-t border-emerald-950/80 select-none">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-emerald-800/40 gap-6"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <Camera className="w-4 h-4" />
              <span>05 // Tabletop Lens Archive</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Through My Lens
            </h2>
          </div>

          {/* Desktop Tabletop Controls */}
          <div className="flex items-center gap-3">
            <div className="bg-emerald-950/70 border border-emerald-800/60 px-4 py-2 rounded-2xl text-xs text-emerald-200/90 font-medium hidden sm:flex items-center gap-2">
              <span>🖐️ Drag photos to rearrange</span>
              <span>•</span>
              <span>🔄 Click any photo to flip for sharpie notes</span>
            </div>

            <div className="flex items-center gap-1.5 bg-emerald-950/80 p-1.5 rounded-2xl border border-emerald-800/60">
              <button
                onClick={() => setIsScatterView(true)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${isScatterView ? "bg-white text-slate-900 shadow-md" : "text-emerald-300 hover:text-white"
                  }`}
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Scatter 🎲</span>
              </button>
              <button
                onClick={() => setIsScatterView(false)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${!isScatterView ? "bg-white text-slate-900 shadow-md" : "text-emerald-300 hover:text-white"
                  }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid 📐</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* 5 PHOTOS CANVAS: 3 ON TOP, 2 ON BOTTOM */}
        <div ref={containerRef} className="relative min-h-[600px] w-full py-4 space-y-8">
          {/* ROW 1: 3 PHOTOS ON TOP */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {DESK_PHOTOS.slice(0, 3).map((photo) => renderPhotoCard(photo))}
          </div>

          {/* ROW 2: 2 PHOTOS ON BOTTOM (CENTERED) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {DESK_PHOTOS.slice(3, 5).map((photo) => renderPhotoCard(photo))}
          </div>
        </div>

      </div>
    </section>
  );
}
