'use client';

import React, { useState, useRef, useEffect } from 'react';
interface Ripple {
  x: number;
  y: number;
  id: number;
  startTime: number;
}

const duration = 2500;
const baseRadius = 10;
const maxRadius = 40;

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

interface MathRippleProps {
  ripple: Ripple;
  onComplete: (id: number) => void;
}

const MathRipple: React.FC<MathRippleProps> = ({ ripple, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const update = () => {
      const elapsed = Date.now() - ripple.startTime;
      const newProgress = Math.min(elapsed / duration, 1);
      setProgress(newProgress);

      if (newProgress < 1) {
        animationFrameId = requestAnimationFrame(update);
      } else {
        onComplete(ripple.id);
      }
    };

    animationFrameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrameId);
  }, [ripple, onComplete]);

  const eased = easeOut(progress);
  const computedRadius = baseRadius + (maxRadius - baseRadius) * eased;
  const opacity = 0.2 * (1 - progress);

  return (
    <circle
      cx={ripple.x}
      cy={ripple.y}
      r={computedRadius}
      fill={`rgba(22, 163, 74, ${opacity})`}
      className="drop-shadow-lg"
    />
  );
};

export default function AnimatedBackground() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const lastRippleTime = useRef<number>(0);
  const rippleCooldown = 100;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const now = Date.now();
    if (now - lastRippleTime.current < rippleCooldown) return;
    lastRippleTime.current = now;

    const rect = containerRef.current.getBoundingClientRect();
    const newRipple: Ripple = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: now,
      startTime: now,
    };

    setRipples((prev) => [...prev, newRipple]);
  };

  const removeRipple = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 z-10"
      style={{
        background: `
          radial-gradient(circle at 70% 30%, rgba(22, 163, 74, 0.5), transparent 60%),
          radial-gradient(circle at 30% 70%, rgba(22, 163, 74, 0.5), transparent 60%)
        `,
        backgroundSize: '100% 100%',
        animation:
          'moveDots 5s infinite alternate, hueShift 30s infinite linear',
      }}
    >
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {ripples.map((ripple) => (
          <MathRipple
            key={ripple.id}
            ripple={ripple}
            onComplete={removeRipple}
          />
        ))}
      </svg>
      <style>
        {`
          @keyframes moveDots {
            0% { background-position: 0% 0%; }
            50% { background-position: 50% 50%; }
            100% { background-position: 100% 100%; }
          }
          @keyframes hueShift {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
