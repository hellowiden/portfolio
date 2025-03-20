//src/app/components/ProjectOpener/ProjectOpener.tsx

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFolder } from 'react-icons/fi';

export default function ProjectOpener() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="bg-zinc-50/75 dark:bg-zinc-800/75 backdrop-blur-sm border border-zinc-300 dark:border-zinc-700 rounded-xl bg-cover bg-center overflow-hidden relative grid h-[250px] place-items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src="/projectsopener.jpg"
        alt="My Projects"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover w-full h-full col-start-1 row-start-1"
        priority
      />

      <div className="bg-zinc-50/75 dark:bg-zinc-800/75 backdrop-blur-sm absolute inset-0" />

      {!isHovered && (
        <h1 className="underline underline-offset-4 col-start-1 row-start-1 flex items-center justify-center text-xl font-bold text-zinc-900 dark:text-zinc-100 z-10">
          My Projects
        </h1>
      )}

      {isHovered && (
        <div className="bg-zinc-50/75 dark:bg-zinc-800/75 backdrop-blur-sm p-6 text-zinc-900 dark:text-white grid gap-4 col-start-1 row-start-1 w-full h-full">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
              My Projects
            </h1>

            <button
              onClick={() => router.push('/projects')}
              aria-label="View Projects"
              className="grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2 border rounded transition text-black bg-zinc-100 hover:bg-zinc-200 border-zinc-300 dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:border-zinc-600"
            >
              <motion.div
                key="projects"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiFolder className="text-lg" />
              </motion.div>
              <span className="hidden sm:inline">View Projects</span>
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Case Studies
            </h2>
            <p className="opacity-80 tracking-wide max-w-[900px] text-zinc-700 dark:text-zinc-300">
              Take a look at my most recent projects and let that become proof
              of what you can expect from me.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
