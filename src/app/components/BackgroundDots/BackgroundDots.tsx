// src/app/components/BackgroundDots.tsx

// src/components/BackgroundDots.tsx

'use client';

import { useEffect, useState } from 'react';

export default function BackgroundDots() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  return (
    <div
      className="absolute inset-0  w-full h-full"
      style={{
        background: isDarkMode
          ? 'radial-gradient(circle at 20% 50%, #8F00FF, transparent), radial-gradient(circle at 80% 50%, #110076, transparent)'
          : 'radial-gradient(circle at 20% 50%, #FFC0CB, transparent), radial-gradient(circle at 80% 50%, #87CEFA, transparent)',
      }}
    ></div>
  );
}
