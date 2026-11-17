import React from 'react';
import { WhoWeAreProps } from '../types';
import { InteractiveAdSimulator } from './InteractiveAdSimulator';
import markytLogo from '../assets/images/markyt_header_logo_trimmed.png';

export const WhoWeAre: React.FC<WhoWeAreProps> = ({
  onOpenQuestionnaire,
}) => {
  return (
    <>
      {/* 1. Upper Manifesto Section (Continuous #B8C1FA canvas) */}
      <section 
        id="who-we-are" 
        className="relative -mt-px pt-6 pb-8 sm:pt-10 sm:pb-14 md:pt-12 md:pb-16 bg-[#B8C1FA] text-slate-900 overflow-hidden scroll-mt-[54px]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Eyebrow Badge: Blue check circle overlapping black pill */}
          <div className="flex items-center mb-5 sm:mb-6">
            <div className="relative flex items-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-md z-10 flex-shrink-0">
                <svg className="w-5 h-5 stroke-white stroke-[3] fill-none" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="-ml-3.5 pl-6 pr-4 py-1.5 rounded-full bg-slate-950 text-white text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
                WHAT WE STAND FOR • MANIFESTO
              </div>
            </div>
          </div>

          {/* Quotation Marks Glyph */}
          <div className="mb-4 sm:mb-5">
            <svg className="w-9 h-7 sm:w-11 sm:h-8 fill-white" viewBox="0 0 32 24">
              <path d="M0 14.4C0 6.44 4.56 1.44 12.72 0l1.92 3.6C9.84 4.8 7.44 7.68 7.2 10.32h5.76V24H0V14.4zm17.04 0c0-7.96 4.56-12.96 12.72-14.4l1.92 3.6c-4.8 1.2-7.2 4.08-7.44 6.72h5.76V24H17.04V14.4z"/>
            </svg>
          </div>

          {/* Two-Column Layout: Left Manifesto Text & Right Venn Diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Manifesto Text */}
            <div className="lg:col-span-7 xl:col-span-7 text-left">
              <h2 className="text-xl sm:text-2xl md:text-[25px] lg:text-[27px] font-heading font-extrabold text-slate-950 leading-[1.42] tracking-tight">
                It always seemed absurd that businesses pour big money into marketing without testing it first. Agencies charge hefty commissions for unproven strategies, and by the time you find out it isn’t working, the money, time, and trust are already gone. So my team and I, with more than five years of combined experience in creative production and marketing, built Markyt: we test in the real market with a small budget, let the data decide, and scale only what has already proven itself for your business.
              </h2>
            </div>

            {/* Right Column: Two-Circle Intersecting Venn Diagram (Liquid Tinted Glass Aesthetic) */}
            <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center py-4 select-none">
              <div className="relative w-[300px] sm:w-[350px] md:w-[380px] h-[190px] sm:h-[220px] md:h-[230px] flex items-center justify-center">
                
                {/* 1. Subtle, Clean Ambient Glass Elevation Shadow */}
                <div 
                  className="absolute inset-x-4 bottom-1 top-6 rounded-full bg-slate-900/[0.08] blur-xl pointer-events-none z-0" 
                  aria-hidden="true" 
                />

                {/* 2. Realistic 3D Red Pushpin Pinpointed at Top Center */}
                <div className="absolute -top-3.5 sm:-top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none">
                  <svg 
                    width="36" 
                    height="46" 
                    viewBox="0 0 36 46" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="overflow-visible filter drop-shadow-[0_4px_8px_rgba(15,23,42,0.25)]"
                  >
                    <defs>
                      <radialGradient id="pinHeadGlow" cx="35%" cy="30%" r="65%">
                        <stop offset="0%" stopColor="#FFA18E" />
                        <stop offset="35%" stopColor="#FF3B14" />
                        <stop offset="70%" stopColor="#C42000" />
                        <stop offset="100%" stopColor="#660D00" />
                      </radialGradient>
                      <linearGradient id="pinStemGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#801000" />
                        <stop offset="25%" stopColor="#FF4A22" />
                        <stop offset="55%" stopColor="#FFA18E" />
                        <stop offset="75%" stopColor="#D92804" />
                        <stop offset="100%" stopColor="#5E0C00" />
                      </linearGradient>
                      <linearGradient id="steelNeedle" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="40%" stopColor="#CBD5E1" />
                        <stop offset="80%" stopColor="#64748B" />
                        <stop offset="100%" stopColor="#334155" />
                      </linearGradient>
                    </defs>

                    {/* Ground cast shadow of the pin body */}
                    <ellipse cx="24" cy="38" rx="8" ry="3.5" fill="rgba(15,23,42,0.32)" transform="rotate(-15 24 38)" className="blur-[1.5px]" />

                    {/* Centered polished steel needle entering the glass crease */}
                    <path d="M17.2 26L18 38L18.8 38L18 26Z" fill="url(#steelNeedle)" />
                    <ellipse cx="18" cy="38" rx="1.8" ry="0.9" fill="#0F172A" opacity="0.7" />

                    {/* Pin Base Flange */}
                    <ellipse cx="18" cy="27.5" rx="7" ry="3" fill="#660D00" />
                    <ellipse cx="18" cy="26.8" rx="6.5" ry="2.7" fill="url(#pinHeadGlow)" stroke="#4A0800" strokeWidth="0.5" />
                    <ellipse cx="18" cy="26.2" rx="5.5" ry="2" fill="#FF785C" opacity="0.75" />

                    {/* Pin Hourglass Stem */}
                    <path d="M14 11C14 17 15.5 21.5 15.5 25.5H20.5C20.5 21.5 22 17 22 11H14Z" fill="url(#pinStemGrad)" />
                    <line x1="17" y1="13" x2="17" y2="24" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.65" />

                    {/* Pin Head Collar */}
                    <ellipse cx="18" cy="11.5" rx="8" ry="3.5" fill="#660D00" />
                    <ellipse cx="18" cy="10.8" rx="7.5" ry="3.2" fill="url(#pinHeadGlow)" stroke="#4A0800" strokeWidth="0.5" />

                    {/* Pin Dome Cap */}
                    <path d="M10.5 10.5C10.5 5 13.8 1.5 18 1.5C22.2 1.5 25.5 5 25.5 10.5H10.5Z" fill="url(#pinHeadGlow)" />
                    
                    {/* Specular Highlight Glints */}
                    <ellipse cx="15.5" cy="5" rx="3.5" ry="1.8" transform="rotate(-25 15.5 5)" fill="#FFFFFF" opacity="0.85" />
                    <path d="M12.5 9.5C12.5 6 14.5 3 18 2.6" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                  </svg>
                </div>

                {/* 3. The Two Overlapping Liquid Tinted Glass Lenses */}
                <div className="relative w-full h-full flex items-center justify-center z-10">
                  
                  {/* Left Lens: Creative Production (Liquid Slate-Icy Tinted Glass) */}
                  <div className="absolute left-0 w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-full backdrop-blur-xl backdrop-saturate-150 bg-gradient-to-br from-[#8E9AAF]/40 via-[#7D8B9D]/30 to-[#6C7A8C]/25 mix-blend-multiply border border-white/80 shadow-[inset_0_2px_3px_rgba(255,255,255,0.85),inset_0_-2px_4px_rgba(0,0,0,0.08),0_8px_24px_-4px_rgba(15,23,42,0.12)] flex items-center justify-start pl-5 sm:pl-7 pr-16 text-left overflow-hidden">
                    {/* Glossy liquid glass specular crescent highlight */}
                    <div 
                      className="absolute inset-x-2 top-1.5 h-1/2 rounded-t-full bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none" 
                      aria-hidden="true" 
                    />
                    <span className="relative z-10 text-[12px] sm:text-[13px] md:text-sm font-heading font-black text-slate-950 leading-snug">
                      Creative<br />production
                    </span>
                  </div>

                  {/* Right Lens: Marketing (Liquid Coral-Peach Tinted Glass) */}
                  <div className="absolute right-0 w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-full backdrop-blur-xl backdrop-saturate-150 bg-gradient-to-br from-[#FF5A36]/40 via-[#E4441F]/32 to-[#C25E47]/28 mix-blend-multiply border border-white/80 shadow-[inset_0_2px_3px_rgba(255,255,255,0.85),inset_0_-2px_4px_rgba(0,0,0,0.08),0_8px_24px_-4px_rgba(15,23,42,0.12)] flex items-center justify-end pr-5 sm:pr-7 pl-16 text-right overflow-hidden">
                    {/* Glossy liquid glass specular crescent highlight */}
                    <div 
                      className="absolute inset-x-2 top-1.5 h-1/2 rounded-t-full bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none" 
                      aria-hidden="true" 
                    />
                    <span className="relative z-10 text-[12px] sm:text-[13px] md:text-sm font-heading font-black text-slate-950 leading-snug">
                      Marketing
                    </span>
                  </div>

                  {/* Center Intersection: Crisp Markyt Brand Logo */}
                  <div className="relative z-20 flex items-center justify-center filter drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.18)]">
                    <img
                      src={markytLogo}
                      alt="markyt"
                      className="h-6 sm:h-7 md:h-8 w-auto object-contain pointer-events-none select-none"
                    />
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Know About Us Section (Warm cream canvas #F6F3EC matching design reference) */}
      <section 
        id="know-about-us" 
        className="relative pt-6 pb-8 sm:pt-12 sm:pb-16 md:pt-16 md:pb-20 bg-[#F6F3EC] text-slate-900 overflow-hidden border-b border-slate-900/10 scroll-mt-[54px]"
      >
        <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <InteractiveAdSimulator onOpenQuestionnaire={onOpenQuestionnaire} />
        </div>
      </section>
    </>
  );
};
