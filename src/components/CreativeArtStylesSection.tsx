import React, { useRef, useEffect, useState } from 'react';
import { X, Play, Pause } from 'lucide-react';

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
];

interface CommercialVideoItem {
  id: string;
  name: string;
  src: string;
  poster: string;
}

const COMMERCIAL_VIDEOS: CommercialVideoItem[] = [
  {
    id: 'artisanal-coffee-cafe',
    name: 'Artisanal Coffee & Cafe',
    src: '/videos/kafora-artisanal-coffee.mp4?v=1',
    poster: '/videos/posters/kafora-artisanal-coffee.jpg?v=1',
  },
  {
    id: 'luxury-fragrance-lifestyle',
    name: 'Luxury Fragrance & Lifestyle',
    src: '/videos/zevaro-luxury-perfume.mp4?v=8',
    poster: '/videos/posters/zevaro-luxury-perfume.jpg?v=8',
  },
  {
    id: 'clara-luxury-perfume',
    name: 'Luxury Perfume & Accessories',
    src: '/videos/clara-luxury-perfume.mp4?v=1',
    poster: '/videos/posters/clara-luxury-perfume.jpg?v=1',
  },
  {
    id: 'minimalist-fashion-apparel',
    name: 'Minimalist Fashion & Apparel',
    src: '/videos/modest-fashion-apparel.mp4?v=6',
    poster: '/videos/posters/modest-fashion-apparel.jpg?v=6',
  },
];

interface CreativeArtStylesSectionProps {
  onOpenQuestionnaire?: () => void;
}

