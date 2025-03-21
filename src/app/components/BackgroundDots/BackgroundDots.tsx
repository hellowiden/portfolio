// src/app/components/BackgroundDots.tsx
'use client';

export default function BackgroundDots() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(#555_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#aaa_1px,transparent_1px)]"
    />
  );
}
