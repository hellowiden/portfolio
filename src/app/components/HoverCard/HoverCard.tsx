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
  heightClass = 'h-64',
}: HoverCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className={`relative overflow-hidden rounded border border-zinc-300 dark:border-zinc-700 bg-cover bg-center ${heightClass} grid`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={imageSrc}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover w-full h-full col-start-1 row-start-1"
        priority
      />

      <div className="absolute inset-0 col-start-1 row-start-1 bg-zinc-50/75 dark:bg-zinc-800/75 backdrop-blur-sm pointer-events-none" />

      <div className="col-start-1 row-start-1 z-10 grid w-full h-full">
        {!isHovered ? (
          <div className="grid place-items-center w-full h-full">
            <h1 className="text-xl font-bold underline underline-offset-4 text-zinc-900 dark:text-zinc-100">
              {title}
            </h1>
          </div>
        ) : (
          <div className="grid grid-rows-[auto_1fr] gap-4 p-6 text-zinc-900 dark:text-white w-full h-full">
            <div className="grid grid-cols-[1fr_auto] items-center w-full">
              <h1 className="text-xl font-medium">{title}</h1>
              <button
                onClick={() => router.push(buttonRoute)}
                aria-label={buttonAriaLabel}
                className="grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2 border rounded transition text-black bg-zinc-100 hover:bg-zinc-200 border-zinc-300 dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:border-zinc-600"
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

            <div className="grid gap-2">
              <h2 className="text-2xl font-bold">{subtitle}</h2>
              <p className="opacity-80 tracking-wide max-w-[900px] text-zinc-700 dark:text-zinc-300">
                {description}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
