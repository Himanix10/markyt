import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INDUSTRIES } from '../data/content';
import { 
  HeartHandshake, Plane, ShoppingBag, Building2, Sparkles, 
  Wrench, CheckCircle2, AlertCircle, ArrowRight, Layers, ArrowUpRight
} from 'lucide-react';

interface IndustriesSectionProps {
  onOpenQuestionnaire: () => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onOpenQuestionnaire }) => {
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>('therapists');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake': return HeartHandshake;
      case 'Plane': return Plane;
      case 'ShoppingBag': return ShoppingBag;
      case 'Building2': return Building2;
      case 'Sparkles': return Sparkles;
      case 'Wrench': return Wrench;
      default: return Layers;
    }
  };

  const selectedIndustry = INDUSTRIES.find((i) => i.id === selectedIndustryId) || INDUSTRIES[0];

  return (
    <section id="industries" className="pt-4 pb-8 sm:pt-6 sm:pb-12 md:pt-8 md:pb-14 bg-[#FAFAFB] text-slate-900 relative overflow-hidden border-t border-slate-200/70 scroll-mt-0">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold uppercase tracking-wider mb-2.5 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-purple-700" />
            <span>Vertical Specialization</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight text-slate-950 leading-tight mb-2 sm:mb-3">
            Industries where we win, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-emerald-600">and we’re still new, counting & adding to it.</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            As an emerging, dedicated performance team, we’re actively testing, proving fresh niches, and expanding our playbook every single month. We tailor every campaign directly to your unit margins, sales cycles, and buyer psychology.
          </p>
        </div>

        {/* Industry Pill Tabs with Bouncy Hover */}
        <div className="flex flex-wrap gap-2.5 mb-5">
          {INDUSTRIES.map((ind) => {
            const Icon = getIcon(ind.icon);
            const isSelected = selectedIndustryId === ind.id;
            return (
              <motion.button
                key={ind.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedIndustryId(ind.id)}
                className={`inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-2xl text-xs font-heading font-bold transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20 ring-2 ring-emerald-400/30'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-emerald-700'}`} />
                <span>{ind.title}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Focused Industry Detail Bento */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndustry.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/90 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start shadow-xl"
          >
            
            {/* Left: Problem & Markyt Approach */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-100">
                <h3 className="text-2xl sm:text-3xl font-heading font-black text-slate-950">
                  {selectedIndustry.title}
                </h3>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                  {selectedIndustry.badge}
                </span>
              </div>

              {/* The Typical Burn in Soft Rose */}
              <div className="p-5 rounded-2xl bg-rose-50/80 border border-rose-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-800 uppercase tracking-wider mb-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Sector Risk / Common Agency Pitfall:</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {selectedIndustry.commonBurn}
                </p>
              </div>

              {/* Our Custom Approach in Soft Mint */}
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Markyt's Proven Conversion Strategy:</span>
                </div>
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  {selectedIndustry.ourApproach}
                </p>
              </div>
            </div>

            {/* Right: Recommended Channels & CTA */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between h-full">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase block mb-3.5">
                  Recommended Test Stack:
                </span>
                <div className="space-y-2 mb-6 text-xs">
                  {selectedIndustry.recommendedChannels.map((ch) => (
                    <div
                      key={ch}
                      className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-semibold flex items-center gap-2.5 shadow-xs"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>{ch}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenQuestionnaire}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
              >
                <span>Run ₹5,000 Test For This Sector</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
