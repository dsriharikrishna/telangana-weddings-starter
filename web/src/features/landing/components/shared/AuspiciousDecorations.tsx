import React from "react";

export function AuspiciousToran({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden flex justify-center select-none pointer-events-none py-1 ${className}`}>
      <svg
        viewBox="0 0 1200 48"
        className="w-full max-w-5xl h-10 text-[#C5A46D] opacity-90 drop-shadow-sm"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 4 C150 4 200 32 300 32 C400 32 450 4 600 4 C750 4 800 32 900 32 C1000 32 1050 4 1200 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 2"
        />
        {/* Mango leaves & Marigold drops */}
        {[100, 250, 400, 550, 700, 850, 1000, 1150].map((x, i) => (
          <g key={i} transform={`translate(${x - 15}, 8)`}>
            {/* Mango Leaf */}
            <path
              d="M15 0 C22 10 26 22 15 32 C4 22 8 10 15 0 Z"
              fill="#047857"
              opacity="0.85"
            />
            {/* Center leaf vein */}
            <line x1="15" y1="2" x2="15" y2="28" stroke="#10B981" strokeWidth="0.8" />
            {/* Marigold bloom below */}
            <circle cx="15" cy="34" r="5" fill="#D9894C" />
            <circle cx="15" cy="34" r="3" fill="#F59E0B" />
          </g>
        ))}
      </svg>
    </div>
  );
}

export function ZariBorderFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative p-1 rounded-2xl bg-gradient-to-br from-[#DFCA9B] via-[#C5A46D] to-[#9E7D46] shadow-2xl ${className}`}>
      {/* Outer subtle highlight line */}
      <div className="relative rounded-[14px] bg-[#542034] p-5 sm:p-8 md:p-10 border border-[#C5A46D]/40 text-[#FAF7F2]">
        {/* Ornamental Four Corners */}
        <div className="absolute top-2 left-2 w-8 h-8 pointer-events-none">
          <svg viewBox="0 0 40 40" className="w-full h-full text-[#C5A46D]">
            <path d="M4 24 V4 H24" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
            <path d="M4 14 C10 14 14 10 14 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="absolute top-2 right-2 w-8 h-8 pointer-events-none rotate-90">
          <svg viewBox="0 0 40 40" className="w-full h-full text-[#C5A46D]">
            <path d="M4 24 V4 H24" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
            <path d="M4 14 C10 14 14 10 14 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="absolute bottom-2 left-2 w-8 h-8 pointer-events-none -rotate-90">
          <svg viewBox="0 0 40 40" className="w-full h-full text-[#C5A46D]">
            <path d="M4 24 V4 H24" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
            <path d="M4 14 C10 14 14 10 14 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="absolute bottom-2 right-2 w-8 h-8 pointer-events-none rotate-180">
          <svg viewBox="0 0 40 40" className="w-full h-full text-[#C5A46D]">
            <path d="M4 24 V4 H24" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
            <path d="M4 14 C10 14 14 10 14 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Content wrapper with inner double border */}
        <div className="relative border border-[#C5A46D]/25 rounded-lg p-3 sm:p-5">
          {children}
        </div>
      </div>
    </div>
  );
}

export function BrassDeepamGlow({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Warm flame pulse glow */}
      <div className="absolute -top-4 w-12 h-12 bg-amber-400/30 rounded-full blur-md animate-pulse pointer-events-none" />
      <svg
        viewBox="0 0 64 64"
        className="w-12 h-12 text-[#C5A46D] drop-shadow-md"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Flame */}
        <path
          d="M32 6 C35 14 40 20 32 30 C24 20 29 14 32 6 Z"
          fill="#F59E0B"
        />
        <path
          d="M32 12 C33.5 16 36 19 32 26 C28 19 30.5 16 32 12 Z"
          fill="#FEF08A"
        />
        {/* Deepam Bowl */}
        <path
          d="M16 32 C16 42 48 42 48 32 C50 30 14 30 16 32 Z"
          fill="#C5A46D"
        />
        {/* Stand / Pedestal */}
        <path
          d="M28 38 L26 52 L20 56 L44 56 L38 52 L36 38 Z"
          fill="#A16207"
        />
        <ellipse cx="32" cy="56" rx="14" ry="3" fill="#C5A46D" />
      </svg>
    </div>
  );
}

