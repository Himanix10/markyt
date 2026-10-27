import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Instagram, Video, TrendingUp, Sparkles, Film, Zap, BarChart3, ShieldCheck } from 'lucide-react';
import { MARKYT_CONTACT } from '../data/content';
import founderNewImage from '../assets/images/founder_new.jpg';
import clientStrategyImage from '../assets/images/client_strategy_new.jpg';
import growthPractitionerImage from '../assets/images/growth_practitioner_new.jpg';

import { WhoWeAreProps } from '../types';
import { InteractiveAdSimulator } from './InteractiveAdSimulator';

const FOUNDER_PHOTO_URL = 'https://i.ibb.co/jCxjg9y/Picsart-26-09-06-18-27-39-991-jpg.jpg';
const CLIENT_STRATEGY_URL = 'https://i.ibb.co/spVX6q5c/Picsart-26-09-06-18-39-13-445-jpg.jpg';
const GROWTH_PRACTITIONER_URL = 'https://i.ibb.co/C515mDg4/Picsart-26-09-06-19-00-32-985-jpg.jpg';

export const WhoWeAre: React.FC<WhoWeAreProps> = ({
  onOpenQuestionnaire,
  onNavigateToCreatives,
}) => {
  const [showInstaPopup, setShowInstaPopup] = useState(false);

  return (
    <section id="who-we-are" className="relative pt-10 pb-12 sm:pt-14 sm:pb-16 md:pt-16 md:pb-20 bg-[#F6F3EC] text-slate-900 overflow-hidden border-b border-slate-900/10 scroll-mt-[54px]">
      

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Editorial Layout (Matching Screenshot 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Visual Column: Overlapping Editorial Photos with "M" Doodle Stickers */}
          <div className="lg:col-span-6 relative pb-10 sm:pb-12 lg:pb-0">
            
            {/* Top right floating photo */}
            <motion.div
              whileHover={{ scale: 1.03, rotate: 1 }}
              className="absolute -top-10 right-2 sm:right-12 z-20 w-32 sm:w-44 aspect-square rounded-2xl overflow-hidden border border-black/10 shadow-md bg-white"
            >
              <img
                src={clientStrategyImage}
                onError={(e) => {
                  e.currentTarget.src = CLIENT_STRATEGY_URL;
                }}
                alt="Client Strategy Session"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>

            {/* Left Main Editorial Photo with Disco Ball & "M" Doodle */}
            <div 
              className="relative inline-block mt-8 sm:mt-12 group/founder cursor-pointer select-none"
              onMouseEnter={() => setShowInstaPopup(true)}
              onMouseLeave={() => setShowInstaPopup(false)}
              onClick={() => setShowInstaPopup((prev) => !prev)}
            >


              {/* Interactive Instagram Popup on Hover or Touch */}
              <AnimatePresence>
                {showInstaPopup && (
                  <motion.a
                    href={MARKYT_CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, y: 10, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.92 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 26 }}
                    className="absolute -top-14 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-black/10 shadow-[0_16px_40px_rgba(0,0,0,0.22)] flex items-center gap-3 hover:scale-105 active:scale-95 transition-transform group/card whitespace-nowrap"
                    title="Follow @markyt_agency on Instagram"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-xs group-hover/card:scale-110 transition-transform">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 font-bold leading-none">
                          Instagram
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <span className="text-xs font-heading font-black text-slate-950 group-hover/card:text-[#FF3B14] transition-colors leading-tight mt-0.5">
                        {MARKYT_CONTACT.instagramHandle}
                      </span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/card:text-slate-950 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all ml-1 shrink-0" />
                  </motion.a>
                )}
              </AnimatePresence>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative w-60 sm:w-76 md:w-84 rounded-2xl overflow-hidden border border-black/10 shadow-md bg-[#D69698] z-10"
              >
                <img
                  src={founderNewImage}
                  onError={(e) => {
                    e.currentTarget.src = FOUNDER_PHOTO_URL;
                  }}
                  alt="MARKYT Founder & Performance Strategist"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[940/1464] object-cover object-center hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-slate-900/10 shadow-md flex items-center justify-between gap-2 sm:gap-3">
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="font-heading font-black text-slate-950 text-xs sm:text-sm tracking-tight truncate">Anshbir Singh Arora</span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono font-medium text-slate-600 tracking-tight truncate">Founder & Growth Strategist</span>
                  </div>
                  <a
                    href={MARKYT_CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="font-mono text-[9px] sm:text-[10px] text-slate-900 bg-slate-100 hover:bg-gradient-to-r hover:from-rose-500 hover:to-purple-600 hover:text-white border border-slate-900/10 px-2 py-1 rounded-md font-bold uppercase tracking-wider shrink-0 flex items-center gap-1 transition-all"
                    title="Open Instagram @markyt_agency"
                  >
                    <Instagram className="w-3 h-3 text-rose-500" />
                    <span>Lead</span>
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Bottom Right Floating Photo with Animated Live Accent */}
            <div className="absolute -bottom-10 right-0 sm:right-6 z-20">

              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="w-36 sm:w-48 aspect-square rounded-2xl overflow-hidden border border-black/10 shadow-md bg-white"
              >
                <img
                  src={growthPractitionerImage}
                  onError={(e) => {
                    e.currentTarget.src = GROWTH_PRACTITIONER_URL;
                  }}
                  alt="Growth Practitioner"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            </div>

          </div>

          {/* Right Column: Editorial Copy & Statement of Values */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 text-white text-[11px] font-mono font-bold uppercase tracking-wider">
              <span>What We Stand For • Manifesto</span>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
              
              {/* Pinned Note on Softboard */}
              <div className="relative pt-3 pb-1">
                <motion.div 
                  whileHover={{ rotate: 0.5, scale: 1.012 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  style={{ transformOrigin: 'top center' }}
                  className="relative p-5 sm:p-6 pt-6 sm:pt-7 rounded-xl bg-gradient-to-b from-[#FFFDF7] via-[#FFFCEE] to-[#FFF9E5] border border-amber-300/70 text-amber-950 shadow-[0_14px_32px_-6px_rgba(0,0,0,0.13),0_6px_14px_-3px_rgba(0,0,0,0.06),3px_8px_16px_rgba(0,0,0,0.04)] rotate-[-1.5deg] select-none transition-all group/pin"
                >
                  {/* Realistic 3D Red Pushpin Pinned at Top Center */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
                    {/* Diagonal Shadow of the pin shaft on paper */}
                    <div className="absolute top-2.5 left-2 w-3.5 h-3 rounded-full bg-black/30 blur-[2px] transform rotate-45" />

                    {/* Glossy Pushpin Head with Specular Reflection */}
                    <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-red-400 via-[#FF3B14] to-red-800 shadow-[0_4px_8px_rgba(0,0,0,0.38),inset_0_1.5px_1px_rgba(255,255,255,0.7),inset_0_-2px_3px_rgba(0,0,0,0.4)] flex items-center justify-center border border-red-950/20">
                      {/* Highlight glint */}
                      <span className="w-2 h-1.5 rounded-full bg-white/70 absolute top-1 left-1.5 rotate-[-35deg]" />
                      {/* Needle center pin head */}
                      <span className="w-1.5 h-1.5 rounded-full bg-red-950/40 shadow-inner" />
                    </div>

                    {/* Tiny Paper Puncture Hole */}
                    <div className="w-2 h-1 rounded-full bg-amber-950/60 mt-[-1px] blur-[0.4px]" />
                  </div>

                  {/* The Quote */}
                  <p className="text-base sm:text-lg font-heading font-bold leading-snug text-slate-950">
                    "We always found it absurd that businesses invested so heavily in marketing without properly testing it. So the two of us came together, bringing more than five years of combined experience in creative production and marketing, to build Markyt."
                  </p>

                  {/* Subtle Liftoff Corner Shadow */}
                  <div className="absolute -bottom-2 right-2 w-24 h-6 bg-black/10 blur-md rotate-3 pointer-events-none -z-10" />
                </motion.div>
              </div>
            </div>


          </div>

        </div>

        {/* Watch the Exact 60-Second Video Script in Action */}
        <div className="mt-14 sm:mt-20 pt-8 sm:pt-12 border-t border-slate-900/10 w-full">
          <InteractiveAdSimulator onOpenQuestionnaire={onOpenQuestionnaire} />
        </div>
      </div>
    </section>
  );
};
