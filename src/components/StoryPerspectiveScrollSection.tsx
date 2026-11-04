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
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const isPreloadingRef = useRef<boolean>(false);
  const rafPendingRef = useRef<boolean>(false);
  const [isInitialReady, setIsInitialReady] = useState<boolean>(false);

  // Frame tracking state (stored in refs to avoid any React re-render during scroll)
  const currentFrameIdxRef = useRef<number>(0);

  // Cached layout dimensions
  const layoutRef = useRef({
    stageW: 0,
    stageH: 0,
    dw: 1920,
    dh: 1080,
    dx: 0,
    dy: 0,
    dpr: 1,
  });

  // Fast Draw Frame on cached Canvas Context
  const drawFrame = useCallback((frameIdx: number) => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    const { stageW, stageH, dw, dh, dx, dy } = layoutRef.current;
    if (stageW === 0 || stageH === 0) return;

    // Fill background
    ctx.fillStyle = SECTION_BG;
    ctx.fillRect(0, 0, stageW, stageH);

    const img = imagesRef.current[frameIdx];
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.drawImage(img, dx, dy, dw, dh);
    }
  }, []);

  // Compute Layout Geometry (Full-screen on desktop; tight, cohesive composition right below tagline on mobile)
  const computeLayout = useCallback(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const rect = stage.getBoundingClientRect();
    const stageW = Math.round(rect.width);
    const stageH = Math.round(rect.height);

    if (stageW === 0 || stageH === 0) return;

    const isMobile = stageW < 768;

    let dw: number;
    let dh: number;
    let dx: number;
    let dy: number;

    if (!isMobile) {
      // Desktop: Edge-to-edge full screen (100% UNTOUCHED)
      dw = stageW;
      dh = stageH;
      dx = 0;
      dy = 0;
    } else {
      // Mobile portrait: Tight, cohesive composition right below the tagline with zero awkward void
      const targetPeopleWidth = stageW * 0.88;
      const scale = targetPeopleWidth / 958;
      dw = Math.round(1920 * scale);
      dh = Math.round(1080 * scale);
      dx = Math.round(stageW / 2 - 876 * scale);
      dy = Math.max(8, Math.round(stageH * 0.02));
    }

    // On mobile, dpr=1 ensures lightning-fast 60/120fps GPU fill rate without stutter
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);

    layoutRef.current = {
      stageW,
      stageH,
      dw,
      dh,
      dx,
      dy,
      dpr,
    };

    // Update canvas buffer size & CSS size
    canvas.width = Math.round(stageW * dpr);
    canvas.height = Math.round(stageH * dpr);
    canvas.style.width = `${stageW}px`;
    canvas.style.height = `${stageH}px`;

    // Cache context with desynchronized flag for zero-latency direct screen pipeline
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true }) || canvas.getContext('2d', { alpha: false });
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium'; // Fast hardware-accelerated bilinear filtering
      ctxRef.current = ctx;
    }
  }, []);

  // Preload frames when section is approaching viewport
  useEffect(() => {
    const target = sectionRef.current || stageRef.current;
    if (!target) return;

    const startPreload = () => {
      if (isPreloadingRef.current) return;
      isPreloadingRef.current = true;

      const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);

      // Load Frame 1 first with high priority for instant initial paint
      const f1 = new Image();
      f1.decoding = 'async';
      f1.src = '/scroll-frames/full/frame_001.webp';
      imgs[0] = f1;

      const onFirstLoad = () => {
        setIsInitialReady(true);
        computeLayout();
        drawFrame(0);
      };

      if (f1.complete) {
        onFirstLoad();
      } else {
        f1.onload = onFirstLoad;
        f1.onerror = onFirstLoad;
      }

      // Preload remaining frames in batches without triggering React re-renders
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        const frameNum = String(i).padStart(3, '0');
        const img = new Image();
        img.decoding = 'async';
        img.src = `/scroll-frames/full/frame_${frameNum}.webp`;
        imgs[i - 1] = img;
      }

      imagesRef.current = imgs;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startPreload();
        }
      },
      { rootMargin: '800px 0px 800px 0px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [computeLayout, drawFrame]);

  // GSAP Pinning & ScrollTrigger with hardware-accelerated RAF updates
  useEffect(() => {
    const stage = stageRef.current;
    const section = sectionRef.current;
    if (!stage || !section) return;

    computeLayout();

    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

    // Pinning with smooth scrub and zero-overhead RAF frame draw
    const pinTrigger = ScrollTrigger.create({
      trigger: stage,
      start: 'top top',
      end: isMobile ? '+=220%' : '+=320%',
      pin: stage,
      pinSpacing: true,
      scrub: 0.35, // Responsive, buttery momentum scrub
      onUpdate: (self) => {
        const frameIdx = Math.min(
          Math.max(Math.round(self.progress * (TOTAL_FRAMES - 1)), 0),
          TOTAL_FRAMES - 1
        );

        if (frameIdx !== currentFrameIdxRef.current) {
          currentFrameIdxRef.current = frameIdx;
          if (!rafPendingRef.current) {
            rafPendingRef.current = true;
            requestAnimationFrame(() => {
              drawFrame(currentFrameIdxRef.current);
              rafPendingRef.current = false;
            });
          }
        }
      },
    });

    let lastW = typeof window !== 'undefined' ? window.innerWidth : 0;
    let lastH = typeof window !== 'undefined' ? window.innerHeight : 0;
    const handleResize = () => {
      if (
        typeof window !== 'undefined' &&
        (Math.abs(window.innerWidth - lastW) > 10 || Math.abs(window.innerHeight - lastH) > 50)
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
      window.removeEventListener('resize', handleResize);
    };
  }, [computeLayout, drawFrame]);

  // Initial draw once ready
  useEffect(() => {
    if (isInitialReady) {
      computeLayout();
      drawFrame(0);
    }
  }, [isInitialReady, computeLayout, drawFrame]);

  return (
    <section
      id="creative-3d-perspective"
      ref={sectionRef}
      className="relative w-full select-none pb-12 md:pb-20"
      style={{ backgroundColor: SECTION_BG }}
    >
      {/* Tagline Header with tight mobile padding */}
      <div className="w-full flex flex-col items-center justify-center pt-6 pb-2 sm:pt-14 sm:pb-8 md:pt-24 md:pb-16 px-4">
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

      {/* The Pin Stage: GPU-accelerated canvas stage */}
      <div
        ref={stageRef}
        className="relative w-full h-[100svh] min-h-screen overflow-hidden flex flex-col justify-start items-center"
        style={{
          backgroundColor: SECTION_BG,
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      >
        <div className="absolute inset-0 z-10 pointer-events-none w-full h-full">
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            style={{
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
          />
        </div>
      </div>
    </section>
  );
};
