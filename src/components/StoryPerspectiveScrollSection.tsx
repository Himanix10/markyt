import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 74;
const SECTION_BG = '#ffffff'; // Sampled from video frame 1

export const StoryPerspectiveScrollSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fullCanvasRef = useRef<HTMLCanvasElement>(null);
  const peopleCanvasRef = useRef<HTMLCanvasElement>(null);
  const taglineBoxRef = useRef<HTMLDivElement>(null);

  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  const fullImagesRef = useRef<HTMLImageElement[]>([]);
  const peopleImagesRef = useRef<HTMLImageElement[]>([]);

  const [fullLoadedCount, setFullLoadedCount] = useState(0);
  const [peopleLoadedCount, setPeopleLoadedCount] = useState(0);
  const [isPreloading, setIsPreloading] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Layout & frame state
  const scrollProgressRef = useRef(0);
  const currentFrameFloatRef = useRef(0);
  const currentFrameIdxRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // Cached layout dimensions
  const layoutRef = useRef({
    stageW: 0,
    stageH: 0,
    navH: 64,
    topZoneH: 240,
    taglineTop: 40,
    taglineBottom: 360,
    taglineW: 600,
    taglineH: 340,
    scale: 0.85,
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

  // Load all 74 full frames and 74 decontaminated people frames
  useEffect(() => {
    if (!isPreloading) return;

    const fullImgs: HTMLImageElement[] = [];
    const peopleImgs: HTMLImageElement[] = [];
    let fCount = 0;
    let pCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const frameNum = String(i).padStart(3, '0');

      // 1. Full Frame
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

      // 2. People Frame
      const peopleImg = new Image();
      peopleImg.src = `/scroll-frames/people/frame_${frameNum}.webp`;
      peopleImg.onload = () => {
        pCount++;
        setPeopleLoadedCount(pCount);
      };
      peopleImg.onerror = () => {
        pCount++;
        setPeopleLoadedCount(pCount);
      };
      peopleImgs.push(peopleImg);
    }

    fullImagesRef.current = fullImgs;
    peopleImagesRef.current = peopleImgs;
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

    // 1. Full 1280x720 artwork sizing:
    // User requirement: "n is cutting the img, i need full img"
    // The entire artwork must be 100% visible — NO CROPPING / NO CUTTING anywhere.
    let scale: number;
    let dy: number;

    if (isMobile) {
      // Fit mobile width with clean margin, leaving top half for large legible tagline
      scale = Math.min((stageW - 20) / 1280, (stageH * 0.44) / 720);
      const dw = 1280 * scale;
      const dh = 720 * scale;
      dy = Math.round(stageH - dh - 24);
    } else {
      // Desktop & Tablet:
      // Leave upper ~32% of stage for prominent tagline, rest for full artwork
      const maxArtworkH = Math.min(stageH * 0.68, stageH - 240);
      const scaleH = maxArtworkH / 720;
      const scaleW = (stageW * 0.90) / 1280;
      scale = Math.min(scaleH, scaleW);

      const dw = 1280 * scale;
      const dh = 720 * scale;
      // Anchor artwork near bottom so sneakers and grid floor sit naturally
      dy = Math.round(stageH - dh - 16);
    }

    const dw = 1280 * scale;
    const dh = 720 * scale;
    const dx = Math.round((stageW - dw) / 2);

    // 2. Tagline Sizing & Positioning:
    // User requirement: "text is still not visible n is too small"
    // Make tagline significantly larger, bold, readable, and well-spaced in the upper white space.
    let taglineW: number;
    let taglineH: number;
    let taglineTop: number;

    if (isMobile) {
      taglineW = Math.min(stageW * 0.88, 340);
      taglineH = Math.round(taglineW * 0.58);
      taglineTop = Math.max(48, Math.round((dy - taglineH) * 0.45));
    } else if (isTablet) {
      taglineW = Math.min(stageW * 0.65, 520);
      taglineH = Math.round(taglineW * 0.58);
      taglineTop = Math.max(36, Math.round((dy - taglineH) * 0.38));
    } else {
      // Desktop: bold and prominent (up to 640px wide)
      taglineW = Math.min(stageW * 0.52, 640);
      taglineH = Math.round(taglineW * 0.58);
      taglineTop = Math.max(32, Math.round((dy - taglineH) * 0.35));
    }

    const taglineBottom = taglineTop + taglineH;
    const navH = isMobile ? 56 : 68;

    layoutRef.current = {
      stageW,
      stageH,
      navH,
      topZoneH: taglineBottom - navH,
      taglineTop,
      taglineBottom,
      taglineW,
      taglineH,
      scale,
      dx,
      dy,
    };

    // Update canvases resolution with devicePixelRatio
    const fullCanvas = fullCanvasRef.current;
    const peopleCanvas = peopleCanvasRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (fullCanvas && peopleCanvas) {
      fullCanvas.width = Math.round(stageW * dpr);
      fullCanvas.height = Math.round(stageH * dpr);
      peopleCanvas.width = Math.round(stageW * dpr);
      peopleCanvas.height = Math.round(stageH * dpr);
    }
  }, []);

  // Draw full frame (Layer 1) and people frame (Layer 3)
  const drawCanvases = useCallback((frameIdx: number) => {
    const fullCanvas = fullCanvasRef.current;
    const peopleCanvas = peopleCanvasRef.current;
    if (!fullCanvas || !peopleCanvas) return;

    const fullCtx = fullCanvas.getContext('2d', { alpha: false });
    const peopleCtx = peopleCanvas.getContext('2d', { alpha: true });
    if (!fullCtx || !peopleCtx) return;

    const { stageW, stageH, scale, dx, dy } = layoutRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Scale contexts so we draw in CSS pixels
    fullCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    peopleCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Layer 1 Background Fill
    fullCtx.fillStyle = SECTION_BG;
    fullCtx.fillRect(0, 0, stageW, stageH);

    // Layer 3 Clear for clean transparency
    peopleCtx.clearRect(0, 0, stageW, stageH);

    const fullImg = fullImagesRef.current[frameIdx];
    const peopleImg = peopleImagesRef.current[frameIdx];

    const dw = 1280 * scale;
    const dh = 720 * scale;

    // 1. Draw Layer 1 (Full Frame: background, grid lines, and figures)
    if (fullImg && fullImg.complete && fullImg.naturalWidth > 0) {
      fullCtx.drawImage(fullImg, dx, dy, dw, dh);

      // Flawlessly feather top edge of fullImg into SECTION_BG so zero cut or seam is ever visible
      if (dy > 0) {
        const featherH = Math.min(60, dh * 0.12);
        const topGrad = fullCtx.createLinearGradient(0, dy - 1, 0, dy + featherH);
        topGrad.addColorStop(0, SECTION_BG);
        topGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        fullCtx.fillStyle = topGrad;
        fullCtx.fillRect(0, dy - 2, stageW, featherH + 2);
      }
    }

    // 2. Draw Layer 3 (Decontaminated People-Only Frame: exact pixel-for-pixel alignment above text)
    if (peopleImg && peopleImg.complete && peopleImg.naturalWidth > 0) {
      peopleCtx.drawImage(peopleImg, dx, dy, dw, dh);
    }
  }, []);

  // GSAP Pinning Setup
  useEffect(() => {
    const stage = stageRef.current;
    const section = sectionRef.current;
    if (!stage || !section) return;

    computeLayout();

    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=420%',
      pin: stage,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      },
    });

    return () => {
      pinTrigger.kill();
    };
  }, [computeLayout, prefersReducedMotion]);

  // Animation Loop with Cushioned Buffers and Silky-Smooth Lerp (0.10)
  useEffect(() => {
    const animate = () => {
      if (prefersReducedMotion) {
        drawCanvases(TOTAL_FRAMES - 1);
        if (taglineBoxRef.current) {
          taglineBoxRef.current.style.transform = 'translateX(-50%) translateY(0px) scale(1)';
          taglineBoxRef.current.style.opacity = '1';
        }
        return;
      }

      const p = scrollProgressRef.current;

      // Cushion thresholds:
      const START_P = 0.06;
      const END_P = 0.86;

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

      // Smooth lerp (0.10 factor)
      const diff = targetFrame - currentFrameFloatRef.current;
      if (Math.abs(diff) > 0.001) {
        currentFrameFloatRef.current += diff * 0.10;
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

      // Update Tagline 3D recession & soft fade (does not disappear completely):
      if (taglineBoxRef.current) {
        const stageW = layoutRef.current.stageW || window.innerWidth;
        const downDistance = stageW < 640 ? 20 : 30;
        const depthTranslateY = animP * downDistance;
        const depthScale = 1 - animP * 0.16;

        // Fades smoothly from 1.0 down to ~0.35 (persists as part of background wall, never vanishes to 0)
        let depthOpacity = 1;
        if (animP > 0.05) {
          const t = Math.min(1, Math.max(0, (animP - 0.05) / 0.70));
          const easeT = t * t * (3 - 2 * t);
          depthOpacity = 1 - easeT * 0.65;
        }

        taglineBoxRef.current.style.transform = `translateX(-50%) translateY(${depthTranslateY.toFixed(2)}px) scale(${depthScale.toFixed(4)})`;
        taglineBoxRef.current.style.opacity = depthOpacity.toFixed(3);
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [drawCanvases, prefersReducedMotion]);

  // Window resize handling
  useEffect(() => {
    const handleResize = () => {
      computeLayout();
      ScrollTrigger.refresh();
      drawCanvases(currentFrameIdxRef.current);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [computeLayout, drawCanvases]);

  // Initial draw once first frame loads
  useEffect(() => {
    if (fullLoadedCount >= 1) {
      computeLayout();
      ScrollTrigger.refresh();
      const initialFrame = prefersReducedMotion ? TOTAL_FRAMES - 1 : 0;
      drawCanvases(initialFrame);
    }
  }, [fullLoadedCount, computeLayout, drawCanvases, prefersReducedMotion]);

  const { taglineTop, taglineW, taglineH } = layoutRef.current;
  const isInitialReady = fullLoadedCount >= 1;

  return (
    <section
      id="our-creative-story"
      ref={sectionRef}
      className="relative w-full bg-white select-none p-0 m-0"
      style={{ backgroundColor: SECTION_BG }}
    >
      {/* 
        The Pin Stage: Exactly 100svh tall (100vh fallback) and 100% wide.
        Pinned by GSAP ScrollTrigger with end: '+=420%' and pinSpacing: true.
      */}
      <div
        ref={stageRef}
        className="relative w-full h-[100svh] min-h-screen overflow-hidden flex flex-col justify-start items-center"
        style={{ backgroundColor: SECTION_BG }}
      >
        {/* =================================================================
            LAYER 1 (z-index 10): Full-Frame Canvas (background, grid lines, figures)
           ================================================================= */}
        <div className="absolute inset-0 z-10 pointer-events-none w-full h-full">
          <canvas
            ref={fullCanvasRef}
            className="w-full h-full block"
          />
        </div>

        {/* =================================================================
            Seamless Top Blend Overlay: Fades top of stage into SECTION_BG
           ================================================================= */}
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-16 sm:h-20 z-[15] bg-gradient-to-b from-white via-white/50 to-transparent"
          aria-hidden="true"
        />

        {/* =================================================================
            Seamless Bottom Blend Overlay: Fades bottom of stage into SECTION_BG
           ================================================================= */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 sm:h-20 z-[15] bg-gradient-to-t from-white via-white/50 to-transparent"
          aria-hidden="true"
        />

        {/* =================================================================
            LAYER 2 (z-index 20): Tagline (3 Line Images)
            Sits in the upper clear white space above the figures.
            Recedes softly into 3D depth and persists as part of the background wall.
           ================================================================= */}
        <div
          ref={taglineBoxRef}
          className="absolute z-20 pointer-events-none"
          style={{
            top: `${taglineTop}px`,
            left: '50%',
            transform: 'translateX(-50%) translateY(0px) scale(1)',
            transformOrigin: '50% 30%',
            width: `${taglineW || 340}px`,
            height: `${taglineH || 200}px`,
            willChange: 'transform, opacity',
            zIndex: 20,
          }}
        >
          {/* Line 1: "Been my thing" */}
          <div
            ref={line1Ref}
            className="absolute"
            style={{
              left: '4%',
              top: '0%',
              width: '92%',
              height: '38%',
            }}
          >
            <picture>
              <source 
                srcSet="/scroll-frames/tagline/line_1@2x.png 2x, /scroll-frames/tagline/line_1.png 1x" 
              />
              <img
                src="/scroll-frames/tagline/line_1.png"
                alt="Been my thing"
                className="w-full h-full object-contain pointer-events-none select-none block"
                draggable={false}
              />
            </picture>
          </div>

          {/* Line 2: "since 2016." */}
          <div
            ref={line2Ref}
            className="absolute"
            style={{
              left: '20%',
              top: '35%',
              width: '60%',
              height: '28%',
            }}
          >
            <picture>
              <source 
                srcSet="/scroll-frames/tagline/line_2@2x.png 2x, /scroll-frames/tagline/line_2.png 1x" 
              />
              <img
                src="/scroll-frames/tagline/line_2.png"
                alt="since 2016."
                className="w-full h-full object-contain pointer-events-none select-none block"
                draggable={false}
              />
            </picture>
          </div>

          {/* Line 3: "Now we are a team" */}
          <div
            ref={line3Ref}
            className="absolute"
            style={{
              left: '0%',
              top: '64%',
              width: '100%',
              height: '36%',
            }}
          >
            <picture>
              <source 
                srcSet="/scroll-frames/tagline/line_3@2x.png 2x, /scroll-frames/tagline/line_3.png 1x" 
              />
              <img
                src="/scroll-frames/tagline/line_3.png"
                alt="Now we are a team"
                className="w-full h-full object-contain pointer-events-none select-none block"
                draggable={false}
              />
            </picture>
          </div>
        </div>

        {/* =================================================================
            LAYER 3 (z-index 30): Decontaminated People-Only Frame Canvas
            Pixel-for-pixel aligned with Layer 1 canvas.
           ================================================================= */}
        <div className="absolute inset-0 z-30 pointer-events-none w-full h-full">
          <canvas
            ref={peopleCanvasRef}
            className="w-full h-full block"
          />
        </div>

        {/* Loading Indicator */}
        {(!isInitialReady || (peopleLoadedCount < 10 && !prefersReducedMotion)) && (
          <div className="absolute bottom-8 right-8 z-40 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-slate-900/10 text-[11px] font-mono text-slate-600 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#FF3B14] animate-ping" />
            <span>
              Loading experience... {Math.round(((fullLoadedCount + peopleLoadedCount) / (TOTAL_FRAMES * 2)) * 100)}%
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
