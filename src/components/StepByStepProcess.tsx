import React from 'react';
import { STEP_PROCESS } from '../data/content';
import { 
  FileText, Target, Palette, ShieldCheck, Rocket, Table, 
  PhoneCall, TrendingUp, ArrowRight, Sparkles 
} from 'lucide-react';
import { motion } from 'motion/react';

interface StepByStepProcessProps {
  onOpenQuestionnaire?: () => void;
}

export const StepByStepProcess: React.FC<StepByStepProcessProps> = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return FileText;
      case 'Target': return Target;
      case 'Palette': return Palette;
      case 'ShieldCheck': return ShieldCheck;
      case 'Rocket': return Rocket;
      case 'Table': return Table;
      case 'PhoneCall': return PhoneCall;
      case 'TrendingUp': return TrendingUp;
      default: return Sparkles;
    }
  };

  const getStepTheme = (stepNumber: number, isMilestone?: boolean) => {
    if (isMilestone) {
      return {
        iconBg: 'bg-[#FF3B14]/15 text-[#FF3B14]',
        badgeBg: 'bg-[#FF3B14]/10 text-[#FF3B14] border-[#FF3B14]/30',
        numBg: 'bg-[#FF3B14] text-white',
      };
    }
    switch (stepNumber) {
      case 1:
        return {
          iconBg: 'bg-blue-100 text-blue-600',
          badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
          numBg: 'bg-slate-950 text-white',
        };
      case 2:
        return {
          iconBg: 'bg-indigo-100 text-indigo-600',
          badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
          numBg: 'bg-slate-950 text-white',
        };
      case 3:
        return {
          iconBg: 'bg-purple-100 text-purple-600',
          badgeBg: 'bg-slate-100 text-slate-800 border-slate-200',
          numBg: 'bg-slate-950 text-white',
        };
      case 4:
        return {
          iconBg: 'bg-emerald-100 text-emerald-700',
          badgeBg: 'bg-slate-100 text-slate-800 border-slate-200',
          numBg: 'bg-slate-950 text-white',
        };
      case 6:
        return {
          iconBg: 'bg-teal-100 text-teal-700',
          badgeBg: 'bg-teal-50 text-teal-800 border-teal-200',
          numBg: 'bg-slate-950 text-white',
        };
      case 7:
        return {
          iconBg: 'bg-amber-100 text-amber-800',
          badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
          numBg: 'bg-slate-950 text-white',
        };
      case 8:
        return {
          iconBg: 'bg-rose-100 text-rose-600',
          badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
          numBg: 'bg-slate-950 text-white',
        };
      default:
        return {
          iconBg: 'bg-slate-100 text-slate-700',
          badgeBg: 'bg-slate-100 text-slate-800 border-slate-200',
          numBg: 'bg-slate-950 text-white',
        };
    }
  };

  const renderCard = (step: (typeof STEP_PROCESS)[number], isClone = false) => {
    const Icon = getIcon(step.icon);
    const theme = getStepTheme(step.number, step.isMilestone);

    return (
      <React.Fragment key={`${step.number}-${isClone ? 'clone' : 'orig'}`}>
        <div 
          className="group/card relative w-[270px] sm:w-[300px] shrink-0 p-5 rounded-2xl sm:rounded-3xl bg-white/95 hover:bg-white border border-slate-900/10 hover:border-slate-900/25 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default select-none"
        >
          {/* Top Line Accent on Milestone */}
          {step.isMilestone && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF3B14] to-amber-500" />
          )}

          <div>
            {/* Top Bar: Step Number, Icon & Badge */}
            <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-black/5">
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-space font-black text-xs shadow-2xs ${theme.numBg}`}>
                  0{step.number}
                </span>

                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shadow-2xs ${theme.iconBg}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${theme.badgeBg}`}>
                {step.costNote}
              </span>
            </div>

            {/* Heading (Title) */}
            <h3 className="text-sm sm:text-base font-space font-bold text-slate-950 tracking-tight leading-snug group-hover/card:text-[#FF3B14] transition-colors">
              {step.title}
            </h3>

            {/* Sub-Heading (Summary) */}
            <p className="text-xs text-slate-600 font-medium leading-relaxed mt-2 line-clamp-3">
              {step.summary}
            </p>
          </div>
        </div>

        {/* Pipeline Connector Arrow */}
        <div className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-white/70 border border-slate-900/10 text-slate-500 shadow-2xs select-none">
          <ArrowRight className="w-3 h-3 text-slate-600" />
        </div>
      </React.Fragment>
    );
  };

  return (
    <section 
      id="process" 
      className="relative pt-10 pb-12 sm:pt-14 sm:pb-16 md:pt-16 md:pb-20 bg-gradient-to-b from-[#B8C1FA] via-[#C8D1FD] to-[#F6F3EC] text-slate-900 overflow-hidden border-y border-slate-900/10 scroll-mt-[54px]"
    >
      {/* Animated Floating Sprint Framework Accents */}
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotate: [-1, 1, -1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-6 left-8 pointer-events-none hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-slate-900/10 shadow-xs z-10 select-none"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-[11px] font-mono font-bold tracking-tight text-slate-800">
          Continuous Iterations
        </span>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 8, 0],
          rotate: [1, -1, 1],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
        className="absolute top-8 right-12 pointer-events-none hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/15 shadow-xs z-10 select-none"
      >
        <motion.span
          animate={{ scale: [1, 1.25, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-emerald-400 text-xs"
        >
          ✦
        </motion.span>
        <span className="text-[11px] font-mono font-bold tracking-tight text-white/95">
          Data-Backed Decisions
        </span>
      </motion.div>

      <motion.div
        animate={{
          y: [0, -6, 0],
          x: [0, 4, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-10 left-12 pointer-events-none hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ACB7F6]/70 backdrop-blur-md border border-slate-900/10 shadow-xs z-10 select-none"
      >
        <span className="text-slate-900 font-bold text-xs">⚡</span>
        <span className="text-[10px] font-mono font-bold tracking-tight text-slate-800 uppercase">
          Zero Long-Term Lock-In
        </span>
      </motion.div>

      {/* Section Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-10">
        <div className="max-w-3xl">

          {/* Headline with Expressive Editorial Font Styling */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight text-slate-950 leading-[1.08] mb-3">
            How It Works,{' '}
            <span className="font-editorial-italic font-normal text-[#FF3B14] underline decoration-slate-950/20 underline-offset-8">
              Step by Step.
            </span>
          </h2>

          <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-medium">
            No guessing, no surprises. A transparent sprint sequence where you review the full strategy and creative assets before spending ad budget.
          </p>
        </div>
      </div>

      {/* Full-Width Continuous Running Banner Track */}
      <div className="relative w-full overflow-hidden select-none py-2">
        {/* Left & Right Edge Gradient Fades for Smooth Seamless Roll */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-[#B8C1FA] via-[#B8C1FA]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-[#C8D1FD] via-[#C8D1FD]/80 to-transparent z-10" />

        {/* Marquee Container */}
        <div className="animate-process-banner">
          {/* Track 1 */}
          <div className="flex items-center gap-4 sm:gap-5 pr-4 sm:pr-5 shrink-0">
            {STEP_PROCESS.map((step) => renderCard(step, false))}
          </div>

          {/* Track 2 (Identical clone for seamless loop) */}
          <div className="flex items-center gap-4 sm:gap-5 pr-4 sm:pr-5 shrink-0" aria-hidden="true">
            {STEP_PROCESS.map((step) => renderCard(step, true))}
          </div>
        </div>
      </div>
    </section>
  );
};
