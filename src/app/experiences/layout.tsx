//src/app/experiences/layout.tsx

'use client';

import { ReactNode } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const experiences = [
  'experience-1',
  'experience-2',
  'experience-3',
  'experience-4',
];

export default function ExperiencesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const isExperiencePage = params.slug !== undefined;
  const currentExperienceIndex = experiences.indexOf(params.slug as string);

  const handleNext = () => {
    if (
      currentExperienceIndex >= 0 &&
      currentExperienceIndex < experiences.length - 1
    ) {
      router.push(`/experiences/${experiences[currentExperienceIndex + 1]}`);
    }
  };

  const handlePrevious = () => {
    if (currentExperienceIndex > 0) {
      router.push(`/experiences/${experiences[currentExperienceIndex - 1]}`);
    }
  };

  return (
    <div className="h-full bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 border-x border-zinc-300 dark:border-zinc-700">
      <header className="flex justify-between items-center p-4 border-b border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white">
        <Link href="/experiences" className="text-2xl font-bold">
          Experiences
        </Link>
        {isExperiencePage && (
          <div className="flex space-x-4">
            {currentExperienceIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="grid grid-cols-[auto_1fr] items-center p-2 text-sm border rounded transition bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2"
              >
                <motion.div
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaArrowLeft className="text-lg" />
                </motion.div>
                <span className="hidden sm:inline">Previous Experience</span>
              </button>
            )}
            {currentExperienceIndex < experiences.length - 1 && (
              <button
                onClick={handleNext}
                className="grid grid-cols-[auto_1fr] items-center p-2 text-sm border rounded transition bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2"
              >
                <span className="hidden sm:inline">Next Experience</span>
                <motion.div
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaArrowRight className="text-lg" />
                </motion.div>
              </button>
            )}
          </div>
        )}
      </header>
      <main className="container mx-auto p-6">{children}</main>
    </div>
  );
}
