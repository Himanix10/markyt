import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TaglineCardStackAnimationProps {
  className?: string;
}

export const TaglineCardStackAnimation: React.FC<TaglineCardStackAnimationProps> = ({ className = '' }) => {
  const [cycle, setCycle] = useState(0);

  // Smooth continuous auto-looping without buffering or stutter
  useEffect(() => {
    const timer = setInterval(() => {
      setCycle((prev) => prev + 1);
    }, 5400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`relative w-full max-w-[680px] mx-auto py-6 sm:py-8 select-none flex flex-col items-center justify-center ${className}`}>
      
      {/* Ambient Radial Spotlight Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255, 59, 20, 0.14) 0%, rgba(255, 140, 90, 0.06) 50%, transparent 75%)',
        }}
      />

      {/* Main Stack Container with fixed height so cards don't shift layout */}
      <div className="relative w-full h-[180px] sm:h-[210px] md:h-[230px] flex items-center justify-center overflow-visible">
        <AnimatePresence mode="wait">
          <motion.div
            key={cycle}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative w-full h-full flex items-center justify-center"
          >
            
            {/* =========================================================
                CARD 1: TEST SMALL (Enters 1st -> Tilted ~ -8.5 deg)
               ========================================================= */}
            <motion.div
              variants={{
                initial: {
                  opacity: 0,
                  y: -70,
                  scale: 0.88,
                  rotate: 0,
                },
                animate: {
                  opacity: 1,
                  y: -34,
                  scale: 1,
                  rotate: -8.5,
                  transition: {
                    type: 'spring',
                    stiffness: 220,
                    damping: 20,
                    delay: 0.05,
                  },
                },
                exit: {
                  opacity: 0,
                  scale: 0.95,
                  y: 15,
                  transition: {
                    duration: 0.35,
                    ease: 'easeInOut',
                  },
                },
              }}
              className="absolute z-10 w-[90%] sm:w-[84%] max-w-[520px] rounded-2xl sm:rounded-3xl bg-white border border-slate-900/10 shadow-[0_14px_30px_-6px_rgba(15,23,42,0.18)] py-3.5 sm:py-4.5 px-6 sm:px-10 flex items-center justify-center overflow-hidden"
            >
              {/* Subtle Top Bevel Highlight */}
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent" />

              {/* Centralized Text in Clean, Modern Plus Jakarta Sans Typography */}
              <div className="w-full text-center font-heading font-black text-2xl sm:text-3xl md:text-[30px] tracking-tight leading-none text-slate-950">
                <span>Test </span>
                <span className="text-[#FF3B14]">Small</span>
              </div>
            </motion.div>

            {/* =========================================================
                CARD 2: LEARN FAST (Enters 2nd -> Tilted ~ +6.5 deg)
               ========================================================= */}
            <motion.div
              variants={{
                initial: {
                  opacity: 0,
                  y: -80,
                  scale: 0.88,
                  rotate: 0,
                },
                animate: {
                  opacity: 1,
                  y: -4,
                  scale: 1,
                  rotate: 6.5,
                  transition: {
                    type: 'spring',
                    stiffness: 220,
                    damping: 20,
                    delay: 0.45,
                  },
                },
                exit: {
                  opacity: 0,
                  scale: 0.95,
                  y: 15,
                  transition: {
                    duration: 0.35,
                    ease: 'easeInOut',
                    delay: 0.05,
                  },
                },
              }}
              className="absolute z-20 w-[92%] sm:w-[86%] max-w-[530px] rounded-2xl sm:rounded-3xl bg-white border border-slate-900/10 shadow-[0_18px_38px_-8px_rgba(15,23,42,0.22)] py-3.5 sm:py-4.5 px-6 sm:px-10 flex items-center justify-center overflow-hidden"
            >
              {/* Subtle Top Bevel Highlight */}
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent" />

              {/* Centralized Text in Clean, Modern Plus Jakarta Sans Typography */}
              <div className="w-full text-center font-heading font-black text-2xl sm:text-3xl md:text-[30px] tracking-tight leading-none text-slate-950">
                <span>Learn </span>
                <span className="text-[#FF3B14]">Fast</span>
              </div>
            </motion.div>

            {/* =========================================================
                CARD 3: SCALE WHAT WORKS (Enters 3rd -> Tilted ~ -1.5 deg, FRONT HERO)
               ========================================================= */}
            <motion.div
              variants={{
                initial: {
                  opacity: 0,
                  y: -90,
                  scale: 0.88,
                  rotate: 0,
                },
                animate: {
                  opacity: 1,
                  y: 26,
                  scale: 1,
                  rotate: -1.5,
                  transition: {
                    type: 'spring',
                    stiffness: 220,
                    damping: 20,
                    delay: 0.85,
                  },
                },
                exit: {
                  opacity: 0,
                  scale: 0.95,
                  y: 15,
                  transition: {
                    duration: 0.35,
                    ease: 'easeInOut',
                    delay: 0.1,
                  },
                },
              }}
              className="absolute z-30 w-[94%] sm:w-[88%] max-w-[540px] rounded-2xl sm:rounded-3xl bg-white border-2 border-[#FF3B14]/25 shadow-[0_24px_50px_-10px_rgba(255,59,20,0.32),0_8px_20px_rgba(15,23,42,0.12)] py-4 sm:py-5 px-6 sm:px-10 flex items-center justify-center overflow-hidden"
            >
              {/* Subtle Top Bevel Highlight */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF3B14]/30 to-transparent" />

              {/* Centralized Text in Clean, Modern Plus Jakarta Sans Typography */}
              <div className="w-full text-center font-heading font-black text-2xl sm:text-3xl md:text-[30px] tracking-tight leading-none text-[#FF3B14]">
                Scale What Works.
              </div>
            </motion.div>

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};
