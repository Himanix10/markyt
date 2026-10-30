import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 74;
const SECTION_BG = '#FAFBF8'; // Sampled from video frame 1: rgb(250, 251, 248)

export const StoryPerspectiveScrollSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fullCanvasRef = useRef<HTMLCanvasElement>(null);
  const taglineBoxRef = useRef<HTMLDivElement>(null);

  const fullImagesRef = useRef<HTMLImageElement[]>([]);

  const [fullLoadedCount, setFullLoadedCount] = useState(0);
  const [isPreloading, setIsPreloading] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [taglineLayout, setTaglineLayout] = useState({ top: 26, width: 440 });

  // Layout & frame state
  const scrollProgressRef = useRef(0);
  const currentFrameFloatRef = useRef(0);
  const currentFrameIdxRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const isInViewRef = useRef<boolean>(false);
  const isAnimatingRef = useRef<boolean>(false);

  // Cached layout dimensions
  const layoutRef = useRef({
    stageW: 0,
    stageH: 0,
    navH: 64,
    taglineTop: 26,
    taglineBottom: 170,
    taglineW: 440,
    scale: 1,
    dw: 1280,
    dh: 720,
    dx: 0,
    dy: 0,
  });

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Preload frames as section approaches viewport (lazy-load)
  useEffect(() => {
    const target = sectionRef.current || stageRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isPreloading) {
          setIsPreloading(true);
        }
      },
      { rootMargin: '800px 0px 800px 0px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [isPreloading]);

  // Load all 74 full animation frames
  useEffect(() => {
    if (!isPreloading) return;

    const fullImgs: HTMLImageElement[] = [];
    let fCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const frameNum = String(i).padStart(3, '0');
      const fullImg = new Image();
      fullImg.src = `/scroll-frames/full/frame_${frameNum}.webp`;
      fullImg.onload = () => {
        fCount++;
        setFullLoadedCount(fCount);
      };
      fullImg.onerror = () => {
        fCount++;
        setFullLoadedCount(fCount);
      };
      fullImgs.push(fullImg);
    }

    fullImagesRef.current = fullImgs;
  }, [isPreloading]);

  // Compute Layout Geometry (Zones, Anchors, and Scales)
  const computeLayout = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const stageW = rect.width;
    const stageH = rect.height;

    const isMobile = stageW < 640;
    const isTablet = stageW >= 640 && stageW < 1024;
    const navH = isMobile ? 56 : 68;

    // 1. Full-Screen Creative:
    // Image spans 100% full screen (edge-to-edge & top-to-bottom, zero cut).
    const dw = stageW;
    const dh = stageH;
    const dx = 0;
    const dy = 0;
    const scale = stageW / 1280;

    // 2. Tagline Sizing & Positioning:
    // Uses horizontal desktop spread layout (3.13:1 aspect ratio) for wide, neat presentation
    // Guarantees zero top cutoff for Line 1 and zero collision with the center figure
    const turbanY = Math.round(stageH * 0.272);
    const minTop = isMobile ? 18 : 26;
    const minBottomClearance = isMobile ? 8 : 12;

    // Available vertical headroom strictly between minTop and turban
    const availableH = turbanY - minTop - minBottomClearance;
    const maxH = Math.max(availableH, 50);

    // Tagline desktop spread aspect ratio (551 / 176 = 3.1307)
    const TAGLINE_ASPECT = 551.0 / 176.0;

    let desiredW: number;
    if (isMobile) {
      desiredW = Math.min(320, Math.round(stageW * 0.85));
    } else if (isTablet) {
      desiredW = Math.min(420, Math.round(stageW * 0.55));
    } else {
      desiredW = Math.min(540, Math.round(stageW * 0.42));
    }

    const desiredH = desiredW / TAGLINE_ASPECT;
    const actualH = Math.min(desiredH, maxH);
    const taglineW = Math.round(actualH * TAGLINE_ASPECT);
    const taglineH = Math.round(taglineW / TAGLINE_ASPECT);

    const freeSpace = turbanY - taglineH;
    const taglineTop = Math.max(minTop, Math.round(freeSpace * 0.44));
    const taglineBottom = taglineTop + taglineH;

    // Directly synchronize DOM element if already mounted
    if (taglineBoxRef.current) {
      taglineBoxRef.current.style.top = `${taglineTop}px`;
      taglineBoxRef.current.style.width = `${taglineW}px`;
    }
    setTaglineLayout({ top: taglineTop, width: taglineW });

    layoutRef.current = {
      stageW,
      stageH,
      navH,
      taglineTop,
      taglineBottom,
      taglineW,
      scale,
      dw,
      dh,
      dx,
      dy,
    };

    // Update canvas resolution with devicePixelRatio
    const fullCanvas = fullCanvasRef.current;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

    if (fullCanvas) {
      fullCanvas.width = Math.round(stageW * dpr);
      fullCanvas.height = Math.round(stageH * dpr);
    }
  }, []);

  // Draw full frame with high-fidelity image smoothing
  const drawCanvases = useCallback((frameIdx: number) => {
    const fullCanvas = fullCanvasRef.current;
    if (!fullCanvas) return;

    const fullCtx = fullCanvas.getContext('2d', { alpha: false });
    if (!fullCtx) return;

    const { stageW, stageH, dw, dh, dx, dy } = layoutRef.current;
    const isMobile = stageW < 640;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

    // Scale context so we draw in CSS pixels with high quality smoothing
    fullCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    fullCtx.imageSmoothingEnabled = true;
    fullCtx.imageSmoothingQuality = 'high';

    // Solid Background Fill
    fullCtx.fillStyle = SECTION_BG;
    fullCtx.fillRect(0, 0, stageW, stageH);

    const fullImg = fullImagesRef.current[frameIdx];

    // Draw full frame: clean, sharp, natural linework with zero dark artifacts or halos
    if (fullImg && fullImg.complete && fullImg.naturalWidth > 0) {
      fullCtx.drawImage(fullImg, dx, dy, dw, dh);
    }
  }, []);

  // Optimized event-driven RAF & GSAP Pinning
  useEffect(() => {
    const stage = stageRef.current;
    const section = sectionRef.current;
    if (!stage || !section) return;

    computeLayout();

    const renderFrame = () => {
      if (prefersReducedMotion) {
        drawCanvases(TOTAL_FRAMES - 1);
        if (taglineBoxRef.current) {
          taglineBoxRef.current.style.transform = 'translateX(-50%) translateY(0px) scale(1)';
          taglineBoxRef.current.style.opacity = '1';
        }
        isAnimatingRef.current = false;
        rafIdRef.current = null;
        return;
      }

      const p = scrollProgressRef.current;
      const START_P = 0.05;
      const END_P = 0.88;

      let targetFrame = 0;
      let animP = 0;

      if (p <= START_P) {
        targetFrame = 0;
        animP = 0;
      } else if (p >= END_P) {
        targetFrame = TOTAL_FRAMES - 1;
        animP = 1;
      } else {
        animP = (p - START_P) / (END_P - START_P);
        targetFrame = animP * (TOTAL_FRAMES - 1);
      }

      const diff = targetFrame - currentFrameFloatRef.current;
      const needsMoreFrames = Math.abs(diff) > 0.005;

      // Silky responsive damping without sluggish lag or hitching
      if (needsMoreFrames) {
        currentFrameFloatRef.current += diff * 0.25;
      } else {
        currentFrameFloatRef.current = targetFrame;
      }

      const newFrameIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameFloatRef.current))
      );

      if (newFrameIdx !== currentFrameIdxRef.current) {
        currentFrameIdxRef.current = newFrameIdx;
        drawCanvases(newFrameIdx);
      }

      // Smooth 3D depth recession for tagline
      if (taglineBoxRef.current) {
        const stageW = layoutRef.current.stageW || window.innerWidth;
        const downDistance = stageW < 640 ? 14 : 20;
        const depthTranslateY = animP * downDistance;
        const depthScale = 1 - animP * 0.14;

        let depthOpacity = 1;
        if (animP > 0.05) {
          const t = Math.min(1, Math.max(0, (animP - 0.05) / 0.65));
          const easeT = t * t * (3 - 2 * t);
          depthOpacity = 1 - easeT * 0.70;
        }

        taglineBoxRef.current.style.transform = `translateX(-50%) translateY(${depthTranslateY.toFixed(2)}px) scale(${depthScale.toFixed(4)})`;
        taglineBoxRef.current.style.opacity = depthOpacity.toFixed(3);
      }

      if (needsMoreFrames && isInViewRef.current) {
        rafIdRef.current = requestAnimationFrame(renderFrame);
      } else {
        isAnimatingRef.current = false;
        rafIdRef.current = null;
      }
    };

    const triggerRender = () => {
      if (!isInViewRef.current || isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      rafIdRef.current = requestAnimationFrame(renderFrame);
    };

    // Intersection observer to pause loop when offscreen
    const viewObserver = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries[0].isIntersecting;
        isInViewRef.current = isIntersecting;
        if (isIntersecting) {
          triggerRender();
        } else if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
          isAnimatingRef.current = false;
        }
      },
      { rootMargin: '100px 0px 100px 0px' }
    );
    viewObserver.observe(section);

    // Buttery smooth GSAP ScrollTrigger with momentum scrub
    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=400%',
      pin: stage,
      pinSpacing: true,
      scrub: 0.8,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
        triggerRender();
      },
    });

    // Window resize handling: tracks both width and height to adapt to laptop viewports
    let lastW = typeof window !== 'undefined' ? window.innerWidth : 0;
    let lastH = typeof window !== 'undefined' ? window.innerHeight : 0;
    const handleResize = () => {
      if (
        typeof window !== 'undefined' &&
        (window.innerWidth !== lastW || window.innerHeight !== lastH)
      ) {
        lastW = window.innerWidth;
        lastH = window.innerHeight;
        computeLayout();
        ScrollTrigger.refresh();
        drawCanvases(currentFrameIdxRef.current);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      pinTrigger.kill();
      viewObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [computeLayout, drawCanvases, prefersReducedMotion]);

  // Initial draw once first frame loads
  useEffect(() => {
    if (fullLoadedCount >= 1) {
      computeLayout();
      ScrollTrigger.refresh();
      const initialFrame = prefersReducedMotion ? TOTAL_FRAMES - 1 : 0;
      drawCanvases(initialFrame);
    }
  }, [fullLoadedCount, computeLayout, drawCanvases, prefersReducedMotion]);

  const { taglineTop, taglineW } = layoutRef.current;
  const isInitialReady = fullLoadedCount >= 1;

  return (
    <section
      id="our-creative-story"
      ref={sectionRef}
      className="relative w-full select-none p-0 m-0"
      style={{ backgroundColor: SECTION_BG }}
    >
      {/* 
        The Pin Stage: Exactly 100svh tall (100vh fallback) and 100% wide.
        Pinned by GSAP ScrollTrigger with end: '+=400%' and pinSpacing: true.
      */}
      <div
        ref={stageRef}
        className="relative w-full h-[100svh] min-h-screen overflow-hidden flex flex-col justify-start items-center"
        style={{ backgroundColor: SECTION_BG }}
      >
        {/* =================================================================
            Clean Canvas: 100% full-screen perspective artwork
            Pristine linework with zero halos, zero edge shadows, zero jitter
           ================================================================= */}
        <div className="absolute inset-0 z-10 pointer-events-none w-full h-full">
          <canvas
            ref={fullCanvasRef}
            className="w-full h-full block"
          />
        </div>

        {/* =================================================================
            Tagline (Unified Calligraphy)
            Positioned with comfortable headroom and zero turban overlap
           ================================================================= */}
        <div
          ref={taglineBoxRef}
          className="absolute z-20 pointer-events-none flex items-center justify-center"
          style={{
            top: `${taglineLayout.top}px`,
            left: '50%',
            transform: 'translateX(-50%) translateY(0px) scale(1)',
            transformOrigin: '50% 20%',
            width: `${taglineLayout.width}px`,
            willChange: 'transform, opacity',
            zIndex: 20,
          }}
        >
          <picture className="w-full block">
            <source 
              srcSet="/scroll-frames/tagline/tagline_desktop_spread@2x.png 2x, /scroll-frames/tagline/tagline_desktop_spread.png 1x" 
            />
            <img
              src="/scroll-frames/tagline/tagline_desktop_spread.png"
              alt="Been my thing since 2016. Now we are a team"
              className="w-full h-auto object-contain pointer-events-none select-none block"
              draggable={false}
            />
          </picture>
        </div>

        {/* Loading Indicator */}
        {!isInitialReady && (
          <div className="absolute bottom-8 right-8 z-40 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-slate-900/10 text-[11px] font-mono text-slate-600 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#FF3B14] animate-ping" />
            <span>
              Loading experience... {Math.round((fullLoadedCount / TOTAL_FRAMES) * 100)}%
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
