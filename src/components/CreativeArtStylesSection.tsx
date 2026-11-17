import React, { useRef, useEffect, useState } from 'react';
import { X, Play, Pause, Instagram, ArrowUpRight } from 'lucide-react';
import { SectionContactBar } from './SectionContactBar';

interface ArtStyleItem {
  id: string;
  name: string;
  subtitle: string;
  src: string;
  poster: string;
}

const ART_STYLES: ArtStyleItem[] = [
  {
    id: 'electric-2d-doodle',
    name: 'Electric 2D Doodle',
    subtitle: 'Dynamic Line Art & Glow',
    src: '/showcase-gifs/showcase_1.mp4',
    poster: '/showcase-gifs/showcase_1.jpg',
  },
  {
    id: 'mixed-media-sketch',
    name: 'Mixed-Media Sketch',
    subtitle: 'Live-Action × Hand-Drawn Art',
    src: '/showcase-gifs/showcase_2.mp4',
    poster: '/showcase-gifs/showcase_2.jpg',
  },
  {
    id: 'die-cut-paper-sticker',
    name: 'Die-Cut Paper Sticker',
    subtitle: 'Tactile Collage & Papercraft',
    src: '/showcase-gifs/showcase_3.mp4',
    poster: '/showcase-gifs/showcase_3.jpg',
  },
  {
    id: 'meadow-storybook-cel',
    name: 'Meadow Storybook Cel',
    subtitle: 'Warm Illustrated Cel Animation',
    src: '/showcase-gifs/showcase_4.mp4',
    poster: '/showcase-gifs/showcase_4.jpg',
  },
];

interface CommercialVideoItem {
  id: string;
  name: string;
  subtitle?: string;
  sceneSubtitle?: string;
  src: string;
  poster: string;
}

