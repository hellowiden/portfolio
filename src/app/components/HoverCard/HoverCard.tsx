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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className={`relative overflow-hidden rounded border border-[#E3E3E3] dark:border-[#292929] bg-cover bg-center ${heightClass} grid`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={imageSrc}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover w-full h-full col-start-1 row-start-1 z-0"
        priority
      />

      <div className="col-start-1 row-start-1 w-full h-full bg-[#FFFFFF]/90 dark:bg-[#191919]/90 backdrop-blur-md pointer-events-none z-10" />

      <div className="col-start-1 row-start-1 z-20 grid w-full h-full">
        {!isHovered ? (
          <div className="grid place-items-center w-full h-full">
            <h1 className="text-xl font-bold text-[#121212] dark:text-[#FFFFFF] hover:underline hover:underline-offset-4 transition">
              {title}
            </h1>
          </div>
        ) : (
          <div className="grid grid-rows-[auto_1fr] gap-4 p-6 text-[#121212] dark:text-[#FFFFFF] w-full h-full">
            <div className="grid grid-cols-[1fr_auto] items-center w-full">
              <h1 className="text-xl font-medium">{title}</h1>
              <button
                onClick={() => router.push(buttonRoute)}
                aria-label={buttonAriaLabel}
                className="grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2 border rounded transition text-[#121212] bg-[#F1F1F1] hover:bg-[#E3E3E3] border-[#E3E3E3] dark:text-[#FFFFFF] dark:bg-[#292929] dark:hover:bg-[#191919] dark:border-[#191919]"
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
              <p className="opacity-80 tracking-wide max-w-[900px] text-[#121212] dark:text-[#E3E3E3]">
                {description}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
