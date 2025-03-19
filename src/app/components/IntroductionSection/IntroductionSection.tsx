//src/app/components/IntroductionSection/IntroductionSection.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiFileText } from 'react-icons/fi';
import { brandingMessages } from '../../../data/brandingMessages';

export default function IntroductionSection() {
  const router = useRouter();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % brandingMessages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
      >
        <source src="/ads.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="relative z-10 flex flex-col items-center gap-6 p-6 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg rounded-xl shadow-xl">
        {/* Profile */}
        <div className="flex items-center gap-4">
          <Image
            src="/MW.png"
            alt="Marcus Widén"
            width={60}
            height={60}
            className="rounded-full border border-zinc-300 dark:border-zinc-700"
            priority
          />
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
            Marcus Widén
          </h1>
        </div>

        {/* Branding Messages */}
        <div className="flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.h2
              key={messageIndex}
              className="text-3xl font-bold text-zinc-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              {brandingMessages[messageIndex].heading}
            </motion.h2>
          </AnimatePresence>
          <motion.p
            className="mt-2 max-w-lg text-lg text-zinc-700 dark:text-zinc-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {brandingMessages[messageIndex].subtext}
          </motion.p>
        </div>

        {/* CTA Button */}
        <motion.button
          className="mt-4 flex items-center gap-3 px-5 py-2 text-sm font-medium text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 rounded-lg transition hover:bg-opacity-80"
          onClick={() => router.push('/about')}
          whileHover={{ scale: 1.05 }}
        >
          <FiFileText className="text-lg" />
          <span>About Me</span>
        </motion.button>
      </div>
    </section>
  );
}