const COMMERCIAL_VIDEOS: CommercialVideoItem[] = [
  {
    id: 'artisanal-coffee-cafe',
    name: 'Warm Cinematic Ambience',
    src: '/videos/kafora-artisanal-coffee.mp4',
    poster: '/videos/posters/kafora-artisanal-coffee.jpg',
  },
  {
    id: 'luxury-fragrance-lifestyle',
    name: 'Bold Studio Commercial',
    src: '/videos/zevaro-luxury-perfume.mp4',
    poster: '/videos/posters/zevaro-luxury-perfume.jpg',
  },
  {
    id: 'clara-luxury-perfume',
    name: 'Editorial Lifestyle Showcase',
    src: '/videos/clara-luxury-perfume.mp4',
    poster: '/videos/posters/clara-luxury-perfume.jpg',
  },
  {
    id: 'minimalist-fashion-apparel',
    name: 'Contemporary Lookbook Aesthetic',
    src: '/videos/modest-fashion-apparel.mp4',
    poster: '/videos/posters/modest-fashion-apparel.jpg',
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
  const [loadingAudioIndex, setLoadingAudioIndex] = useState<number | null>(null);

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
      setLoadingAudioIndex(null);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting ?? false;
        if (isVisible) {
          startVisualVideos();
          // Warm up metadata so tapping any commercial video plays immediately
          commercialVideoRefs.current.forEach((v) => {
            if (v && v.preload !== 'auto') {
              v.preload = 'metadata';
            }
          });
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

  // Direct unmuted audio play/pause toggle with instant visual feedback
  const toggleAudioPlay = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = commercialVideoRefs.current[idx];
    if (!video) return;

    if (!video.paused && playingAudioIndex === idx) {
      video.pause();
      setPlayingAudioIndex(null);
      setLoadingAudioIndex(null);
    } else {
      // Pause any other active commercial video
      commercialVideoRefs.current.forEach((v, i) => {
        if (v && i !== idx && !v.paused) {
          v.pause();
        }
      });

      // Pause GIF video loops so mobile GPU decoder & network bandwidth are 100% dedicated to this video
      gifVideoRefs.current.forEach((v) => {
        if (v && !v.paused) {
          v.pause();
        }
      });

      // Show immediate loading state so user knows the click registered
      setLoadingAudioIndex(idx);
      video.muted = false;
      video.defaultMuted = false;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlayingAudioIndex(idx);
            setLoadingAudioIndex(null);
          })
          .catch((err) => {
            if (err?.name === 'AbortError') return;
            video.muted = true;
            video.play()
              .then(() => {
                setPlayingAudioIndex(idx);
                setLoadingAudioIndex(null);
              })
              .catch((e) => {
                if (e?.name !== 'AbortError') {
                  setPlayingAudioIndex(null);
                  setLoadingAudioIndex(null);
                }
              });
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
      id="social-media"
      className="relative pt-8 sm:pt-16 md:pt-20 pb-12 sm:pb-24 bg-white text-slate-900 border-b border-slate-200/80 overflow-hidden select-none scroll-mt-[54px]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= 1. SOCIAL MEDIA MANAGEMENT TEXT & PROOF ================= */}
        <div id="social-media-mgmt" className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-heading font-black text-slate-950 tracking-tight leading-[1.08] mb-3 sm:mb-4">
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
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 hover:bg-[#FF3B14] text-white font-heading font-black text-sm sm:text-base shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              title="View @quintessentialsmumbai on Instagram"
            >
              <Instagram className="w-4 h-4 text-rose-400 group-hover:text-white transition-colors shrink-0" />
              <span className="tracking-tight">@quintessentialsmumbai</span>
              <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </a>
          </div>
        </div>

        {/* ================= 2. CHOOSE YOUR ART STYLE (HEADING & 4 GIFS) ================= */}
        <div id="art-styles" className="mt-12 sm:mt-16 pt-2 sm:pt-4">
          
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-slate-950 tracking-tight leading-[1.18]">
              Choose your{' '}
              <span className="font-editorial-italic font-normal italic text-[#FF3B14]">
                artstyle
              </span>.
            </h2>

            <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-slate-600 max-w-lg mx-auto font-normal leading-relaxed">
              Tell us what you have in mind. We’ll bring your story to life in the art style that feels right for you.
            </p>
          </div>

          {/* 4 Hand-Crafted Art Style GIFs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto items-start">
            {ART_STYLES.map((style, idx) => (
              <div
                key={style.id}
                className="group flex flex-col items-center w-full"
              >
                {/* Card Container */}
                <div
                  onClick={() => setActiveModalStyle(style)}
                  className="relative w-full aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12)] border border-slate-200/90 hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.22)] hover:border-slate-400/80 transition-all duration-300 cursor-pointer"
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

        </div>

        {/* ================= 3. 4 COMMERCIAL VIDEOS ================= */}
        <div className="mt-6 sm:mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto items-start">
            {COMMERCIAL_VIDEOS.map((video, idx) => {
              const isPlaying = playingAudioIndex === idx;

              return (
                <div
                  key={video.id}
                  className="group flex flex-col items-center w-full"
                >
                  {/* Card Container */}
                  <div
                    onClick={(e) => toggleAudioPlay(idx, e)}
                    className={`relative w-full aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12)] border transition-all duration-300 cursor-pointer ${
                      isPlaying
                        ? 'border-[#FF3B14]/80 shadow-[0_15px_35px_-5px_rgba(255,59,20,0.35)] ring-1 ring-[#FF3B14]/50'
                        : 'border-slate-200/90 hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.22)] hover:border-slate-400/80'
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
                      preload="auto"
                      onTimeUpdate={() => handleTimeUpdate(idx)}
                      onEnded={() => {
                        setPlayingAudioIndex(null);
                        setLoadingAudioIndex(null);
                        if (commercialProgressBarRefs.current[idx]) {
                          commercialProgressBarRefs.current[idx]!.style.width = '0%';
                        }
                      }}
                      className="w-full h-full object-cover select-none pointer-events-none"
                      aria-label={video.name}
                    />

                    {/* Clean HD Poster Overlay when Paused */}
                    {!isPlaying && video.poster && (
                      <img
                        src={video.poster}
                        alt={video.name}
                        className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none transition-opacity duration-200"
                        loading="eager"
                      />
                    )}

                    {/* Centered Play Button when Paused or Loading (instant spinner on press) */}
                    {!isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none z-20">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FF3B14]/95 hover:bg-[#FF3B14] backdrop-blur-md text-white flex items-center justify-center shadow-[0_0_30px_rgba(255,59,20,0.65)] group-hover:scale-110 active:scale-95 transition-all border border-white/40">
                          {loadingAudioIndex === idx ? (
                            <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-0.5 text-white" />
                          )}
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
                    <div className="absolute bottom-2 inset-x-3 z-20 flex flex-col gap-1 pointer-events-none">
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

                  {/* Caption: Commercial Video Style (Same as GIFs above) */}
                  <p className="mt-3 sm:mt-4 text-center font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#FF3B14] transition-colors leading-snug">
                    {video.name}
                  </p>

                </div>
              );
            })}
          </div>
        </div>

        {/* Section Contact Bar with Personalized WhatsApp Prompt */}
        <SectionContactBar
          sectionName="Social Media Management"
          helperText="Want your posts, reels, and page handled?"
          prompt="Hi Markyt team! I would like to know how you will manage the social media for my business, including custom post design, organic reels, and growth."
        />

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
