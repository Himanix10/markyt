import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  Activity, 
  Sparkles, 
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  Zap,
  FileSpreadsheet,
} from 'lucide-react';
import { MARKYT_CONTACT } from '../data/content';

interface CurrencyVisualProps {
  onOpenQuestionnaire?: () => void;
  onNavigateToCreatives?: () => void;
}

export const CurrencyVisual: React.FC<CurrencyVisualProps> = ({
  onOpenQuestionnaire,
  onNavigateToCreatives,
}) => {
  const claritySections = [
    {
      title: 'No Website Needed',
      desc: 'Route directly to high-intent phone calls, consultation bookings, or native forms',
      icon: MessageCircle,
      tag: 'Zero Friction',
    },
    {
      title: 'Zero Lock-In Contract',
      desc: 'Full ownership of ad accounts & assets if you decide not to scale',
      icon: ShieldCheck,
      tag: 'Zero Penalty',
    },
    {
      title: '₹5,000 Budget Cap',
      desc: 'Strictly controlled test ad budget with no runaway spend or hidden costs',
      icon: Zap,
      tag: 'Budget Safe',
    },
    {
      title: 'Live Google Sheet',
      desc: 'Track every single rupee, click, CAC & lead live every single day',
      icon: FileSpreadsheet,
      tag: '24/7 Live',
    },
  ];

  return (
    <div id="hero-visual-card" className="relative w-full">
      
      {/* Outer Big Rectangular Card extending across the page */}
      <div className="relative rounded-2xl overflow-hidden bg-white border border-black/10 p-6 sm:p-8 lg:p-10 shadow-md">
        
        {/* Soft Decorative Ambient Background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />

        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100 mb-7 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-heading font-bold text-slate-900 flex items-center gap-2 tracking-tight">
                GROWTH SIMULATOR
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Full-Funnel Economics & ₹5,000 Validation Engine
              </div>
            </div>
          </div>
          
          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#FF3B14]/10 text-[#FF3B14] border border-[#FF3B14]/30 text-xs font-heading font-bold uppercase tracking-wider">
              Zero Lock-In Contract
            </span>
            <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 text-xs font-bold text-emerald-800 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Step 1 of 8</span>
            </div>
          </div>
        </div>

        {/* Main Body: Expansive 2-Column Rectangular Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch relative z-10">
          
          {/* Left Column: 4 Clarity Highlights Sections + Direct CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* 4 Clarity Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {claritySections.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-slate-50/90 border border-black/10 rounded-xl p-4 flex flex-col justify-between hover:bg-slate-100/80 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#FF3B14] shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/60">
                          {item.tag}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-heading font-bold text-slate-950 leading-snug tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5 pt-2">
              <button
                id="hero-primary-cta"
                onClick={onOpenQuestionnaire}
                className="w-full py-3.5 px-6 rounded-xl bg-[#FF3B14] hover:bg-[#e03410] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Start ₹5,000 Validation Sprint</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${MARKYT_CONTACT.phone}`}
                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 border border-black/10 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-slate-700" />
                <span>Call Strategy Team ({MARKYT_CONTACT.formattedPhone})</span>
              </a>

              {onNavigateToCreatives && (
                <button
                  onClick={onNavigateToCreatives}
                  className="text-xs text-slate-700 hover:text-[#FF3B14] font-bold text-center underline font-mono transition-colors"
                >
                  Need video or creative help? See our 2 options →
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Controlled Ad Budget & Micro-Funnel Engine */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            
            {/* Main Banner in Soft Mint & Emerald */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border border-emerald-200/80 shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                <span className="uppercase tracking-wider">Test Ad Budget Cap</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                  100% CONTROLLED
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-heading font-bold text-slate-950 tracking-tight">
                  ₹5,000
                </span>
                <span className="text-xs font-semibold text-slate-500">/ 30-day validation sprint</span>
              </div>
              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                Full customer journey setup across Meta & Google Ads with zero commitment beyond this validation spend.
              </p>
            </div>

            {/* 3 Step Micro Funnel Pills */}
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <motion.div whileHover={{ y: -2 }} className="p-3 rounded-xl bg-sky-50/60 border border-sky-200/70">
                <div className="text-[10px] font-bold text-sky-800 uppercase">1. Creative</div>
                <div className="text-sm font-heading font-bold text-slate-900 mt-0.5 tracking-tight">3-5 Ads</div>
                <div className="text-[10px] font-semibold text-sky-700 mt-0.5">Hooks & Copy</div>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/70">
                <div className="text-[10px] font-bold text-emerald-800 uppercase">2. Conversion</div>
                <div className="text-sm font-heading font-bold text-slate-900 mt-0.5 tracking-tight">Direct LP</div>
                <div className="text-[10px] font-semibold text-emerald-700 mt-0.5">Target Leads</div>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} className="p-3 rounded-xl bg-purple-50/60 border border-purple-200/70">
                <div className="text-[10px] font-bold text-purple-800 uppercase">3. Tracking</div>
                <div className="text-sm font-heading font-bold text-slate-900 mt-0.5 tracking-tight">Live Sheet</div>
                <div className="text-[10px] font-semibold text-purple-700 mt-0.5">Daily CAC Logs</div>
              </motion.div>
            </div>

            {/* Scenario Breakdown */}
            <div className="p-4 rounded-xl bg-slate-50 border border-black/10 space-y-2.5 text-xs">
              <div className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                Risk & Outcome Clarity:
              </div>
              <div className="flex items-start gap-2 text-slate-700">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">✓</span>
                <span><strong>Worst Case:</strong> You're out ₹5,000 with 100% full ownership of your ad assets, customer data & insights.</span>
              </div>
              <div className="flex items-start gap-2 text-slate-700">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">✓</span>
                <span><strong>Best Case:</strong> You've discovered your proven conversion engine and scale predictably with verified ROI.</span>
              </div>
            </div>

          </div>

        </div>

        {/* Live Operator Direct Link Bar */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold relative z-10">
          <span className="text-slate-500 text-[11px]">Direct Strategy Line:</span>
          <a
            href={`tel:${MARKYT_CONTACT.phone}`}
            className="text-slate-900 hover:text-slate-950 font-bold inline-flex items-center gap-1 transition-colors hover:underline"
          >
            <span>Direct Call {MARKYT_CONTACT.formattedPhone}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
