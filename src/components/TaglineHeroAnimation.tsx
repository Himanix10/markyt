import React from 'react';
import { motion } from 'motion/react';

// Height percentages for the 10 growth bar columns
// Low baseline -> Exponential Peak scale surge triggered in direct sync with the bottom orange runner
const BARS_DATA = [
  { id: 1, lowHeight: 12, peakHeight: 18, isAccent: false },
  { id: 2, lowHeight: 13, peakHeight: 26, isAccent: false },
  { id: 3, lowHeight: 14, peakHeight: 36, isAccent: false },
  { id: 4, lowHeight: 16, peakHeight: 46, isAccent: false },
  { id: 5, lowHeight: 18, peakHeight: 56, isAccent: false },
  { id: 6, lowHeight: 20, peakHeight: 67, isAccent: false },
  { id: 7, lowHeight: 22, peakHeight: 78, isAccent: false },
  { id: 8, lowHeight: 24, peakHeight: 87, isAccent: false },
  { id: 9, lowHeight: 26, peakHeight: 93, isAccent: false },
  { id: 10, lowHeight: 30, peakHeight: 98, isAccent: true }, // Rightmost hero column in vibrant Markyt red-orange
];

// Unified Animation Timeline (Total cycle: 7.2s)
// 0.0s - 3.6s : Orange runner sweeps left-to-right (0% -> 100%), raising each bar as it passes beneath it
// 3.6s - 6.2s : Triumph Hold (all bars stand tall, orange line at 100%, rightmost bar glowing)
// 6.2s - 6.8s : Smooth reset transition back to baseline
// 6.8s - 7.2s : Clean loop buffer
const CYCLE_DURATION = 7.2;
const SWEEP_DURATION = 3.6; // Time for line to sweep across all 10 bars
const HOLD_TIME = 6.2;
const RESET_TIME = 6.8;

