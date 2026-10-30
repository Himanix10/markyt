import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Play, 
  Pause, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  ArrowUpRight,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { VideoShowcaseItem } from '../types';
import { MARKYT_CONTACT } from '../data/content';

interface VideoShowcaseModalProps {
  video: VideoShowcaseItem | null;
  onClose: () => void;
  onOpenQuestionnaire: () => void;
}

export const VideoShowcaseModal: React.FC<VideoShowcaseModalProps> = ({
  video,
  onClose,
  onOpenQuestionnaire,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (video) {
      setIsPlaying(true);
      setCurrentTime(0);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.muted = false;
        videoRef.current.play().catch(() => {
          // Fallback if browser blocks unmuted autoplay
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  }, [video]);

  const toggleFullscreen = () => {
    const videoEl = videoRef.current as any;
    if (!videoEl) return;
    if (document.fullscreenElement || (document as any).webkitFullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    } else {
      if (videoEl.requestFullscreen) {
        videoEl.requestFullscreen().catch(() => {});
      } else if (videoEl.webkitRequestFullscreen) {
        videoEl.webkitRequestFullscreen();
      } else if (videoEl.webkitEnterFullscreen) {
        videoEl.webkitEnterFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!video) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.muted = false;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden z-10 my-auto flex flex-col lg:flex-row max-h-[92vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close video player"
            className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md shadow-md hover:scale-105 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: 9:16 Vertical Video Player Container */}
          <div className="relative w-full lg:w-[420px] bg-black flex items-center justify-center shrink-0 min-h-[380px] lg:min-h-[560px] overflow-hidden select-none">
            <video
              ref={videoRef}
              src={encodeURI(video.videoSrc)}
              className="w-full h-full object-contain bg-black max-h-[60vh] lg:max-h-none"
              style={{ objectFit: 'contain' }}
              loop
              playsInline
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
            />

            {/* In-Video 9:16 Overlays */}
            {/* Top Brand & Vertical Badge */}
            <div className="absolute top-4 left-4 right-14 flex items-center justify-between pointer-events-none z-10">
              <span className="px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-[11px] font-mono text-white border border-white/10 uppercase tracking-wider font-bold">
                {video.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#FF3B14] text-white text-[10px] font-black uppercase tracking-wider">
                9:16 Reel
              </span>
            </div>

            {/* Play/Pause Center Tap Indicator */}
            <div 
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center cursor-pointer group"
            >
              {!isPlaying && (
                <div className="w-16 h-16 rounded-full bg-[#FF3B14]/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
              )}
            </div>

            {/* In-Video Bottom Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-20 space-y-2">
              {/* Progress Scrubber */}
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#FF3B14]"
              />

              <div className="flex items-center justify-between text-white text-xs font-mono">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="hover:text-[#FF3B14] transition-colors cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <span>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleFullscreen}
                    className="hover:text-[#FF3B14] transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Fullscreen</span>
                  </button>
                  <span className="text-[10px] tracking-wider text-slate-400 font-sans font-bold uppercase hidden md:inline">
                    • MARKYT
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Work Details, Verified Metrics & Performance Breakdown */}
          <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white">
            <div className="space-y-6">
              
              {/* Industry & Title */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FF3B14]/10 text-[#FF3B14] text-xs font-mono font-bold uppercase border border-[#FF3B14]/20">
                    {video.businessType}
                  </span>
                  <span className="text-slate-400 text-xs font-mono">
                    {video.duration} duration
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-black text-slate-950 tracking-tight">
                  {video.title}
                </h3>
              </div>

              {/* Hook Analysis Card */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-900 block mb-1">
                  🎯 The 3-Second Pattern Interrupt Hook
                </span>
                <p className="text-sm sm:text-base font-semibold text-slate-900 italic leading-snug">
                  {video.hookText}
                </p>
              </div>

              {/* Verified Result Metrics Grid */}
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-3">
                  Verified Performance Metrics
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 border border-black/10 text-center">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">Efficiency</span>
                    <span className="text-sm sm:text-base font-heading font-black text-emerald-700 block mt-0.5">
                      {video.roas}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-black/10 text-center">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">Acquisition</span>
                    <span className="text-sm sm:text-base font-heading font-black text-slate-900 block mt-0.5">
                      {video.cpl}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-black/10 text-center">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">Volume</span>
                    <span className="text-xs sm:text-sm font-heading font-black text-[#FF3B14] block mt-0.5 leading-tight">
                      {video.leadsGenerated}
                    </span>
                  </div>
                </div>
              </div>

              {/* Creative Strategy Execution */}
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Creative Strategy & Editing Science
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {video.strategySummary}
                </p>
              </div>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-2">
                {video.tags.map((t, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-black/5"
                  >
                    #{t}
                  </span>
                ))}
              </div>

            </div>

            {/* Bottom Conversion CTA */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono text-slate-500 uppercase block">Production Pricing</span>
                <span className="text-lg font-heading font-bold text-slate-950">Starting at ₹3,000 / video</span>
              </div>

              <a
                href={`https://wa.me/${MARKYT_CONTACT.whatsappNumber}?text=Hi%20MARKYT%20team%2C%20I%20saw%20your%20${encodeURIComponent(video.title)}%20video%20and%20want%20to%20get%20a%20similar%20high-converting%20ad%20video`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FF3B14] hover:bg-[#E0300D] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Get a Video Like This</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
