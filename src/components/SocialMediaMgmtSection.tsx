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
  style: string;
}

const TRANSFORMATION_SLIDES: SocialTransformationItem[] = [
  {
    id: 'fitness',
    title: 'Trainers First • Fitness Coaching',
    tag: 'Fitness & Coaching',
    image: '/images/social-transform-1.png?v=3',
    headline: 'Less text. More story.',
    style: 'Corporate Memphis',
  },
  {
    id: 'rainbow-marshmallow',
    title: 'Rainbow Marshmallow • Cereal & Snacks',
    tag: 'FMCG & Kids Food',
    image: '/images/social-transform-cereal.jpg?v=3',
    headline: 'Less text. More story.',
    style: 'Vector Illustration',
  },
  {
    id: 'brand-strategy',
    title: 'Brand Strategy • Tech & Corporate Identity',
    tag: 'Branding & Corporate Identity',
    image: '/images/social-transform-brandstrategy.png?v=4',
    headline: 'Less text. More story.',
    style: 'Big Tech Art Style',
  },
];

export const SocialMediaMgmtSection: React.FC<SocialMediaMgmtSectionProps> = () => {
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
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-slate-950 tracking-tight">
              Less text. More story.
            </h3>
          </div>

          <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
            {TRANSFORMATION_SLIDES.map((slide, idx) => (
              <div
                key={slide.id}
                className="w-full flex flex-col items-center justify-center"
              >
                <div className="w-full max-w-4xl mx-auto flex items-center justify-center">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-auto object-contain pointer-events-none select-none mix-blend-multiply"
                    draggable={false}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
