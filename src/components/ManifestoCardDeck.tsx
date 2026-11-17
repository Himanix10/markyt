import React from 'react';
import markytLogo from '../assets/images/markyt_header_logo_trimmed.png';

interface ManifestoCardDeckProps {
  className?: string;
}

export const ManifestoCardDeck: React.FC<ManifestoCardDeckProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-5xl mx-auto py-6 sm:py-8 select-none ${className}`}>
      
      {/* =========================================================
          STATIC FANNED CARD DECK LAYERS (Rock-solid, zero jitter)
          Stacked rounded squircle cards fanning out behind the main card
         ========================================================= */}
      
      {/* Background Deck Card 1: Tilted -4.5 deg */}
      <div
        className="absolute inset-x-2 sm:inset-x-4 inset-y-2 sm:inset-y-3 rounded-3xl sm:rounded-[36px] bg-white/40 border border-white/60 shadow-md pointer-events-none -rotate-[4.5deg]"
        style={{ transformOrigin: 'center center' }}
      />

      {/* Background Deck Card 2: Tilted +4.5 deg */}
      <div
        className="absolute inset-x-2 sm:inset-x-4 inset-y-2 sm:inset-y-3 rounded-3xl sm:rounded-[36px] bg-white/50 border border-white/70 shadow-md pointer-events-none rotate-[4.5deg]"
        style={{ transformOrigin: 'center center' }}
      />

      {/* Background Deck Card 3: Tilted -2.2 deg */}
      <div
        className="absolute inset-x-1 sm:inset-x-2 inset-y-1 sm:inset-y-2 rounded-3xl sm:rounded-[36px] bg-white/70 border border-white/80 shadow-lg pointer-events-none -rotate-[2.2deg]"
        style={{ transformOrigin: 'center center' }}
      />

      {/* Background Deck Card 4: Tilted +2.2 deg */}
      <div
        className="absolute inset-x-1 sm:inset-x-2 inset-y-1 sm:inset-y-2 rounded-3xl sm:rounded-[36px] bg-white/80 border border-white/90 shadow-lg pointer-events-none rotate-[2.2deg]"
        style={{ transformOrigin: 'center center' }}
      />

      {/* =========================================================
          THE MAIN FRONT MANIFESTO CARD (Static, Crisp & Crystal Clear)
         ========================================================= */}
      <div
        className="relative z-10 w-full rounded-3xl sm:rounded-[36px] bg-white border border-slate-900/10 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.16),0_4px_16px_rgba(0,0,0,0.04)] p-6 sm:p-9 md:p-12 overflow-hidden"
      >
        {/* Subtle Watermark Original Markyt Logo in Background (Full logo visible, zero cut-off) */}
        <div 
          className="absolute bottom-3 right-4 sm:bottom-5 sm:right-8 pointer-events-none select-none z-0"
          aria-hidden="true"
        >
          <img
            src={markytLogo}
            alt=""
            className="w-48 sm:w-64 md:w-84 h-auto object-contain brightness-0 opacity-[0.045] pointer-events-none"
          />
        </div>

        {/* Top Bar: Eyebrow Badge */}
        <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-xs shrink-0">
              <svg className="w-4 h-4 stroke-white stroke-[3] fill-none" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="px-3.5 py-1 rounded-full bg-slate-950 text-white text-[10.5px] sm:text-xs font-mono font-bold uppercase tracking-wider shadow-xs">
              WHAT WE STAND FOR • MANIFESTO
            </div>
          </div>
        </div>

        {/* Quotation Marks Glyph */}
        <div className="mb-3 sm:mb-4 text-[#FF3B14] relative z-10">
          <svg className="w-8 h-6 sm:w-10 sm:h-7 fill-current" viewBox="0 0 32 24">
            <path d="M0 14.4C0 6.44 4.56 1.44 12.72 0l1.92 3.6C9.84 4.8 7.44 7.68 7.2 10.32h5.76V24H0V14.4zm17.04 0c0-7.96 4.56-12.96 12.72-14.4l1.92 3.6c-4.8 1.2-7.2 4.08-7.44 6.72h5.76V24H17.04V14.4z"/>
          </svg>
        </div>

        {/* Content Grid: Manifesto Statement + Integrated Venn Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          
          {/* Left Column: Manifesto Text */}
          <div className="lg:col-span-7 xl:col-span-7 text-left">
            <p className="text-base sm:text-lg md:text-[21px] lg:text-[22px] font-urbanist font-bold text-slate-900 leading-[1.58] tracking-[-0.015em]">
              It always seemed absurd that businesses pour big money into marketing without testing it first. Agencies charge hefty commissions for unproven strategies, and by the time you find out it isn’t working, the money, time, and trust are already gone. So my team and I, with more than five years of combined experience in creative production and marketing, built Markyt: we test in the real market with a small budget, let the data decide, and scale only what has already proven itself for your business.
            </p>
          </div>

          {/* Right Column: Two-Circle Intersecting Venn Diagram */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center py-2 select-none">
            <div className="relative w-[280px] sm:w-[320px] md:w-[340px] h-[170px] sm:h-[190px] md:h-[200px] flex items-center justify-center">
              
              {/* Left Circle: Creative Production (Pastel Blue-Slate) */}
              <div 
                className="absolute left-0 w-38 h-38 sm:w-46 sm:h-46 md:w-50 md:h-50 rounded-full bg-[#8E9AAF]/35 mix-blend-multiply flex items-center justify-start pl-4 sm:pl-6 pr-14 text-left border border-slate-400/20 shadow-xs"
              >
                <span className="text-[12px] sm:text-[13px] md:text-sm font-bold text-slate-900 leading-snug">
                  Creative<br />production
                </span>
              </div>

              {/* Right Circle: Marketing (Pastel Terracotta Coral) */}
              <div 
                className="absolute right-0 w-38 h-38 sm:w-46 sm:h-46 md:w-50 md:h-50 rounded-full bg-[#FF3B14]/25 mix-blend-multiply flex items-center justify-end pr-4 sm:pr-6 pl-14 text-right border border-[#FF3B14]/20 shadow-xs"
              >
                <span className="text-[12px] sm:text-[13px] md:text-sm font-bold text-slate-950 leading-snug">
                  Marketing
                </span>
              </div>

              {/* Center Intersection: Actual Markyt Brand Logo */}
              <div className="relative z-10 flex items-center justify-center px-3 py-1.5 rounded-xl bg-white/85 backdrop-blur-xs border border-white/90 shadow-sm">
                <img
                  src={markytLogo}
                  alt="markyt"
                  className="h-5 sm:h-6 md:h-6.5 w-auto object-contain pointer-events-none select-none drop-shadow-xs"
                />
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

