//src/app/experiences/layout.tsx

'use client';

import { ReactNode } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { experiences } from '@/data/experiences';

const experienceIds = experiences.map((e) => e.id);

export default function ExperiencesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const currentExperienceIndex = experienceIds.indexOf(params.slug as string);
  const isExperiencePage = currentExperienceIndex >= 0;

  const navigateToExperience = (direction: 'prev' | 'next') => {
    if (currentExperienceIndex < 0) return;
    const newIndex =
      direction === 'prev'
        ? currentExperienceIndex - 1
        : currentExperienceIndex + 1;
    if (newIndex >= 0 && newIndex < experienceIds.length) {
      router.push(`/experiences/${experienceIds[newIndex]}`);
    }
  };

  return (
    <div className="h-full bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 container mx-auto border-x dark:border-light backdrop-blur-md bg-zinc-100/80 dark:bg-zinc-900/80">
      <header className="flex justify-between items-center p-4 border-b border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white">
        <Link href="/experiences" className="text-2xl font-bold">
          Experiences
        </Link>

        {isExperiencePage && (
          <div className="flex space-x-4">
            {currentExperienceIndex > 0 && (
              <NavButton
                direction="prev"
                onClick={() => navigateToExperience('prev')}
              />
            )}
            {currentExperienceIndex < experienceIds.length - 1 && (
              <NavButton
                direction="next"
                onClick={() => navigateToExperience('next')}
              />
            )}
          </div>
        )}
      </header>
      <main className="container mx-auto p-6">{children}</main>
    </div>
  );
}

function NavButton({
  direction,
  onClick,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
}) {
  const isPrev = direction === 'prev';

  return (
    <button
      onClick={onClick}
      className="grid grid-cols-[auto_1fr] items-center p-2 text-sm border rounded transition bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2"
    >
      {isPrev && <MotionIcon isPrev />}
      <span className="hidden sm:inline">
        {isPrev ? 'Previous Experience' : 'Next Experience'}
      </span>
      {!isPrev && <MotionIcon />}
    </button>
  );
}

function MotionIcon({ isPrev = false }: { isPrev?: boolean }) {
  return (
    <motion.div
      initial={{ rotate: isPrev ? -90 : 90, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      exit={{ rotate: isPrev ? 90 : -90, opacity: 0 }}
      whileHover={{ scale: 1.2, rotate: isPrev ? 10 : -10 }}
      transition={{ duration: 0.2 }}
    >
      {isPrev ? (
        <FaArrowLeft className="text-lg" />
      ) : (
        <FaArrowRight className="text-lg" />
      )}
    </motion.div>
  );
}
