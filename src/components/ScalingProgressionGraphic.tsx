import React from 'react';
import { motion } from 'motion/react';

export const ScalingProgressionGraphic: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-[880px] mx-auto select-none overflow-hidden ${className}`}>
      {/* Ambient Radial Spotlight Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 55% at 65% 58%, rgba(255, 90, 45, 0.18) 0%, rgba(255, 140, 90, 0.08) 45%, transparent 75%)',
        }}
      />

      {/* SVG Canvas for 100% Crisp, Retina Vector Rendering at Any Screen Size */}
      <svg
        viewBox="0 0 900 270"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block drop-shadow-[0_12px_28px_rgba(15,23,42,0.08)]"
      >
        <defs>
          {/* Card Gradient Tones (Warm Sunset Coral to Intense Brand Red-Orange) */}
          <linearGradient id="cardGradDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF774F" />
            <stop offset="55%" stopColor="#FF491E" />
            <stop offset="100%" stopColor="#D92C04" />
          </linearGradient>

          <linearGradient id="cardGradMid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF8661" />
            <stop offset="60%" stopColor="#FF572D" />
            <stop offset="100%" stopColor="#E5370A" />
          </linearGradient>

          <linearGradient id="cardGradLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFA487" />
            <stop offset="100%" stopColor="#FF6840" />
          </linearGradient>

          <linearGradient id="winnerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF724B" />
            <stop offset="100%" stopColor="#FF380E" />
          </linearGradient>

          {/* Baseline Glow Gradient */}
          <linearGradient id="baselineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="8%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="92%" stopColor="rgba(255,255,255,0.65)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Subtle Card Top Highlight */}
          <linearGradient id="bevelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Line Chart Glow Filters */}
          <filter id="glowLine" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glowPeak" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Drop Shadow for Main Scale Cards */}
          <filter id="shadowLargeCard" x="-15%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor="#B82200" floodOpacity="0.32" />
          </filter>
          <filter id="shadowMidCard" x="-15%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#B82200" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* -------------------------------------------------------------
            BACKGROUND ATMOSPHERE: Ambient Stars / Diamond Sparkles
           ------------------------------------------------------------- */}
        <g opacity="0.8">
          {/* Sparkle 1 */}
          <motion.path
            d="M 505 52 Q 505 60 513 60 Q 505 60 505 68 Q 505 60 497 60 Q 505 60 505 52 Z"
            fill="white"
            animate={{ opacity: [0.35, 0.95, 0.35], scale: [0.85, 1.25, 0.85] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '505px 60px' }}
          />

          {/* Sparkle 2 */}
          <motion.path
            d="M 728 70 Q 728 79 737 79 Q 728 79 728 88 Q 728 79 719 79 Q 728 79 728 70 Z"
            fill="white"
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.3, 0.9] }}
            transition={{ duration: 2.7, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            style={{ transformOrigin: '728px 79px' }}
          />

          {/* Sparkle 3 */}
          <motion.path
            d="M 680 32 Q 680 38 686 38 Q 680 38 680 44 Q 680 38 674 38 Q 680 38 680 32 Z"
            fill="white"
            animate={{ opacity: [0.3, 0.85, 0.3], scale: [0.8, 1.15, 0.8] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
            style={{ transformOrigin: '680px 38px' }}
          />

          {/* Sparkle 4 (Small dot) */}
          <circle cx="750" cy="112" r="2" fill="white" opacity="0.6" />
          <circle cx="470" cy="80" r="1.75" fill="white" opacity="0.5" />
        </g>

        {/* -------------------------------------------------------------
            THE BASELINE (Horizontal ground track)
           ------------------------------------------------------------- */}
        <line
          x1="60"
          y1="228"
          x2="840"
          y2="228"
          stroke="url(#baselineGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* -------------------------------------------------------------
            STAGE 1: FAILED MICRO-TESTS (X Cards - Low-cost failures)
           ------------------------------------------------------------- */}
        {/* Test Card 1 */}
        <g transform="translate(100, 212)">
          <rect
            width="20"
            height="20"
            rx="5"
            fill="rgba(255, 255, 255, 0.65)"
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="1.2"
          />
          <path
            d="M 6 6 L 14 14 M 14 6 L 6 14"
            stroke="#94A3B8"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>

        {/* Test Card 2 */}
        <g transform="translate(128, 212)">
          <rect
            width="20"
            height="20"
            rx="5"
            fill="rgba(255, 255, 255, 0.65)"
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="1.2"
          />
          <path
            d="M 6 6 L 14 14 M 14 6 L 6 14"
            stroke="#94A3B8"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>

        {/* Test Card 3 */}
        <g transform="translate(156, 212)">
          <rect
            width="20"
            height="20"
            rx="5"
            fill="rgba(255, 255, 255, 0.65)"
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="1.2"
          />
          <path
            d="M 6 6 L 14 14 M 14 6 L 6 14"
            stroke="#94A3B8"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>

        {/* Test Card 4 */}
        <g transform="translate(184, 212)">
          <rect
            width="20"
            height="20"
            rx="5"
            fill="rgba(255, 255, 255, 0.65)"
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="1.2"
          />
          <path
            d="M 6 6 L 14 14 M 14 6 L 6 14"
            stroke="#94A3B8"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>

        {/* -------------------------------------------------------------
            STAGE 2: THE WINNING TEST (Checkmark Card - The Breakout Ad)
           ------------------------------------------------------------- */}
        <g transform="translate(216, 206)">
          {/* Subtle Ambient Pulse Ring around Winner */}
          <motion.rect
            x="-3"
            y="-3"
            width="32"
            height="32"
            rx="9"
            fill="none"
            stroke="#FF3B14"
            animate={{
              opacity: [0.7, 0, 0.7],
              scale: [1, 1.18, 1],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '13px 13px' }}
          />

          {/* Winner Card Body */}
          <motion.rect
            width="26"
            height="26"
            rx="6.5"
            fill="url(#winnerGrad)"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="1.2"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '13px 13px' }}
          />

          {/* Bold White Checkmark */}
          <path
            d="M 7.5 13.5 L 11 17 L 18.5 9.5"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* -------------------------------------------------------------
            STAGE 3: THE EXPONENTIAL SCALING PROGRESSION (Pillars 1 to 6)
           ------------------------------------------------------------- */}

        {/* Pillar 1: Initial Tiny Scale Block */}
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect
            x="256"
            y="198"
            width="24"
            height="30"
            rx="6"
            fill="url(#cardGradLight)"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1"
          />
          {/* Top highlight bar */}
          <rect x="256" y="198" width="24" height="10" rx="6" fill="rgba(255, 255, 255, 0.22)" />
        </motion.g>

        {/* Pillar 2: Validation Stage Block */}
        <motion.g
          animate={{ y: [0, -2.5, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        >
          <rect
            x="292"
            y="180"
            width="34"
            height="48"
            rx="8"
            fill="url(#cardGradLight)"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="1"
          />
          {/* Internal Stacked Tone Layer */}
          <rect x="292" y="180" width="34" height="18" rx="8" fill="rgba(255, 255, 255, 0.22)" />
        </motion.g>

        {/* Pillar 3: Confidence Block with 3 Vertical Mini Bars */}
        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        >
          <rect
            x="338"
            y="154"
            width="48"
            height="74"
            rx="12"
            fill="url(#cardGradMid)"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="1.2"
          />
          {/* Soft inner bevel */}
          <rect x="339" y="155" width="46" height="14" rx="11" fill="url(#bevelGrad)" opacity="0.6" />

          {/* 3 Ascending Vertical Mini Bars */}
          <g transform="translate(348, 178)">
            <rect x="0" y="24" width="6" height="16" rx="3" fill="white" opacity="0.9" />
            <rect x="11" y="14" width="6" height="26" rx="3" fill="white" opacity="0.9" />
            <rect x="22" y="2" width="6" height="38" rx="3" fill="white" opacity="0.95" />
          </g>
        </motion.g>

        {/* Pillar 4: Growth Block with Taller 3 Vertical Bars */}
        <motion.g
          animate={{ y: [0, -3.5, 0] }}
          transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        >
          <rect
            x="398"
            y="126"
            width="64"
            height="102"
            rx="16"
            fill="url(#cardGradMid)"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="1.2"
          />
          {/* Stacked Horizon Steps */}
          <rect x="398" y="126" width="64" height="32" rx="16" fill="rgba(255, 255, 255, 0.16)" />
          <rect x="398" y="126" width="64" height="16" rx="16" fill="rgba(255, 255, 255, 0.22)" />

          {/* 3 Taller Ascending Bars */}
          <g transform="translate(412, 148)">
            <rect x="0" y="32" width="7" height="38" rx="3.5" fill="white" opacity="0.9" />
            <rect x="14" y="16" width="7" height="54" rx="3.5" fill="white" opacity="0.9" />
            <rect x="28" y="0" width="7" height="70" rx="3.5" fill="white" opacity="0.95" />
          </g>
        </motion.g>

        {/* Pillar 5: High Scale Block with Rising Trend Line Chart */}
        <motion.g
          filter="url(#shadowMidCard)"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        >
          {/* Card Body */}
          <rect
            x="474"
            y="92"
            width="94"
            height="136"
            rx="20"
            fill="url(#cardGradDark)"
            stroke="rgba(255, 255, 255, 0.55)"
            strokeWidth="1.4"
          />

          {/* Layered Contours */}
          <rect x="474" y="92" width="94" height="42" rx="20" fill="rgba(255, 255, 255, 0.14)" />
          <rect x="474" y="92" width="94" height="20" rx="20" fill="rgba(255, 255, 255, 0.22)" />

          {/* Upward Line Chart Polyline */}
          <path
            d="M 488 188 L 504 166 L 518 174 L 540 134 L 554 114"
            fill="none"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glowLine)"
          />

          {/* Glowing Peak Dot */}
          <circle cx="554" cy="114" r="5" fill="white" />
          <motion.circle
            cx="554"
            cy="114"
            r="9"
            fill="none"
            stroke="white"
            animate={{ opacity: [0.8, 0, 0.8], scale: [0.8, 1.6, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '554px 114px' }}
          />
        </motion.g>

        {/* Pillar 6: The Giant Scaling Card (10x Scale Peak) */}
        <motion.g
          filter="url(#shadowLargeCard)"
          animate={{ y: [0, -4.5, 0] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 1.0 }}
        >
          {/* Card Body */}
          <rect
            x="582"
            y="48"
            width="140"
            height="180"
            rx="26"
            fill="url(#cardGradDark)"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="1.6"
          />

          {/* 3D Horizon Bands */}
          <rect x="582" y="48" width="140" height="66" rx="26" fill="rgba(255, 255, 255, 0.12)" />
          <rect x="582" y="48" width="140" height="38" rx="26" fill="rgba(255, 255, 255, 0.18)" />
          <rect x="582" y="48" width="140" height="18" rx="26" fill="rgba(255, 255, 255, 0.26)" />

          {/* Large Ascending Trend Line Chart */}
          <path
            d="M 598 178 L 624 154 L 642 168 L 678 106 L 702 72"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glowLine)"
          />

          {/* Peak Dot with Double Glow Beacon */}
          <circle cx="702" cy="72" r="6.5" fill="white" filter="url(#glowPeak)" />

          {/* Outer Pulsing Radar Rings */}
          <motion.circle
            cx="702"
            cy="72"
            r="12"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            animate={{ opacity: [0.9, 0, 0.9], scale: [0.8, 1.8, 0.8] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '702px 72px' }}
          />

          <motion.circle
            cx="702"
            cy="72"
            r="18"
            fill="none"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="1"
            animate={{ opacity: [0.6, 0, 0.6], scale: [0.9, 1.9, 0.9] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            style={{ transformOrigin: '702px 72px' }}
          />
        </motion.g>
      </svg>
    </div>
  );
};

