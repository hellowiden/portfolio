// src/app/components/HoverCard/HoverCard.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
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
  const [isExpanded, setIsExpanded] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(max-width: 639px)');

      const updateState = (e: MediaQueryList | MediaQueryListEvent) => {
        const isSmall = e.matches;
        setIsSmallScreen(isSmall);
        setIsExpanded(!isSmall);
      };

      updateState(mediaQuery);
      mediaQuery.addEventListener('change', updateState);
      return () => mediaQuery.removeEventListener('change', updateState);
    }
  }, []);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <section className="relative overflow-hidden rounded border border-primary-200 dark:border-secondary-700 bg-primary-50 dark:bg-secondary-800 p-6 text-primary-900 dark:text-secondary-50 grid gap-6">
      <div className="grid grid-cols-[1fr_auto] items-center gap-3 w-full">
        <h1 className="text-xl font-bold">{title}</h1>
        {isSmallScreen && (
          <button
            onClick={toggleExpand}
            aria-label="Toggle Details"
            className="p-2"
          >
            <FiChevronDown
              className={`transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
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
    </section>
  );
}
