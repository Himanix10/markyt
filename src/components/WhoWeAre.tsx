import React from 'react';
import { motion } from 'motion/react';
import { WhoWeAreProps } from '../types';
import { InteractiveAdSimulator } from './InteractiveAdSimulator';

export const WhoWeAre: React.FC<WhoWeAreProps> = ({
  onOpenQuestionnaire,
}) => {
  return (
    <section id="who-we-are" className="relative pt-10 pb-12 sm:pt-14 sm:pb-16 md:pt-16 md:pb-20 bg-[#F6F3EC] text-slate-900 overflow-hidden border-b border-slate-900/10 scroll-mt-[54px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Upper Manifesto Section */}
        <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950 text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-xs">
            <span>What We Stand For • Manifesto</span>
          </div>

          {/* Pinned Note on Softboard */}
          <div className="w-full relative pt-4 pb-2">
            <motion.div 
              whileHover={{ rotate: 0, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              style={{ transformOrigin: 'top center' }}
              className="relative p-6 sm:p-8 pt-8 sm:pt-10 rounded-2xl bg-gradient-to-b from-[#FFFDF7] via-[#FFFCEE] to-[#FFF9E5] border border-amber-300/70 text-amber-950 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.13),0_6px_16px_-3px_rgba(0,0,0,0.06),3px_8px_16px_rgba(0,0,0,0.04)] rotate-[-1deg] select-none transition-all group/pin text-center"
            >
              {/* Realistic 3D Red Pushpin Pinned at Top Center */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
                {/* Diagonal Shadow of the pin shaft on paper */}
                <div className="absolute top-2.5 left-2 w-3.5 h-3 rounded-full bg-black/30 blur-[2px] transform rotate-45" />

                {/* Glossy Pushpin Head with Specular Reflection */}
                <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-red-400 via-[#FF3B14] to-red-800 shadow-[0_4px_8px_rgba(0,0,0,0.38),inset_0_1.5px_1px_rgba(255,255,255,0.7),inset_0_-2px_3px_rgba(0,0,0,0.4)] flex items-center justify-center border border-red-950/20">
                  {/* Highlight glint */}
                  <span className="w-2 h-1.5 rounded-full bg-white/70 absolute top-1 left-1.5 rotate-[-35deg]" />
                  {/* Needle center pin head */}
                  <span className="w-1.5 h-1.5 rounded-full bg-red-950/40 shadow-inner" />
                </div>

                {/* Tiny Paper Puncture Hole */}
                <div className="w-2 h-1 rounded-full bg-amber-950/60 mt-[-1px] blur-[0.4px]" />
              </div>

              {/* The Quote */}
              <p className="text-lg sm:text-xl md:text-2xl font-heading font-bold leading-relaxed text-slate-950 max-w-2xl mx-auto">
                “We always found it absurd that businesses invested so heavily in marketing without properly testing it. So my team and I came together, bringing more than five years of combined experience in creative production and marketing, to build Markyt.”
              </p>

              {/* Subtle Liftoff Corner Shadow */}
              <div className="absolute -bottom-2 right-2 w-24 h-6 bg-black/10 blur-md rotate-3 pointer-events-none -z-10" />
            </motion.div>
          </div>

        </div>

        {/* Watch the Exact 60-Second Video Script in Action */}
        <div className="mt-14 sm:mt-20 pt-8 sm:pt-12 border-t border-slate-900/10 w-full">
          <InteractiveAdSimulator onOpenQuestionnaire={onOpenQuestionnaire} />
        </div>
      </div>
    </section>
  );
};
