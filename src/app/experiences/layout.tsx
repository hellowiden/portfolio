//src/app/experiences/layout.tsx

'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface IExperience {
  _id: string;
}

export default function ExperiencesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [experienceIds, setExperienceIds] = useState<string[]>([]);
  const router = useRouter();
  const params = useParams();

  const currentExperienceIndex = experienceIds.indexOf(params.slug as string);
  const isExperiencePage = currentExperienceIndex >= 0;

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const res = await fetch('/api/experiences');
        if (!res.ok) throw new Error('Failed to fetch experiences');
        const data = await res.json();
        setExperienceIds(data.experiences.map((exp: IExperience) => exp._id));
      } catch (error) {
        console.error(error);
      }
    }
    fetchExperiences();
  }, []);

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
      className="grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2 border rounded transition text-black bg-zinc-100 hover:bg-zinc-200 border-zinc-300 dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:border-zinc-600"
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
