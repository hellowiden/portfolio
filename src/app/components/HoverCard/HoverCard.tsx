//src/app/components/HoverCard/HoverCard.tsx

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../Button/Button';

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

      <div className="col-start-1 row-start-1 z-20 grid w-full h-full p-6 text-primary-900 dark:text-secondary-50 grid-rows-[auto_1fr]">
        <div className="grid grid-cols-[1fr_auto] items-center">
          <h1 className="text-xl font-bold">{title}</h1>
          <Button
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-label="Toggle Details"
            variant="ghost"
            size="sm"
            className="p-2 text-sm justify-self-end"
          >
            {isExpanded ? 'Hide' : 'Show'}
          </Button>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="details"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: 'linear',
              }}
              className="mt-4 grid gap-4"
            >
              <div className="grid grid-cols-[1fr_auto] items-center">
                <h2 className="text-2xl font-bold">{subtitle}</h2>
                <Button
                  onClick={() => router.push(buttonRoute)}
                  aria-label={buttonAriaLabel}
                  variant="ghost"
                  size="sm"
                  className="p-2 text-sm justify-self-end grid grid-cols-[auto_auto] items-center sm:gap-2"
                >
                  <motion.div
                    key={buttonLabel}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'linear' }}
                  >
                    {icon}
                  </motion.div>
                  <span className="hidden sm:inline">{buttonLabel}</span>
                </Button>
              </div>
              <p className="opacity-90 tracking-wide max-w-[900px]">
                {description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
