import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, PhoneCall, CheckCircle2, Mail, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MARKYT_CONTACT } from '../data/content';
import { WhatsAppIcon } from './WhatsAppIcon';
import { buildQuickBlueprintWhatsAppUrl, saveInquiryLocally } from '../utils/whatsapp';

export const InteractiveTestBuilder: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('Local Service / Repair');
  const [goal, setGoal] = useState('High-intent Qualified Leads');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildQuickBlueprintWhatsAppUrl({
      businessName,
      industry,
      goal,
      contact,
    });
    setWhatsappUrl(url);

    // Persist locally so answers are never lost
    saveInquiryLocally({
      businessName,
      industry,
      goal,
      contact,
      source: 'Quick Intake Blueprint',
    });

    setSubmitted(true);

    try {
      confetti({ particleCount: 70, spread: 50, origin: { y: 0.7 } });
    } catch {
      // ignore
    }

    // Automatically open WhatsApp in new tab
    try {
      window.open(url, '_blank');
    } catch {
      // ignore pop-up block; user has button on screen
    }
  };

  return (
    <section id="get-in-touch" className="pt-4 pb-8 sm:pt-6 sm:pb-12 md:pt-8 md:pb-14 bg-[#FAFAFB] text-slate-900 relative overflow-hidden border-t border-slate-200/70 scroll-mt-[54px]">
      
      {/* Background Glows */}
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Direct Contacts & Value Promise */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider shadow-xs mb-3">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>Zero Risk Validation Sprint</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight leading-tight text-slate-950">
                Launch your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">₹5,000 test</span> today.
              </h2>

              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                Worst case, you’re out ₹5,000 and 30 days with full perpetual ownership of all creative assets, audiences, and conversion data. Best case, you’ve discovered what actually scales and locked in a performance engine that compounds month over month.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <motion.a
                whileHover={{ y: -2 }}
                href={`tel:${MARKYT_CONTACT.phone}`}
                className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shadow-xs">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Direct Phone Line</div>
                    <div className="text-sm font-black font-heading text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {MARKYT_CONTACT.formattedPhone}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all" />
              </motion.a>

              <motion.a
                whileHover={{ y: -2 }}
                href={`mailto:${MARKYT_CONTACT.email}`}
                className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-purple-300 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold shadow-xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Email Inquiries</div>
                    <div className="text-sm font-black font-heading text-slate-900 group-hover:text-purple-700 transition-colors">
                      {MARKYT_CONTACT.email}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-700 group-hover:translate-x-1 transition-all" />
              </motion.a>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-semibold pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">✓</span>
                <span>Zero Lock-in Contract</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">✓</span>
                <span>Daily Google Sheet</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">✓</span>
                <span>Direct Operator Access</span>
              </span>
            </div>
          </div>

          {/* Right Column: Inline Quick Test Configurator in Radiant White Card */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-2xl border border-black/10 shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-950 mb-1">
                Quick Intake Blueprint
              </h3>
              <p className="text-xs text-slate-500 font-medium mb-5">
                Takes 60 seconds. We inspect your unit margins and return an actionable roadmap.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Your Business Name
                    </label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Apex Therapy / Nomad Travels"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Industry Category
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                    >
                      <option value="Therapist / Mental Health">Therapist / Mental Health</option>
                      <option value="Travel Agency / Tours">Travel Agency / Tours</option>
                      <option value="Laptop Repair / Local Service">Laptop Repair / Local Service</option>
                      <option value="B2B Construction / Industrial Supplies">B2B Construction / Industrial Supplies</option>
                      <option value="FMCG & Food Goods">FMCG & Food Goods</option>
                      <option value="D2C / B2C Ecommerce">D2C / B2C Ecommerce</option>
                      <option value="Other Small & Medium Enterprise">Other Small & Medium Enterprise</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Primary Conversion Objective
                    </label>
                    <select
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                    >
                      <option value="High-intent Qualified Leads">High-intent Qualified Leads</option>
                      <option value="Direct Inbound Phone Calls">Direct Inbound Phone Calls</option>
                      <option value="Online Ecommerce Orders">Online Ecommerce Orders</option>
                      <option value="Consultation Bookings">Consultation Bookings</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Your WhatsApp Number or Email (Optional)
                    </label>
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="e.g. 98765 43210 or founder@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-semibold">Test Ad Budget Cap:</span>
                    <strong className="text-emerald-800 text-xs sm:text-sm font-black font-heading">₹5,000 / 30 Days</strong>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/20 transition-all hover:scale-[1.01] active:scale-[0.98] group cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Send Blueprint to WhatsApp</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[10px] text-slate-500 text-center font-medium">
                    Pre-fills your exact business answers directly to our WhatsApp (+91 70456 02440).
                  </p>
                </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-heading font-black text-slate-950">
                  Blueprint Formatted for WhatsApp!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto font-medium">
                  We have prepared your ₹5,000 sprint setup for <strong className="text-slate-900">{businessName}</strong>. Send it now on WhatsApp for instant confirmation.
                </p>

                {/* Summary Snapshot */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-3.5 text-left text-xs space-y-1 font-mono text-slate-700 max-w-xs mx-auto">
                  <div><span className="text-slate-400 font-sans">Brand:</span> <strong>{businessName}</strong></div>
                  <div><span className="text-slate-400 font-sans">Niche:</span> {industry}</div>
                  <div><span className="text-slate-400 font-sans">Goal:</span> {goal}</div>
                  {contact && <div><span className="text-slate-400 font-sans">Contact:</span> {contact}</div>}
                  <div><span className="text-slate-400 font-sans">Budget:</span> ₹5,000 / 30 Days</div>
                </div>

                <div className="pt-2 flex flex-col gap-2.5 max-w-xs mx-auto">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-heading font-bold uppercase tracking-wider shadow-md shadow-[#25D366]/20 transition-all hover:scale-[1.02]"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Open Pre-filled WhatsApp Chat</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`tel:${MARKYT_CONTACT.phone}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-heading font-bold uppercase tracking-wider transition-all"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Call Strategy Line Directly</span>
                  </a>
                </div>
              </div>
            )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
