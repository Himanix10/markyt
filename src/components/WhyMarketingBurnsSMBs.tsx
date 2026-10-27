import React from 'react';
import { motion } from 'motion/react';
import { TrendingDown, Lock } from 'lucide-react';

export const WhyMarketingBurnsSMBs: React.FC = () => {
  const problems = [
    {
      title: 'Heavy Upfront Commitments Before Proof of Demand',
      desc: 'Locking in high budgets and commitments before running a single live ad or proving whether unit economics and acquisition costs actually work.',
      markytFix: '₹5,000 test sprint first. Zero long-term lock-in. Scale only when profitable.',
      icon: Lock,
    },
    {
      title: 'Vanity "Reach" & "Impressions" Over Real Revenue',
      desc: 'Focusing on thousands of superficial views and likes that never translate into customer inquiries, verified phone calls, or bank deposits.',
      markytFix: 'Every single rupee is tracked directly against verified leads, phone inquiries, or confirmed revenue.',
      icon: TrendingDown,
    },
  ];

  return (
    <section id="problem" className="relative pt-4 pb-8 sm:pt-6 sm:pb-12 md:pt-8 md:pb-14 bg-[#FFCD00] text-slate-950 overflow-hidden border-b border-slate-950/10 scroll-mt-[54px]">
      

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Editorial Headline (Matching Screenshot 3) */}
        <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-8">
          <p className="text-sm sm:text-base font-heading font-bold text-slate-900 tracking-tight mb-2">
            As performance practitioners who specialize in conversion, unit economics isn’t just what we track:
          </p>
          
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold text-slate-950 tracking-tight leading-[1.02]">
            It’s what we create.
          </h2>
        </div>

        {/* 4 Brutal Agency Traps vs MARKYT */}
        <div className="w-full">
          <div className="text-center mb-5">
            <span className="px-3.5 py-1 rounded-full bg-slate-950 text-white text-xs font-mono font-bold uppercase tracking-wider">
              The Reality Check
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-slate-950 mt-2 tracking-tight">
              Where Most Marketing Budgets Get Burned
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {problems.map((prob, idx) => {
              const Icon = prob.icon;
              return (
                <motion.div
                  key={prob.title}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center border border-rose-200">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">0{idx + 1}</span>
                    </div>

                    <h4 className="text-lg font-heading font-bold text-slate-950 mb-2 leading-snug tracking-tight">
                      {prob.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {prob.desc}
                    </p>
                  </div>

                  <div className="pt-3 bg-emerald-50/70 -mx-6 -mb-6 p-4 px-6 rounded-b-2xl border-t border-emerald-200/80">
                    <div className="flex items-start gap-2 text-xs text-emerald-950 font-medium leading-relaxed">
                      <strong className="font-bold text-emerald-900 shrink-0">The MARKYT Fix:</strong>
                      <span>{prob.markytFix}</span>
                    </div>
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
