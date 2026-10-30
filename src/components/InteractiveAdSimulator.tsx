import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  BarChart2
} from 'lucide-react';
import { 
  CampaignProofData, 
  CAMPAIGN_PROOF_ROWS 
} from '../data/campaignProofData';
import { 
  fetchCampaignProofRows 
} from '../services/campaignProofSheetService';

export const ABOUT_US_VIDEO_PATH = '/videos/about-us.mp4';

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

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

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

  // Play with audio; fallback to muted if browser blocks unmuted audio
  const handlePlay = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    videoRef.current.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        }
      });
  };

  const handleStop = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      handleStop();
    } else {
      handlePlay();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current || !videoRef.current.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
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
        className="absolute -inset-3 rounded-[38px] bg-gradient-to-r from-[#B8C1FA] via-[#FF3B14]/40 to-[#818CF8]/50 blur-2xl pointer-events-none -z-10"
      />

      {/* Main Bright Vibrant Luxury Card */}
      <div 
        ref={containerRef}
        className="relative bg-gradient-to-br from-[#B8C1FA] via-[#C8D1FD] to-[#FFD8CF] rounded-3xl border-2 border-white/95 shadow-[0_25px_60px_-15px_rgba(79,70,229,0.22),0_10px_25px_-5px_rgba(255,59,20,0.12)] overflow-hidden p-2.5 sm:p-8 lg:p-12 z-0"
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

        {/* Animated Floating Performance Accents */}
        <div className="absolute top-5 left-5 pointer-events-auto hidden sm:flex items-center gap-2 z-10 select-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-slate-900/10 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            <span className="text-[10px] font-mono font-bold tracking-tight text-slate-800 uppercase">
              Meta Ads Manager
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Column: Context, Hook & Real Proof Table */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Headline */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-slate-950 tracking-tight leading-[1.08]">
                Know{' '}
                <span className="font-editorial-italic font-normal text-[#FF3B14] underline decoration-slate-950/20 underline-offset-8">
                  About Us
                </span>
              </h3>
            </div>

            {/* Live Meta Ads Manager Proof Table */}
            <div className="rounded-xl sm:rounded-2xl border border-slate-900/10 bg-white/95 backdrop-blur-md overflow-hidden shadow-sm">

              {/* Table Element (Full width on mobile, no horizontal slide/scroll) */}
              <div className="w-full overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100/90 text-[9px] sm:text-[10px] font-space font-bold uppercase tracking-wider text-slate-600">
                      <th className="py-2 sm:py-2.5 px-1.5 sm:px-3.5 text-left">Campaign</th>
                      <th className="py-2 sm:py-2.5 px-1 sm:px-2 text-center">Delivery</th>
                      <th className="py-2 sm:py-2.5 px-1 sm:px-2.5 text-right">Results</th>
                      <th className="py-2 sm:py-2.5 px-1 sm:px-2.5 text-right">
                        <span className="sm:hidden">Cost/Res</span>
                        <span className="hidden sm:inline">Cost / Result</span>
                      </th>
                      <th className="py-2 sm:py-2.5 px-1.5 sm:px-3 text-right">
                        <span className="sm:hidden">Spent</span>
                        <span className="hidden sm:inline">Amount Spent</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/80">
                    {proofRows.map((row, idx) => (
                      <tr 
                        key={idx} 
                        className={`transition-colors duration-150 ${
                          row.isPurchase 
                            ? 'bg-emerald-50/35 hover:bg-emerald-50/70' 
                            : row.isDayOne 
                              ? 'bg-amber-50/20 hover:bg-amber-50/40' 
                              : 'hover:bg-slate-50/60'
                        }`}
                      >
                        {/* Campaign Name & Details */}
                        <td className="py-2 sm:py-2.5 px-1.5 sm:px-3.5 align-middle">
                          <div className="font-space font-bold text-slate-950 text-[10px] sm:text-[13px] leading-tight">
                            {row.campaign}
                          </div>
                          {row.badge && (
                            <div className="mt-0.5 sm:mt-1">
                              <span className={`inline-block px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded text-[8px] sm:text-[9px] font-bold uppercase tracking-wider border ${
                                row.badge.variant === 'emerald'
                                  ? 'bg-emerald-100/90 text-emerald-900 border-emerald-300/80 shadow-xs'
                                  : 'bg-amber-100 text-amber-800 border-amber-300/50'
                              }`}>
                                {row.badge.text}
                              </span>
                            </div>
                          )}
                        </td>

                        {/* Delivery Status - Visible on mobile & desktop */}
                        <td className="py-2 sm:py-2.5 px-1 sm:px-2 text-center align-middle">
                          {row.status === 'Active' ? (
                            <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[8.5px] sm:text-[10px] font-semibold border border-emerald-200/60 whitespace-nowrap">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                              <span>Active</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[8.5px] sm:text-[10px] font-semibold border border-amber-300/60 whitespace-nowrap" title="Completed • Sales (Ended recently)">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                              <span>Completed</span>
                            </span>
                          )}
                        </td>

                        {/* Results */}
                        <td className="py-2 sm:py-2.5 px-1 sm:px-2.5 text-right align-middle">
                          <div className="font-space font-bold text-slate-950 text-[11px] sm:text-sm leading-tight">
                            {row.results}
                          </div>
                          <div className={`text-[8px] sm:text-[9px] leading-tight ${row.isPurchase ? 'text-emerald-800 font-semibold' : 'text-slate-500'}`}>
                            <span className="sm:hidden">{row.isPurchase ? 'purchases' : 'conv.'}</span>
                            <span className="hidden sm:inline">{row.resultsUnit}</span>
                          </div>
                          {row.resultsSub && (
                            <div className="text-[7.5px] sm:text-[8px] text-emerald-600 font-mono leading-none mt-0.5 hidden xs:block">
                              {row.resultsSub}
                            </div>
                          )}
                        </td>

                        {/* Cost per Result */}
                        <td className="py-2 sm:py-2.5 px-1 sm:px-2.5 text-right align-middle">
                          <div className="font-mono font-bold text-emerald-700 text-[10.5px] sm:text-sm leading-tight">
                            {row.costPerResult}
                          </div>
                          <div className="text-[8px] sm:text-[9px] text-slate-400 leading-none">
                            <span className="sm:hidden">{row.isPurchase ? '/ purchase' : '/ conv.'}</span>
                            <span className="hidden sm:inline">{row.costPerUnit}</span>
                          </div>
                        </td>

                        {/* Amount Spent */}
                        <td className="py-2 sm:py-2.5 px-1.5 sm:px-3 text-right align-middle">
                          <div className="font-space font-bold text-slate-950 text-[11px] sm:text-sm leading-tight">
                            {row.amountSpent}
                          </div>
                          {row.budgetNote && (
                            <div className="text-[7.5px] sm:text-[8.5px] text-slate-400 leading-none mt-0.5">
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
              <div className="px-2.5 sm:px-3.5 py-2 bg-slate-100/70 border-t border-slate-200/80 text-[9px] sm:text-[10px] text-slate-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>Real client sprint data from active Meta Ads Manager</span>
                  </div>

                  <span className="font-mono font-semibold text-slate-700 hidden sm:inline">
                    Direct Purchases &amp; Inquiries
                  </span>
                </div>

                <p className="mt-1.5 pt-1.5 border-t border-slate-200/60 text-[8.5px] sm:text-[9px] text-slate-400 leading-tight">
                  *Active live campaigns: conversation counts &amp; cost/convo fluctuate in real time and do not portray final end-of-campaign numbers.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Video Player in Pure Borderless Glass */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative group/heroplayer w-full max-w-[280px] sm:max-w-[310px] md:max-w-[330px]">
              
              {/* Subtle Warm Accent Backdrop */}
              <div 
                className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-[#FF3B14]/20 via-[#F97316]/15 to-[#818CF8]/25 blur-md pointer-events-none -z-10" 
              />

              {/* Video Shell */}
              <div 
                onClick={togglePlay}
                className="relative cursor-pointer rounded-2xl overflow-hidden bg-slate-950/90 aspect-[9/16] shadow-xl hover:shadow-2xl transition-all duration-300 select-none"
              >
                <video
                  ref={videoRef}
                  src={videoSrc}
                  className="w-full h-full object-cover block"
                  playsInline
                  loop
                  preload="metadata"
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                />

                {/* Minimalist Floating Controls */}
                <div className="absolute bottom-3 left-3 right-3 z-30 flex flex-col gap-1.5">
                  {/* Subtle Scrubber */}
                  <div 
                    onClick={handleSeek}
                    className="w-full h-1 bg-white/20 hover:h-1.5 rounded-full cursor-pointer transition-all overflow-hidden"
                  >
                    <div 
                      className="h-full bg-[#FF3B14] rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Centered Play Button when paused */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-slate-950/20 backdrop-blur-[1px]">
                    <div className="w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-slate-900 group-hover/heroplayer:scale-110 transition-transform">
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
  );
};
