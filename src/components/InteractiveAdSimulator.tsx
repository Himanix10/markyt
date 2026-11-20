import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  ChevronDown,
} from 'lucide-react';
import { 
  CampaignProofData, 
  CAMPAIGN_PROOF_ROWS 
} from '../data/campaignProofData';
import { 
  SocialMediaProofData, 
  SOCIAL_MEDIA_PROOF_ROWS 
} from '../data/socialMediaProofData';
import { 
  fetchCampaignProofRows 
} from '../services/campaignProofSheetService';

export const ABOUT_US_VIDEO_PATH = '/videos/about-us.mp4?v=opt1';
export const ABOUT_US_POSTER_PATH = '/videos/posters/about-us.jpg?v=opt1';

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
  const tableScrollRef = useRef<HTMLDivElement | null>(null);
  const socialSectionRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [showScrollHint, setShowScrollHint] = useState<boolean>(true);

  // Live Google Sheet sync state (automatically synced from sheet in background)
  const [proofRows, setProofRows] = useState<CampaignProofData[]>(CAMPAIGN_PROOF_ROWS);
  const [socialMediaRows] = useState<SocialMediaProofData[]>(SOCIAL_MEDIA_PROOF_ROWS);

  const handleTableScroll = () => {
    if (!tableScrollRef.current) return;
    const { scrollTop } = tableScrollRef.current;
    if (scrollTop > 30) {
      setShowScrollHint(false);
    } else {
      setShowScrollHint(true);
    }
  };

  const scrollToSocialMedia = () => {
    if (socialSectionRef.current) {
      socialSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setShowScrollHint(false);
    } else if (tableScrollRef.current) {
      tableScrollRef.current.scrollTo({
        top: tableScrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
      setShowScrollHint(false);
    }
  };

  // Load and sync data from Google Sheet in background
  // Helper: Format values so that when Google Sheet says 0, it renders '-' and never 0
  const formatDisplayValue = (val: number | string | undefined | null) => {
    if (val === undefined || val === null) return '-';
    const str = String(val).trim();
    if (str === '0' || str === '-' || str === '' || str === '0.00') return '-';
    const num = Number(val);
    if (!isNaN(num) && num === 0) return '-';
    return typeof val === 'number' ? val.toLocaleString() : str;
  };

  const formatCostPerResult = (cpr: string | undefined | null) => {
    if (!cpr) return '₹-';
    const trimmed = cpr.trim();
    const digitsOnly = trimmed.replace(/[^0-9]/g, '');
    if (
      trimmed === '0' ||
      trimmed === '-' ||
      trimmed === '₹-' ||
      trimmed === '₹0' ||
      trimmed === '₹0.00' ||
      trimmed === '$0' ||
      digitsOnly === '0' ||
      digitsOnly === '000' ||
      digitsOnly === ''
    ) {
      return '₹-';
    }
    return trimmed;
  };

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
        className="absolute -inset-3 rounded-[38px] bg-gradient-to-r from-[#B8C1FA] via-[#FF3B14]/40 to-[#818CF8]/50 blur-2xl pointer-events-none -z-10"
      />

      {/* Main Bright Vibrant Luxury Card */}
      <div 
        ref={containerRef}
        className="relative bg-gradient-to-br from-[#B8C1FA] via-[#C8D1FD] to-[#FFD8CF] rounded-3xl border-2 border-white/95 shadow-[0_25px_60px_-15px_rgba(79,70,229,0.22),0_10px_25px_-5px_rgba(255,59,20,0.12)] overflow-hidden p-3.5 sm:p-6 lg:p-8 z-0"
      >
        {/* Animated Aurora Gradient Blobs & Subtle Dot Matrix Texture */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <motion.div 
            animate={{
              x: [0, 25, 0],
              y: [0, -15, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#FFD8CF]/80 to-[#FF8C68]/50 blur-3xl opacity-75"
          />
          <motion.div 
            animate={{
              x: [0, -25, 0],
              y: [0, 20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-tl from-[#B8C1FA]/90 via-[#818CF8]/40 to-transparent blur-3xl opacity-80"
          />
          <div 
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'radial-gradient(#0F172A 1.5px, transparent 1.5px)',
              backgroundSize: '20px 20px',
            }}
          />
        </div>

        {/* Header Row: Headline */}
        <div className="relative z-10 mb-3.5 sm:mb-6 flex flex-col gap-1.5 sm:gap-2.5">
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
            <div className="relative rounded-2xl sm:rounded-3xl border border-slate-900/10 bg-white/95 backdrop-blur-md overflow-hidden shadow-md sm:shadow-lg flex flex-col group/tablecard font-poppins">

              {/* Card Header: Eyebrow + Subheadline */}
              <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-3.5 border-b border-slate-100/90 bg-white">
                <div className="text-[9.5px] sm:text-[10.5px] font-poppins font-semibold tracking-widest text-slate-400 uppercase">
                  Our Work In Numbers
                </div>
                <h4 className="text-[13px] sm:text-[15px] md:text-base font-poppins font-semibold text-slate-900 leading-snug tracking-tight mt-1">
                  Performance marketing drives <span className="text-emerald-600 font-bold">measurable growth</span>, while social media <span className="text-indigo-600 font-bold">builds the brand</span> that sustains it.
                </h4>
              </div>

              {/* Scrollable Table Body with Sticky Headers - Perfectly balanced with video player height */}
              <div 
                ref={tableScrollRef}
                onScroll={handleTableScroll}
                className="w-full max-h-[320px] sm:max-h-[390px] md:max-h-[420px] overflow-y-auto overscroll-contain visible-proof-scrollbar relative"
              >
                {/* 1. Performance Marketing Section Header */}
                <div className="sticky top-0 z-20 px-4 sm:px-6 py-2 bg-[#F1F5FD] border-b border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-poppins font-semibold uppercase tracking-wider text-slate-700">
                      Performance Marketing
                    </span>
                  </div>
                </div>

                <table className="w-full table-fixed text-left border-collapse">
                  <thead className="bg-slate-50/50 border-b border-slate-100/80">
                    <tr className="text-[9px] sm:text-[10px] font-poppins font-semibold uppercase tracking-wider text-slate-400">
                      <th className="w-[35%] sm:w-[34%] py-2 px-3 sm:px-4 text-left whitespace-nowrap">Campaign</th>
                      <th className="w-[27%] sm:w-[26%] py-2 px-1 sm:px-2 text-center whitespace-nowrap">Delivery</th>
                      <th className="w-[18%] sm:w-[20%] py-2 px-1 sm:px-2 text-right whitespace-nowrap">Results</th>
                      <th className="w-[20%] sm:w-[20%] py-2 px-2 sm:px-4 text-right whitespace-nowrap">Cost / Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proofRows.map((row, idx) => (
                      <tr 
                        key={idx} 
                        className="bg-white hover:bg-slate-50/50 transition-colors border-b border-slate-100/80"
                      >
                        {/* 1. Campaign Name + Badge/Type */}
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 align-middle overflow-hidden">
                          <div className="flex flex-col gap-0.5">
                            <div className="font-poppins font-semibold text-slate-950 text-xs sm:text-[13px] leading-tight line-clamp-2">
                              {row.campaign}
                            </div>
                            <div className="flex flex-wrap items-center gap-1 mt-0.5">
                              {row.campaignType && (
                                <span className="inline-block px-1 py-0.5 rounded text-[7px] sm:text-[8px] font-mono font-medium bg-slate-100 text-slate-500 border border-slate-200/70 leading-none">
                                  {row.campaignType}
                                </span>
                              )}
                              {row.badge && (
                                <span className={`inline-block px-1 py-0.5 rounded text-[7px] sm:text-[8px] font-semibold uppercase tracking-wider border leading-none ${
                                  row.badge.variant === 'emerald'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : 'bg-amber-50 text-amber-700 border-amber-200'
                                }`}>
                                  {row.badge.text}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* 2. Delivery Badge */}
                        <td className="py-2.5 sm:py-3.5 px-1 sm:px-2 text-center align-middle">
                          <div className="flex items-center justify-center">
                            {row.status === 'Active' ? (
                              <span className="inline-flex items-center justify-center gap-2 h-7 sm:h-[29px] px-3.5 sm:px-4 rounded-full bg-[#EDFAF3] text-[#047857] border border-[#A7F3D0] text-[11px] sm:text-xs font-poppins font-medium whitespace-nowrap shadow-2xs">
                                <svg className="w-2 h-2 shrink-0 fill-[#10B981] overflow-visible" viewBox="0 0 12 12" aria-hidden="true">
                                  <circle cx="6" cy="6" r="4" />
                                </svg>
                                <span className="leading-none relative top-[0.5px]">Active</span>
                              </span>
                            ) : row.status === 'Paused' ? (
                              <span className="inline-flex items-center justify-center gap-2 h-7 sm:h-[29px] px-3.5 sm:px-4 rounded-full bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE] text-[11px] sm:text-xs font-poppins font-medium whitespace-nowrap shadow-2xs" title="Paused">
                                <svg className="w-2 h-2 shrink-0 fill-[#3B82F6] overflow-visible" viewBox="0 0 12 12" aria-hidden="true">
                                  <circle cx="6" cy="6" r="4" />
                                </svg>
                                <span className="leading-none relative top-[0.5px]">Paused</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center gap-2 h-7 sm:h-[29px] px-3.5 sm:px-4 rounded-full bg-[#FFF9E6] text-[#92400E] border border-[#FFDA55] text-[11px] sm:text-xs font-poppins font-medium whitespace-nowrap shadow-2xs" title="Completed">
                                <svg className="w-2 h-2 shrink-0 fill-[#FE9A00] overflow-visible" viewBox="0 0 12 12" aria-hidden="true">
                                  <circle cx="6" cy="6" r="4" />
                                </svg>
                                <span className="leading-none relative top-[0.5px]">Completed</span>
                              </span>
                            )}
                          </div>
                        </td>

                        {/* 3. Results */}
                        <td className="py-2.5 sm:py-3 px-1 sm:px-2 text-right align-middle overflow-hidden">
                          <div className="font-poppins font-bold text-slate-950 text-sm sm:text-[15px] leading-tight">
                            {formatDisplayValue(row.results)}
                          </div>
                          <div className="text-[8.5px] sm:text-[9.5px] text-slate-400/90 font-poppins font-normal leading-tight mt-0.5 truncate">
                            {row.isPurchase ? 'purchases' : 'conv.'}
                          </div>
                        </td>

                        {/* 4. Cost per Result */}
                        <td className="py-2.5 sm:py-3 px-2 sm:px-4 text-right align-middle overflow-hidden">
                          <div className="font-poppins font-bold text-[#059669] text-xs sm:text-[13.5px] leading-tight">
                            {formatCostPerResult(row.costPerResult)}
                          </div>
                          <div className="text-[8.5px] sm:text-[9.5px] text-slate-400/90 font-poppins font-normal leading-tight mt-0.5 truncate">
                            {row.isPurchase ? 'per pur.' : 'per conv.'}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* 2. Social Media Management Section Header */}
                <div 
                  ref={socialSectionRef}
                  className="sticky top-0 z-20 px-4 sm:px-6 py-2 bg-[#F1F5FD] border-t border-b border-slate-200/80 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-60" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6366F1] shadow-[0_0_8px_rgba(99,102,241,0.7)]" />
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-poppins font-semibold uppercase tracking-wider text-slate-700">
                      Social Media Management
                    </span>
                  </div>
                </div>

                {/* Social Media Management Table */}
                <table className="w-full table-fixed text-left border-collapse">
                  <thead className="bg-slate-50/50 border-b border-slate-100/80">
                    <tr className="text-[9px] sm:text-[10px] font-poppins font-semibold uppercase tracking-wider text-slate-400">
                      <th className="w-[56%] sm:w-[56%] py-2 px-3 sm:px-4 text-left whitespace-nowrap">Brand</th>
                      <th className="w-[22%] sm:w-[22%] py-2 px-1.5 sm:px-2 text-right whitespace-nowrap">Posts</th>
                      <th className="w-[22%] sm:w-[22%] py-2 px-2 sm:px-4 text-right whitespace-nowrap">Reels</th>
                    </tr>
                  </thead>
                  <tbody>
                    {socialMediaRows.map((row, idx) => (
                      <tr 
                        key={idx} 
                        className="bg-white hover:bg-slate-50/50 transition-colors border-b border-slate-100/80"
                      >
                        {/* Brand */}
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 align-middle overflow-hidden">
                          <div className="font-poppins font-semibold text-slate-950 text-xs sm:text-[13px] leading-snug">
                            {row.brand}
                          </div>
                        </td>

                        {/* Posts */}
                        <td className="py-2.5 sm:py-3 px-1.5 sm:px-2 text-right align-middle overflow-hidden">
                          <div className="font-poppins font-bold text-slate-950 text-sm sm:text-[15px] leading-tight">
                            {formatDisplayValue(row.posts)}
                          </div>
                          <div className="text-[8.5px] sm:text-[9.5px] text-slate-400/90 font-poppins font-normal leading-tight mt-0.5 truncate">
                            {row.periodNote || 'this month*'}
                          </div>
                        </td>

                        {/* Reels */}
                        <td className="py-2.5 sm:py-3 px-2 sm:px-4 text-right align-middle overflow-hidden">
                          <div className="font-poppins font-bold text-slate-950 text-sm sm:text-[15px] leading-tight">
                            {formatDisplayValue(row.reels)}
                          </div>
                          <div className="text-[8.5px] sm:text-[9.5px] text-slate-400/90 font-poppins font-normal leading-tight mt-0.5 truncate">
                            {row.periodNote || 'this month*'}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Floating "Next: Social Media" Indicator (Matches user's exact mockup) */}
              <div 
                className={`absolute bottom-16 sm:bottom-18 left-1/2 -translate-x-1/2 z-30 pointer-events-auto transition-all duration-300 ${
                  showScrollHint 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-3 pointer-events-none'
                }`}
              >
                <button
                  type="button"
                  onClick={scrollToSocialMedia}
                  className="group inline-flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-full bg-[#0F172A] hover:bg-slate-950 text-white text-xs sm:text-[13px] font-poppins font-semibold shadow-[0_12px_28px_-6px_rgba(15,23,42,0.45)] border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span className="tracking-tight">Next: Social Media</span>
                  <span className="w-6 h-6 rounded-full bg-[#6366F1] flex items-center justify-center shrink-0 group-hover:translate-y-0.5 transition-transform">
                    <ChevronDown className="w-3.5 h-3.5 text-white" />
                  </span>
                </button>
              </div>

              {/* Table Footer */}
              <div className="px-4 sm:px-6 py-2 bg-slate-50/80 border-t border-slate-100 text-[7.5px] sm:text-[8.5px] text-slate-400 leading-tight">
                *Active live campaigns: conversation counts &amp; cost/convo fluctuate in real time and do not portray final end-of-campaign numbers. Cost per result also varies with product price, so a high-value item may show a higher cost per purchase, yet a single sale can cover the entire ad spend.
              </div>
            </div>
          </div>

          {/* Right Column: Hero Video Player in Premium iPhone Mockup Chassis */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center items-center">
            <div className="relative group/heroplayer w-full max-w-[270px] sm:max-w-[330px] md:max-w-[345px]">
              
              {/* Subtle Natural Shadow & Warm Accent Backdrop */}
              <div 
                className="absolute -inset-2 rounded-[44px] bg-gradient-to-tr from-[#FF3B14]/15 via-slate-900/15 to-transparent blur-lg pointer-events-none -z-10" 
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
                    style={{
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      imageRendering: 'auto',
                    }}
                    playsInline
                    loop
                    preload="metadata"
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
                      loading="lazy"
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
