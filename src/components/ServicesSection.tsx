import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Film, 
  TrendingUp, 
  Zap, 
  Sparkles,
  BarChart2, 
  ShieldCheck,
  Users,
  Wand2,
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface ServicesSectionProps {
  onNavigateToCreatives?: () => void;
  onOpenQuestionnaire?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onNavigateToCreatives,
  onOpenQuestionnaire,
}) => {
  // Flip state between Side A (Studio Video Ads) and Side B (Affordable Ad Creatives)
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Auto-rotates on its own every 4.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 4800);
    return () => clearInterval(timer);
  }, []);

  // Flips as soon as the user puts the cursor on the card
  const handleMouseEnter = () => {
    setIsFlipped((prev) => !prev);
  };

  // Flips immediately on click
  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <section 
      id="services" 
      className="py-12 sm:py-16 md:py-24 bg-white text-slate-900 relative overflow-hidden border-t border-slate-900/10 scroll-mt-[54px]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================
            SECTION HEADING: Restrained, Editorial & Mobile-Flawless
           ======================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-14 px-2">


          {/* Main Statement with deliberate responsive line breaks */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-heading font-extrabold tracking-tight text-slate-950 leading-[1.2]">
            <span className="block sm:inline">Creative That Captures. </span>
            <span className="font-editorial-italic font-normal italic text-[#FF3B14] block sm:inline">
              Marketing That Converts.
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-[15px] text-slate-600 leading-relaxed font-normal max-w-lg mx-auto">
            From studio-quality video production to performance-driven advertising, we bring your entire growth journey under one roof.
          </p>
        </div>

        {/* ========================================================
            TWO SIDE-BY-SIDE SERVICE CARDS
           ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 max-w-3xl lg:max-w-4xl mx-auto items-stretch">
          
          {/* ========================================================
              CARD 1: IN-HOUSE STUDIO (Auto-Rotating + Click-to-Flip)
             ======================================================== */}
          <div 
            className="relative w-full min-h-[380px] sm:min-h-[410px] select-none [perspective:1400px] group cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick();
              }
            }}
            aria-label="In-House Studio and Marketing Creatives"
          >
            {/* 3D Rotating Wrapper */}
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative w-full h-full"
            >
              
              {/* ====================================================
                  SIDE A: STUDIO-LEVEL VIDEO ADS
                 ==================================================== */}
              <div 
                style={{ 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
                className="w-full h-full rounded-[28px] sm:rounded-[32px] bg-white border border-stone-200/80 p-5 sm:p-7 lg:p-8 shadow-[0_12px_36px_-12px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.02)] group-hover:shadow-[0_22px_48px_-12px_rgba(255,59,20,0.18)] group-hover:border-[#FF3B14]/30 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Soft Peach/Orange Ambient Corner Halo */}
                <div 
                  className="absolute -top-14 -right-14 w-52 h-52 rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255, 94, 20, 0.14) 0%, rgba(255, 160, 100, 0.06) 45%, transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                />

                {/* Top Block */}
                <div className="relative z-10 flex flex-col">
                  {/* Top Row: Pill Badge + Dual-Paging Indicator + Squircle Icon */}
                  <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F2EC] text-slate-800 border border-slate-900/[0.07] text-[10px] sm:text-[10.5px] font-mono font-semibold uppercase tracking-[0.12em] shadow-2xs shrink-0">
                      <span>01 · IN-HOUSE STUDIO</span>
                    </span>

                    {/* Sleek Dual-State Pill Indicator */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/[0.03] border border-slate-900/[0.06] text-[10px] font-mono font-medium text-slate-600">
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-500">OPTION 1</span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-800 transition-all" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 transition-all" />
                      </span>
                    </div>

                    {/* Radiant Squircle Icon */}
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[16px] sm:rounded-[18px] bg-gradient-to-br from-[#FF6B26] via-[#FF4514] to-[#E63300] text-white flex items-center justify-center shadow-[0_8px_20px_-3px_rgba(255,59,20,0.36)] ring-2 ring-white/90 group-hover:scale-105 group-hover:rotate-2 transition-all duration-300 shrink-0">
                      <Film className="w-5 h-5 text-white" strokeWidth={2.2} />
                    </div>
                  </div>

                  {/* Heading */}
                  <h3 className="text-[21px] sm:text-2xl md:text-[26px] font-heading font-extrabold text-slate-950 tracking-tight leading-snug">
                    <span>In-House </span>
                    <span className="font-editorial-italic italic font-normal text-[#FF3B14] ml-0.5">Video Ads</span>
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-[13px] sm:text-[13.5px] font-normal leading-relaxed mt-2 sm:mt-2.5">
                    We script, film, and edit high-retention vertical ads with in-house presenters and studio editing. Professional video creatives at a fraction of traditional ₹50,000+ shoot setups.
                  </p>

                  {/* 2 Symmetrical Feature Chips */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5 my-4 sm:my-5">
                    <div className="px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-[#F8F7F3] border border-stone-200/70 flex items-center gap-1.5 sm:gap-2 min-w-0">
                      <Users className="w-3.5 h-3.5 text-[#FF3B14] shrink-0" strokeWidth={2.4} />
                      <span className="text-[10.5px] sm:text-xs font-heading font-bold text-slate-800 truncate">In-House Influencers</span>
                    </div>
                    <div className="px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-[#F8F7F3] border border-stone-200/70 flex items-center gap-1.5 sm:gap-2 min-w-0">
                      <Wand2 className="w-3.5 h-3.5 text-amber-500 shrink-0" strokeWidth={2.4} />
                      <span className="text-[10.5px] sm:text-xs font-heading font-bold text-slate-800 truncate">Studio-Level Editing</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 pt-3.5 sm:pt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] sm:text-xs font-mono mt-auto flex-nowrap">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onNavigateToCreatives) onNavigateToCreatives();
                    }}
                    className="text-slate-800 font-medium flex items-center gap-1.5 text-[11px] sm:text-xs font-mono shrink-0 hover:text-[#FF3B14] transition-colors cursor-pointer group/link"
                  >
                    <span>Creative Production</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                  </button>
                </div>
              </div>

              {/* ====================================================
                  SIDE B: AFFORDABLE AD CREATIVES (ROTATES AUTOMATICALLY & ON CLICK)
                 ==================================================== */}
              <div 
                style={{ 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
                className="absolute inset-0 w-full h-full rounded-[28px] sm:rounded-[32px] bg-white border border-stone-200/80 p-5 sm:p-7 lg:p-8 shadow-[0_12px_36px_-12px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.02)] group-hover:shadow-[0_22px_48px_-12px_rgba(255,90,20,0.18)] group-hover:border-amber-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Soft Amber Ambient Corner Halo */}
                <div 
                  className="absolute -top-14 -right-14 w-52 h-52 rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.15) 0%, rgba(255, 120, 60, 0.06) 45%, transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                />

                {/* Top Block */}
                <div className="relative z-10 flex flex-col">
                  {/* Top Row: Pill Badge + Dual-Paging Indicator + Squircle Icon */}
                  <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F2EC] text-slate-800 border border-slate-900/[0.07] text-[10px] sm:text-[10.5px] font-mono font-semibold uppercase tracking-[0.12em] shadow-2xs shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>01 · IN-HOUSE STUDIO</span>
                    </span>

                    {/* Sleek Dual-State Pill Indicator */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/[0.03] border border-slate-900/[0.06] text-[10px] font-mono font-medium text-slate-600">
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-500">OPTION 2</span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 transition-all" />
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 transition-all" />
                      </span>
                    </div>

                    {/* Radiant Squircle Icon */}
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[16px] sm:rounded-[18px] bg-gradient-to-br from-amber-500 via-orange-500 to-[#FF4514] text-white flex items-center justify-center shadow-[0_8px_20px_-3px_rgba(245,158,11,0.36)] ring-2 ring-white/90 group-hover:scale-105 group-hover:rotate-2 transition-all duration-300 shrink-0">
                      <Layers className="w-5 h-5 text-white" strokeWidth={2.2} />
                    </div>
                  </div>

                  {/* Heading */}
                  <h3 className="text-[21px] sm:text-2xl md:text-[26px] font-heading font-extrabold text-slate-950 tracking-tight leading-snug">
                    <span>Affordable </span>
                    <span className="font-editorial-italic italic font-normal text-amber-600 ml-0.5">Ad Creatives</span>
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-[13px] sm:text-[13.5px] font-normal leading-relaxed mt-2 sm:mt-2.5">
                    Already running your marketing with us? We create cost-effective ad creatives for your campaigns, helping you test different hooks and messages without spending heavily on production.
                  </p>

                  {/* 2 Symmetrical Feature Chips */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5 my-4 sm:my-5">
                    <div className="px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-[#F8F7F3] border border-stone-200/70 flex items-center gap-1.5 sm:gap-2 min-w-0">
                      <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" strokeWidth={2.4} />
                      <span className="text-[10.5px] sm:text-xs font-heading font-bold text-slate-800 truncate">Campaign-Ready</span>
                    </div>
                    <div className="px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-[#F8F7F3] border border-stone-200/70 flex items-center gap-1.5 sm:gap-2 min-w-0">
                      <Sparkles className="w-3.5 h-3.5 text-[#FF3B14] shrink-0" strokeWidth={2.4} />
                      <span className="text-[10.5px] sm:text-xs font-heading font-bold text-slate-800 truncate">Multiple Variations</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 pt-3.5 sm:pt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] sm:text-xs font-mono mt-auto flex-nowrap">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onNavigateToCreatives) onNavigateToCreatives();
                    }}
                    className="text-slate-800 font-medium flex items-center gap-1.5 text-[11px] sm:text-xs font-mono shrink-0 hover:text-amber-600 transition-colors cursor-pointer group/link"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-500 shadow-xs shrink-0" />
                    <span>Creative Production</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                  </button>
                </div>
              </div>

            </motion.div>
          </div>

          {/* ========================================================
              CARD 2: GROWTH MARKETING
             ======================================================== */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full min-h-[380px] sm:min-h-[410px] rounded-[28px] sm:rounded-[32px] bg-white border border-stone-200/80 p-5 sm:p-7 lg:p-8 shadow-[0_12px_36px_-12px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.02)] hover:shadow-[0_22px_48px_-12px_rgba(0,180,140,0.18)] hover:border-[#00A887]/30 transition-all duration-300 group flex flex-col justify-between overflow-hidden cursor-default select-none"
          >
            {/* Soft Mint/Cyan Ambient Corner Halo */}
            <div 
              className="absolute -top-14 -right-14 w-52 h-52 rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-110"
              style={{
                background: 'radial-gradient(circle at center, rgba(0, 195, 155, 0.14) 0%, rgba(0, 230, 190, 0.06) 45%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />

            {/* Top Block: Badges, Header & Copy */}
            <div className="relative z-10 flex flex-col">
              
              {/* Top Row: Pill Badge + Radiant Teal Squircle Icon */}
              <div className="flex items-center justify-between gap-3 mb-3.5 sm:mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F2EC] text-slate-800 border border-slate-900/[0.07] text-[10px] sm:text-[10.5px] font-mono font-semibold uppercase tracking-[0.12em] shadow-2xs shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A887]" />
                  <span>02 · GROWTH MARKETING</span>
                </span>

                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[16px] sm:rounded-[18px] bg-gradient-to-br from-[#00D0A5] via-[#00B48C] to-[#009170] text-white flex items-center justify-center shadow-[0_8px_20px_-3px_rgba(0,168,135,0.36)] ring-2 ring-white/90 group-hover:scale-105 group-hover:rotate-2 transition-all duration-300 shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.2} />
                </div>
              </div>

              {/* Card Heading */}
              <h3 className="text-[21px] sm:text-2xl md:text-[26px] font-heading font-extrabold text-slate-950 tracking-tight leading-snug">
                <span>Growth </span>
                <span className="font-editorial-italic italic font-normal text-[#00A887] ml-0.5">Marketing</span>
              </h3>

              {/* Description Paragraph */}
              <p className="text-slate-600 text-[13px] sm:text-[13.5px] font-normal leading-relaxed mt-2 sm:mt-2.5">
                We run targeted Meta and Google Ads campaigns to help your business reach the right audience and generate leads. Your campaigns are monitored daily and optimized based on performance.
              </p>

              {/* Symmetrical 2-Column Feature Chips */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5 my-4 sm:my-5">
                <div className="px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-[#F8F7F3] border border-stone-200/70 flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <BarChart2 className="w-3.5 h-3.5 text-[#00A887] shrink-0" strokeWidth={2.4} />
                  <span className="text-[10.5px] sm:text-xs font-heading font-bold text-slate-800 truncate">Daily Monitoring</span>
                </div>
                <div className="px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-[#F8F7F3] border border-stone-200/70 flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00A887] shrink-0" strokeWidth={2.4} />
                  <span className="text-[10.5px] sm:text-xs font-heading font-bold text-slate-800 truncate">No Long-Term Lock-In</span>
                </div>
              </div>
            </div>

            {/* Card Footer: Aligned Hairline Divider & Details (Single-Line Mobile Safe) */}
            <div className="relative z-10 pt-3.5 sm:pt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] sm:text-xs font-mono mt-auto flex-nowrap">
              <span className="text-slate-800 font-medium flex items-center gap-2 text-[11px] sm:text-xs font-mono shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#00A887] animate-pulse shrink-0" />
                <span>Meta & Google Ads</span>
              </span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
