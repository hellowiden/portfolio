//src/app/components/ProjectOpener/ProjectOpener.tsx

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFolder } from 'react-icons/fi';

interface ProjectOpenerProps {
  title?: string;
  description?: string;
}

export default function ProjectOpener({
  title = 'My Projects',
  description = 'Take a look at my most recent projects and let that become proof of what you can expect from me.',
}: ProjectOpenerProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="border dark:border-light rounded-xl bg-cover bg-center overflow-hidden relative grid">
      <Image
        src="/projectsopener.jpg"
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="absolute inset-0 object-cover"
        priority
      />

      <div className="relative bg-zinc-50/75 dark:bg-zinc-800/75 backdrop-blur-sm p-6 text-zinc-900 dark:text-white grid gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
            {title}
          </h1>

          {/* Fixed button for navigation */}
          <button
            onClick={() => router.push('/projects')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="View Projects"
            className="grid grid-cols-[auto_1fr] items-center p-2 text-sm border rounded transition backdrop-blur-md bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 dark:border-zinc-600 sm:gap-2"
          >
            <motion.div
              key={isHovered ? 'hover' : 'projects'}
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
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
