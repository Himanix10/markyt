import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Maximize2,
  X,
  RotateCw,
  BookOpen,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export interface ArtStyleItem {
  id: string;
  number: string;
  name: string;
  videoSrc: string;
  tapeColor: string;
  tapeRotation: string;
}

export const ART_STYLES: ArtStyleItem[] = [
  {
    id: 'electric-doodle',
    number: '01',
    name: 'Electric 2D Doodle',
    videoSrc: '/art-styles/style-1.mp4',
    tapeColor: 'bg-blue-200/90 border-blue-300/70',
    tapeRotation: '-rotate-3',
  },
  {
    id: 'mixed-media-sketch',
    number: '02',
    name: 'Mixed-Media Sketch',
    videoSrc: '/art-styles/style-2.mp4',
    tapeColor: 'bg-amber-200/90 border-amber-300/70',
    tapeRotation: 'rotate-2',
  },
  {
    id: 'die-cut-sticker',
    number: '03',
    name: 'Die-Cut Paper Sticker',
    videoSrc: '/art-styles/style-3.mp4',
    tapeColor: 'bg-rose-200/90 border-rose-300/70',
    tapeRotation: '-rotate-2',
  },
  {
    id: 'meadow-storybook',
    number: '04',
    name: 'Meadow Storybook Cel',
    videoSrc: '/art-styles/style-4.mp4',
    tapeColor: 'bg-emerald-200/90 border-emerald-300/70',
    tapeRotation: 'rotate-3',
  },
];

// 3 Exact States for Desktop:
// 0: 'Cover' (Single Page: Style 01 - Electric Doodle)
// 1: '2 and 3' (Two-Page Spread: Left Style 02 - Mixed-Media, Right Style 03 - Die-Cut Sticker)
// 2: 'End' (Single Page: Style 04 - Meadow Storybook Cel)
export type BookSpreadState = 0 | 1 | 2;

interface CreativeArtStylesSectionProps {
  onOpenQuestionnaire?: () => void;
}

