import React, { useState, useRef } from 'react';
import { 
  Instagram, 
  ArrowUpRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface SocialMediaMgmtSectionProps {
  onOpenQuestionnaire?: () => void;
}

export interface SocialTransformationItem {
  id: string;
  title: string;
  tag: string;
  image: string;
  beforeImage: string;
  afterImage: string;
  headline: string;
  beforeLabel: string;
  beforeDesc: string;
  afterLabel: string;
  afterDesc: string;
  style: string;
}

const TRANSFORMATION_SLIDES: SocialTransformationItem[] = [
  {
    id: 'fitness',
    title: 'Trainers First • Fitness Coaching',
    tag: 'Fitness & Coaching',
    image: '/images/social-transform-1.png',
    beforeImage: '/images/social-transform-1-before.png',
    afterImage: '/images/social-transform-1-after.png',
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
    beforeImage: '/images/social-transform-cereal-before.jpg',
    afterImage: '/images/social-transform-cereal-after.jpg',
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
    image: '/images/social-transform-brewtheory.jpg?v=3',
    beforeImage: '/images/social-transform-brewtheory-before.jpg',
    afterImage: '/images/social-transform-brewtheory-after.jpg',
    headline: 'Less text. More story.',
    beforeLabel: 'BEFORE',
    beforeDesc: 'Long copy. Nothing to look at.',
    afterLabel: 'AFTER',
    afterDesc: 'Visual first. Words only where they matter.',
    style: 'Flat Art Style',
  },
];

export const SocialMediaMgmtSection: React.FC<SocialMediaMgmtSectionProps> = () => {
  // Mobile tab state per slide: 'after' | 'before' | 'side-by-side'
  const [mobileViews, setMobileViews] = useState<Record<string, 'after' | 'before' | 'side-by-side'>>({
    fitness: 'after',
    'rainbow-marshmallow': 'after',
    'brew-theory': 'after',
  });

  const scrollContainersRef = useRef<Record<string, HTMLDivElement | null>>({});

  const handleMobileTab = (slideId: string, view: 'after' | 'before' | 'side-by-side') => {
    setMobileViews(prev => ({ ...prev, [slideId]: view }));
    const container = scrollContainersRef.current[slideId];
    if (container && view !== 'side-by-side') {
      const targetLeft = view === 'before' ? 0 : container.scrollWidth - container.clientWidth;
      container.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }
  };

  const handleContainerScroll = (slideId: string) => {
    const container = scrollContainersRef.current[slideId];
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;
    const ratio = scrollLeft / maxScroll;
    const newView = ratio > 0.5 ? 'after' : 'before';
    setMobileViews(prev => {
      if (prev[slideId] === newView || prev[slideId] === 'side-by-side') return prev;
      return { ...prev, [slideId]: newView };
    });
  };

  return (
    <section 
      id="social-media-mgmt" 
      className="text-slate-900 relative overflow-hidden scroll-mt-[54px] bg-[#FAFBF6]"
    >
      {/* 1. Top Part: Heading & Social Proof */}
      <div className="pt-12 pb-8 sm:pt-16 sm:pb-10 md:pt-20 md:pb-12 bg-gradient-to-b from-white via-[#FFF5ED] via-50% to-[#FAFBF6]">
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
          <div className="flex flex-col items-center justify-center gap-3 pt-2">
            <p className="text-center text-sm sm:text-base md:text-lg text-slate-800 max-w-xl mx-auto font-medium leading-relaxed">
              We’ve helped grow their page to <strong className="font-bold text-slate-950 font-heading">50K+ followers</strong> organically, with reels getting thousands of views and some reaching millions.
            </p>

            <a
              href="https://www.instagram.com/quintessentialsmumbai/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 hover:bg-[#FF3B14] text-white font-heading font-black text-sm sm:text-base shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              title="View @quintessentialsmumbai on Instagram"
            >
              <Instagram className="w-4 h-4 text-rose-400 group-hover:text-white transition-colors shrink-0" />
              <span className="tracking-tight">@quintessentialsmumbai</span>
              <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </div>

      {/* 2. Bottom Part: Transformation Showcase with #FAFBF6 background */}
      <div className="pb-16 sm:pb-24 md:pb-28 bg-[#FAFBF6]">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
          {/* ========================================================
              2. TRANSFORMATION SHOWCASE
             ======================================================== */}
          <div className="flex flex-col gap-6 sm:gap-4">
          {TRANSFORMATION_SLIDES.map((slide, idx) => {
            const currentView = mobileViews[slide.id] || 'after';

            return (
              <div 
                key={slide.id}
                className="w-full"
              >
                {/* ----------------------------------------------------
                    MOBILE PRESENTATION (< sm:): Large, Visible & Interactive
                   ---------------------------------------------------- */}
                <div className="block sm:hidden w-full bg-white/70 backdrop-blur-xs border border-orange-200/50 rounded-3xl p-3.5 shadow-xs">
                  {/* Headline & Brand Title */}
                  <div className="text-center mb-3">
                    <h3 className="text-2xl font-heading font-black text-slate-950 tracking-tight">
                      {slide.headline}
                    </h3>
                    <p className="text-xs font-mono font-bold text-slate-600 mt-1">
                      {slide.title}
                    </p>
                  </div>

                  {/* Interactive View Switcher Tabs */}
                  <div className="flex items-center justify-center p-1 bg-slate-100/90 rounded-2xl max-w-xs mx-auto mb-3 border border-slate-200/60">
                    <button
                      type="button"
                      onClick={() => handleMobileTab(slide.id, 'before')}
                      className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-heading font-black transition-all text-center ${
                        currentView === 'before'
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      BEFORE
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMobileTab(slide.id, 'after')}
                      className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-heading font-black transition-all flex items-center justify-center gap-1 ${
                        currentView === 'after'
                          ? 'bg-[#FF3B14] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      AFTER
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMobileTab(slide.id, 'side-by-side')}
                      className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-heading font-bold transition-all text-center ${
                        currentView === 'side-by-side'
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      BOTH
                    </button>
                  </div>

                  {/* Mode 1: SIDE-BY-SIDE */}
                  {currentView === 'side-by-side' ? (
                    <div className="relative w-full rounded-2xl overflow-hidden bg-white border border-slate-100 p-1">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-auto object-contain block pointer-events-none select-none mix-blend-multiply"
                        draggable={false}
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </div>
                  ) : (
                    /* Mode 2: LARGE SWIPEABLE CARDS (Over 2.5x bigger) */
                    <div>
                      <div
                        ref={(el) => {
                          scrollContainersRef.current[slide.id] = el;
                        }}
                        onScroll={() => handleContainerScroll(slide.id)}
                        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-3 pb-1 pt-1 -mx-2 px-2"
                        style={{ scrollSnapType: 'x mandatory' }}
                      >
                        {/* BEFORE Card */}
                        <div className="snap-center shrink-0 w-[84vw] max-w-[350px] mx-auto flex flex-col items-center">
                          <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200/80 p-2 overflow-hidden">
                            <img
                              src={slide.beforeImage}
                              alt={`${slide.title} - Before`}
                              className="w-full h-auto object-contain block pointer-events-none select-none"
                              draggable={false}
                              loading={idx === 0 ? 'eager' : 'lazy'}
                              decoding="async"
                            />
                          </div>
                        </div>

                        {/* AFTER Card */}
                        <div className="snap-center shrink-0 w-[84vw] max-w-[350px] mx-auto flex flex-col items-center">
                          <div className="w-full bg-white rounded-2xl shadow-md border-2 border-[#FF3B14]/30 p-2 overflow-hidden ring-2 ring-[#FF3B14]/10">
                            <img
                              src={slide.afterImage}
                              alt={`${slide.title} - After`}
                              className="w-full h-auto object-contain block pointer-events-none select-none"
                              draggable={false}
                              loading={idx === 0 ? 'eager' : 'lazy'}
                              decoding="async"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Interactive Swipe / Toggle Prompt */}
                      <div className="flex items-center justify-between px-2 pt-2 text-[11px] font-mono text-slate-500">
                        <button
                          type="button"
                          onClick={() => handleMobileTab(slide.id, currentView === 'before' ? 'after' : 'before')}
                          className="inline-flex items-center gap-1 font-bold text-[#FF3B14] hover:underline"
                        >
                          <span>{currentView === 'before' ? 'See Transformed After' : 'See Original Before'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                        <span className="text-slate-400">Swipe to compare ↔</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* ----------------------------------------------------
                    DESKTOP PRESENTATION (sm: and up): Original Clean Layout
                   ---------------------------------------------------- */}
                <div className="hidden sm:flex relative w-full items-center justify-center">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-auto max-w-4xl mx-auto object-contain pointer-events-none select-none mix-blend-multiply"
                    draggable={false}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>

                {/* Divider between slides */}
                {idx < TRANSFORMATION_SLIDES.length - 1 && (
                  <div className="w-full max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-900/15 to-transparent my-3 sm:my-3" />
                )}
              </div>
            );
          })}
          </div>
        </div>
      </div>

    </section>
  );
};
