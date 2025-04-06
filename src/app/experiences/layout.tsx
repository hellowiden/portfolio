// src/app/experiences/layout.tsx

'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Button from '@/app/components/Button/Button';

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
    <div className="h-full bg-primary-50 dark:bg-secondary-800 container mx-auto border-x border-primary-200 dark:border-secondary-700 backdrop-blur-md bg-primary-100/80 dark:bg-secondary-800/80">
      <header className="grid grid-cols-2 items-center px-6 py-4 gap-4 border-b border-primary-200 dark:border-secondary-700 bg-primary-200 dark:bg-secondary-700">
        <Link
          href="/experiences"
          className="text-xl font-semibold hover:underline text-primary-900 dark:text-secondary-50"
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
    <Button
      onClick={onClick}
      variant="ghost"
      size="sm"
      className="grid grid-cols-[auto_1fr] items-center text-sm sm:gap-2"
    >
      {isPrev && <MotionIcon isPrev />}
      <span className="hidden sm:inline">
        {isPrev ? 'Previous Experience' : 'Next Experience'}
      </span>
      {!isPrev && <MotionIcon />}
    </Button>
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
