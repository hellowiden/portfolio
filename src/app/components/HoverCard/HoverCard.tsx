//src/app/components/HoverCard/HoverCard.tsx

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
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
  heightClass = 'h-[400px]',
}: HoverCardProps) {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={`relative overflow-hidden rounded-xl border border-primary-200 dark:border-secondary-700 ${heightClass} bg-gray-900 group`}
    >
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-cover w-full h-full absolute inset-0 z-0"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 z-10" />

      <div className="relative z-20 flex flex-col justify-between h-full p-6 text-white">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">{title}</h1>
          <h2 className="text-sm text-white/70">{subtitle}</h2>
        </div>

        <p className="mt-4 text-sm text-white/90 line-clamp-3">{description}</p>

        <button
          onClick={() => router.push(buttonRoute)}
          aria-label={buttonAriaLabel}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-primary-300 transition"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            {icon}
          </motion.div>
          {buttonLabel}
        </button>
      </div>
    </motion.div>
  );
}
