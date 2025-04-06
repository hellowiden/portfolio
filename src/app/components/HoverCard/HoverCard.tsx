// src/app/components/HoverCard/HoverCard.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Button from '../Button/Button';

interface HoverCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  buttonLabel: string;
  buttonRoute: string;
}

export default function HoverCard({
  title,
  subtitle,
  description,
  icon,
  buttonLabel,
  buttonRoute,
}: HoverCardProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  // Auto-expand on medium and larger screens
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 640px)'); // sm breakpoint
    setIsExpanded(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsExpanded(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const showToggle = typeof window !== 'undefined' && window.innerWidth < 640;

  return (
    <section className="relative overflow-hidden rounded border border-primary-200 dark:border-secondary-700 grid bg-primary-50 dark:bg-secondary-800">
      <div
        className={`grid w-full h-full p-6 text-primary-900 dark:text-secondary-50 gap-6 z-10 ${
          isExpanded ? 'items-start' : 'items-center'
        }`}
      >
        <div className="grid grid-cols-[1fr_auto] items-center gap-3 w-full">
          <h1 className="text-xl font-bold">{title}</h1>
          {showToggle && (
            <Button
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-label="Toggle Details"
              variant="ghost"
              size="sm"
              className="p-2 text-sm"
            >
              {isExpanded ? 'Hide' : 'Show'}
            </Button>
          )}
        </div>

        {isExpanded && (
          <div className="grid gap-4 w-full">
            <div className="grid grid-cols-[1fr_auto] items-center gap-3 w-full">
              <h2 className="text-2xl font-bold">{subtitle}</h2>
              <Button
                onClick={() => router.push(buttonRoute)}
                aria-label={`Navigate to ${buttonLabel}`}
                variant="ghost"
                size="sm"
                className="p-2 text-sm grid grid-flow-col auto-cols-max items-center gap-2"
              >
                {icon}
                <span className="hidden sm:inline">{buttonLabel}</span>
              </Button>
            </div>
            <p className="opacity-90 tracking-wide max-w-[900px]">
              {description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
