import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data/content';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="pt-4 pb-8 sm:pt-6 sm:pb-12 md:pt-8 md:pb-14 bg-[#FFFFFF] text-slate-900 relative overflow-hidden border-t border-slate-200/70 scroll-mt-[54px]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-6 sm:mb-8 text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2.5 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Straight Answers</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-slate-950 leading-tight mb-2">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Questions</span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl sm:max-w-4xl mx-auto space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                whileHover={{ y: -2 }}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen 
                    ? 'bg-emerald-50/40 border-emerald-300 shadow-sm' 
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-heading font-extrabold text-base sm:text-lg text-slate-950 tracking-tight cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-200 ${
                    isOpen 
                      ? 'rotate-180 bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs' 
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 sm:p-6 pt-0 text-sm text-slate-700 leading-relaxed border-t border-emerald-100 font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
