import React from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { MARKYT_CONTACT } from '../data/content';

interface ContactSectionProps {
  onOpenQuestionnaire?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  return (
    <section 
      id="get-in-touch" 
      className="bg-slate-950 text-white py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800 scroll-mt-[54px] relative"
    >
      <div id="contact" className="absolute -top-[54px]" />
      
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight leading-[1.12] text-white">
          Ready to get video ads that actually bring you customers?
        </h2>
        
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          Start with our ₹5,000 test sprint. We write your script, edit your videos, and launch your ads on Instagram and Facebook in just 48 to 72 hours.
        </p>

        <div className="flex items-center justify-center pt-4">
          <a
            href={`https://wa.me/${MARKYT_CONTACT.whatsappNumber}?text=Hi%20MARKYT%20team%2C%20I%20want%20to%20chat%20about%20performance%20marketing`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-bold text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer inline-flex items-center justify-center gap-2.5"
          >
            <WhatsAppIcon className="w-5 h-5 text-white fill-white shrink-0" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <div className="pt-6">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-slate-400 hover:text-white text-xs font-mono underline uppercase tracking-wider transition-colors cursor-pointer"
          >
            ↑ Back to Top of Page
          </button>
        </div>
      </div>
    </section>
  );
};
