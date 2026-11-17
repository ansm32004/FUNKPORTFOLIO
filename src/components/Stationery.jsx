/* Shared paper/stationery primitives used across the homepage. */

// A real pushpin seen from above: domed head, specular highlight, soft cast shadow.
export function Pin({ color = "var(--color-pin)", className = "" }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-30 block h-4 w-4 ${className}`}
    >
      <span className="absolute left-[5px] top-[7px] h-4 w-4 rounded-full bg-black/35 blur-[3px]" />
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 30%, rgb(255 255 255 / 0.7) 0 2px, transparent 3px), radial-gradient(circle at 50% 55%, ${color}, color-mix(in oklab, ${color} 70%, black))`,
          boxShadow: "inset 0 -1px 2px rgb(0 0 0 / 0.3)",
        }}
      />
    </span>
  );
}

// A strip of masking tape.
export function Tape({ className = "", rotate = -3, width = 88 }) {
  return (
    <span
      aria-hidden
      className={`tape pointer-events-none absolute z-30 block h-6 ${className}`}
      style={{ width, transform: `rotate(${rotate}deg)` }}
    />
  );
}

// Consistent section heading on the cutting mat.
export function SectionHeading({ index, label, title, aside, className = "" }) {
  return (
    <div
      className={`mb-10 grid grid-cols-1 gap-5 border-b border-white/10 pb-6 sm:mb-14 sm:gap-6 sm:pb-8 md:grid-cols-12 md:items-end ${className}`}
    >
      <div className="md:col-span-7">
        <p className="flex items-center gap-3 text-[13px] text-chalk-2">
          <span className="tabular-nums text-chalk">{index}</span>
          <span className="h-px w-6 bg-white/25" />
          <span>{label}</span>
        </p>
        <h2 className="mt-3 text-[40px] leading-[1.05] font-medium sm:mt-4 tracking-[-0.03em] text-chalk sm:text-[56px] sm:leading-[1.02]">
          {title}
        </h2>
      </div>
      {aside && (
        <div className="text-[15px] leading-relaxed text-chalk-2 md:col-span-5 md:justify-self-end md:text-right">
          {aside}
        </div>
      )}
    </div>
  );
}

// Serif italic accent used inside headings.
export function Accent({ children, className = "" }) {
  return (
    <em className={`whitespace-nowrap font-serif font-normal italic tracking-[-0.01em] ${className}`}>
      {children}
    </em>
  );
}
