import React from 'react';
import { motion } from 'motion/react';
import { TOOLS_LIST } from '../data/content';
import { Cpu, Sparkles } from 'lucide-react';

export const ToolsSection: React.FC = () => {
  return (
    <section id="tools" className="pt-4 pb-8 sm:pt-6 sm:pb-12 bg-[#FAFAFB] text-slate-900 border-t border-slate-200/70 relative overflow-hidden scroll-mt-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
              <Cpu className="w-3.5 h-3.5 text-emerald-700" />
              <span>Modern Ad Tech Stack</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-slate-950 tracking-tight">
              Tools and infrastructure we operate daily.
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md">
            Native ad managers, real-time conversion API pipelines, and client-accessible live Google Sheets.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {TOOLS_LIST.map((tool) => (
            <motion.div
              key={tool.name}
              whileHover={{ y: -4 }}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 block mb-1.5 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                  {tool.category}
                </span>
                <div className="font-heading font-extrabold text-base text-slate-950 tracking-tight">
                  {tool.name}
                </div>
              </div>
              <div className="text-xs text-slate-600 mt-2.5 leading-relaxed font-medium">
                {tool.desc}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
