"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";
import { SectionHeading, Accent, Tape } from "./Stationery";

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
  // Only allow dragging with a mouse/trackpad — on touch screens it would hijack page scroll.
  const [canDrag, setCanDrag] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanDrag(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
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
        drag={isScatterView && canDrag}
        dragConstraints={containerRef}
        dragElastic={0.15}
        whileHover={{ y: -4, zIndex: 40 }}
        whileTap={{ cursor: "grabbing" }}
        style={{ rotate: rotationDeg }}
        className={`group relative ${canDrag && isScatterView ? "cursor-grab" : ""}`}
      >
        {/* Masking Tape Graphic Accent */}
        <Tape className="-top-3 left-1/2 -translate-x-1/2" rotate={photo.initialRotation * -0.8} width={84} />

        {/* 3D FLIPPABLE PHYSICAL PHOTO PRINT CARD */}
        <div
          onClick={(e) => toggleCardFlip(photo.id, e)}
          className="paper relative w-full cursor-pointer overflow-hidden rounded-[3px] p-3 pb-4"
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
              <div className="relative aspect-4/3 overflow-hidden rounded-[1px] bg-ink">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="pointer-events-none h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />

              </div>

              <div className="flex items-end justify-between gap-3 px-1 pt-1">
                <div className="min-w-0">
                  <h4 className="truncate font-handwriting text-[22px] leading-tight text-ink">
                    {photo.title}
                  </h4>
                  <span className="text-[12px] text-ink-3">
                    {photo.location} · {photo.category}
                  </span>
                </div>
                <RotateCw
                  aria-label="Flip for note"
                  className="mb-1 h-4 w-4 shrink-0 text-ink-3 transition-colors group-hover:text-ink"
                />
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
              className="flex flex-col justify-between space-y-4 rounded-[1px] bg-paper-2 p-5 text-ink"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-rule pb-2 text-[12px] text-ink-3">
                  <span>On the back</span>
                  <span className="flex items-center gap-1">
                    <RotateCw className="h-3 w-3" />
                    Flip
                  </span>
                </div>

                <p className="pt-1 font-handwriting text-[21px] leading-snug text-ink">
                  {photo.handwrittenNote}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-rule pt-2 font-mono text-[11px] text-ink-3">
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
    <section id="photography" className="relative z-10 py-16 sm:py-24 px-4 sm:px-12 md:px-20 bg-cutting-mat select-none">
      <div className="max-w-7xl mx-auto">

        <SectionHeading
          index="06"
          label="Photography"
          title={<>Through my <Accent>lens</Accent></>}
          aside={
            <div className="flex flex-col items-start gap-4 md:items-end">
              <span className="block max-w-sm">Prints scattered on the desk. Flip one over for the note on the back — or drag them around, if you&apos;re on a computer.</span>
              <div className="inline-flex rounded-full border border-white/15 p-1 text-[13px]">
                {[
                  [true, "Scatter"],
                  [false, "Tidy up"],
                ].map(([scatter, label]) => (
                  <button
                    key={label}
                    onClick={() => setIsScatterView(scatter)}
                    className={`cursor-pointer rounded-full px-3.5 py-1 transition-colors ${
                      isScatterView === scatter ? "bg-chalk text-ink" : "text-chalk-2 hover:text-chalk"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          }
        />

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
