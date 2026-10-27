import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 74;
const SECTION_BG = '#FAFBF8'; // Sampled from video frame 1

export const StoryPerspectiveScrollSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fullCanvasRef = useRef<HTMLCanvasElement>(null);
  const peopleCanvasRef = useRef<HTMLCanvasElement>(null);
  const taglineBoxRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

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
    taglineTop: 70,
    taglineBottom: 310,
    taglineW: 360,
    taglineH: 260,
    scale: 0.9,
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

    // Account for fixed nav (56px mobile, 68px desktop)
    const navH = stageW < 640 ? 56 : 68;

    // Tagline size: expanded slightly as requested (~15% larger)
    // 305px-310px on mobile, 470px-480px on desktop
    // Height ratio based on tight 3-line layout: 590 / 915 = 0.645
    const taglineW = stageW < 640 ? Math.min(310, stageW * 0.84) : Math.min(480, stageW * 0.50);
    const taglineH = Math.round(taglineW * (590 / 915));

    // Position tagline in the upper clear white part
    const taglineTop = stageW < 640 ? 46 : 58;
    const taglineBottom = taglineTop + taglineH;

    // Full-screen edge-to-edge object-fit: cover scaling
    const scale = Math.max(stageW / 1280, stageH / 720);
    const dw = 1280 * scale;
    const dh = 720 * scale;

    // Horizontally centered
    const dx = (stageW - dw) / 2;

    // Vertical positioning:
    // Extend white part from top by shifting video canvas down:
    // On landscape desktop: (stageH - dh) * 0.15 + 90
    // On portrait mobile: (stageH - dh) * 0.55 + 80
    const isPortrait = stageH > stageW;
    const dy = isPortrait ? Math.round((stageH - dh) * 0.55 + 80) : Math.round((stageH - dh) * 0.15 + 90);

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

    // Pinning via GSAP ScrollTrigger
    // Trigger is the unpinned parent section; stage is pinned inside it
    // scrub: true provides 1:1 responsive synchronization so the pin holds firmly without lag
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
  // Entry cushion: p in [0.00, 0.06] -> rest at frame 0 with tagline fully readable
  // Active push-in: p in (0.06, 0.86) -> maps smoothly to frames 0..73, tagline moves down & recedes
  // Exit cushion:  p in [0.86, 1.00] -> rest at frame 73 with tagline fully faded away
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

      // Smooth lerp (0.10 factor: silky-smooth deceleration, avoids lagging behind user scroll)
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

      // Update Tagline 3D recession & disappearance:
      // While scrolling down: text keeps moving down behind faces (+140px / +100px) and scales down
      // Towards the end of the push-in: disappears smoothly between animP = 0.55 and 0.80
      // When scrolling up: seamlessly returns to normal position and full opacity
      if (taglineBoxRef.current) {
        const stageW = layoutRef.current.stageW || window.innerWidth;
        const downDistance = stageW < 640 ? 100 : 140;
        const depthTranslateY = animP * downDistance;
        const depthScale = 1 - animP * 0.32; // 1.00 down to 0.68

        // Disappearance curve: smooth Hermite fade between animP = 0.55 and 0.80
        // By animP = 0.80, text is completely gone (opacity 0)
        let depthOpacity = 1;
        if (animP > 0.55) {
          const t = Math.min(1, Math.max(0, (animP - 0.55) / 0.25));
          depthOpacity = Math.max(0, 1 - (t * t * (3 - 2 * t)));
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
      className="relative w-full bg-[#FAFBF8] select-none p-0 m-0"
      style={{ backgroundColor: SECTION_BG }}
    >
      {/* 
        The Pin Stage: Exactly 100svh tall (100vh fallback) and 100% wide.
        Pinned by GSAP ScrollTrigger with end: '+=350%' and pinSpacing: true.
      */}
      <div
        ref={stageRef}
        className="relative w-full h-[100svh] min-h-screen overflow-hidden flex flex-col justify-start items-center"
        style={{ backgroundColor: SECTION_BG }}
      >
        {/* =================================================================
            LAYER 1 (z-index 1): Full-Frame Canvas (background, grid lines, figures)
            Features soft gradient feather on left/right edges so no hard lines show.
           ================================================================= */}
        <div className="absolute inset-0 z-10 pointer-events-none w-full h-full">
          <canvas
            ref={fullCanvasRef}
            className="w-full h-full block"
          />
        </div>

        {/* =================================================================
            LAYER 2 (z-index 20): Tagline (3 Line Images)
            Sits in the extended top white part, BEHIND the faces (Layer 3 at z-30).
            Recedes into 3D depth and disappears towards end of scroll.
           ================================================================= */}
        <div
          ref={taglineBoxRef}
          className="absolute z-20 pointer-events-none"
          style={{
            top: `${taglineTop}px`,
            left: '50%',
            transform: 'translateX(-50%) translateY(0px) scale(1)',
            transformOrigin: '50% 40%',
            width: `${taglineW || 340}px`,
            height: `${taglineH || 220}px`,
            willChange: 'transform, opacity',
            zIndex: 20,
          }}
        >
          {/* Line 1: "Been my thing" */}
          <div
            ref={line1Ref}
            className="absolute"
            style={{
              left: '4.48%',
              top: '0%',
              width: '92.68%',
              height: '49.49%',
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
              left: '20.48%',
              top: '38.98%',
              width: '60.99%',
              height: '27.97%',
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
              top: '62.71%',
              width: '100%',
              height: '39.32%',
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
            LAYER 3 (z-index 3): Decontaminated People-Only Frame Canvas
            Pixel-for-pixel aligned with Layer 1 canvas.
            Edges eroded by 1px, feathered, and decontaminated.
            At frame 74, character heads sit just below the tagline words.
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
