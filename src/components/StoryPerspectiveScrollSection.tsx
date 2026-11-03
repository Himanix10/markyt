import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 93;
const SECTION_BG = '#FAFBF8'; // Sampled from video frame: rgb(250, 251, 248)

export const StoryPerspectiveScrollSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isPreloading, setIsPreloading] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Layout & frame state
  const scrollProgressRef = useRef(0);
  const currentFrameFloatRef = useRef(0);
  const currentFrameIdxRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const isAnimatingRef = useRef<boolean>(false);

  // Cached layout dimensions
  const layoutRef = useRef({
    stageW: 0,
    stageH: 0,
    dw: 1920,
    dh: 1080,
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

  // Preload frames as section approaches viewport
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

  // Load all 93 frames (30fps sequence)
  useEffect(() => {
    if (!isPreloading) return;

    const imgs: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const frameNum = String(i).padStart(3, '0');
      const img = new Image();
      img.src = `/scroll-frames/full/frame_${frameNum}.webp`;
      img.onload = () => {
        count++;
        setLoadedCount(count);
      };
      img.onerror = () => {
        count++;
        setLoadedCount(count);
      };
      imgs.push(img);
    }

    imagesRef.current = imgs;
  }, [isPreloading]);

  // Compute Layout Geometry (Full-screen edge-to-edge, top-anchored with zero upper-part cut-off)
  const computeLayout = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const stageW = Math.round(rect.width);
    const stageH = Math.round(rect.height);

    if (stageW === 0 || stageH === 0) return;

    const isMobile = stageW < 768;
    const imgAspect = 1920 / 1080;
    const stageAspect = stageW / stageH;

    let dw: number;
    let dh: number;
    let dx: number;
    let dy: number;

    // Full-Screen edge-to-edge: upper part (turban/heads) and lower part (foot/sneaker) are 100% whole with zero cut
    if (stageW >= 768) {
      // Desktop: Edge-to-edge full screen
      dw = stageW;
      dh = stageH;
      dx = 0;
      dy = 0;
    } else {
      // Mobile portrait: Full height coverage, centered horizontally
      dh = stageH;
      dw = Math.round(stageH * imgAspect);
      dx = Math.round((stageW - dw) / 2);
      dy = 0;
    }

    layoutRef.current = {
      stageW,
      stageH,
      dw,
      dh,
      dx,
      dy,
    };

    // Update canvas resolution with devicePixelRatio for ultra-sharp Retina rendering
    const canvas = canvasRef.current;
    const dpr = isMobile ? Math.min(window.devicePixelRatio || 1, 1.5) : Math.min(window.devicePixelRatio || 1, 2);

    if (canvas) {
      canvas.width = Math.round(stageW * dpr);
      canvas.height = Math.round(stageH * dpr);
      canvas.style.width = `${stageW}px`;
      canvas.style.height = `${stageH}px`;
    }
  }, []);

  // Draw full frame on canvas
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const { stageW, stageH, dw, dh, dx, dy } = layoutRef.current;
    if (stageW === 0 || stageH === 0) return;

    const isMobile = stageW < 768;
    const dpr = isMobile ? Math.min(window.devicePixelRatio || 1, 1.5) : Math.min(window.devicePixelRatio || 1, 2);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Clear background
    ctx.fillStyle = SECTION_BG;
    ctx.fillRect(0, 0, stageW, stageH);

    const img = imagesRef.current[frameIdx];
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.drawImage(img, dx, dy, dw, dh);
    }
  }, []);

  // Frame tick animation loop
  const triggerRender = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const targetFrame = scrollProgressRef.current * (TOTAL_FRAMES - 1);

    const tick = () => {
      const current = currentFrameFloatRef.current;
      const diff = targetFrame - current;

      if (Math.abs(diff) < 0.05) {
        currentFrameFloatRef.current = targetFrame;
        const newIdx = Math.min(Math.max(Math.round(targetFrame), 0), TOTAL_FRAMES - 1);
        if (newIdx !== currentFrameIdxRef.current) {
          currentFrameIdxRef.current = newIdx;
          drawFrame(newIdx);
        }
        isAnimatingRef.current = false;
        rafIdRef.current = null;
        return;
      }

      // Smooth 30fps lerp
      currentFrameFloatRef.current = current + diff * 0.18;
      const newIdx = Math.min(
        Math.max(Math.round(currentFrameFloatRef.current), 0),
        TOTAL_FRAMES - 1
      );

      if (newIdx !== currentFrameIdxRef.current) {
        currentFrameIdxRef.current = newIdx;
        drawFrame(newIdx);
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);
  }, [drawFrame]);

  // GSAP Pinning & ScrollTrigger
  useEffect(() => {
    const stage = stageRef.current;
    const section = sectionRef.current;
    if (!stage || !section) return;

    computeLayout();

    const viewObserver = new IntersectionObserver(
      (entries) => {
        const inView = entries[0].isIntersecting;
        if (!inView && rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
          isAnimatingRef.current = false;
        }
      },
      { rootMargin: '100px 0px 100px 0px' }
    );
    viewObserver.observe(section);

    // Responsive GSAP ScrollTrigger with momentum scrub
    const pinTrigger = ScrollTrigger.create({
      trigger: stage,
      start: 'top top',
      end: '+=350%',
      pin: stage,
      pinSpacing: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const frameIdx = Math.min(
          Math.max(Math.round(self.progress * (TOTAL_FRAMES - 1)), 0),
          TOTAL_FRAMES - 1
        );
        if (frameIdx !== currentFrameIdxRef.current) {
          currentFrameIdxRef.current = frameIdx;
          drawFrame(frameIdx);
        }
      },
    });

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
        drawFrame(currentFrameIdxRef.current);
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
  }, [computeLayout, drawFrame, triggerRender]);

  // Initial draw once first frame loads
  useEffect(() => {
    if (loadedCount >= 1) {
      computeLayout();
      ScrollTrigger.refresh();
      const initialFrame = prefersReducedMotion ? TOTAL_FRAMES - 1 : 0;
      drawFrame(initialFrame);
    }
  }, [loadedCount, computeLayout, drawFrame, prefersReducedMotion]);

  const isInitialReady = loadedCount >= 1;

  return (
    <section
      id="creative-3d-perspective"
      ref={sectionRef}
      className="relative w-full select-none pb-12 md:pb-20"
      style={{ backgroundColor: SECTION_BG }}
    >
      {/* =================================================================
          The space between the perspective and the upper section
          Where the text is placed
         ================================================================= */}
      <div className="w-full flex flex-col items-center justify-center pt-14 pb-10 sm:pt-20 sm:pb-14 md:pt-24 md:pb-16 px-4">
        <div className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[480px]">
          <picture className="w-full block">
            <source
              srcSet="/scroll-frames/tagline/tagline_clean_header@2x.png 2x, /scroll-frames/tagline/tagline_clean_header.png 1x"
            />
            <img
              src="/scroll-frames/tagline/tagline_clean_header.png"
              alt="Been my thing since 2016. Now we are a team"
              className="w-full h-auto object-contain mx-auto block select-none pointer-events-none"
              draggable={false}
            />
          </picture>
        </div>
      </div>

      {/* 
        The Pin Stage: Exactly 100svh tall (100vh fallback), full screen.
        Pinned by GSAP ScrollTrigger across 350% scroll distance with momentum scrub.
      */}
      <div
        ref={stageRef}
        className="relative w-full h-[100svh] min-h-screen overflow-hidden flex flex-col justify-start items-center"
        style={{ backgroundColor: SECTION_BG }}
      >
        {/* Full-screen high-quality canvas artwork */}
        <div className="absolute inset-0 z-10 pointer-events-none w-full h-full">
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
          />
        </div>



        {/* Loading Indicator */}
        {!isInitialReady && (
          <div className="absolute bottom-8 right-8 z-40 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-mono text-slate-600">
            <span className="w-2 h-2 rounded-full bg-[#FF3B14] animate-ping" />
            <span>
              Loading 3D perspective... {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

