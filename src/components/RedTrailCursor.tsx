import React, { useEffect, useRef } from 'react';

interface ChainNode {
  x: number;
  y: number;
}

export const RedTrailCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Only initialize on desktop / devices with a mouse/trackpad pointer
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Kinematic snake chain configuration:
    // 20 nodes with strict distance clamping calibrated to 3x current length (~115px total tail)
    // Ensures a prominent, flowing red snake ribbon while remaining strictly bounded even during fast flicks
    const CHAIN_LENGTH = 20;
    const MAX_SEGMENT_DIST = 6.0; // px max distance between consecutive nodes (total max span ~115px)
    const chain: ChainNode[] = [];
    for (let i = 0; i < CHAIN_LENGTH; i++) {
      chain.push({ x: -100, y: -100 });
    }

    const mouse = {
      x: -100,
      y: -100,
      lastMoved: 0,
      isHoveringInteractive: false,
      isVisible: false,
    };

    let isInitialized = false;

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.lastMoved = performance.now();
      mouse.isVisible = true;

      if (!isInitialized) {
        for (let i = 0; i < CHAIN_LENGTH; i++) {
          chain[i].x = e.clientX;
          chain[i].y = e.clientY;
        }
        isInitialized = true;
      }

      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target && (
          target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.classList.contains('cursor-pointer')
        )
      );
      mouse.isHoveringInteractive = isInteractive;
    };

    const handleMouseLeave = () => {
      mouse.isVisible = false;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isVisible = true;
      mouse.lastMoved = performance.now();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    let headScale = 1;
    let targetHeadScale = 1;

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      if (mouse.isVisible && isInitialized) {
        // Node 0 tracks mouse with high responsiveness
        chain[0].x += (mouse.x - chain[0].x) * 0.78;
        chain[0].y += (mouse.y - chain[0].y) * 0.78;

        // Subsequent nodes follow with strict distance clamping
        // This mathematically caps the tail length to ~115px (3x current length) so it never stretches excessively
        for (let i = 1; i < CHAIN_LENGTH; i++) {
          const prev = chain[i - 1];
          const curr = chain[i];
          
          curr.x += (prev.x - curr.x) * 0.52;
          curr.y += (prev.y - curr.y) * 0.52;

          // Distance clamp: enforce strict maximum distance from previous node
          const dx = curr.x - prev.x;
          const dy = curr.y - prev.y;
          const dist = Math.hypot(dx, dy);
          if (dist > MAX_SEGMENT_DIST) {
            const angle = Math.atan2(dy, dx);
            curr.x = prev.x + Math.cos(angle) * MAX_SEGMENT_DIST;
            curr.y = prev.y + Math.sin(angle) * MAX_SEGMENT_DIST;
          }
        }

        // Calculate inactivity fade when stationary
        const idleTime = now - mouse.lastMoved;
        const tailActivityAlpha = Math.max(0, Math.min(1, 1 - (idleTime - 1100) / 700));

        // Draw the continuous unbroken snake tail using quadratic bezier curves through midpoints
        if (tailActivityAlpha > 0.01) {
          ctx.save();
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          // Precompute midpoints between nodes for true C1-continuous spline curvature
          const midpoints: { x: number; y: number }[] = [];
          for (let i = 0; i < CHAIN_LENGTH - 1; i++) {
            midpoints.push({
              x: (chain[i].x + chain[i + 1].x) * 0.5,
              y: (chain[i].y + chain[i + 1].y) * 0.5,
            });
          }

          // First segment: from head to first midpoint
          if (midpoints.length > 0) {
            const alpha0 = 0.85 * tailActivityAlpha;
            ctx.beginPath();
            ctx.moveTo(chain[0].x, chain[0].y);
            ctx.lineTo(midpoints[0].x, midpoints[0].y);
            ctx.strokeStyle = `rgba(255, 59, 20, ${alpha0})`;
            ctx.lineWidth = 4.0;
            ctx.stroke();
          }

          // Intermediate continuous quadratic curves: midpoint[i] -> through chain[i+1] -> to midpoint[i+1]
          for (let i = 0; i < midpoints.length - 1; i++) {
            const mStart = midpoints[i];
            const control = chain[i + 1];
            const mEnd = midpoints[i + 1];

            // Ratio along snake (1.0 near head -> 0.0 near tip)
            const t = 1 - (i + 1) / midpoints.length;
            // Graceful taper: 4.0px max down to 0.8px tip
            const strokeWidth = Math.max(0.8, t * 3.8);
            const alpha = Math.pow(t, 1.1) * 0.82 * tailActivityAlpha;

            ctx.beginPath();
            ctx.moveTo(mStart.x, mStart.y);
            ctx.quadraticCurveTo(control.x, control.y, mEnd.x, mEnd.y);
            ctx.strokeStyle = `rgba(255, 59, 20, ${alpha})`;
            ctx.lineWidth = strokeWidth;
            ctx.stroke();
          }

          // Final tip segment
          if (midpoints.length > 0) {
            const lastMid = midpoints[midpoints.length - 1];
            const lastNode = chain[CHAIN_LENGTH - 1];
            ctx.beginPath();
            ctx.moveTo(lastMid.x, lastMid.y);
            ctx.lineTo(lastNode.x, lastNode.y);
            ctx.strokeStyle = `rgba(255, 59, 20, ${0.12 * tailActivityAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }

          ctx.restore();
        }

        // Render the rounded circle head attached to the snake tip
        targetHeadScale = mouse.isHoveringInteractive ? 1.35 : 1.0;
        headScale += (targetHeadScale - headScale) * 0.25;

        const headX = chain[0].x;
        const headY = chain[0].y;
        const baseRadius = 3.6;
        const radius = baseRadius * headScale;

        ctx.save();

        // Subtle ambient red glow
        ctx.beginPath();
        ctx.arc(headX, headY, radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 59, 20, 0.12)';
        ctx.fill();

        // Solid rounded red circle head
        ctx.beginPath();
        ctx.arc(headX, headY, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#FF3B14';
        ctx.shadowColor = 'rgba(255, 59, 20, 0.5)';
        ctx.shadowBlur = 6;
        ctx.fill();

        // Crisp white precision core
        ctx.beginPath();
        ctx.arc(headX, headY, Math.max(1.2, radius * 0.32), 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowBlur = 0;
        ctx.fill();

        ctx.restore();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="red-trail-canvas"
      className="fixed inset-0 pointer-events-none z-[9999] select-none"
      style={{ display: 'block' }}
      aria-hidden="true"
    />
  );
};