export const CreativeArtStylesSection: React.FC<CreativeArtStylesSectionProps> = () => {
  const gifVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const commercialVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const commercialProgressBarRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const sectionRef = useRef<HTMLElement>(null);
  
  const [activeModalStyle, setActiveModalStyle] = useState<ArtStyleItem | null>(null);
  const [playingAudioIndex, setPlayingAudioIndex] = useState<number | null>(null);

  // Auto-play visual GIF-style loops when in viewport; audio videos remain paused on poster
  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const startVisualVideos = () => {
      gifVideoRefs.current.forEach((video) => {
        if (!video) return;
        video.defaultMuted = true;
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      });
    };

    const pauseAllVideos = () => {
      gifVideoRefs.current.forEach((video) => {
        if (video && !video.paused) {
          video.pause();
        }
      });
      commercialVideoRefs.current.forEach((video) => {
        if (video && !video.paused) {
          video.pause();
        }
      });
      setPlayingAudioIndex(null);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting ?? false;
        if (isVisible) {
          startVisualVideos();
        } else {
          pauseAllVideos();
        }
      },
      { threshold: 0.05, rootMargin: '100px 0px 100px 0px' }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Direct unmuted audio play/pause toggle with zero overlays or mute button
  const toggleAudioPlay = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = commercialVideoRefs.current[idx];
    if (!video) return;

    if (!video.paused && playingAudioIndex === idx) {
      video.pause();
      setPlayingAudioIndex(null);
    } else {
      // Pause any other active commercial video
      commercialVideoRefs.current.forEach((v, i) => {
        if (v && i !== idx && !v.paused) {
          v.pause();
        }
      });

      // Play with audio unmuted
      video.muted = false;
      video.defaultMuted = false;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setPlayingAudioIndex(idx))
          .catch(() => {
            video.muted = true;
            video.play().then(() => setPlayingAudioIndex(idx));
          });
      }
    }
  };

  const handleTimeUpdate = (idx: number) => {
    const video = commercialVideoRefs.current[idx];
    const bar = commercialProgressBarRefs.current[idx];
    if (video && video.duration && bar) {
      const pct = (video.currentTime / video.duration) * 100;
      bar.style.width = `${pct}%`;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="creative-styles"
      className="relative pt-6 sm:pt-14 md:pt-16 pb-8 sm:pb-24 bg-[#FAFBF6] text-slate-900 border-b border-slate-200/80 overflow-hidden select-none"
      style={{ backgroundColor: '#FAFBF6' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= SECTION 1: CHOOSE YOUR ART STYLE ================= */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-12">
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

        {/* 4 Art Styles Grid (Same Layout & Sizing) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto items-start">
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
                    gifVideoRefs.current[idx] = el;
                  }}
                  src={style.src}
                  poster={style.poster}
                  loop
                  muted
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  aria-label={style.name}
                >
                  <source src={style.src} type="video/mp4" />
                </video>
              </div>

              {/* Caption: Art-style name */}
              <p className="mt-3 sm:mt-4 text-center font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#FF3B14] transition-colors leading-snug">
                {style.name}
              </p>
            </div>
          ))}
        </div>

        {/* ================= SECTION 2: BRAND & COMMERCIAL VIDEO ADS ================= */}
        <div className="mt-8 sm:mt-24 pt-6 sm:pt-16 border-t border-slate-200/80">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-12">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black text-slate-950 tracking-tight leading-[1.12]">
              Turning ideas into{' '}
              <span className="font-editorial-italic font-normal italic text-[#FF3B14]">
                visual impact
              </span>.
            </h2>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 max-w-lg mx-auto font-normal leading-relaxed">
              We make videos that tell your brand’s story, grab attention, and get people interested in what you offer.
            </p>
          </div>

          {/* 3 Commercial Videos Grid - Exact Same Card Size and Layout as the GIFs above */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-5xl mx-auto items-start">
            {COMMERCIAL_VIDEOS.map((video, idx) => {
              const isPlaying = playingAudioIndex === idx;

              return (
                <div
                  key={video.id}
                  className="group flex flex-col items-center w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] md:w-[calc(25%-1.125rem)]"
                >
                  {/* Card Container */}
                  <div
                    onClick={(e) => toggleAudioPlay(idx, e)}
                    className={`relative w-full aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-md border transition-all duration-300 cursor-pointer ${
                      isPlaying
                        ? 'border-[#FF3B14]/80 shadow-[0_15px_35px_-5px_rgba(255,59,20,0.35)] ring-1 ring-[#FF3B14]/50'
                        : 'border-slate-200/90 hover:shadow-xl hover:border-slate-300'
                    }`}
                  >
                    <video
                      ref={(el) => {
                        commercialVideoRefs.current[idx] = el;
                      }}
                      src={video.src}
                      poster={video.poster}
                      loop
                      playsInline
                      preload="none"
                      onTimeUpdate={() => handleTimeUpdate(idx)}
                      onEnded={() => {
                        setPlayingAudioIndex(null);
                        if (commercialProgressBarRefs.current[idx]) {
                          commercialProgressBarRefs.current[idx]!.style.width = '0%';
                        }
                      }}
                      className="w-full h-full object-cover select-none pointer-events-none"
                      aria-label={video.name}
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>

                    {/* Clean HD Poster Overlay when Paused */}
                    {!isPlaying && video.poster && (
                      <img
                        src={video.poster}
                        alt={video.name}
                        className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none transition-opacity duration-200"
                        loading="eager"
                      />
                    )}

                    {/* Centered Play Button when Paused (clean, no badge or sticker overlays) */}
                    {!isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none z-20">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FF3B14]/95 hover:bg-[#FF3B14] backdrop-blur-md text-white flex items-center justify-center shadow-[0_0_30px_rgba(255,59,20,0.65)] group-hover:scale-110 active:scale-95 transition-all border border-white/40">
                          <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-0.5 text-white" />
                        </div>
                      </div>
                    )}

                    {/* Hover Pause Indicator when Playing */}
                    {isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 pointer-events-none z-20">
                        <div className="w-12 h-12 rounded-full bg-black/70 backdrop-blur-md text-white flex items-center justify-center shadow-lg border border-white/20">
                          <Pause className="w-5 h-5 fill-white text-white" />
                        </div>
                      </div>
                    )}

                    {/* Bottom Scrubber Progress Bar */}
                    <div className="absolute bottom-2.5 inset-x-3 z-20 flex flex-col gap-1 pointer-events-none">
                      <div className="w-full h-1 bg-white/25 rounded-full overflow-hidden">
                        <div
                          ref={(el) => {
                            commercialProgressBarRefs.current[idx] = el;
                          }}
                          className="h-full bg-[#FF3B14] rounded-full transition-all duration-75"
                          style={{ width: '0%' }}
                        />
                      </div>
                    </div>

                  </div>


                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Lightbox Modal on Tap/Click for visual style previews */}
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
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-3 text-center">
              <h3 className="text-base sm:text-lg font-heading font-black text-slate-900">
                {activeModalStyle.name}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
