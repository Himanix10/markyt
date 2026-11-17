import React from 'react';
import { MDoodleMarquee } from './MDoodleMarquee';
import { TaglineHeroAnimation } from './TaglineHeroAnimation';

interface HeroProps {
  onOpenQuestionnaire?: () => void;
  onNavigateToCreatives?: () => void;
  onOpenMenu?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section 
      id="hero-section" 
      className="relative overflow-hidden bg-gradient-to-b from-[#D6D5F5] via-[#C8CEF8] to-[#B8C1FA] text-slate-900 select-none cursor-default"
    >
      {/* 1. Animated Artistic "M" Doodle Marquee Banner across the top */}
      <div className="bg-[#ACB7F6]">
        <MDoodleMarquee textColor="text-slate-950" className="py-2 sm:py-2.5" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-6 sm:pt-8 sm:pb-9 md:pt-10 md:pb-11 relative z-10 flex flex-col items-center justify-center text-center">
        
        {/* Subtle Ambient Viewfinder Corner Crop Marks */}
        {/* Top-Left */}
        <div className="absolute top-2 left-4 sm:left-6 w-5 h-5 border-t-2 border-l-2 border-slate-400/20 pointer-events-none" />
        {/* Top-Right */}
        <div className="absolute top-2 right-4 sm:right-6 w-5 h-5 border-t-2 border-r-2 border-slate-400/20 pointer-events-none" />
        {/* Bottom-Left */}
        <div className="absolute bottom-2 left-4 sm:left-6 w-5 h-5 border-b-2 border-l-2 border-slate-400/20 pointer-events-none" />
        {/* Bottom-Right */}
        <div className="absolute bottom-2 right-4 sm:right-6 w-5 h-5 border-b-2 border-r-2 border-slate-400/20 pointer-events-none" />

        {/* 2. Tagline Hero Animation: Exponential Growth Bars, Radar Pulse, and Animated Sprint Progress Track */}
        <TaglineHeroAnimation />

        {/* Subtitle / Value Proposition: Crisp Geometric Sans (Plus Jakarta Sans) */}
        <p className="mt-4 sm:mt-6 max-w-xl mx-auto leading-relaxed select-none">
          <span className="block text-slate-700 text-sm sm:text-base md:text-[17px] font-heading font-medium tracking-tight">
            You’ve probably burned money on marketing that didn’t deliver.
          </span>
          <span className="block mt-1 sm:mt-1.5 text-[#111111] text-sm sm:text-base md:text-[17px] font-heading font-bold tracking-tight">
            Why Invest Big Upfront? Start Testing <span className="text-[#FF4518]">Today</span>.
          </span>
        </p>
      </div>
    </section>
  );
};
