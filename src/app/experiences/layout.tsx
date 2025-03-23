// src/app/experiences/layout.tsx

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
    <div className="h-full bg-zinc-100 dark:bg-zinc-900 container mx-auto border-x border-zinc-200 dark:border-zinc-700 backdrop-blur-md bg-zinc-100/80 dark:bg-zinc-900/80">
      <header className="grid grid-cols-2 items-center px-6 py-4 gap-4 border-b border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800">
        <Link
          href="/experiences"
          className="text-xl font-semibold hover:underline text-green-700 dark:text-green-300"
        >
          Experiences
        </Link>
        {isExperiencePage && (
          <div className="grid grid-flow-col auto-cols-max gap-4 justify-end">
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

      <main className="container mx-auto grid gap-6 p-6">{children}</main>
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
      className="grid grid-cols-[auto_1fr] items-center px-3 py-2 sm:gap-2 border rounded-lg transition text-sm font-medium border-green text-green-700 hover:bg-green-100 dark:border-green dark:text-green-200 dark:hover:bg-green-800"
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
      {isPrev ? <FaArrowLeft /> : <FaArrowRight />}
    </motion.div>
  );
}
