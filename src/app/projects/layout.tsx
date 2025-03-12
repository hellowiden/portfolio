//src/app/projects/layout.tsx

'use client';

import { ReactNode } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const projects = [
  'project-1',
  'project-2',
  'project-3',
  'project-4',
  'project-5',
  'project-6',
  'project-7',
];

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const isProjectPage = params.slug !== undefined;
  const currentProjectIndex = projects.indexOf(params.slug as string);

  const handleNext = () => {
    if (currentProjectIndex >= 0 && currentProjectIndex < projects.length - 1) {
      router.push(`/projects/${projects[currentProjectIndex + 1]}`);
    }
  };

  const handlePrevious = () => {
    if (currentProjectIndex > 0) {
      router.push(`/projects/${projects[currentProjectIndex - 1]}`);
    }
  };

  return (
    <div className="h-full bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 border-x border-zinc-300 dark:border-zinc-700">
      <header className="flex justify-between items-center p-4 border-b border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white">
        <Link href="/projects" className="text-2xl font-bold">
          Projects
        </Link>
        {isProjectPage && (
          <div className="flex space-x-4">
            {currentProjectIndex > 0 && (
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
                <span className="hidden sm:inline">Previous Project</span>
              </button>
            )}
            {currentProjectIndex < projects.length - 1 && (
              <button
                onClick={handleNext}
                className="grid grid-cols-[auto_1fr] items-center p-2 text-sm border rounded transition bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2"
              >
                <span className="hidden sm:inline">Next Project</span>
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
