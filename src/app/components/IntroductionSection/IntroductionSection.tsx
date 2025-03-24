//src/app/components/IntroductionSection/IntroductionSection.tsx

'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiFileText } from 'react-icons/fi';
import { brandingMessages } from '../../../data/brandingMessages';
import useRotatingMessages from '@/hooks/useRotatingMessages';
import { useState } from 'react';

export default function IntroductionSection() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const { current } = useRotatingMessages(brandingMessages, 15000);

  if (!current) return null;

  return (
    <section
      id="home"
      className="relative w-full h-[500px] backdrop-blur-md bg-white/80 dark:bg-black/70 border border-zinc-300 dark:border-zinc-700 rounded container mx-auto overflow-hidden flex items-end"
    >
      {/* Stack children using grid */}
      <div className="w-full h-full grid">
        {/* Video layer */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-80 object-cover rounded z-0 row-start-1 col-start-1"
        >
          <source src="/ads.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content layer with slide-up animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="z-10 row-start-1 col-start-1 self-end w-full grid grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-4 bg-white/85 dark:bg-zinc-800/85 backdrop-blur-md p-6 text-zinc-900 dark:text-white"
        >
          <div className="grid grid-cols-[auto_1fr] items-center gap-3">
            <Image
              src="/MW.png"
              alt="Marcus Widén"
              width={50}
              height={50}
              className="rounded border border-zinc-300 dark:border-zinc-700"
              priority
            />
            <h1 className="text-xl font-medium">Marcus Widén</h1>
          </div>

          <button
            className="grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2 border rounded transition text-black bg-zinc-100 hover:bg-zinc-200 border-zinc-300 dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:border-zinc-600"
            onClick={() => router.push('/about')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              key={isHovered ? 'hover' : 'about'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiFileText className="text-lg" />
            </motion.div>
            <span className="ml-2">About me</span>
          </button>

          <div className="grid grid-rows-[auto_auto] gap-2 col-span-2 md:col-span-1">
            <motion.h2
              key={current.heading}
              className="text-3xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              {current.heading}
            </motion.h2>

            <motion.p
              key={`subtext-${current.subtext}`}
              className="opacity-80 tracking-wide max-w-[900px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              {current.subtext}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
