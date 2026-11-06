import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  BarChart2,
  
} from 'lucide-react';
import { 
  CampaignProofData, 
  CAMPAIGN_PROOF_ROWS 
} from '../data/campaignProofData';
import { 
  fetchCampaignProofRows 
} from '../services/campaignProofSheetService';

export const ABOUT_US_VIDEO_PATH = '/videos/about-us.mp4?v=5';
export const ABOUT_US_POSTER_PATH = '/videos/posters/about-us.jpg';

interface InteractiveAdSimulatorProps {
  onOpenQuestionnaire?: () => void;
  videoSrc?: string;
}

export const InteractiveAdSimulator: React.FC<InteractiveAdSimulatorProps> = ({
  onOpenQuestionnaire: _onOpenQuestionnaire,
  videoSrc = ABOUT_US_VIDEO_PATH,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);

  // Live Google Sheet sync state (automatically synced from sheet in background)
  const [proofRows, setProofRows] = useState<CampaignProofData[]>(CAMPAIGN_PROOF_ROWS);

  // Load and sync data from Google Sheet in background
  const loadSheetData = async () => {
    try {
      const result = await fetchCampaignProofRows();
      if (result.rows && result.rows.length > 0) {
        setProofRows(result.rows);
      }
    } catch (e: any) {
      console.warn('Sync failed:', e);
    }
  };

  useEffect(() => {
    loadSheetData();

    // Auto-poll for live updates every 60 seconds
    const interval = setInterval(() => {
      loadSheetData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Auto-pause video if user scrolls section out of viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleVisibilityChange = () => {
      if (document.hidden && videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Play with audio; fallback seamlessly to muted so it NEVER fails to play
  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          if (err?.name === 'AbortError') return;
          // Autoplay policy prevented audio: play muted so video plays 100% reliably
          video.muted = true;
          video.play()
            .then(() => setIsPlaying(true))
            .catch((e) => {
              if (e?.name !== 'AbortError') setIsPlaying(false);
            });
        });
    }
  };

  const handleStop = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      handleStop();
    } else {
      handlePlay();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration && progressBarRef.current) {
      const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      progressBarRef.current.style.width = `${pct}%`;
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current || !videoRef.current.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    videoRef.current.currentTime = pos * videoRef.current.duration;
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${pos * 100}%`;
    }
  };

  return (
    <div className="relative max-w-5xl mx-auto group/walkthrough">
      {/* Outer Animated Multi-Color Glow Aura */}
      <motion.div 
        animate={{
          opacity: [0.55, 0.9, 0.55],
          scale: [0.99, 1.02, 0.99]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="hidden sm:block absolute -inset-3 rounded-[38px] bg-gradient-to-r from-[#B8C1FA] via-[#FF3B14]/40 to-[#818CF8]/50 blur-2xl pointer-events-none -z-10"
      />

      {/* Main Bright Vibrant Luxury Card */}
      <div 
        ref={containerRef}
        className="relative bg-gradient-to-br from-[#B8C1FA] via-[#C8D1FD] to-[#FFD8CF] rounded-3xl border-2 border-white/95 shadow-[0_25px_60px_-15px_rgba(79,70,229,0.22),0_10px_25px_-5px_rgba(255,59,20,0.12)] overflow-hidden p-2.5 sm:p-6 lg:p-8 z-0"
      >
        {/* Animated Aurora Gradient Blobs & Subtle Dot Matrix Texture */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          {/* Subtle Grid Dot Matrix */}
          <div 
            className="absolute inset-0 opacity-[0.3]"
            style={{
              backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.15) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Desktop-only animated aurora orbs: disabled on mobile to prevent GPU blur contention */}
          <div className="hidden sm:block">
            {/* Orb 1: Coral Sunset Glow */}
            <motion.div
              animate={{
                x: [0, 45, -30, 0],
                y: [0, -35, 25, 0],
                scale: [1, 1.18, 0.9, 1],
                rotate: [0, 40, -20, 0],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-16 -left-16 w-[440px] h-[440px] rounded-full bg-gradient-to-tr from-[#FF3B14]/45 via-[#F97316]/40 to-[#FBBF24]/35 blur-3xl"
            />

            {/* Orb 2: Electric Periwinkle / Violet */}
            <motion.div
              animate={{
                x: [0, -40, 30, 0],
                y: [0, 35, -25, 0],
                scale: [1, 0.88, 1.2, 1],
                rotate: [0, -35, 25, 0],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-16 -right-16 w-[480px] h-[480px] rounded-full bg-gradient-to-bl from-[#818CF8]/50 via-[#6366F1]/40 to-[#38BDF8]/35 blur-3xl"
            />

            {/* Orb 3: Golden Sunshine */}
            <motion.div
              animate={{
                opacity: [0.35, 0.7, 0.35],
                scale: [0.92, 1.12, 0.92],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[300px] rounded-full bg-gradient-to-r from-amber-300/45 via-[#FDE047]/40 to-[#FF3B14]/30 blur-2xl"
            />
          </div>
        </div>

        {/* Header Row: Meta Ads Pill + Headline */}
        <div className="relative z-10 mb-3.5 sm:mb-6 flex flex-col gap-1.5 sm:gap-2.5">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-900/10 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <span className="text-[10px] font-mono font-bold tracking-tight text-slate-800 uppercase">
                Meta Ads Manager
              </span>
            </div>
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-slate-950 tracking-tight leading-[1.08]">
            Know{' '}
            <span className="font-editorial-italic font-normal text-[#FF3B14] underline decoration-slate-950/20 underline-offset-8">
              About Us
            </span>
          </h3>
        </div>

        {/* Content Grid: Table and Video Side-by-Side (Aligned at Top and Bottom) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 items-center relative z-10">
          
          {/* Left Column: Real Proof Table */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center text-left">
            {/* Live Meta Ads Manager Proof Table */}
            <div className="rounded-2xl border border-slate-900/10 bg-white/95 backdrop-blur-md overflow-hidden shadow-md sm:shadow-lg flex flex-col">

              {/* Scrollable Table Body with Sticky Header - Perfectly balanced with video player height */}
              <div className="w-full max-h-[320px] sm:max-h-[420px] md:max-h-[460px] overflow-y-auto overscroll-contain">
                <table className="w-full table-fixed text-left border-collapse">
                  <colgroup>
                    <col className="w-[28%]" />
                    <col className="w-[19%]" />
                    <col className="w-[14%]" />
                    <col className="w-[17%]" />
                    <col className="w-[22%]" />
                  </colgroup>
                  <thead className="sticky top-0 z-10 bg-slate-100/95 backdrop-blur-md shadow-xs">
                    <tr className="border-b border-slate-200 text-[8.5px] sm:text-[10px] md:text-[11px] font-space font-bold uppercase tracking-wider text-slate-600">
                      <th className="py-2.5 sm:py-3 px-2 sm:px-3 text-left whitespace-nowrap bg-slate-100/95">Campaign</th>
                      <th className="py-2.5 sm:py-3 px-1 sm:px-2 text-center whitespace-nowrap bg-slate-100/95">Delivery</th>
                      <th className="py-2.5 sm:py-3 px-1 sm:px-2 text-right whitespace-nowrap bg-slate-100/95">Results</th>
                      <th className="py-2.5 sm:py-3 px-1 sm:px-2 text-right whitespace-nowrap bg-slate-100/95">
                        <span className="hidden sm:inline">Cost / Result</span>
                        <span className="sm:hidden">Cost/Res.</span>
                      </th>
                      <th className="py-2.5 sm:py-3 px-2 sm:px-3 text-right whitespace-nowrap bg-slate-100/95">
                        <span className="hidden sm:inline">Amount Spent</span>
                        <span className="sm:hidden">Spent</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {proofRows.map((row, idx) => (
                      <tr 
                        key={idx} 
                        className={`transition-colors duration-150 ${
                          idx % 2 === 1 ? 'bg-slate-50/40' : 'bg-white'
                        } ${
                          row.isPurchase 
                            ? 'hover:bg-emerald-50/40' 
                            : 'hover:bg-slate-100/60'
                        }`}
                      >
                        {/* 1. Campaign Name + Badge/Type */}
                        <td className="py-2 sm:py-2.5 px-2 sm:px-3 align-middle overflow-hidden">
                          <div className="flex flex-col gap-0.5">
                            <div className="font-space font-bold text-slate-950 text-[10.5px] sm:text-xs md:text-[13px] leading-snug line-clamp-2">
                              {row.campaign}
                            </div>
                            <div className="flex flex-wrap items-center gap-1 mt-0.5">
                              {row.campaignType && (
                                <span className="inline-block px-1 py-0.5 rounded text-[7.5px] sm:text-[8.5px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200/90 leading-none">
                                  {row.campaignType}
                                </span>
                              )}
                              {row.badge && (
                                <span className={`inline-block px-1 py-0.5 rounded text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider border leading-none ${
                                  row.badge.variant === 'emerald'
                                    ? 'bg-emerald-100/90 text-emerald-900 border-emerald-300/80'
                                    : 'bg-amber-100 text-amber-800 border-amber-300/60'
                                }`}>
                                  {row.badge.text}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* 2. Delivery Badge - Zero Cropping */}
                        <td className="py-2 sm:py-2.5 px-1 sm:px-1.5 text-center align-middle">
                          {row.status === 'Active' ? (
                            <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-50 text-emerald-700 text-[8px] sm:text-[9px] md:text-[10px] font-semibold border border-emerald-200/80 shadow-2xs whitespace-nowrap">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                              <span>Active</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-amber-50 text-amber-800 text-[8px] sm:text-[9px] md:text-[10px] font-semibold border border-amber-300/80 shadow-2xs whitespace-nowrap" title="Completed">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                              <span>Completed</span>
                            </span>
                          )}
                        </td>

                        {/* 3. Results */}
                        <td className="py-2 sm:py-2.5 px-1 sm:px-2 text-right align-middle overflow-hidden">
                          <div className="font-mono tabular-nums font-bold text-slate-950 text-[10.5px] sm:text-xs md:text-[13px] leading-tight">
                            {row.results}
                          </div>
                          <div className={`text-[7.5px] sm:text-[8.5px] md:text-[9.5px] leading-tight mt-0.5 truncate ${row.isPurchase ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                            {row.isPurchase ? 'purchases' : 'conv.'}
                          </div>
                        </td>

                        {/* 4. Cost per Result */}
                        <td className="py-2 sm:py-2.5 px-1 sm:px-2 text-right align-middle overflow-hidden">
                          <div className="font-mono tabular-nums font-bold text-emerald-700 text-[10.5px] sm:text-xs md:text-[13px] leading-tight">
                            {row.costPerResult}
                          </div>
                          <div className="text-[7.5px] sm:text-[8.5px] md:text-[9.5px] text-slate-400 leading-tight mt-0.5 truncate">
                            {row.isPurchase ? 'per pur.' : 'per conv.'}
                          </div>
                        </td>

                        {/* 5. Amount Spent */}
                        <td className="py-2 sm:py-2.5 px-2 sm:px-3 text-right align-middle">
                          <div className="font-mono tabular-nums font-bold text-slate-950 text-[10.5px] sm:text-xs md:text-[13px] leading-tight whitespace-nowrap">
                            {row.amountSpent}
                          </div>
                          {row.budgetNote && (
                            <div className="text-[7px] sm:text-[8px] md:text-[8.5px] text-slate-400 font-mono leading-tight mt-0.5 whitespace-nowrap">
                              {row.budgetNote}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="px-2.5 sm:px-4 py-1.5 sm:py-2.5 bg-slate-100/70 border-t border-slate-200/80 text-[8px] sm:text-[9.5px] md:text-[10px] text-slate-500">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <BarChart2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 shrink-0" />
                  <span>Real client sprint data from active Meta Ads Manager</span>
                </div>

                <p className="mt-1 pt-1 border-t border-slate-200/60 text-[7px] sm:text-[8.5px] text-slate-400 leading-tight">
                  *Active live campaigns: conversation counts &amp; cost/convo fluctuate in real time and do not portray final end-of-campaign numbers.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Video Player in Premium iPhone Mockup Chassis */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center items-center">
            <div className="relative group/heroplayer w-full max-w-[270px] sm:max-w-[330px] md:max-w-[345px]">
              
              {/* Subtle Warm Accent Backdrop */}
              <div 
                className="absolute -inset-2 rounded-[44px] bg-gradient-to-tr from-[#FF3B14]/25 via-[#F97316]/20 to-[#818CF8]/30 blur-lg pointer-events-none -z-10" 
              />

              {/* Phone Outer Chassis (Space Black Titanium with Chamfered Edge) */}
              <div className="relative rounded-[40px] bg-slate-950 p-[7px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45),0_10px_25px_-5px_rgba(0,0,0,0.25)] ring-1 ring-white/20 select-none">
                
                {/* Side Button Accents */}
                {/* Volume Up / Down on Left */}
                <div className="absolute -left-[3px] top-20 w-[3px] h-9 bg-slate-700/90 rounded-l-sm pointer-events-none" />
                <div className="absolute -left-[3px] top-32 w-[3px] h-9 bg-slate-700/90 rounded-l-sm pointer-events-none" />
                {/* Power Button on Right */}
                <div className="absolute -right-[3px] top-24 w-[3px] h-12 bg-slate-700/90 rounded-r-sm pointer-events-none" />

                {/* Phone Inner Bezel & Screen Shell */}
                <div 
                  onClick={togglePlay}
                  className="relative cursor-pointer rounded-[33px] overflow-hidden bg-slate-950 aspect-[9/16] shadow-inner"
                >
                  {/* Dynamic Island Pill */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-40 pointer-events-none flex items-center justify-between px-2 shadow-sm border border-white/5">
                    {/* Camera lens glint */}
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1c1c1e] ring-1 ring-white/10" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0c]" />
                  </div>

                  {/* Video Player */}
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    poster={ABOUT_US_POSTER_PATH}
                    className="w-full h-full object-cover block"
                    playsInline
                    loop
                    preload="auto"
                    onTimeUpdate={handleTimeUpdate}
                    onWaiting={() => setIsBuffering(true)}
                    onCanPlay={() => setIsBuffering(false)}
                    onPlay={() => {
                      setIsPlaying(true);
                      setIsBuffering(false);
                    }}
                    onPlaying={() => {
                      setIsVideoReady(true);
                      setIsBuffering(false);
                    }}
                    onPause={() => {
                      setIsPlaying(false);
                      setIsBuffering(false);
                    }}
                    onEnded={() => {
                      setIsPlaying(false);
                      setIsBuffering(false);
                      if (progressBarRef.current) {
                        progressBarRef.current.style.width = '0%';
                      }
                    }}
                  />

                  {/* Guaranteed HD Poster Overlay (shows when paused) */}
                  {!isPlaying && (
                    <img
                      src={ABOUT_US_POSTER_PATH}
                      alt="Know About Us"
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none z-[5]"
                      loading="eager"
                      decoding="async"
                    />
                  )}

                  {/* Subtle Specular Glass Sheen across the screen */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] z-20" />

                  {/* Minimalist Floating Controls */}
                  <div className="absolute bottom-3.5 left-3 right-3 z-30 flex flex-col gap-2">
                    {/* Scrubber */}
                    <div 
                      onClick={handleSeek}
                      className="w-full h-1 bg-white/25 hover:h-1.5 rounded-full cursor-pointer transition-all overflow-hidden"
                    >
                      <div 
                        ref={progressBarRef}
                        className="h-full bg-[#FF3B14] rounded-full"
                        style={{ width: '0%' }}
                      />
                    </div>

                    {/* iOS Home Bar Indicator */}
                    <div className="w-24 h-1 bg-white/40 rounded-full mx-auto" />
                  </div>

                  {/* Centered Play Button when paused */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-slate-950/25 backdrop-blur-[1px] z-30">
                      <div className="w-12 h-12 rounded-full bg-white/95 shadow-xl flex items-center justify-center text-slate-900 group-hover/heroplayer:scale-110 transition-transform border border-white/60">
                        <Play className="w-5 h-5 fill-slate-900 ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
