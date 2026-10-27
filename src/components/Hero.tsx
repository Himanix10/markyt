import React from 'react';
import { motion } from 'motion/react';
import { MDoodleMarquee } from './MDoodleMarquee';
interface HeroProps {
  onOpenQuestionnaire: () => void;
  onNavigateToCreatives?: () => void;
  onOpenMenu?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenQuestionnaire, 
  onNavigateToCreatives,
}) => {
  return (
    <section id="hero-section" className="relative overflow-hidden bg-[#B8C1FA] text-slate-900 border-b border-slate-900/10">
      
      {/* 1. Animated Artistic "M" Doodle Marquee Banner across the top (from Screenshot 1) */}
      <div className="border-b border-slate-900/15 bg-[#ACB7F6]">
        <MDoodleMarquee textColor="text-slate-950" className="py-2.5" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 md:pt-14 md:pb-20 relative z-10">
        
        {/* Giant Display Typography */}
        <div className="text-center mb-8 sm:mb-12">

          {/* Headline Display: TEST IT is massive red hero text, THEN SCALE IT. is animated highlighted tagline */}
          <div
            className="relative flex flex-col items-center justify-center font-heading font-black tracking-tighter select-none py-2 px-2 sm:px-6"
          >
            {/* Top Line: Dominant Massive Red Text with restrained scale */}
            <div className="text-[2.85rem] min-[380px]:text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[7.8rem] text-[#FF3B14] tracking-tighter leading-[0.9] drop-shadow-xs">
              TEST IT
            </div>

            {/* Bottom Line: Bold, High-Contrast Tagline in Anton Typography */}
            <motion.div
              className="relative inline-flex items-center justify-center mt-2 sm:mt-3 group cursor-default"
              animate={{
                scale: [1, 1.015, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Tagline Container */}
              <div className="relative px-3 sm:px-6 py-1">
                <span className="relative z-10 text-slate-950 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-anton uppercase leading-none tracking-wider block drop-shadow-xs">
                  THEN SCALE IT.
                </span>

                {/* Energetic Neon/Marker Highlighter Accent that expands and glows */}
                <motion.div
                  className="absolute bottom-1 sm:bottom-2 left-2 right-2 h-3 sm:h-5 md:h-6 bg-[#FF3B14]/25 rounded-md -z-0 pointer-events-none"
                  animate={{
                    opacity: [0.35, 0.75, 0.35],
                    scaleX: [0.95, 1.02, 0.95],
                  }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Dynamic Accent Underline Runner */}
              <div className="absolute -bottom-2 left-4 right-4 h-1 sm:h-1.5 rounded-full overflow-hidden bg-slate-950/20">
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-[#FF3B14] rounded-full shadow-xs"
                  animate={{
                    left: ['0%', '0%', '100%'],
                    right: ['100%', '0%', '0%'],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: [0.65, 0, 0.35, 1],
                    repeatDelay: 0.4,
                  }}
                />
              </div>
            </motion.div>
          </div>

          <p className="mt-7 text-base sm:text-xl text-slate-900 font-medium max-w-xl mx-auto leading-relaxed">
            You’ve probably burned money on marketing that didn’t deliver.
            <span className="block mt-1 font-bold text-slate-950">
              Why Invest Big Upfront? Start Testing at <span className="text-[#FF3B14]">₹5,000</span>.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
};
