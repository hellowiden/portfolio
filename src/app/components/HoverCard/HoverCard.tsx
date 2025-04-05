//src/app/components/HoverCard/HoverCard.tsx

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

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
  heightClass = 'h-[300px]',
}: HoverCardProps) {
  const router = useRouter();

  return (
    <div
      className={`relative ${heightClass} w-full`}
      aria-label={buttonAriaLabel}
    >
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-cover w-full h-full absolute inset-0"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />

      <div className="absolute inset-0 bg-white/85 dark:bg-black/85" />

      <div className="relative z-10 h-full w-full p-4 flex flex-col justify-between text-black dark:text-white">
        <div>
          <h1 className="text-base font-semibold">{title}</h1>
          <h2 className="text-sm text-black/60 dark:text-white/60">
            {subtitle}
          </h2>
        </div>

        <p className="text-sm mt-2 text-black/80 dark:text-white/80 line-clamp-3">
          {description}
        </p>

        <button
          onClick={() => router.push(buttonRoute)}
          aria-label={buttonAriaLabel}
          className="mt-4 flex items-center gap-2 text-sm bg-transparent p-0 text-black dark:text-white"
        >
          {icon}
          <span>{buttonLabel}</span>
        </button>
      </div>
    </div>
  );
}
