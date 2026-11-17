import React, { useEffect, useRef, useState } from 'react';

interface HeroInteractiveLayerProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const HeroInteractiveLayer: React.FC<HeroInteractiveLayerProps> = ({ containerRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });
  const [curveControl, setCurveControl] = useState<{ x: number; y: number }>({ x: 600, y: 180 });
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 1200, height: 360 });
  const [parallax, setParallax] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // 1. Setup Enhanced Interactive Dot-Matrix Canvas with Soft Fluid Glow
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const dotSpacing = 28; // Grid spacing in px

    // Smoothed trailing cursor coordinates for buttery liquid-light following
    let smoothX = -1000;
    let smoothY = -1000;

    const resize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      setDimensions({ width, height });

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Render loop
    const render = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      // Smooth trailing interpolation
      if (mouse.active) {
        if (smoothX === -1000) {
          smoothX = mouse.x;
          smoothY = mouse.y;
        } else {
          smoothX += (mouse.x - smoothX) * 0.16;
          smoothY += (mouse.y - smoothY) * 0.16;
        }
      } else {
        // Fade out smoothly
        smoothX += (-1000 - smoothX) * 0.08;
        smoothY += (-1000 - smoothY) * 0.08;
      }

      const interactionRadius = 200; // Generous soft interaction zone across the canvas

      // Draw soft ambient atmospheric warm glow beneath the dots
      if (mouse.active && smoothX > -500) {
        const glowRadius = 180;
        const ambientGlow = ctx.createRadialGradient(smoothX, smoothY, 0, smoothX, smoothY, glowRadius);
        ambientGlow.addColorStop(0, 'rgba(255, 59, 20, 0.09)');
        ambientGlow.addColorStop(0.45, 'rgba(255, 59, 20, 0.035)');
        ambientGlow.addColorStop(1, 'rgba(255, 59, 20, 0)');

        ctx.fillStyle = ambientGlow;
        ctx.beginPath();
        ctx.arc(smoothX, smoothY, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      const cols = Math.ceil(width / dotSpacing);
      const rows = Math.ceil(height / dotSpacing);

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * dotSpacing;
          const y = j * dotSpacing;

          const dx = smoothX - x;
          const dy = smoothY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let radius = 1.35;
          let r = 99, g = 102, b = 241, a = 0.14; // Default faint slate-indigo dot

          if (dist < interactionRadius) {
            // Nonlinear cubic falloff for silky soft radiance
            const factor = Math.pow(1 - dist / interactionRadius, 1.4);
            
            // Expand size smoothly from 1.35px up to 3.6px
            radius = 1.35 + factor * 2.25;

            // Shift color toward vibrant Markyt red-orange (#FF3B14)
            r = Math.round(99 + factor * (255 - 99));
            g = Math.round(102 - factor * (102 - 59));
            b = Math.round(241 - factor * (241 - 20));
            a = 0.14 + factor * 0.82;

            // Extra glowing core for dots right under the cursor
            if (dist < 45) {
              const coreFactor = 1 - dist / 45;
              ctx.beginPath();
              ctx.arc(x, y, radius + 1, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 120, 92, ${coreFactor * 0.35})`;
              ctx.fill();
            }
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [containerRef]);

  // 2. Physics-Driven "Guitar String" Elastic Trajectory Line with Spring Wobble
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Fixed string endpoints: from top-left toward bottom-right
    const startX = 40;
    const startY = 40;
    const endX = Math.max(dimensions.width - 40, 280);
    const endY = Math.max(dimensions.height - 35, 180);

    // Natural resting midpoint of the string
    const restX = (startX + endX) / 2;
    const restY = (startY + endY) / 2;

    // Vector along the string
    const vX = endX - startX;
    const vY = endY - startY;
    const lineLenSq = Math.max(vX * vX + vY * vY, 1);

    // Current physics simulation state
    let currentX = restX;
    let currentY = restY;
    let velX = 0;
    let velY = 0;

    // Spring physics constants (Hooke's law + damping)
    const stiffness = 0.085;
    const damping = 0.88;
    const grabRadius = 135; // Maximum distance to grab/deflect the string
    const maxStretch = 130; // Maximum distance string can be pulled

    let isGrabbed = false;
    let animId: number;

    const handleWindowMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const inside = mx >= -25 && mx <= rect.width + 25 && my >= -25 && my <= rect.height + 25;

      if (inside) {
        mouseRef.current = { x: mx, y: my, active: true };

        // Parallax ratio (-1 to 1) for margin badges
        const normX = (mx / rect.width - 0.5) * 2;
        const normY = (my / rect.height - 0.5) * 2;
        setParallax({ x: normX, y: normY });

        // Calculate closest point on line segment (startX, startY) -> (endX, endY)
        const t = Math.max(0, Math.min(1, ((mx - startX) * vX + (my - startY) * vY) / lineLenSq));
        const projX = startX + t * vX;
        const projY = startY + t * vY;

        const dist = Math.hypot(mx - projX, my - projY);

        if (dist < grabRadius) {
          isGrabbed = true;
          // Target displacement from projection, clamped to maxStretch
          const pullX = mx - projX;
          const pullY = my - projY;
          const pullDist = Math.hypot(pullX, pullY);
          const factor = pullDist > 0 ? Math.min(pullDist, maxStretch) / pullDist : 0;

          const targetX = projX + pullX * factor;
          const targetY = projY + pullY * factor;

          // While grabbed: follow mouse with rubber tension and capture velocity for release snap
          const prevX = currentX;
          const prevY = currentY;
          currentX += (targetX - currentX) * 0.32;
          currentY += (targetY - currentY) * 0.32;
          velX = (currentX - prevX) * 1.35;
          velY = (currentY - prevY) * 1.35;
        } else {
          // Released beyond grab radius: snap free into harmonic oscillation
          isGrabbed = false;
        }
      } else {
        mouseRef.current.active = false;
        isGrabbed = false;
        setParallax({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      isGrabbed = false;
      setParallax({ x: 0, y: 0 });
    };

    // Continuous physics simulation loop (60-120fps)
    const physicsLoop = () => {
      if (!isGrabbed) {
        // Damped harmonic oscillation toward rest position (guitar string wobble)
        const forceX = (restX - currentX) * stiffness;
        const forceY = (restY - currentY) * stiffness;
        velX = (velX + forceX) * damping;
        velY = (velY + forceY) * damping;
        currentX += velX;
        currentY += velY;
      }

      setCurveControl({ x: currentX, y: currentY });
      animId = requestAnimationFrame(physicsLoop);
    };

    animId = requestAnimationFrame(physicsLoop);

    window.addEventListener('mousemove', handleWindowMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [containerRef, dimensions]);

  // Points for Elastic Growth Curve: from top-left toward bottom-right
  const startX = 40;
  const startY = 40;
  const endX = Math.max(dimensions.width - 40, 280);
  const endY = Math.max(dimensions.height - 35, 180);

  const curvePath = `M ${startX} ${startY} Q ${curveControl.x} ${curveControl.y} ${endX} ${endY}`;

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
      {/* 1. Enhanced Interactive Dot-Matrix Canvas Grid with Soft Orange Glow */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* 2. Elastic Growth Curve (Bends toward cursor) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        <defs>
          <linearGradient id="elasticCurveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#FF3B14" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FF3B14" stopOpacity="0.75" />
          </linearGradient>
        </defs>

        {/* Faint Guide Line */}
        <path
          d={curvePath}
          fill="none"
          stroke="url(#elasticCurveGrad)"
          strokeWidth="1.8"
          strokeDasharray="4 4"
        />

        {/* Interactive Elastic Pulse Bead on the Curve vertex */}
        <circle
          cx={curveControl.x}
          cy={curveControl.y}
          r="3"
          fill="#FF3B14"
          className="opacity-60"
        />
        <circle
          cx={curveControl.x}
          cy={curveControl.y}
          r="8"
          fill="none"
          stroke="#FF3B14"
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>

      {/* 3. Floating Margin Micro-Badges with Cursor Parallax */}
      {/* Left Badge 1: +3.2x ROAS */}
      <div
        className="absolute left-3 sm:left-6 md:left-8 lg:left-14 top-1/4 hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-900/10 shadow-[0_4px_16px_rgba(15,23,42,0.06)] text-[11px] sm:text-xs font-mono font-bold text-slate-900 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${parallax.x * 14}px, ${parallax.y * 12}px, 0) rotate(${parallax.x * 3}deg)`,
        }}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>+3.2x ROAS</span>
      </div>

      {/* Left Badge 2: ₹5k Test Validated */}
      <div
        className="absolute left-4 sm:left-8 md:left-12 lg:left-18 bottom-1/4 hidden md:flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-slate-900/10 shadow-[0_4px_16px_rgba(15,23,42,0.06)] text-[10px] sm:text-[11px] font-mono font-bold text-slate-800 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${parallax.x * -10}px, ${parallax.y * -8}px, 0) rotate(${parallax.x * -2}deg)`,
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B14]" />
        <span>₹5,000 TEST VALIDATED</span>
      </div>

      {/* Right Badge: Variant B Won (+48% CTR) */}
      <div
        className="absolute right-3 sm:right-6 md:right-8 lg:right-14 top-1/3 hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-900/10 shadow-[0_4px_16px_rgba(15,23,42,0.06)] text-[11px] sm:text-xs font-mono font-bold text-slate-900 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${parallax.x * 16}px, ${parallax.y * 14}px, 0) rotate(${parallax.x * -3}deg)`,
        }}
      >
        <span className="text-[#FF3B14]">★</span>
        <span>Variant B Won (+48% CTR)</span>
      </div>
    </div>
  );
};
