import React from 'react';
import { 
  Instagram, 
  ArrowUpRight
} from 'lucide-react';

interface SocialMediaMgmtSectionProps {
  onOpenQuestionnaire?: () => void;
}

export interface SocialTransformationItem {
  id: string;
  title: string;
  tag: string;
  image: string;
  headline: string;
  beforeLabel: string;
  beforeDesc: string;
  afterLabel: string;
  afterDesc: string;
  style: string;
}

// Reordered: Trainer first (extreme end), Cereal in the middle, Coffee last (extreme end)
const TRANSFORMATION_SLIDES: SocialTransformationItem[] = [
  {
    id: 'fitness',
    title: 'Trainers First • Fitness Coaching',
    tag: 'Fitness & Coaching',
    image: '/images/social-transform-1.png',
    headline: 'Less text. More story.',
    beforeLabel: 'BEFORE',
    beforeDesc: 'Long copy. Nothing to look at.',
    afterLabel: 'AFTER',
    afterDesc: 'Visual first. Words only where they matter.',
    style: 'Corporate Memphis',
  },
  {
    id: 'rainbow-marshmallow',
    title: 'Rainbow Marshmallow • Cereal & Snacks',
    tag: 'FMCG & Kids Food',
    image: '/images/social-transform-cereal.jpg?v=2',
    headline: 'Less text. More story.',
    beforeLabel: 'BEFORE',
    beforeDesc: 'Long copy. Nothing to look at.',
    afterLabel: 'AFTER',
    afterDesc: 'Visual first. Words only where they matter.',
    style: 'Vector Illustration',
  },
  {
    id: 'brew-theory',
    title: 'Brew Theory Coffee • Specialty Roaster',
    tag: 'Food & Beverage',
    image: '/images/social-transform-brewtheory.jpg?v=2',
    headline: 'Less text. More story.',
    beforeLabel: 'BEFORE',
    beforeDesc: 'Long copy. Nothing to look at.',
    afterLabel: 'AFTER',
    afterDesc: 'Visual first. Words only where they matter.',
    style: 'Flat Art Style',
  },
];

export const SocialMediaMgmtSection: React.FC<SocialMediaMgmtSectionProps> = () => {
  return (
    <section 
      id="social-media-mgmt" 
      className="pt-10 pb-6 sm:pt-14 sm:pb-8 md:pt-16 md:pb-10 text-slate-900 relative overflow-hidden scroll-mt-[54px] bg-white"
    >
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================
            1. SECTION HEADING
           ======================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-slate-950 tracking-tight leading-[1.15] mb-3">
            Your Social Media,{' '}
            <span className="font-editorial-italic font-normal italic text-[#FF3B14]">
              Handled
            </span>.
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed max-w-xl mx-auto font-normal mb-4">
            We make your posts &amp; reels, and if you’d like, we’ll run your social media for you too. Management starts at ₹7,000 a month.
          </p>

          {/* Live Proof Managed Account */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-sm sm:text-base md:text-lg pt-3">
            <div className="inline-flex items-center gap-2">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
              </span>
              <span className="font-bold text-slate-900">See it for yourself: we manage</span>
            </div>

            <a
              href="https://www.instagram.com/quintessentialsmumbai/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-[#FF3B14] text-white font-heading font-black text-sm sm:text-base shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              title="View @quintessentialsmumbai on Instagram"
            >
              <Instagram className="w-4 h-4 text-rose-400 group-hover:text-white transition-colors shrink-0" />
              <span className="tracking-tight">@quintessentialsmumbai</span>
              <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </a>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-300 font-mono text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              All Organic Growth
            </span>
          </div>
        </div>

        {/* ========================================================
            2. TRANSFORMATION SHOWCASE (SEAMLESS BACKGROUND INTEGRATION)
           ======================================================== */}
        <div className="flex flex-col gap-2 sm:gap-4">
          {TRANSFORMATION_SLIDES.map((slide, idx) => (
            <div 
              key={slide.id}
              className="w-full"
            >

              {/* Comparison Visual - Seamlessly merged into section background */}
              <div className="relative w-full flex items-center justify-center">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-auto max-w-4xl mx-auto object-contain pointer-events-none select-none"
                  draggable={false}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </div>

              {/* Elegant subtle divider between transformations (tight & balanced) */}
              {idx < TRANSFORMATION_SLIDES.length - 1 && (
                <div className="w-full max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-900/15 to-transparent my-2 sm:my-3" />
              )}
            </div>
          ))}
        </div>



      </div>

    </section>
  );
};
