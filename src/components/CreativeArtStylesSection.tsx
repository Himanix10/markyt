import React, { useRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface ArtStyleItem {
  id: string;
  name: string;
  src: string;
  poster: string;
}

const ART_STYLES: ArtStyleItem[] = [
  {
    id: 'electric-2d-doodle',
    name: 'Electric 2D Doodle',
    src: '/showcase-gifs/showcase_1.mp4',
    poster: '/showcase-gifs/showcase_1.jpg',
  },
  {
    id: 'mixed-media-sketch',
    name: 'Mixed-Media Sketch',
    src: '/showcase-gifs/showcase_2.mp4',
    poster: '/showcase-gifs/showcase_2.jpg',
  },
  {
    id: 'die-cut-paper-sticker',
    name: 'Die-Cut Paper Sticker',
    src: '/showcase-gifs/showcase_3.mp4',
    poster: '/showcase-gifs/showcase_3.jpg',
  },
  {
    id: 'meadow-storybook-cel',
    name: 'Meadow Storybook Cel',
    src: '/showcase-gifs/showcase_4.mp4',
    poster: '/showcase-gifs/showcase_4.jpg',
  },
  {
    id: 'luxury-fragrance-lifestyle',
    name: 'Luxury Fragrance & Lifestyle',
    src: '/videos/zevaro-luxury-perfume.mp4?v=3',
    poster: '/videos/posters/zevaro-luxury-perfume.jpg?v=3',
  },
  {
    id: 'minimalist-fashion-apparel',
    name: 'Minimalist Fashion & Apparel',
    src: '/videos/modest-fashion-apparel.mp4?v=3',
    poster: '/videos/posters/modest-fashion-apparel.jpg?v=3',
  },
];

interface CreativeArtStylesSectionProps {
  onOpenQuestionnaire?: () => void;
}

export const CreativeArtStylesSection: React.FC<CreativeArtStylesSectionProps> = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeModalStyle, setActiveModalStyle] = useState<ArtStyleItem | null>(null);
  const [videoLoaded, setVideoLoaded] = useState<{ [key: number]: boolean }>({});

  // Play immediately when user enters the section, keep playing continuously, pause when user leaves
  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const startAllVideos = () => {
      videoRefs.current.forEach((video) => {
        if (!video) return;
        video.defaultMuted = true;
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay silently handled with muted
          });
        }
      });
    };

    const pauseAllVideos = () => {
      videoRefs.current.forEach((video) => {
        if (video && !video.paused) {
          video.pause();
        }
      });
    };

    // 1. IntersectionObserver for instant response
    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting ?? false;
        if (isVisible) {
          startAllVideos();
        } else {
          pauseAllVideos();
        }
      },
      { threshold: 0.05, rootMargin: '100px 0px 100px 0px' }
    );

    observer.observe(target);

    // 2. Direct viewport check on scroll & touch to overcome strict mobile power-savers
    let ticking = false;
    const handleViewportCheck = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (target) {
          const rect = target.getBoundingClientRect();
          const inView = rect.top < window.innerHeight + 100 && rect.bottom > -100;
          if (inView) {
            startAllVideos();
          } else {
            pauseAllVideos();
          }
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleViewportCheck, { passive: true });
    window.addEventListener('touchmove', handleViewportCheck, { passive: true });

    // Initial check on mount
    handleViewportCheck();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleViewportCheck);
      window.removeEventListener('touchmove', handleViewportCheck);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="creative-styles"
      className="relative pt-10 sm:pt-14 md:pt-16 pb-16 sm:pb-24 bg-[#FAFBF6] text-slate-900 border-b border-slate-200/80 overflow-hidden select-none"
      style={{ backgroundColor: '#FAFBF6' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black text-slate-950 tracking-tight leading-[1.12]">
            Choose your{' '}
            <span className="font-editorial-italic font-normal italic text-[#FF3B14]">
              artstyle
            </span>.
          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 max-w-lg mx-auto font-normal leading-relaxed">
            Tell us what you have in mind. We’ll bring your story to life in the art style that feels right for you.
          </p>
        </div>

        {/* 4 GIFs / Videos horizontally visible at once */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 lg:gap-6 max-w-6xl mx-auto items-start">
          {ART_STYLES.map((style, idx) => (
            <div
              key={style.id}
              className="group flex flex-col items-center w-full"
            >
              {/* Card Container */}
              <div
                onClick={() => setActiveModalStyle(style)}
                className="relative w-full aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-md border border-slate-200/90 hover:shadow-xl hover:border-slate-300 transition-all duration-300 cursor-pointer"
              >
                <video
                  ref={(el) => {
                    if (el) {
                      el.defaultMuted = true;
                      el.muted = true;
                    }
                    videoRefs.current[idx] = el;
                  }}
                  src={style.src}
                  poster={style.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onPlaying={() => setVideoLoaded((prev) => ({ ...prev, [idx]: true }))}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  aria-label={style.name}
                >
                  <source src={style.src} type="video/mp4" />
                </video>


              </div>

              {/* Only Caption: Art-style name */}
              <p className="mt-3 sm:mt-4 text-center font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#FF3B14] transition-colors leading-snug">
                {style.name}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal on Tap/Click */}
      {activeModalStyle && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveModalStyle(null)}
        >
          <div
            className="relative bg-white p-3 sm:p-4 rounded-3xl max-w-xs sm:max-w-sm w-full shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModalStyle(null)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-[#FF3B14] text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer z-30"
              title="Close"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-lg">
              <video
                key={activeModalStyle.src}
                src={activeModalStyle.src}
                poster={activeModalStyle.poster}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-3 text-center">
              <p className="font-heading font-bold text-base text-slate-900">
                {activeModalStyle.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
