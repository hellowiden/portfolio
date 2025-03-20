//src/app/components/ExperienceOpener/ExperienceOpener.tsx

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase } from 'react-icons/fi';

export default function ExperienceOpener() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="bg-zinc-50/75 dark:bg-zinc-800/75 backdrop-blur-sm border dark:border-light rounded-xl bg-cover bg-center overflow-hidden relative grid h-full place-items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src="/shake.jpg"
        alt="My Experiences"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover w-full h-full col-start-1 row-start-1"
        priority
      />

      <div className="bg-zinc-50/75 dark:bg-zinc-800/75 backdrop-blur-sm absolute inset-0" />

      {!isHovered && (
        <h1 className="underline underline-offset-4 col-start-1 row-start-1 flex items-center justify-center text-xl font-bold text-zinc-900 dark:text-zinc-100 z-10">
          My Experiences
        </h1>
      )}

      {isHovered && (
        <div className="bg-zinc-50/75 dark:bg-zinc-800/75 backdrop-blur-sm p-6 text-zinc-900 dark:text-white grid gap-4 col-start-1 row-start-1 w-full h-full">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
              My Experiences
            </h1>

            <button
              onClick={() => router.push('/experiences')}
              aria-label="View Experiences"
              className="grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2 border rounded transition text-black bg-zinc-100 hover:bg-zinc-200 border-zinc-300 dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:border-zinc-600"
            >
              <motion.div
                key="experiences"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiBriefcase className="text-lg" />
              </motion.div>
              <span className="hidden sm:inline">View Experiences</span>
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Professional Journey
            </h2>
            <p className="opacity-80 tracking-wide max-w-[900px] text-zinc-700 dark:text-zinc-300">
              Explore my professional journey and see how my experiences have
              shaped my expertise.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
