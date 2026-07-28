"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, MapPin, RotateCw, LayoutGrid, Shuffle } from "lucide-react";

const DESK_PHOTOS = [
  {
    id: "photo-1",
    title: "Urban Geometry & Concrete Shadows",
    category: "Architecture",
    tagEmoji: "🏛️",
    location: "New Delhi, India",
    exif: "Sony α7 IV • FE 35mm F1.4 GM • ISO 100 • f/2.8",
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    handwrittenNote:
      "Old Delhi street corner. Late afternoon sun creating sharp 45° geometric shadows across the raw concrete. Felt like a live painting.",
    tapeRotation: "rotate-3",
    initialRotation: -6,
  },
  {
    id: "photo-2",
    title: "Golden Hour Alleyway",
    category: "Street",
    tagEmoji: "🌆",
    location: "Old Delhi, India",
    exif: "Sony α7 IV • FE 50mm F1.2 GM • ISO 200 • f/1.8",
    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
    handwrittenNote:
      "Dust particles floating in warm light as the city wakes up at 5:45 AM. Ran out of breath trying to frame this before the light changed!",
    tapeRotation: "-rotate-2",
    initialRotation: 4,
  },
  {
    id: "photo-3",
    title: "Minimalist Glass Facade",
    category: "Minimal",
    tagEmoji: "📐",
    location: "Gurugram, India",
    exif: "Sony α7 IV • FE 35mm F1.4 GM • ISO 100 • f/8.0",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    handwrittenNote:
      "Reflections forming infinite grid patterns. Obsessed with how clean steel & glass look when the sky is completely clear.",
    tapeRotation: "rotate-6",
    initialRotation: -3,
  },
  {
    id: "photo-4",
    title: "Monochrome Light Silhouette",
    category: "Light & Shadows",
    tagEmoji: "💡",
    location: "New Delhi, India",
    exif: "Sony α7 IV • FE 85mm F1.4 GM • ISO 400 • f/2.0",
    src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    handwrittenNote:
      "High contrast shadow play. Seeing in black & white helps focus purely on form and human emotion.",
    tapeRotation: "-rotate-4",
    initialRotation: 5,
  },
  {
    id: "photo-5",
    title: "Brutalist Staircase Rhythms",
    category: "Architecture",
    tagEmoji: "🏛️",
    location: "Delhi NCR, India",
    exif: "Sony α7 IV • FE 24mm F1.4 GM • ISO 100 • f/5.6",
    src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
    handwrittenNote:
      "Symmetry found in raw concrete steps and leading lines. Stood on top of a ledge for 20 minutes to get the axis centered.",
    tapeRotation: "rotate-2",
    initialRotation: -5,
  },
  {
    id: "photo-6",
    title: "Neon Night Reflections",
    category: "Street",
    tagEmoji: "🌆",
    location: "CP, New Delhi",
    exif: "Sony α7 IV • FE 35mm F1.4 GM • ISO 800 • f/1.4",
    src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
    handwrittenNote:
      "Monsoon rain just stopped. Wet asphalt turned the street into a giant mirror reflecting blue & amber neon signs.",
    tapeRotation: "-rotate-3",
    initialRotation: 7,
  },
  {
    id: "photo-7",
    title: "Negative Space & Solitude",
    category: "Minimal",
    tagEmoji: "📐",
    location: "Hauz Khas, India",
    exif: "Sony α7 IV • FE 50mm F1.2 GM • ISO 100 • f/4.0",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    handwrittenNote:
      "Breathing space. Sometimes what you leave OUT of the frame is 10x more powerful than what you put in.",
    tapeRotation: "rotate-5",
    initialRotation: -4,
  },
  {
    id: "photo-8",
    title: "Prism & Refracted Light",
    category: "Light & Shadows",
    tagEmoji: "💡",
    location: "Studio Delhi",
    exif: "Sony α7 IV • FE 90mm Macro F2.8 • ISO 100 • f/2.8",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    handwrittenNote:
      "Natural morning light bending through glass prisms onto raw linen. Pure unintended rainbow magic.",
    tapeRotation: "-rotate-2",
    initialRotation: 3,
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isScatterView ? "bg-white text-slate-900 shadow-md" : "text-emerald-300 hover:text-white"
                }`}
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Scatter 🎲</span>
              </button>
              <button
                onClick={() => setIsScatterView(false)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                  !isScatterView ? "bg-white text-slate-900 shadow-md" : "text-emerald-300 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid 📐</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* DESK TABLETOP CANVAS AREA */}
        <div ref={containerRef} className="relative min-h-[700px] w-full py-4">
          
          {/* Scatter Deck vs Grid Layout */}
          <div
            className={
              isScatterView
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            }
          >
            {DESK_PHOTOS.map((photo) => {
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

                  {/* 3D FLIPPABLE PHYSICAL PHOTO PRINT CARD (Clicking directly flips the card) */}
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
                      {/* --- FRONT SIDE: PRINTED PHOTOGRAPH --- */}
                      <div style={{ backfaceVisibility: "hidden" }} className="space-y-3">
                        {/* Photo Container */}
                        <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                          <img
                            src={photo.src}
                            alt={photo.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                          />
                          
                          {/* Location Badge */}
                          <div className="absolute top-2.5 right-2.5 bg-slate-900/80 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-700/80 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-rose-400" />
                            <span>{photo.location.split(",")[0]}</span>
                          </div>
                        </div>

                        {/* Title & Flip Indicator */}
                        <div className="flex items-center justify-between pt-1">
                          <div>
                            <span className="text-[10px] font-bold text-blue-600 block">
                              {photo.tagEmoji} {photo.category}
                            </span>
                            <h4 className="text-sm font-extrabold text-slate-900 truncate max-w-[180px]">
                              {photo.title}
                            </h4>
                          </div>

                          {/* Flip Button */}
                          <div
                            title="Click to flip photo for sharpie note on back"
                            className="p-2 rounded-xl bg-slate-100 group-hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors shrink-0"
                          >
                            <RotateCw className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* --- BACK SIDE: HANDWRITTEN SHARPIE NOTES --- */}
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
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
