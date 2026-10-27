import React from 'react';
import { motion } from 'motion/react';
import { FUNNEL_STAGES } from '../data/content';
import {
  Compass,
  MapPin,
  RefreshCw,
  CheckCircle2,
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface HowMarkytWorksProps {
  onOpenQuestionnaire: () => void;
}

const STAGE_CONFIGS: Record<string, {
  numberStr: string;
  tag: string;
  activeGradient: string;
  glowColor: string;
  badgeBg: string;
  dotColor: string;
  pillStyle: string;
  channelLabel: string;
}> = {
  discovery: {
    numberStr: '01',
    tag: 'Cold Traffic Hook',
    activeGradient: 'from-blue-600 to-indigo-600',
    glowColor: 'bg-blue-500/10',
    badgeBg: 'bg-blue-100 text-blue-900 border-blue-200',
    dotColor: 'bg-blue-500',
    pillStyle: 'bg-blue-50 text-blue-700 border-blue-200/80',
    channelLabel: 'Meta & Reels Ads',
  },
  destination: {
    numberStr: '02',
    tag: 'Frictionless Route',
    activeGradient: 'from-teal-600 to-emerald-600',
    glowColor: 'bg-teal-500/10',
    badgeBg: 'bg-teal-100 text-teal-900 border-teal-200',
    dotColor: 'bg-teal-500',
    pillStyle: 'bg-teal-50 text-teal-700 border-teal-200/80',
    channelLabel: 'Mobile Landing Pages',
  },
  retarget: {
    numberStr: '03',
    tag: 'Crucial Margin Saver',
    activeGradient: 'from-purple-600 to-fuchsia-600',
    glowColor: 'bg-purple-500/10',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-200',
    dotColor: 'bg-purple-500',
    pillStyle: 'bg-purple-50 text-purple-700 border-purple-200/80',
    channelLabel: 'Audience Pixels',
  },
  convert: {
    numberStr: '04',
    tag: 'Real Bottom Line',
    activeGradient: 'from-[#FF3B14] to-orange-600',
    glowColor: 'bg-[#FF3B14]/10',
    badgeBg: 'bg-rose-100 text-rose-900 border-rose-200',
    dotColor: 'bg-[#FF3B14]',
    pillStyle: 'bg-rose-50 text-[#FF3B14] border-rose-200/80',
    channelLabel: 'Direct Inquiries',
  },
  refine: {
    numberStr: '05',
    tag: 'Scaling Flywheel',
    activeGradient: 'from-cyan-600 to-blue-600',
    glowColor: 'bg-cyan-500/10',
    badgeBg: 'bg-cyan-100 text-cyan-900 border-cyan-200',
    dotColor: 'bg-cyan-500',
    pillStyle: 'bg-cyan-50 text-cyan-700 border-cyan-200/80',
    channelLabel: 'Lookalike Audiences',
  },
};

export const HowMarkytWorks: React.FC<HowMarkytWorksProps> = () => {
  const getStageIcon = (iconName: string, className = "w-4 h-4") => {
    switch (iconName) {
      case 'Compass':
        return <Compass className={className} />;
      case 'MapPin':
        return <MapPin className={className} />;
      case 'RefreshCw':
        return <RefreshCw className={className} />;
      case 'CheckCircle2':
        return <CheckCircle2 className={className} />;
      case 'TrendingUp':
        return <TrendingUp className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <section id="philosophy" className="relative pt-8 pb-12 sm:pt-12 sm:pb-18 md:pt-16 md:pb-24 bg-[#BEE4F8] text-slate-950 overflow-hidden border-b border-slate-950/10 scroll-mt-[54px]">
      

      {/* Floating iOS Liquid Glass Ambient Bubbles */}
      <motion.div 
        animate={{ y: [0, -16, 0], x: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-8 w-44 h-44 rounded-full bg-white/35 backdrop-blur-2xl border border-white/60 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_12px_32px_rgba(0,0,0,0.04)] pointer-events-none hidden md:block" 
      />
      <motion.div 
        animate={{ y: [0, 16, 0], x: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-12 right-10 w-56 h-56 rounded-full bg-gradient-to-tr from-purple-300/30 via-pink-200/20 to-white/45 backdrop-blur-2xl border border-white/60 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_12px_32px_rgba(0,0,0,0.05)] pointer-events-none hidden md:block" 
      />

      {/* Soft Ambient Background Glows */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">

          {/* Headline with Expressive Fun Typography */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black text-slate-950 tracking-tight leading-[1.08]">
            How We Convert Cold Traffic Into{' '}
            <span className="font-editorial-italic font-normal text-[#FF3B14] underline decoration-slate-950/20 underline-offset-8">
              Paying Customers.
            </span>
          </h2>

          <p className="mt-3.5 text-base sm:text-lg text-slate-800 leading-relaxed font-medium max-w-2xl mx-auto">
            A disciplined 5-stage customer journey engine engineered to turn cold prospects into qualified leads and repeat buyers.
          </p>
        </div>

        {/* 5-Stage Customer Journey Funnel Container - Authentic iOS Liquid Glass */}
        <div className="bg-white/65 hover:bg-white/75 backdrop-blur-2xl backdrop-saturate-150 border border-white/90 rounded-[32px] p-5 sm:p-8 lg:p-10 shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),0_20px_50px_rgba(0,0,0,0.06)] relative overflow-hidden transition-all duration-500">
          
          {/* Top Control Bar with Fun Typography and Glass Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-900/10 mb-6">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 backdrop-blur-md border border-blue-400/30 text-blue-900 text-[11px] font-mono font-bold uppercase tracking-wider shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
                  5-Stage Pipeline
                </span>
                <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider">
                  Full Customer Journey
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-slate-950 mt-1.5 tracking-tight">
                Funnel{' '}
                <span className="font-editorial-italic font-normal text-[#FF3B14]">
                  Blueprint
                </span>
              </h3>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/90 text-xs font-space font-bold text-slate-800 shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_4px_12px_rgba(0,0,0,0.04)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
              <span>5 Sequential Stages</span>
            </div>
          </div>

          {/* Connecting Flow Progress Bar with Liquid Laser Shimmer */}
          <div className="relative mb-6 hidden sm:block">
            <div className="h-2 w-full bg-slate-950/10 rounded-full overflow-hidden p-0.5 backdrop-blur-md">
              <div className="relative h-full w-full bg-gradient-to-r from-blue-600 via-purple-600 via-[#FF3B14] to-cyan-500 rounded-full overflow-hidden shadow-inner">
                {/* Animated Liquid Shimmer Stream */}
                <motion.div
                  className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12"
                  animate={{
                    left: ['-20%', '120%'],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatDelay: 0.6,
                  }}
                />
              </div>
            </div>
          </div>

          {/* The Five Standalone Step Cards with Authentic iOS Liquid Glass */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 items-stretch">
            {FUNNEL_STAGES.map((stage, idx) => {
              const cfg = STAGE_CONFIGS[stage.id] || STAGE_CONFIGS.discovery;

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/75 hover:bg-white/95 backdrop-blur-xl backdrop-saturate-150 border border-white/90 hover:border-white shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),0_16px_36px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  {/* Top Liquid Colored Gradient Refraction */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${cfg.activeGradient} opacity-85 group-hover:opacity-100 transition-opacity`} />
                  <div className={`absolute -top-12 -right-12 w-28 h-28 rounded-full bg-gradient-to-br ${cfg.activeGradient} opacity-10 group-hover:opacity-20 blur-xl transition-all duration-500 pointer-events-none`} />

                  <div>
                    {/* Header: Stage Number & Icon */}
                    <div className="flex items-center justify-between w-full mb-3.5 pt-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/[0.04] text-slate-800 border border-slate-900/[0.08] text-[10px] font-mono font-black uppercase tracking-wider backdrop-blur-md shadow-2xs">
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotColor} animate-pulse`} />
                        <span>Stage {cfg.numberStr}</span>
                      </div>

                      <motion.div 
                        whileHover={{ rotate: 8, scale: 1.12 }}
                        className={`w-9 h-9 rounded-2xl bg-gradient-to-br ${cfg.activeGradient} text-white flex items-center justify-center shadow-md shadow-black/10 group-hover:shadow-lg transition-all duration-300 ring-2 ring-white/80`}
                      >
                        {getStageIcon(stage.iconName, 'w-4 h-4')}
                      </motion.div>
                    </div>

                    {/* Title with visually appealing font styling */}
                    <h4 className="text-lg sm:text-[19px] font-space font-black text-slate-950 tracking-tight leading-snug group-hover:text-[#FF3B14] transition-colors">
                      {stage.id === 'retarget' ? (
                        <>
                          <span>Retarget </span>
                          <span className="font-editorial-italic italic font-normal text-purple-600">Loop</span>
                        </>
                      ) : stage.id === 'refine' ? (
                        <>
                          <span>Refine </span>
                          <span className="font-editorial-italic italic font-normal text-cyan-600">& Loop</span>
                        </>
                      ) : stage.id === 'discovery' ? (
                        <>
                          <span>Discovery</span>
                        </>
                      ) : stage.id === 'destination' ? (
                        <>
                          <span>Destination</span>
                        </>
                      ) : (
                        <>
                          <span>Convert</span>
                        </>
                      )}
                    </h4>

                    {/* Visually Appealing Tinted Eyebrow Tag */}
                    <span className={`inline-block text-[10px] font-space font-bold uppercase tracking-wider mt-1.5 mb-2.5 px-2.5 py-0.5 rounded-full border shadow-2xs ${cfg.pillStyle}`}>
                      {cfg.tag}
                    </span>

                    {/* Short Description with refined readability */}
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-medium">
                      {stage.shortDesc}
                    </p>
                  </div>

                  {/* Primary Touchpoint Chip */}
                  <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-[11px] font-space">
                    <span className="text-slate-700 flex items-center gap-1.5 font-bold">
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotColor} shrink-0`} />
                      <span className="truncate">{cfg.channelLabel}</span>
                    </span>
                    <span className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
