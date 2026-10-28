import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  Pause,
  BarChart2
} from 'lucide-react';

export const ABOUT_US_VIDEO_PATH = '/videos/about-us.mp4';

interface CampaignProofData {
  campaign: string;
  isDayOne?: boolean;
  isPurchase?: boolean;
  badge?: {
    text: string;
    variant: 'emerald' | 'amber';
  };
  status: 'Active' | 'Completed';
  results: number;
  resultsUnit: string;
  resultsSub?: string;
  costPerResult: string;
  costPerUnit: string;
  amountSpent: string;
  budgetNote?: string;
}

const CAMPAIGN_PROOF_ROWS: CampaignProofData[] = [
  {
    campaign: 'Clothing Brand',
    isPurchase: true,
    status: 'Completed',
    results: 57,
    resultsUnit: 'website purchases',
    costPerResult: '₹175.44',
    costPerUnit: 'per purchase',
    amountSpent: '₹10,000.00',
    budgetNote: '₹10.00K spent'
  },
  {
    campaign: 'Premium Wooden Slabs (Carousel)',
    status: 'Active',
    results: 132,
    resultsUnit: 'conversations',
    costPerResult: '₹27.94',
    costPerUnit: 'per conv.',
    amountSpent: '₹3,688.08',
    budgetNote: '₹3.69K spent'
  },
  {
    campaign: 'Premium Wooden Slabs (Video)',
    status: 'Active',
    results: 101,
    resultsUnit: 'conversations',
    costPerResult: '₹46.12',
    costPerUnit: 'per conv.',
    amountSpent: '₹4,658.17',
    budgetNote: '₹5,000 budget'
  },
  {
    campaign: 'Skin Clinic',
    status: 'Active',
    results: 60,
    resultsUnit: 'conversations',
    costPerResult: '₹62.98',
    costPerUnit: 'per conv.',
    amountSpent: '₹3,778.80',
    budgetNote: '₹3.78K spent'
  },
  {
    campaign: 'Fitness Coach',
    status: 'Active',
    results: 15,
    resultsUnit: 'conversations',
    costPerResult: '₹62.62',
    costPerUnit: 'per conv.',
    amountSpent: '₹939.27',
    budgetNote: 'Ad set budget'
  },
  {
    campaign: 'Therapist',
    isDayOne: true,
    badge: {
      text: 'Day 2 Data',
      variant: 'amber'
    },
    status: 'Active',
    results: 6,
    resultsUnit: 'conversations',
    costPerResult: '₹71.82',
    costPerUnit: 'per conv.',
    amountSpent: '₹430.92',
    budgetNote: 'Ad set budget'
  }
];

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
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

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
    videoRef.current.muted = isMuted;
    videoRef.current.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
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

          {/* Orb 1: Coral Sunset Glow (Drifting from Top-Left) */}
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

          {/* Orb 2: Electric Periwinkle / Violet (Floating at Bottom-Right) */}
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

          {/* Orb 3: Golden Sunshine Breathing Center Accent */}
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
        <motion.div 
          animate={{
            y: [0, -6, 0],
            rotate: [-1, 1, -1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-5 left-5 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-slate-900/10 shadow-xs z-10 select-none"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-mono font-bold tracking-tight text-slate-800 uppercase">
            Meta Ads Manager
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Column: Context, Hook & Real Proof Table */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Headline */}
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-slate-950 tracking-tight leading-[1.08] mb-5">
              Know{' '}
              <span className="font-editorial-italic font-normal text-[#FF3B14] underline decoration-slate-950/20 underline-offset-8">
                About Us
              </span>
            </h3>

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
                    {CAMPAIGN_PROOF_ROWS.map((row, idx) => (
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
                          <div className="font-mono font-bold text-slate-900 text-[10.5px] sm:text-sm leading-tight">
                            {row.amountSpent}
                          </div>
                          {row.budgetNote && (
                            <div className="text-[8px] sm:text-[9px] text-slate-500 leading-none mt-0.5 hidden sm:block">
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
                  <span className="flex items-center gap-1.5">
                    <BarChart2 className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>Real client sprint data from active Meta Ads Manager</span>
                  </span>
                  <span className="font-mono font-semibold text-slate-700 hidden sm:inline">
                    Direct Purchases & Inquiries
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
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#FF3B14]/20 via-slate-950/5 to-[#FF3B14]/15 rounded-[32px] blur-xl opacity-75 group-hover/heroplayer:opacity-100 transition-opacity -z-10" />

              {/* Frameless Glass Video Card */}
              <div 
                className="relative w-full aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-900/10 bg-slate-950 flex flex-col justify-between cursor-pointer select-none transition-all duration-300"
                onClick={togglePlay}
              >
                {/* Native Video */}
                <video
                  ref={videoRef}
                  src={`${encodeURI(videoSrc)}#t=0.1`}
                  className="absolute inset-0 w-full h-full object-cover bg-black"
                  playsInline
                  loop
                  preload="metadata"
                  muted={isMuted}
                  onTimeUpdate={handleTimeUpdate}
                />

                {/* Top Subtle Overlay Ribbon */}
                <div className="relative z-20 w-full p-3 sm:p-3.5 flex items-center justify-between pointer-events-none">
                  {/* Status Indicator Pill */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono font-medium text-white shadow-xs">
                    <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                    <span>{isPlaying ? 'Playing' : 'Paused'}</span>
                  </div>

                </div>

                {/* Center Floating Glass Play/Pause Action Button */}
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                  <div 
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FF3B14]/90 hover:bg-[#FF3B14] backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-2xl transition-all duration-300 pointer-events-auto cursor-pointer ${
                      isPlaying 
                        ? 'opacity-0 scale-75 group-hover/heroplayer:opacity-90 group-hover/heroplayer:scale-100' 
                        : 'opacity-100 scale-100'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
                    ) : (
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white translate-x-0.5" />
                    )}
                  </div>
                </div>

                {/* Bottom Scrubber Progress Bar */}
                <div 
                  className="relative z-20 w-full p-3 pt-0"
                  onClick={handleSeek}
                  title="Click to seek"
                >
                  <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-xs">
                    <div 
                      className="h-full bg-[#FF3B14] transition-all duration-100 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
