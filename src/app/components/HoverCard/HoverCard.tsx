//src/app/components/HoverCard/HoverCard.tsx

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface HoverCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  icon: React.ReactNode;
  buttonLabel: string;
  buttonRoute: string;
  buttonAriaLabel: string;
  heightClass?: string;
}

export default function HoverCard({
  title,
  subtitle,
  description,
  imageSrc,
  icon,
  buttonLabel,
  buttonRoute,
  buttonAriaLabel,
  heightClass = 'h-auto',
}: HoverCardProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      className={`relative overflow-hidden rounded border border-primary-200 dark:border-secondary-700 bg-cover bg-center ${heightClass} grid`}
    >
      <Image
        src={imageSrc}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover w-full h-full col-start-1 row-start-1 z-0"
        priority
      />

      <div className="col-start-1 row-start-1 w-full h-full bg-primary-50/90 dark:bg-secondary-800/90 backdrop-blur-md pointer-events-none z-10" />

      <div className="col-start-1 row-start-1 z-20 grid w-full h-full p-6 text-primary-900 dark:text-secondary-50">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">{title}</h1>
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-label="Toggle Details"
            className="p-2 text-sm rounded transition text-primary-900 hover:bg-primary-100 hover:dark:bg-secondary-700 dark:text-secondary-50"
          >
            {isExpanded ? 'Hide' : 'Show'}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4 grid gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{subtitle}</h2>
              <button
                onClick={() => router.push(buttonRoute)}
                aria-label={buttonAriaLabel}
                className="flex items-center p-2 text-sm sm:gap-2 rounded transition text-primary-900 hover:bg-primary-100 hover:dark:bg-secondary-700 dark:text-secondary-50"
              >
                <motion.div
                  key={buttonLabel}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {icon}
                </motion.div>
                <span className="hidden sm:inline">{buttonLabel}</span>
              </button>
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