export const CreativeArtStylesSection: React.FC<CreativeArtStylesSectionProps> = () => {
  const [spreadState, setSpreadState] = useState<BookSpreadState>(0);
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward'>('forward');

  // Mobile detection (< 640px)
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({
    'electric-doodle': true,
    'mixed-media-sketch': true,
    'die-cut-sticker': true,
    'meadow-storybook': true,
  });

  const [activeModalGif, setActiveModalGif] = useState<ArtStyleItem | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState<boolean>(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Distinct styles for each position
  const styleCover = ART_STYLES[0]; // Style 01 (Boy surfing on pen)
  const styleLeft = ART_STYLES[1];  // Style 02 (Woman watering terrace)
  const styleRight = ART_STYLES[2]; // Style 03 (Girl sipping coffee)
  const styleEnd = ART_STYLES[3];   // Style 04 (Blonde girl in flower meadow)

  // Turn book forward (Cover -> 2 and 3 -> End -> Cover on desktop, 0 -> 1 -> 2 -> 3 -> 0 on mobile)
  const turnForward = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setFlipDirection('forward');

    setTimeout(() => {
      if (isMobile) {
        setActiveMobileIndex((prev) => {
          const next = prev >= 3 ? 0 : prev + 1;
          setSpreadState(next === 0 ? 0 : next === 3 ? 2 : 1);
          return next;
        });
      } else {
        setSpreadState((prev) => {
          const next = (prev >= 2 ? 0 : prev + 1) as BookSpreadState;
          setActiveMobileIndex(next === 0 ? 0 : next === 1 ? 1 : 3);
          return next;
        });
      }
      setIsFlipping(false);
    }, 500);
  };

  // Turn book backward (End -> 2 and 3 -> Cover on desktop, 3 -> 2 -> 1 -> 0 on mobile)
  const turnBackward = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setFlipDirection('backward');

    setTimeout(() => {
      if (isMobile) {
        setActiveMobileIndex((prev) => {
          const next = prev <= 0 ? 3 : prev - 1;
          setSpreadState(next === 0 ? 0 : next === 3 ? 2 : 1);
          return next;
        });
      } else {
        setSpreadState((prev) => {
          const next = (prev <= 0 ? 2 : prev - 1) as BookSpreadState;
          setActiveMobileIndex(next === 0 ? 0 : next === 1 ? 2 : 3);
          return next;
        });
      }
      setIsFlipping(false);
    }, 500);
  };

  // Direct jump to a specific style via pagination dots
  const jumpToStyle = (targetIdx: number) => {
    if (isFlipping) return;
    const currentIdx = isMobile ? activeMobileIndex : (spreadState === 0 ? 0 : spreadState === 2 ? 3 : 1);
    if (targetIdx === currentIdx) return;

    setIsFlipping(true);
    setFlipDirection(targetIdx > currentIdx ? 'forward' : 'backward');

    setTimeout(() => {
      setActiveMobileIndex(targetIdx);
      setSpreadState(targetIdx === 0 ? 0 : targetIdx === 3 ? 2 : 1);
      setIsFlipping(false);
    }, 400);
  };

  // Touch Swipe Gesture Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    // Detect intentional horizontal swipe (at least 40px, predominantly horizontal)
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        // Swiped Left -> Next page
        turnForward();
      } else {
        // Swiped Right -> Previous page
        turnBackward();
      }
    }
  };

  const togglePlay = (id: string, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const video = videoRefs.current[id];
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => { });
      setIsPlaying(prev => ({ ...prev, [id]: true }));
    } else {
      video.pause();
      setIsPlaying(prev => ({ ...prev, [id]: false }));
    }
  };

  // Viewport observer: auto-pause videos when scrolled out of view to preserve mobile GPU/CPU
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Ensure active videos play only when section is in view, pausing inactive ones
  useEffect(() => {
    if (!isInView) {
      Object.values(videoRefs.current).forEach((v) => {
        const video = v as HTMLVideoElement | null;
        if (video && !video.paused) video.pause();
      });
      return;
    }

    const activeVideos: HTMLVideoElement[] = [];

    if (isMobile) {
      const curStyle = ART_STYLES[activeMobileIndex];
      if (curStyle && videoRefs.current[curStyle.id]) {
        activeVideos.push(videoRefs.current[curStyle.id]!);
      }
    } else {
      if (spreadState === 0 && videoRefs.current[styleCover.id]) {
        activeVideos.push(videoRefs.current[styleCover.id]!);
      } else if (spreadState === 1) {
        if (videoRefs.current[styleLeft.id]) activeVideos.push(videoRefs.current[styleLeft.id]!);
        if (videoRefs.current[styleRight.id]) activeVideos.push(videoRefs.current[styleRight.id]!);
      } else if (spreadState === 2 && videoRefs.current[styleEnd.id]) {
        activeVideos.push(videoRefs.current[styleEnd.id]!);
      }
    }

    activeVideos.forEach(v => {
      v.play().catch(() => { });
    });
  }, [spreadState, activeMobileIndex, isMobile, isInView]);

  // Wire spiral ring loops
  const spiralLoops = Array.from({ length: 14 });

  return (
    <section
      ref={sectionRef}
      id="creative-styles"
      className="relative pt-8 sm:pt-12 md:pt-14 pb-12 sm:pb-16 md:pb-20 bg-[#FAF6EE] text-slate-900 border-t border-b border-stone-300/80 overflow-hidden select-none"
    >
      {/* ========================================================
          EXACT ATELIER MOODBOARD BACKGROUND (MATCHING USER MOCKUP)
         ======================================================== */}

      {/* 1. Fine Architectural Dot Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.22]"
        style={{
          backgroundImage: 'radial-gradient(rgba(45, 35, 25, 0.45) 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* 2. Four Precision Corner Hairline Brackets */}
      {/* Top-Left Bracket */}
      <div className="absolute top-3 left-3 sm:top-5 sm:left-5 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-l-2 border-stone-400/60 pointer-events-none" />
      {/* Top-Right Bracket */}
      <div className="absolute top-3 right-3 sm:top-5 sm:right-5 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-r-2 border-stone-400/60 pointer-events-none" />
      {/* Bottom-Left Bracket with Studio Monospace Label */}
      <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 pointer-events-none flex items-end gap-2.5 z-20">
        <div className="w-6 h-6 border-b-2 border-l-2 border-stone-400/60" />
        <span className="font-mono text-[9px] sm:text-[10px] text-stone-500/80 tracking-widest uppercase mb-0.5">
          SCALE 1:1 // ATELIER DESK
        </span>
      </div>
      {/* Bottom-Right Bracket */}
      <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 w-6 h-6 border-b-2 border-r-2 border-stone-400/60 pointer-events-none" />

      {/* ========================================================
          3. FOUR LARGE TRANSLUCENT PASTEL MOODBOARD DISKS
         ======================================================== */}

      {/* --- DISK 1: TOP-LEFT (Soft Periwinkle / Slate-Blue) --- */}
      <div 
        className="absolute -top-16 -left-16 sm:-top-24 sm:-left-24 w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] lg:w-[540px] lg:h-[540px] rounded-full bg-[#E0E6F0]/75 border border-slate-300/30 pointer-events-none"
        aria-hidden="true"
      />
      {/* Top-Left Elements: Yellow Tape, "est. 2026", and Orange Starburst */}
      <div className="absolute top-16 left-8 sm:top-24 sm:left-14 lg:top-28 lg:left-20 pointer-events-none hidden sm:block z-10">
        {/* Yellow Washi Tape */}
        <div className="w-22 sm:w-26 h-6 sm:h-7 bg-[#FDE047] -rotate-3 rounded-xs shadow-xs border border-yellow-300/70" />
        {/* Monospace Caption */}
        <div className="mt-2.5 ml-2 font-mono text-[11px] sm:text-xs text-stone-500/90 tracking-wider">
          est. 2026
        </div>
      </div>
      {/* Orange Starburst in Top-Left Disk */}
      <div className="absolute top-24 left-44 sm:top-36 sm:left-64 lg:top-40 lg:left-80 pointer-events-none z-10">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z" stroke="#FF3B14" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </div>

      {/* --- DISK 2: BOTTOM-LEFT (Soft Peach / Terracotta) --- */}
      <div 
        className="absolute -bottom-20 -left-16 sm:-bottom-28 sm:-left-20 w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] lg:w-[500px] lg:h-[500px] rounded-full bg-[#FCE5DA]/80 border border-orange-200/40 pointer-events-none"
        aria-hidden="true"
      />
      {/* Bottom-Left Elements: Sky Blue Sticky Note, Swatches, "sketch → ship" */}
      <div className="absolute bottom-32 left-8 sm:bottom-44 sm:left-16 lg:bottom-48 lg:left-24 pointer-events-none hidden sm:block z-10">
        {/* Blue Sticky Note with Peach Tape & Underline */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-[#D6E6FE] shadow-sm -rotate-3 rounded-xs border border-blue-200/80 p-2.5 flex flex-col justify-center">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-9 h-3.5 bg-[#FDBA74]/90 rounded-2xs border border-orange-300/40" />
          <div className="w-8 h-0.5 bg-[#2563EB] rounded-full mx-auto mt-2" />
        </div>
      </div>
      {/* Color Palette Swatch Strip */}
      <div className="absolute bottom-16 left-12 sm:bottom-22 sm:left-20 lg:bottom-24 lg:left-32 pointer-events-none hidden sm:flex items-center gap-1 p-1 bg-white/90 rounded-xs shadow-xs border border-stone-200/80 z-10">
        <div className="w-3.5 h-7 rounded-2xs bg-[#1E60FF]" title="Cobalt Blue" />
        <div className="w-3.5 h-7 rounded-2xs bg-[#FF3B14]" title="Vermillion Red" />
        <div className="w-3.5 h-7 rounded-2xs bg-[#FFC043]" title="Warm Yellow" />
        <div className="w-3.5 h-7 rounded-2xs bg-[#111111]" title="Deep Black" />
      </div>
      {/* "sketch → ship" Label with Curved Arrow */}
      <div className="absolute bottom-28 left-40 sm:bottom-36 sm:left-56 lg:bottom-40 lg:left-72 pointer-events-none hidden md:flex items-center gap-1.5 font-mono italic text-[11px] sm:text-xs text-stone-600/90 z-10">
        <span>sketch</span>
        <span className="text-[#FF3B14] font-normal not-italic">→</span>
        <span>ship</span>
      </div>

      {/* --- DISK 3: TOP-RIGHT (Soft Apricot / Peach) --- */}
      <div 
        className="absolute -top-16 -right-16 sm:-top-24 sm:-right-20 w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] lg:w-[540px] lg:h-[540px] rounded-full bg-[#FCE6DC]/80 border border-orange-200/40 pointer-events-none"
        aria-hidden="true"
      />
      {/* Top-Right Elements: Polaroid Photo Card, Technical Angle Line & "idea #07" */}
      <div className="absolute top-14 right-8 sm:top-20 sm:right-16 lg:top-24 lg:right-28 pointer-events-none hidden sm:block z-10">
        {/* Polaroid Card */}
        <div className="w-22 sm:w-26 bg-white p-2 pb-5 sm:pb-6 rounded-xs shadow-md border border-stone-200/90 rotate-6">
          <div className="w-full h-16 sm:h-20 bg-[#1D4ED8] rounded-2xs relative overflow-hidden flex items-center justify-center">
            {/* Orange Sun */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FF3B14] absolute top-1.5 right-2 shadow-xs" />
            {/* Dark Mountain Peaks */}
            <svg viewBox="0 0 100 60" className="absolute bottom-0 inset-x-0 w-full h-12" preserveAspectRatio="none">
              <polygon points="0,60 38,20 72,60" fill="#0F172A" />
              <polygon points="45,60 78,12 100,60" fill="#070B14" />
            </svg>
          </div>
        </div>
      </div>
      {/* Technical Angled Ruler Line with "idea #07" */}
      <div className="absolute top-36 right-36 sm:top-48 sm:right-60 lg:top-52 lg:right-76 pointer-events-none hidden md:flex flex-col items-end z-10">
        <span className="font-mono italic text-[11px] sm:text-xs text-stone-600 mb-1">
          idea #07
        </span>
        <svg width="110" height="28" viewBox="0 0 110 28" fill="none">
          <line x1="0" y1="26" x2="105" y2="4" stroke="#78716C" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="25" y1="20" x2="25" y2="25" stroke="#78716C" strokeWidth="1" />
          <line x1="55" y1="14" x2="55" y2="19" stroke="#78716C" strokeWidth="1" />
          <line x1="85" y1="7" x2="85" y2="12" stroke="#78716C" strokeWidth="1" />
        </svg>
      </div>
      {/* Black Starburst */}
      <div className="absolute top-44 right-20 sm:top-56 sm:right-32 lg:top-60 lg:right-44 pointer-events-none hidden sm:block z-10">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </div>
      {/* Orange Starburst in Top-Right */}
      <div className="absolute top-56 right-36 sm:top-72 sm:right-56 pointer-events-none hidden lg:block z-10">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z" stroke="#FF3B14" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      </div>

      {/* --- DISK 4: BOTTOM-RIGHT (Soft Periwinkle / Steel Blue) --- */}
      <div 
        className="absolute -bottom-20 -right-16 sm:-bottom-28 sm:-right-20 w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] lg:w-[540px] lg:h-[540px] rounded-full bg-[#E0E7F2]/80 border border-slate-300/40 pointer-events-none"
        aria-hidden="true"
      />
      {/* Bottom-Right Elements: "motion atelier" green tag, Classic Yellow Pencil */}
      <div className="absolute bottom-44 right-16 sm:bottom-56 sm:right-28 lg:bottom-64 lg:right-36 pointer-events-none hidden sm:block z-10">
        <div className="px-3 py-1 bg-[#BBF7D0]/90 border border-emerald-300/60 rounded-xs shadow-xs -rotate-2">
          <span className="font-mono text-[10.5px] sm:text-[11.5px] font-bold text-[#15803D] tracking-wider">
            motion atelier
          </span>
        </div>
      </div>
      {/* Classic Yellow Drawing Pencil SVG */}
      <div className="absolute bottom-16 right-12 sm:bottom-24 sm:right-20 lg:bottom-28 lg:right-32 pointer-events-none hidden sm:block -rotate-[32deg] z-10">
        <svg width="180" height="40" viewBox="0 0 180 40" fill="none">
          {/* Eraser */}
          <path d="M 0,13 Q 0,8 6,8 L 16,8 L 16,32 L 6,32 Q 0,32 0,27 Z" fill="#EF4444" />
          {/* Silver Ferrule Band */}
          <rect x="16" y="8" width="12" height="24" fill="#94A3B8" />
          <line x1="22" y1="8" x2="22" y2="32" stroke="#64748B" strokeWidth="1" />
          {/* Yellow Hexagonal Body */}
          <rect x="28" y="8" width="112" height="8" fill="#FACC15" />
          <rect x="28" y="16" width="112" height="8" fill="#EAB308" />
          <rect x="28" y="24" width="112" height="8" fill="#CA8A04" />
          {/* Sharpened Wood Collar */}
          <polygon points="140,8 165,20 140,32" fill="#FDE68A" />
          {/* Graphite Lead Tip */}
          <polygon points="156,16 175,20 156,24" fill="#0F172A" />
        </svg>
      </div>

      {/* ========================================================
          4. CENTER CONCENTRIC ORBITAL SYSTEM & DOODLE SQUIGGLES
         ======================================================== */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] lg:w-[840px] lg:h-[840px] pointer-events-none z-0">
        
        {/* Soft Radial Center Illumination */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle 360px at center, rgba(255, 255, 255, 0.75) 0%, rgba(250, 246, 238, 0.45) 55%, transparent 75%)',
          }}
        />

        {/* Concentric Dashed Orbital SVG Rings */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 800" fill="none">
          {/* Inner Gray Orbit */}
          <circle cx="400" cy="400" r="230" stroke="#78716C" strokeWidth="1.2" strokeDasharray="5 6" opacity="0.45" />
          {/* Outer Orange Orbit */}
          <circle cx="400" cy="400" r="320" stroke="#FF3B14" strokeWidth="1.2" strokeDasharray="4 5" opacity="0.4" />

          {/* Doodles & Squiggles along Orbits */}
          {/* 1. Orange Wave Squiggle (Top-Left of Notebook) */}
          <path d="M 230,220 Q 250,205 270,220 T 310,220" fill="none" stroke="#FF3B14" strokeWidth="2.5" strokeLinecap="round" />

          {/* 2. Black Smooth Wave Squiggle (Left of Notebook) */}
          <path d="M 195,330 Q 215,315 235,330 T 275,330" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />

          {/* 3. Blue Zigzag "M" (Lower-Left of Notebook) */}
          <path d="M 240,480 L 252,465 L 264,480 L 276,465 L 288,480" fill="none" stroke="#0052FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* 4. Orange Loop-de-loop (Bottom-Right of Notebook) */}
          <path d="M 525,550 C 545,550 560,520 545,520 C 530,520 540,565 570,560" fill="none" stroke="#FF3B14" strokeWidth="2.5" strokeLinecap="round" />

          {/* 5. Curved Dashed Arrow pointing Up-Right */}
          <path d="M 515,265 Q 545,250 565,220" fill="none" stroke="#0F172A" strokeWidth="1.8" strokeDasharray="4 4" />
          <path d="M 558,218 L 567,218 L 566,227" fill="none" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

          {/* Orbital Nodes */}
          {/* Hollow Circles */}
          <circle cx="215" cy="425" r="4" stroke="#0F172A" strokeWidth="1.5" fill="none" />
          <circle cx="585" cy="435" r="4" stroke="#0F172A" strokeWidth="1.5" fill="none" />
          {/* Orange Filled Nodes */}
          <circle cx="240" cy="380" r="3.5" fill="#FF3B14" />
          <circle cx="560" cy="460" r="3.5" fill="#FF3B14" />
          {/* Black Starburst at lower-left orbit */}
          <g transform="translate(290, 600)">
            <path d="M6 0C6 3.5 3.5 6 0 6C3.5 6 6 8.5 6 12C6 8.5 8.5 6 12 6C8.5 6 6 3.5 6 0Z" stroke="#0F172A" strokeWidth="1.5" fill="none" />
          </g>
          {/* Orange Starburst at upper-right orbit */}
          <g transform="translate(555, 345)">
            <path d="M7 0C7 4 4 7 0 7C4 7 7 10 7 14C7 10 10 7 14 7C10 7 7 4 7 0Z" stroke="#FF3B14" strokeWidth="1.75" fill="none" />
          </g>
          {/* Black Starburst at lower-right */}
          <g transform="translate(515, 650)">
            <path d="M6 0C6 3.5 3.5 6 0 6C3.5 6 6 8.5 6 12C6 8.5 8.5 6 12 6C8.5 6 6 3.5 6 0Z" stroke="#0F172A" strokeWidth="1.5" fill="none" />
          </g>
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ========================================================
            1. SECTION TITLE
           ======================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-7">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black text-slate-950 tracking-tight leading-[1.12]">
            Better creatives make better{' '}
            <span className="font-editorial-italic font-normal italic text-[#FF3B14]">
              ads
            </span>.
          </h2>
        </div>

        {/* ========================================================
            2. THE NOTEBOOK (Cover: Single, 2 & 3: Double, End: Single)
           ======================================================== */}
        <div
          className={`relative mx-auto transition-[max-width] duration-500 ease-out touch-pan-y ${
            !isMobile && spreadState === 1
              ? 'max-w-[680px] sm:max-w-[780px]'
              : 'w-full max-w-[340px] sm:max-w-[390px]'
          }`}
          style={{ perspective: '2400px', willChange: 'max-width' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* HARDCOVER CASING WITH LUXURY DESK SHADOW */}
          <div className="relative bg-[#262320] rounded-[24px] sm:rounded-[32px] p-2.5 sm:p-3.5 shadow-[0_32px_70px_-15px_rgba(0,0,0,0.45),0_15px_30px_-8px_rgba(0,0,0,0.3)] border border-[#171513]">

            {/* Page Stack Depth */}
            <div className="absolute right-0 top-3 bottom-5 w-2.5 bg-gradient-to-r from-[#DDD8CC] to-[#C4BEB1] rounded-r-sm shadow-inner pointer-events-none" />
            <div className="absolute left-4 right-2 bottom-0 h-2.5 bg-gradient-to-b from-[#DDD8CC] to-[#B5AFA2] rounded-b-sm shadow-inner pointer-events-none" />

            {/* NOTEBOOK BODY */}
            <div className="relative bg-[#FAF8F3] rounded-[18px] sm:rounded-[24px] overflow-hidden border border-[#E5E0D5] min-h-[460px] sm:min-h-[540px]">

              {/* Ruled Notebook Paper Texture */}
              <div
                className="absolute inset-0 pointer-events-none opacity-35 z-0"
                style={{
                  backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 27px, #D4CEBF 28px)',
                }}
                aria-hidden="true"
              />

              {/* ====================================================
                  MOBILE VIEW: SINGLE PAGE (STYLES 01, 02, 03, 04)
                 ==================================================== */}
              {isMobile ? (
                <div
                  key={`mobile-page-${activeMobileIndex}`}
                  className="relative w-full p-2.5 sm:p-4 flex flex-col justify-center cursor-pointer z-10"
                  onClick={turnForward}
                  title="Tap to turn page →"
                >
                  {/* Left Wire Spiral Spine */}
                  <div className="absolute left-0 top-0 bottom-0 w-7 sm:w-8 flex flex-col justify-between py-2.5 pointer-events-none z-30 bg-gradient-to-r from-stone-900/20 to-transparent">
                    {spiralLoops.slice(0, 12).map((_, i) => (
                      <div key={i} className="flex items-center relative h-5 sm:h-6 -my-0.5">
                        <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-xs bg-[#1F1D1A] ml-0.5 sm:ml-1 shadow-inner" />
                        <div className="absolute left-0 w-5 sm:w-6 h-3.5 sm:h-4 rounded-full border-t-2 border-b-2 border-l border-stone-400 bg-gradient-to-r from-stone-500 via-stone-200 to-stone-600 shadow-sm" />
                      </div>
                    ))}
                  </div>

                  {/* Red Margin Line */}
                  <div className="absolute top-0 bottom-0 left-7 sm:left-8 w-px bg-red-400/35 pointer-events-none" />

                  {/* Page Content */}
                  <div className="pl-6 sm:pl-7 pr-1">
                    <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-slate-950 shadow-md group">
                      <video
                        key={ART_STYLES[activeMobileIndex].videoSrc}
                        ref={el => { videoRefs.current[ART_STYLES[activeMobileIndex].id] = el; }}
                        src={ART_STYLES[activeMobileIndex].videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover select-none pointer-events-none"
                        aria-label={`${ART_STYLES[activeMobileIndex].name} animated loop`}
                      />

                      {/* Top Washi Tape */}
                      <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-4.5 sm:h-5 ${ART_STYLES[activeMobileIndex].tapeColor} ${ART_STYLES[activeMobileIndex].tapeRotation} rounded-xs border shadow-xs pointer-events-none`} />

                      {/* Fullscreen Expand Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalGif(ART_STYLES[activeMobileIndex]);
                        }}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center cursor-pointer pointer-events-auto z-20"
                        title="Fullscreen"
                        aria-label="View fullscreen"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Play/Pause Button */}
                      <button
                        type="button"
                        onClick={(e) => togglePlay(ART_STYLES[activeMobileIndex].id, e)}
                        className={`absolute ${activeMobileIndex === 0 ? 'bottom-2.5 left-2.5' : 'bottom-2.5 left-13'} w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer pointer-events-auto z-20`}
                        title={isPlaying[ART_STYLES[activeMobileIndex].id] ? 'Pause' : 'Play'}
                        aria-label={isPlaying[ART_STYLES[activeMobileIndex].id] ? 'Pause' : 'Play'}
                      >
                        {isPlaying[ART_STYLES[activeMobileIndex].id] ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                      </button>

                      {/* Turn Back Dog-Ear Corner (for Pages 1, 2, 3) */}
                      {activeMobileIndex > 0 && (
                        <div
                          className="absolute bottom-0 left-0 w-11 h-11 pointer-events-auto z-30 cursor-pointer transition-transform duration-200 active:scale-95"
                          style={{
                            clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
                            background: 'linear-gradient(225deg, rgba(250,248,243,0.98) 0%, rgba(220,212,198,0.98) 100%)',
                            boxShadow: '3px -3px 6px rgba(0,0,0,0.2)',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            turnBackward();
                          }}
                          title="Turn backward"
                        >
                          <div className="absolute bottom-1 left-1 text-[8px] font-mono font-bold text-slate-800">
                            ↶ PREV
                          </div>
                        </div>
                      )}

                      {/* Next / Open / Cover Dog-Ear Corner */}
                      <div
                        className="absolute bottom-0 right-0 w-12 sm:w-14 h-12 sm:h-14 pointer-events-auto z-30 cursor-pointer transition-transform duration-200 active:scale-95"
                        style={{
                          clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
                          background: 'linear-gradient(135deg, rgba(250,248,243,0.98) 0%, rgba(220,212,198,0.98) 100%)',
                          boxShadow: '-3px -3px 8px rgba(0,0,0,0.3)',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          turnForward();
                        }}
                        title={activeMobileIndex === 0 ? 'Open sketchbook' : activeMobileIndex === 3 ? 'Return to cover' : 'Next style'}
                      >
                        <div className="absolute bottom-1 sm:bottom-1.5 right-1 sm:right-1.5 flex items-center gap-0.5 text-[8.5px] sm:text-[9px] font-mono font-bold text-slate-800">
                          {activeMobileIndex === 0 ? (
                            <>
                              <BookOpen className="w-2.5 h-2.5 text-[#FF3B14]" />
                              <span>OPEN</span>
                            </>
                          ) : activeMobileIndex === 3 ? (
                            <>
                              <RotateCw className="w-2.5 h-2.5 text-[#FF3B14]" />
                              <span>COVER</span>
                            </>
                          ) : (
                            <span>NEXT ↷</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* DESKTOP VIEW: 3-STATE SPREAD (0: Cover, 1: 2 & 3 Spread, 2: End) */
                <>
                  {/* ====================================================
                      STATE 0: COVER (Single Page: Style 01 - Electric Doodle)
                     ==================================================== */}
                  {spreadState === 0 && (
                    <div
                      key="page-cover"
                      className="relative w-full p-3 sm:p-4 flex flex-col justify-center cursor-pointer z-10"
                      onClick={turnForward}
                      title="Click to open notebook →"
                    >
                      {/* Left Wire Spiral Spine */}
                      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-9 flex flex-col justify-between py-3 pointer-events-none z-30 bg-gradient-to-r from-stone-900/20 to-transparent">
                        {spiralLoops.map((_, i) => (
                          <div key={i} className="flex items-center relative h-6 sm:h-7 -my-0.5">
                            <div className="w-2.5 h-2.5 rounded-xs bg-[#1F1D1A] ml-1 shadow-inner" />
                            <div className="absolute left-0 w-6 h-4 rounded-full border-t-2 border-b-2 border-l border-stone-400 bg-gradient-to-r from-stone-500 via-stone-200 to-stone-600 shadow-sm" />
                          </div>
                        ))}
                      </div>

                      {/* Red Margin Line */}
                      <div className="absolute top-0 bottom-0 left-9 sm:left-10 w-px bg-red-400/35 pointer-events-none" />

                      <div className="pl-7 sm:pl-8">
                        <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-slate-950 shadow-md group">
                          <video
                            key={styleCover.videoSrc}
                            ref={el => { videoRefs.current[styleCover.id] = el; }}
                            src={styleCover.videoSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover select-none pointer-events-none"
                            aria-label="Style 01 animated loop"
                          />

                          <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-24 h-5 ${styleCover.tapeColor} ${styleCover.tapeRotation} rounded-xs border shadow-xs pointer-events-none`} />

                          {/* Expand Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveModalGif(styleCover);
                            }}
                            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center cursor-pointer pointer-events-auto z-20"
                            title="Fullscreen"
                            aria-label="View fullscreen"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Play/Pause Button */}
                          <button
                            type="button"
                            onClick={(e) => togglePlay(styleCover.id, e)}
                            className="absolute bottom-2.5 left-2.5 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer pointer-events-auto z-20"
                            title={isPlaying[styleCover.id] ? 'Pause' : 'Play'}
                            aria-label={isPlaying[styleCover.id] ? 'Pause' : 'Play'}
                          >
                            {isPlaying[styleCover.id] ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                          </button>

                          {/* Open Dog-Ear Corner */}
                          <div
                            className="absolute bottom-0 right-0 w-14 h-14 pointer-events-auto z-30 transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                            style={{
                              clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
                              background: 'linear-gradient(135deg, rgba(250,248,243,0.98) 0%, rgba(220,212,198,0.98) 100%)',
                              boxShadow: '-3px -3px 8px rgba(0,0,0,0.3)',
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              turnForward();
                            }}
                            title="Open notebook"
                          >
                            <div className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5 text-[9px] font-mono font-bold text-slate-800">
                              <BookOpen className="w-2.5 h-2.5 text-[#FF3B14]" />
                              <span>OPEN</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ====================================================
                      STATE 1: 2 AND 3 (Double Page Spread: Style 02 & Style 03)
                     ==================================================== */}
                  {spreadState === 1 && (
                    <div key="page-spread-2-and-3" className="grid grid-cols-2 relative">

                      {/* CENTER WIRE SPIRAL BINDING */}
                      <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-7 sm:w-8 flex flex-col justify-between py-2 sm:py-3 pointer-events-none z-30">
                        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/15 via-stone-800/30 to-stone-900/15" />
                        {spiralLoops.map((_, i) => (
                          <div key={i} className="flex items-center justify-center relative h-5 sm:h-6 -my-0.5">
                            <div className="w-5 sm:w-6 h-3 sm:h-3.5 rounded-full border-t-2 border-b-2 border-stone-400 bg-gradient-to-r from-stone-600 via-stone-200 to-stone-600 shadow-md" />
                          </div>
                        ))}
                      </div>

                      {/* LEFT PAGE (Style 02 - Mixed-Media) */}
                      <div
                        className="relative p-2.5 sm:p-3.5 pr-3 sm:pr-4 flex flex-col justify-center cursor-pointer border-r border-[#D9D3C7] shadow-[inset_-14px_0_18px_-8px_rgba(0,0,0,0.14)] z-10"
                        onClick={turnBackward}
                        title="Click left page to turn back ←"
                      >
                        <div className="absolute top-0 bottom-0 left-5 sm:left-7 w-px bg-red-400/35 pointer-events-none" />

                        <div className="pl-3 sm:pl-4">
                          <div className="relative w-full aspect-[9/16] rounded-lg sm:rounded-xl overflow-hidden bg-slate-950 shadow-md group">
                            <video
                              key={styleLeft.videoSrc}
                              ref={el => { videoRefs.current[styleLeft.id] = el; }}
                              src={styleLeft.videoSrc}
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="metadata"
                              className="w-full h-full object-cover select-none pointer-events-none"
                              aria-label="Style 02 animated loop"
                            />

                            <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 ${styleLeft.tapeColor} ${styleLeft.tapeRotation} rounded-xs border shadow-xs pointer-events-none`} />

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveModalGif(styleLeft);
                              }}
                              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center cursor-pointer pointer-events-auto z-20"
                              title="Fullscreen"
                              aria-label="View fullscreen"
                            >
                              <Maximize2 className="w-3 h-3" />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => togglePlay(styleLeft.id, e)}
                              className="absolute bottom-2 left-2 w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer pointer-events-auto z-20"
                              title={isPlaying[styleLeft.id] ? 'Pause' : 'Play'}
                              aria-label={isPlaying[styleLeft.id] ? 'Pause' : 'Play'}
                            >
                              {isPlaying[styleLeft.id] ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
                            </button>

                            {/* Turn Back Corner */}
                            <div
                              className="absolute bottom-0 left-0 w-10 h-10 pointer-events-auto z-30 transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                              style={{
                                clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
                                background: 'linear-gradient(225deg, rgba(250,248,243,0.98) 0%, rgba(220,212,198,0.98) 100%)',
                                boxShadow: '3px -3px 6px rgba(0,0,0,0.2)',
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                turnBackward();
                              }}
                              title="Turn back"
                            >
                              <div className="absolute bottom-1 left-1 text-[8px] font-mono font-bold text-slate-800">
                                ↶ BACK
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT PAGE (Style 03 - Die-Cut Sticker) */}
                      <div
                        className="relative p-2.5 sm:p-3.5 pl-3 sm:pl-4 flex flex-col justify-center cursor-pointer border-l border-[#D9D3C7] shadow-[inset_14px_0_18px_-8px_rgba(0,0,0,0.14)] z-10"
                        onClick={turnForward}
                        title="Click right page to turn forward →"
                      >
                        <div className="pr-3 sm:pr-4">
                          <div className="relative w-full aspect-[9/16] rounded-lg sm:rounded-xl overflow-hidden bg-slate-950 shadow-md group">
                            <video
                              key={styleRight.videoSrc}
                              ref={el => { videoRefs.current[styleRight.id] = el; }}
                              src={styleRight.videoSrc}
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="metadata"
                              className="w-full h-full object-cover select-none pointer-events-none"
                              aria-label="Style 03 animated loop"
                            />

                            <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 ${styleRight.tapeColor} ${styleRight.tapeRotation} rounded-xs border shadow-xs pointer-events-none`} />

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveModalGif(styleRight);
                              }}
                              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center cursor-pointer pointer-events-auto z-20"
                              title="Fullscreen"
                              aria-label="View fullscreen"
                            >
                              <Maximize2 className="w-3 h-3" />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => togglePlay(styleRight.id, e)}
                              className="absolute bottom-2 left-2 w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer pointer-events-auto z-20"
                              title={isPlaying[styleRight.id] ? 'Pause' : 'Play'}
                              aria-label={isPlaying[styleRight.id] ? 'Pause' : 'Play'}
                            >
                              {isPlaying[styleRight.id] ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
                            </button>

                            {/* Turn Next Corner */}
                            <div
                              className="absolute bottom-0 right-0 w-10 sm:w-12 h-10 sm:h-12 pointer-events-auto z-30 transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                              style={{
                                clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
                                background: 'linear-gradient(135deg, rgba(250,248,243,0.98) 0%, rgba(220,212,198,0.98) 100%)',
                                boxShadow: '-3px -3px 6px rgba(0,0,0,0.2)',
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                turnForward();
                              }}
                              title="Turn next"
                            >
                              <div className="absolute bottom-1 right-1 text-[8px] font-mono font-bold text-slate-800">
                                NEXT ↷
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* ====================================================
                      STATE 2: END (Single Page: Style 04 - Meadow Storybook Cel)
                     ==================================================== */}
                  {spreadState === 2 && (
                    <div
                      key="page-end"
                      className="relative w-full p-3 sm:p-4 flex flex-col justify-center cursor-pointer z-10"
                      onClick={turnForward}
                      title="Click to turn page and return to Cover ↻"
                    >
                      {/* Wire Spiral on Right (Back cover / last sheet) */}
                      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-9 flex flex-col justify-between py-3 pointer-events-none z-30 bg-gradient-to-l from-stone-900/20 to-transparent">
                        {spiralLoops.map((_, i) => (
                          <div key={i} className="flex items-center relative h-6 sm:h-7 -my-0.5">
                            <div className="w-2.5 h-2.5 rounded-xs bg-[#1F1D1A] mr-1 shadow-inner ml-auto" />
                            <div className="absolute right-0 w-6 h-4 rounded-full border-t-2 border-b-2 border-r border-stone-400 bg-gradient-to-l from-stone-500 via-stone-200 to-stone-600 shadow-sm" />
                          </div>
                        ))}
                      </div>

                      {/* Red Margin Line */}
                      <div className="absolute top-0 bottom-0 right-9 sm:right-10 w-px bg-red-400/35 pointer-events-none" />

                      <div className="pr-7 sm:pr-8">
                        <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-slate-950 shadow-md group">
                          <video
                            key={styleEnd.videoSrc}
                            ref={el => { videoRefs.current[styleEnd.id] = el; }}
                            src={styleEnd.videoSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover select-none pointer-events-none"
                            aria-label="Style 04 animated loop"
                          />

                          <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-24 h-5 ${styleEnd.tapeColor} ${styleEnd.tapeRotation} rounded-xs border shadow-xs pointer-events-none`} />

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveModalGif(styleEnd);
                            }}
                            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center cursor-pointer pointer-events-auto z-20"
                            title="Fullscreen"
                            aria-label="View fullscreen"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => togglePlay(styleEnd.id, e)}
                            className="absolute bottom-2.5 left-2.5 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer pointer-events-auto z-20"
                            title={isPlaying[styleEnd.id] ? 'Pause' : 'Play'}
                            aria-label={isPlaying[styleEnd.id] ? 'Pause' : 'Play'}
                          >
                            {isPlaying[styleEnd.id] ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                          </button>

                          {/* Turn to Cover Corner */}
                          <div
                            className="absolute bottom-0 right-0 w-14 h-14 pointer-events-auto z-30 transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                            style={{
                              clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
                              background: 'linear-gradient(135deg, rgba(250,248,243,0.98) 0%, rgba(220,212,198,0.98) 100%)',
                              boxShadow: '-3px -3px 8px rgba(0,0,0,0.3)',
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              turnForward();
                            }}
                            title="Return to cover"
                          >
                            <div className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5 text-[9px] font-mono font-bold text-slate-800">
                              <RotateCw className="w-2.5 h-2.5 text-[#FF3B14]" />
                              <span>COVER</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* ====================================================
                  SMOOTH 3D FLIP SHEET
                 ==================================================== */}
              {isFlipping && (
                <div
                  className="absolute inset-0 z-40 pointer-events-none"
                  style={{
                    transformOrigin: flipDirection === 'forward' ? 'left center' : 'right center',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    animation: flipDirection === 'forward'
                      ? 'smoothPageFlipForward 0.5s cubic-bezier(0.4, 0.0, 0.2, 1) forwards'
                      : 'smoothPageFlipBackward 0.5s cubic-bezier(0.4, 0.0, 0.2, 1) forwards',
                  }}
                >
                  <div
                    className="absolute inset-0 bg-[#FAF8F3] border border-[#E5E0D5] shadow-2xl flex items-center justify-center"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 27px, #D4CEBF 28px)',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-stone-600/25 via-stone-400/10 to-transparent" />
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* ========================================================
            3. TACTILE NOTEBOOK CONTROLS & STYLE PAGINATION BAR
           ======================================================== */}
        <div className="mt-6 sm:mt-9 flex flex-col items-center justify-center gap-3 relative z-20">
          {/* Navigation Pill */}
          <div className="flex items-center gap-2 sm:gap-4 bg-[#EFE9DC]/90 backdrop-blur-xs border border-stone-300/80 rounded-full px-2.5 sm:px-4 py-1.5 shadow-sm">
            {/* Prev Button */}
            <button
              type="button"
              onClick={turnBackward}
              className="w-8 h-8 rounded-full bg-white hover:bg-stone-50 text-slate-800 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
              title="Previous style"
              aria-label="Previous style"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Active Style Title Indicator */}
            <div className="px-2 sm:px-3 text-center min-w-[150px] sm:min-w-[210px]">
              <div className="font-mono text-[10px] text-[#FF3B14] font-bold tracking-wider uppercase">
                {isMobile
                  ? `Style ${ART_STYLES[activeMobileIndex].number} / 04`
                  : spreadState === 0
                    ? 'Cover // Style 01'
                    : spreadState === 1
                      ? 'Spread // Styles 02 & 03'
                      : 'End // Style 04'
                }
              </div>
              <div className="font-heading font-bold text-xs sm:text-sm text-slate-900 truncate">
                {isMobile
                  ? ART_STYLES[activeMobileIndex].name
                  : spreadState === 0
                    ? ART_STYLES[0].name
                    : spreadState === 1
                      ? `${ART_STYLES[1].name} & ${ART_STYLES[2].name}`
                      : ART_STYLES[3].name
                }
              </div>
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={turnForward}
              className="w-8 h-8 rounded-full bg-white hover:bg-stone-50 text-slate-800 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
              title="Next style"
              aria-label="Next style"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Style Pagination Indicator Dots */}
          <div className="flex items-center gap-2 pt-0.5">
            {ART_STYLES.map((style, idx) => {
              const isActive = isMobile
                ? activeMobileIndex === idx
                : (spreadState === 0 && idx === 0) ||
                  (spreadState === 1 && (idx === 1 || idx === 2)) ||
                  (spreadState === 2 && idx === 3);

              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => jumpToStyle(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? 'w-7 sm:w-8 h-2 bg-[#FF3B14] shadow-xs'
                      : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                  title={`Jump to Style ${style.number}: ${style.name}`}
                  aria-label={`Jump to Style ${style.number}`}
                />
              );
            })}
          </div>

          {/* User Gestures Helper Note */}
          <div className="flex items-center gap-2 text-stone-500 font-mono text-[10.5px] sm:text-[11px] mt-0.5">
            <span>Swipe or tap to flip pages</span>
            <span className="text-stone-400">•</span>
            <span>Tap video for controls</span>
          </div>
        </div>

      </div>

      {/* ========================================================
          4. FULLSCREEN / MAGNIFY MODAL
         ======================================================== */}
      {activeModalGif && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveModalGif(null)}
        >
          <div
            className="relative bg-[#FAF7F0] p-3 sm:p-4 rounded-3xl max-w-xs sm:max-w-sm w-full shadow-2xl border border-stone-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModalGif(null)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-[#FF3B14] text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer z-30"
              title="Close"
              aria-label="Close fullscreen view"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-xl">
              <video
                key={activeModalGif.videoSrc}
                src={activeModalGif.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-3 text-center">
              <div className="font-mono text-[11px] font-bold text-[#FF3B14] tracking-wider uppercase">
                Style {activeModalGif.number}
              </div>
              <div className="font-heading font-bold text-base text-stone-900">
                {activeModalGif.name}
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