export const TaglineHeroAnimation: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden select-none">
      
      {/* 1. Subtle Data-Lab Blueprint Grid Background (Smooth feathered radial blend) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
          backgroundPosition: 'center center',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, transparent 85%)',
        }}
      />

      {/* 2. Exponential Rising Growth Bar Chart Columns + Grounded Baseline Track */}
      <div className="absolute inset-x-0 bottom-0 top-10 pointer-events-none z-0 flex flex-col justify-end px-3 sm:px-6 md:px-10 lg:px-14">
        {/* Bars Container */}
        <div className="w-full flex-1 flex items-end justify-between gap-1.5 sm:gap-2.5 md:gap-3.5 opacity-90">
          {BARS_DATA.map((bar, idx) => {
            // Precise trigger moment: bar i begins rising exactly when the orange runner bar passes beneath it
            const tStart = (idx / 9) * (SWEEP_DURATION - 0.35);
            const tPeak = tStart + 0.38;

            // Normalized times in [0, 1]
            const times = [
              0,
              Math.max(0.001, tStart / CYCLE_DURATION),
              Math.min(0.998, tPeak / CYCLE_DURATION),
              HOLD_TIME / CYCLE_DURATION,
              RESET_TIME / CYCLE_DURATION,
              1.0,
            ];

            return (
              <motion.div
                key={bar.id}
                className={`flex-1 rounded-t-lg sm:rounded-t-xl ${
                  bar.isAccent
                    ? 'bg-gradient-to-t from-[#FF4518]/30 via-[#FF4518]/20 to-[#FF4518]/10 border-2 border-[#FF4518]/80 shadow-[0_-4px_24px_rgba(255,69,24,0.4)]'
                    : 'bg-gradient-to-t from-white/35 via-white/20 to-white/10 backdrop-blur-[2px] border-t border-x border-white/30'
                }`}
                style={{
                  originY: 1,
                }}
                animate={{
                  height: [
                    `${bar.lowHeight}%`,
                    `${bar.lowHeight}%`,
                    `${bar.peakHeight}%`,
                    `${bar.peakHeight}%`,
                    `${bar.lowHeight}%`,
                    `${bar.lowHeight}%`,
                  ],
                  opacity: bar.isAccent
                    ? [0.75, 0.75, 1, 1, 0.75, 0.75]
                    : [0.75, 0.75, 0.95, 0.95, 0.75, 0.75],
                }}
                transition={{
                  duration: CYCLE_DURATION,
                  repeat: Infinity,
                  times: times,
                  ease: [0.34, 1.3, 0.64, 1], // Natural energetic pop ease
                }}
              />
            );
          })}
        </div>

        {/* Baseline Track directly under the bars with the sweeping Orange Runner Bar */}
        <div className="relative h-[3px] sm:h-[3.5px] w-full rounded-full bg-slate-900/20 overflow-hidden mt-0.5">
          <motion.div
            className="h-full bg-[#FF4518] shadow-[0_0_14px_rgba(255,69,24,1)] rounded-full relative"
            animate={{
              width: ['0%', '100%', '100%', '0%', '0%'],
            }}
            transition={{
              duration: CYCLE_DURATION,
              repeat: Infinity,
              times: [
                0,
                SWEEP_DURATION / CYCLE_DURATION,
                HOLD_TIME / CYCLE_DURATION,
                RESET_TIME / CYCLE_DURATION,
                1.0,
              ],
              ease: 'linear',
            }}
          >
            {/* Glowing leading tip on the orange runner bar */}
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#FF4518] pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* 3. Concentric Radar / Sonar Pulse Rings (Centered behind the headline) */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Ring 1 (Inner) */}
          <motion.div
            className="absolute rounded-full border border-[#FF3B14]/30"
            style={{ width: '130px', height: '130px' }}
            animate={{
              scale: [0.94, 1.06, 0.94],
              opacity: [0.25, 0.5, 0.25],
            }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Ring 2 (Middle) */}
          <motion.div
            className="absolute rounded-full border border-[#FF3B14]/20"
            style={{ width: '380px', height: '380px' }}
            animate={{
              scale: [0.96, 1.04, 0.96],
              opacity: [0.18, 0.38, 0.18],
            }}
            transition={{
              duration: 4.0,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
          />

          {/* Ring 3 (Outer) */}
          <motion.div
            className="absolute rounded-full border border-[#FF3B14]/12"
            style={{ width: '720px', height: '720px' }}
            animate={{
              scale: [0.98, 1.03, 0.98],
              opacity: [0.08, 0.24, 0.08],
            }}
            transition={{
              duration: 4.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.6,
            }}
          />
        </div>
      </div>

      {/* 4. Display Headline Typography (Seamlessly merged with background via soft atmospheric diffusion) */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center font-bricolage font-extrabold tracking-[-0.03em] pt-5 pb-7 sm:pt-7 sm:pb-10">
        
        {/* Soft atmospheric gradient aura: blends the text effortlessly with the background animation */}
        <div 
          className="absolute inset-0 -inset-x-8 -inset-y-4 pointer-events-none -z-10"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(200, 206, 248, 0.65) 0%, rgba(200, 206, 248, 0.3) 55%, transparent 80%)',
          }}
        />
        
        {/* Line 1: "Test small," */}
        <div className="text-2xl min-[380px]:text-3xl sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.3rem] leading-[1.05]">
          <span className="text-[#03091F] mr-2 sm:mr-3.5">Test</span>
          <span className="text-[#FF4518]">small,</span>
        </div>

        {/* Line 2: "Learn fast" */}
        <h1 className="text-2xl min-[380px]:text-3xl sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.3rem] leading-[1.05] mt-1 sm:mt-2">
          <span className="text-[#03091F] mr-2 sm:mr-3.5">Learn</span>
          <span className="text-[#FF4518]">fast</span>
        </h1>

        {/* Line 3: "Scale what works." */}
        <div className="text-2xl min-[380px]:text-3xl sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.3rem] leading-[1.05] mt-1 sm:mt-2">
          <span className="text-[#03091F] mr-2 sm:mr-3.5">Scale what</span>
          <span className="text-[#FF4518]">works.</span>
        </div>
      </div>



    </div>
  );
};
