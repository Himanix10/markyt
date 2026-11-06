import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { VIDEO_PORTFOLIO_WORKS } from '../data/content';

interface CreativeProductionPageProps {
  onOpenQuestionnaire?: () => void;
  onBackToHome?: () => void;
}

export const CreativeProductionPage: React.FC<CreativeProductionPageProps> = () => {
  const [activeStudioIndex, setActiveStudioIndex] = useState<number>(0);
  const [isStudioPlaying, setIsStudioPlaying] = useState<boolean>(true);

  // Responsive window width tracking for 3D stage calculations
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    let lastW = typeof window !== 'undefined' ? window.innerWidth : 0;
    const handleResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth !== lastW) {
        lastW = window.innerWidth;
        setWindowWidth(window.innerWidth);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Video element refs mapped by index
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const stageRef = useRef<HTMLDivElement>(null);
  const [isStageInView, setIsStageInView] = useState<boolean>(false);

  // User gesture & playback intent tracking
  const hasUserInteracted = useRef<boolean>(false);
  const isAudioActive = useRef<boolean>(false);
  const userWantsPlaying = useRef<boolean>(true);

  const totalWorks = VIDEO_PORTFOLIO_WORKS.length;

  // Auto-play the target video reliably with audio enabled upon user engagement
  const playVideoSafely = useCallback((video: HTMLVideoElement | null) => {
    if (!video) return;

    // If user has stopped/paused the video, do NOT play
    if (!userWantsPlaying.current) {
      video.pause();
      video.muted = true;
      setIsStudioPlaying(false);
      return;
    }

    if (video.currentTime > 0 && video.ended) {
      video.currentTime = 0;
    }

    video.playsInline = true;
    video.loop = true;

    // Enable audio automatically if user has engaged with the carousel/controls
    if (hasUserInteracted.current || isAudioActive.current) {
      video.muted = false;
      video.volume = 1.0;
    } else {
      // Passive initial load: start muted to satisfy initial browser autoplay restrictions
      video.muted = true;
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsStudioPlaying(true);
        })
        .catch((err) => {
          // AbortError is natural when switching slides or scrubbed rapidly; never pause or kill playing state on AbortError
          if (err?.name === 'AbortError') {
            return;
          }
          // If browser policy rejects unmuted playback before direct touch gesture, fall back to muted seamlessly
          if (err?.name === 'NotAllowedError') {
            video.muted = true;
            video.play()
              .then(() => {
                setIsStudioPlaying(true);
              })
              .catch((e) => {
                if (e?.name !== 'AbortError') {
                  setIsStudioPlaying(false);
                }
              });
          } else {
            setIsStudioPlaying(false);
          }
        });
    }
  }, []);

  // Play active center video when in view or when user switches cards
  useEffect(() => {
    // 1. Pause, silence and reset all inactive videos
    Object.entries(videoRefs.current).forEach(([k, vid]) => {
      if (vid && Number(k) !== activeStudioIndex) {
        try {
          if (!vid.paused) vid.pause();
          vid.currentTime = 0;
          vid.muted = true;
          vid.volume = 0;
        } catch {}
      }
    });

    // 2. Play active center video only if stage is visible and user hasn't explicitly stopped it
    const activeVideo = videoRefs.current[activeStudioIndex];
    if (activeVideo) {
      if (isStageInView && userWantsPlaying.current) {
        playVideoSafely(activeVideo);
      } else {
        activeVideo.pause();
        activeVideo.muted = true;
        setIsStudioPlaying(false);
      }
    }
  }, [activeStudioIndex, isStageInView, playVideoSafely]);

  // Auto-pause video when scrolled out of viewport, and start when scrolled in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentVideo = videoRefs.current[activeStudioIndex];
          if (!entry.isIntersecting) {
            setIsStageInView(false);
            if (currentVideo && !currentVideo.paused) {
              currentVideo.pause();
              setIsStudioPlaying(false);
            }
          } else {
            setIsStageInView(true);
            // User scrolled into view: start active video cleanly
            if (currentVideo && currentVideo.paused && userWantsPlaying.current) {
              playVideoSafely(currentVideo);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '60px 0px 60px 0px' }
    );

    if (stageRef.current) {
      observer.observe(stageRef.current);
    }

    const handleVisibilityChange = () => {
      const currentVideo = videoRefs.current[activeStudioIndex];
      if (document.hidden) {
        if (currentVideo && !currentVideo.paused) {
          currentVideo.pause();
          setIsStudioPlaying(false);
        }
      } else {
        if (currentVideo && currentVideo.paused) {
          playVideoSafely(currentVideo);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [activeStudioIndex, playVideoSafely]);

  // Handle switching active work
  const handleSelectWork = useCallback((newIndex: number) => {
    if (newIndex === activeStudioIndex) return;

    hasUserInteracted.current = true;
    
    // Forcibly silence and pause all video references immediately to guarantee zero audio leak
    Object.values(videoRefs.current).forEach((v) => {
      if (v) {
        try {
          v.pause();
          v.currentTime = 0;
          v.muted = true;
          v.volume = 0;
        } catch {}
      }
    });

    setActiveStudioIndex(newIndex);

    // If user explicitly paused/stopped the video, KEEP IT STOPPED when moving forward!
    if (!userWantsPlaying.current) {
      setIsStudioPlaying(false);
    } else {
      setIsStudioPlaying(true);
    }
  }, [activeStudioIndex]);

  // Seamless Infinite Loop Navigation (Prev / Next)
  const handlePrevWork = useCallback(() => {
    const prevIndex = (activeStudioIndex - 1 + totalWorks) % totalWorks;
    handleSelectWork(prevIndex);
  }, [activeStudioIndex, totalWorks, handleSelectWork]);

  const handleNextWork = useCallback(() => {
    const nextIndex = (activeStudioIndex + 1) % totalWorks;
    handleSelectWork(nextIndex);
  }, [activeStudioIndex, totalWorks, handleSelectWork]);

  // Toggle Play / Pause for the active focused video (tap anywhere on center card)
  const toggleStudioPlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    hasUserInteracted.current = true;
    isAudioActive.current = true;

    const activeVideo = videoRefs.current[activeStudioIndex];
    if (!activeVideo) return;

    if (!activeVideo.paused && isStudioPlaying) {
      // User explicitly stopped/paused the video
      userWantsPlaying.current = false;
      activeVideo.pause();
      setIsStudioPlaying(false);
    } else {
      // User explicitly requested playback / unmuting
      userWantsPlaying.current = true;
      activeVideo.muted = false;
      activeVideo.volume = 1.0;
      setIsStudioPlaying(true);
      playVideoSafely(activeVideo);
    }
  };

  // Touchpad / Trackpad horizontal scroll support (left to right & right to left)
  const lastWheelTime = useRef<number>(0);
  const accumulatedDeltaX = useRef<number>(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (e: WheelEvent) => {
      // Only process when horizontal delta is strictly greater than vertical
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;

      // Prevent browser forward/back navigation gesture when swiping horizontally on trackpad
      if (Math.abs(e.deltaX) > 8) {
        e.preventDefault();
      }

      accumulatedDeltaX.current += e.deltaX;
      const now = Date.now();

      const WHEEL_THRESHOLD = 30;
      const WHEEL_COOLDOWN = 280;

      if (now - lastWheelTime.current > WHEEL_COOLDOWN) {
        if (accumulatedDeltaX.current > WHEEL_THRESHOLD) {
          handleNextWork();
          lastWheelTime.current = now;
          accumulatedDeltaX.current = 0;
        } else if (accumulatedDeltaX.current < -WHEEL_THRESHOLD) {
          handlePrevWork();
          lastWheelTime.current = now;
          accumulatedDeltaX.current = 0;
        }
      }
    };

    stage.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      stage.removeEventListener('wheel', handleWheel);
    };
  }, [handleNextWork, handlePrevWork]);

  // Touch Swipe & Drag detection for mobile/touch
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only swipe if horizontal swipe is dominant over vertical scroll
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX > 40) {
        handlePrevWork();
      } else if (deltaX < -40) {
        handleNextWork();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Calculate shortest circular offset for 3D amphitheater stage (-2 to +2)
  const getOffset = (index: number) => {
    let diff = index - activeStudioIndex;
    if (diff > totalWorks / 2) diff -= totalWorks;
    if (diff < -totalWorks / 2) diff += totalWorks;
    return diff;
  };

  // 3D Perspective Coverflow styling
  const getCardStyle = (offset: number) => {
    const absOffset = Math.abs(offset);
    const isMobile = windowWidth < 768;
    const isSmallMobile = windowWidth < 640;

    // On mobile phones (<640px), hide cards beyond +/- 1 to prevent lateral overflow or arrow collision
    // Use visibility: hidden instead of display: none to keep video memory buffered and prevent decoder teardown
    if ((isSmallMobile && absOffset > 1) || absOffset > 2) {
      return {
        visibility: 'hidden' as const,
        opacity: 0,
        pointerEvents: 'none' as const,
      };
    }

    const isCenter = offset === 0;

    // Stacking order
    const zIndex = isCenter ? 30 : absOffset === 1 ? 20 : 10;
    
    // Horizontal displacement calibrated for phone vs desktop (keeps videos spaced apart with clear breathing room)
    const translateX = isSmallMobile 
      ? offset * 175 
      : isMobile 
        ? offset * 260 
        : offset * 335;
      
    // 3D Depth & Inward concave rotation
    const translateZ = isCenter ? 0 : absOffset === 1 ? -100 : -240;
    const rotateY = isCenter ? 0 : offset * -18;
    const scale = isCenter ? 1 : absOffset === 1 ? (isSmallMobile ? 0.76 : 0.82) : 0.65;
    const opacity = isCenter ? 1 : absOffset === 1 ? 0.7 : 0.4;

    return {
      transform: `translate3d(-50%, -50%, ${translateZ}px) translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex,
      opacity,
      visibility: isMobile && absOffset >= 2 ? 'hidden' : 'visible',
      willChange: 'transform, opacity',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease',
    };
  };

  return (
    <div className="relative bg-white text-slate-900 selection:bg-[#FF3B14]/20 selection:text-slate-950">

      {/* Flagship Section: 3D Coverflow Reel Theater Showcase */}
      <section 
        id="creatives" 
        className="relative overflow-hidden bg-gradient-to-b from-[#B8C1FA] via-[#C8D1FD] to-white py-6 sm:py-16 md:py-20 px-3 sm:px-6 lg:px-8 scroll-mt-[54px] select-none"
      >


        {/* 1. Stage Key Light & Seamless Ambient Glow */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 30% at 50% 80%, rgba(255, 59, 20, 0.08) 0%, rgba(255, 255, 255, 0) 70%)',
          }}
          aria-hidden="true"
        />

        {/* 2. Precision Motion Design & Camera Grid */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.22]"
          style={{
            backgroundImage: `
              radial-gradient(rgba(15, 23, 42, 0.25) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />

        {/* 3. Production Timeline Frame Ruler along Top Edge */}
        <div className="absolute top-0 inset-x-0 h-6 border-b border-slate-900/10 pointer-events-none hidden sm:flex items-center justify-between px-8 text-[9px] font-mono text-slate-500/75 select-none">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
              TIMELINE: 00:00:00
            </span>
            <span className="hidden md:inline">FRAME RATE: 60.00 FPS</span>
          </div>
          <div className="flex items-center gap-8 tracking-widest text-[8.5px]">
            <span>00:05</span>
            <span className="hidden lg:inline">00:10</span>
            <span>00:15</span>
            <span className="hidden lg:inline">00:20</span>
            <span className="text-[#FF3B14] font-semibold">00:25 [IN/OUT]</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline">AUDIO: 48kHz / 24-BIT</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-900/10 text-slate-800 text-[8px] font-bold">PRORES HQ</span>
          </div>
        </div>

        {/* 6. Precision Viewfinder HUD Reticles (Corners) */}
        {/* Top-Left Viewfinder HUD */}
        <div className="absolute top-9 left-5 lg:left-8 pointer-events-none hidden sm:flex items-center gap-2 z-10 select-none">
          <div className="w-5 h-5 border-t-2 border-l-2 border-slate-900/40" />
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-md border border-slate-900/10 shadow-2xs text-[10px] font-mono font-bold text-slate-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>LIVE PREVIEW</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-normal">4K UHD</span>
          </div>
        </div>

        {/* Top-Right Viewfinder HUD */}
        <div className="absolute top-9 right-5 lg:right-8 pointer-events-none hidden sm:flex items-center gap-2 z-10 select-none">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-md border border-slate-900/10 shadow-2xs text-[10px] font-mono font-bold text-slate-800">
            <span className="text-emerald-700">STEREO HI-FI</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-normal">DCI-P3</span>
          </div>
          <div className="w-5 h-5 border-t-2 border-r-2 border-slate-900/40" />
        </div>

        {/* Bottom-Left Viewfinder HUD */}
        <div className="absolute bottom-6 left-5 lg:left-8 pointer-events-none hidden sm:flex items-center gap-2 z-10 select-none">
          <div className="w-5 h-5 border-b-2 border-l-2 border-slate-900/40" />
          <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">
            CAM SUITE // ASPECT 9:16
          </span>
        </div>

        {/* Bottom-Right Viewfinder HUD */}
        <div className="absolute bottom-6 right-5 lg:right-8 pointer-events-none hidden sm:flex items-center gap-2 z-10 select-none">
          <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">
            SHUTTER 180° // AUTO-PLAY
          </span>
          <div className="w-5 h-5 border-b-2 border-r-2 border-slate-900/40" />
        </div>

        {/* 7. Center Crosshair Framing Marks */}
        <div className="absolute top-1/2 left-4 -translate-y-1/2 pointer-events-none hidden xl:block text-slate-400/50 font-mono text-xs select-none">
          + SAFE MARGIN 90%
        </div>
        <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none hidden xl:block text-slate-400/50 font-mono text-xs select-none text-right">
          STAGE CENTER +
        </div>

        {/* Floating Creative Production Accents */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [-1, 1, -1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-16 left-12 lg:left-24 z-10 hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-900/10 shadow-sm text-slate-900 pointer-events-none select-none"
        >
          {/* Animated mini equalizer / audio wave bars */}
          <div className="flex items-end gap-0.5 h-3.5">
            <motion.span 
              animate={{ height: ['40%', '100%', '40%'] }} 
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} 
              className="w-1 bg-[#FF3B14] rounded-full" 
            />
            <motion.span 
              animate={{ height: ['80%', '30%', '90%', '80%'] }} 
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} 
              className="w-1 bg-slate-950 rounded-full" 
            />
            <motion.span 
              animate={{ height: ['50%', '100%', '60%'] }} 
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} 
              className="w-1 bg-[#FF3B14] rounded-full" 
            />
          </div>
          <span className="text-[11px] font-mono font-bold tracking-tight text-slate-800">
            9:16 Vertical Storytelling
          </span>
        </motion.div>



        <div className="max-w-6xl mx-auto relative z-10 pt-2 sm:pt-4">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-8">


            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-slate-950 tracking-tight leading-tight mb-3">
              Ad <span className="font-editorial-italic font-normal italic text-[#FF3B14]">Creatives</span>
            </h2>

            <p className="text-sm sm:text-base md:text-[17px] text-slate-700 leading-relaxed max-w-xl mx-auto font-normal">
              Animations, product shoots, high-end creatives: brands usually pay ₹50,000 or more. We do it for a fraction of that, using a talented team and bunch of smart tools with AI rendering. Projects start at just ₹5,000<span className="text-[#FF3B14] font-bold">*</span>.
            </p>
          </div>

          {/* 3D Coverflow Stage Container */}
          <div 
            ref={stageRef}
            className="relative w-full h-[390px] sm:h-[480px] md:h-[520px] flex items-center justify-center my-2 select-none overflow-hidden sm:overflow-visible touch-pan-y"
            style={{ perspective: '1200px', transformStyle: 'preserve-3d', willChange: 'transform' }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left Edge Floating Arrow Button */}
            <button
              type="button"
              onClick={handlePrevWork}
              className="absolute left-1.5 sm:left-6 md:left-10 z-40 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white text-slate-950 border border-white/60 shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
              title="Previous Video"
              aria-label="Previous Video"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Right Edge Floating Arrow Button */}
            <button
              type="button"
              onClick={handleNextWork}
              className="absolute right-1.5 sm:right-6 md:right-10 z-40 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white text-slate-950 border border-white/60 shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
              title="Next Video"
              aria-label="Next Video"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Render Active & Adjacent Cards */}
            {VIDEO_PORTFOLIO_WORKS.map((work, idx) => {
              const offset = getOffset(idx);
              const isCenter = offset === 0;
              const absOffset = Math.abs(offset);
              const cardStyle = getCardStyle(offset);
              const shouldMountVideo = isCenter; // High-Performance Mobile: Only mount active video so 100% network bandwidth & GPU decoder are dedicated to active video

              return (
                <div
                  key={work.id}
                  style={cardStyle}
                  onClick={() => {
                    if (!isCenter) handleSelectWork(idx);
                  }}
                  className={`absolute top-1/2 left-1/2 w-[205px] sm:w-[260px] md:w-[285px] h-[360px] sm:h-[455px] md:h-[495px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer select-none transition-all duration-300 ${
                    isCenter 
                      ? 'shadow-[0_20px_50px_-10px_rgba(255,59,20,0.35),0_10px_30px_-5px_rgba(0,0,0,0.3)] ring-1 ring-white/50' 
                      : 'shadow-xl hover:ring-1 hover:ring-white/40'
                  }`}
                >
                  {/* Clean Edge-to-Edge Video (Mount strictly active video so mobile GPU decoders stay fast and smooth) */}
                  {shouldMountVideo && (
                    <video
                      ref={(el) => {
                        if (el) {
                          videoRefs.current[idx] = el;
                        } else {
                          delete videoRefs.current[idx];
                        }
                      }}
                      src={encodeURI(work.videoSrc)}
                      poster={work.poster ? encodeURI(work.poster) : undefined}
                      className="absolute inset-0 w-full h-full object-cover bg-slate-950 cursor-pointer"
                      loop
                      autoPlay={isCenter && isStageInView && userWantsPlaying.current}
                      muted={!isCenter || !(hasUserInteracted.current || isAudioActive.current)}
                      playsInline
                      preload="auto"
                      onPlay={() => {
                        if (isCenter) setIsStudioPlaying(true);
                      }}
                      onPlaying={() => {
                        if (isCenter) setIsStudioPlaying(true);
                      }}
                      onPause={() => {
                        if (isCenter) setIsStudioPlaying(false);
                      }}
                      onEnded={isCenter ? handleNextWork : undefined}
                    />
                  )}

                  {/* Guaranteed HD Poster Image Overlay (visible on non-center cards and while paused/buffering) */}
                  {(!isCenter || !isStudioPlaying) && work.poster && (
                    <img
                      src={encodeURI(work.poster)}
                      alt={work.title}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none z-[5] transition-opacity duration-300"
                      loading={absOffset <= 2 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  )}

                  {/* Frosted Glass Sheen Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/25 z-10" />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl ring-1 ring-inset ring-white/20 z-10" />

                  {/* Active Center Video: Controls */}
                  {isCenter ? (
                    <>
                      {/* Center Play / Pause Overlay (Zero buffering spinner obstruction) */}
                      <div 
                        onClick={toggleStudioPlay}
                        className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer group/centerplay"
                      >
                        {!isStudioPlaying ? (
                          <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-[#FF3B14]/90 hover:bg-[#FF3B14] backdrop-blur-md text-white flex items-center justify-center shadow-[0_0_35px_rgba(255,59,20,0.6)] hover:scale-110 active:scale-95 transition-all border border-white/30">
                            <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-1 text-white" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-[#FF3B14] backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover/centerplay:opacity-100 active:opacity-100 transition-opacity shadow-xl border border-white/20">
                            <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    /* Background Inactive Cards: Clean Frosted Glass Depth (No Captions) */
                    <div className="absolute inset-0 z-20 bg-slate-950/30 hover:bg-slate-950/15 backdrop-blur-[2px] transition-all" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-2.5 sm:mt-4">
            {VIDEO_PORTFOLIO_WORKS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectWork(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeStudioIndex === idx
                    ? 'w-7 h-1.5 bg-[#FF3B14]'
                    : 'w-2 h-1.5 bg-slate-950/20 hover:bg-slate-950/50'
                }`}
                title={`Jump to Work #${idx + 1}`}
              />
            ))}
          </div>

          {/* Fractional Pricing & Portfolio Rights Footnote */}
          <div className="mt-3.5 sm:mt-7 text-center px-4">
            <p className="text-[11px] sm:text-xs text-slate-500 font-mono leading-relaxed inline-flex items-center justify-center gap-1.5">
              <span className="text-[#FF3B14] font-bold shrink-0">*</span>
              <span>Our creative work is offered at a fractional cost in exchange for the right to showcase it in our portfolio and marketing.</span>
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
