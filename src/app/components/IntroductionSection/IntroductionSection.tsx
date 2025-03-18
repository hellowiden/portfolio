//src/app/components/IntroductionSection/IntroductionSection.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiFileText } from 'react-icons/fi';
import { brandingMessages } from './../../../data/brandingMessages';

const messages = brandingMessages;

export default function IntroductionSection() {
  const [messageIndex, setMessageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % brandingMessages.length);
    }, 15000);

    return () => clearInterval(intervalRef.current!);
  }, []);

  return (
    <section
      id="home"
      className="w-full h-[500px] border-2 dark:border-light rounded-xl container mx-auto bg-cover bg-center overflow-hidden flex items-end relative gap-2"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/ads.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative w-full grid grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-4 bg-white/85 dark:bg-zinc-800/85 backdrop-blur-md p-6 text-zinc-900 dark:text-white">
        <div className="grid grid-cols-[auto_1fr] items-center gap-3">
          <Image
            src="/MW.png"
            alt="Marcus Widén"
            width={50}
            height={50}
            className="rounded-xl border border-zinc-300 dark:border-zinc-700"
            priority
          />
          <h1 className="text-xl font-medium">Marcus Widén</h1>
        </div>

        <div
          className="grid grid-cols-[auto_1fr] items-center px-2 py-2 text-sm border dark:border-zinc-600 rounded transition backdrop-blur-md bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-600 sm:gap-2"
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
          <Link href="/about" className="ml-2">
            About me
          </Link>
        </div>

        <div className="grid grid-rows-[auto_auto] gap-2 col-span-2 md:col-span-1">
          <motion.h2
            key={messageIndex}
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {messages[messageIndex].heading}
          </motion.h2>

          <motion.p
            key={`subtext-${messageIndex}`}
            className="opacity-80 tracking-wide max-w-[900px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {messages[messageIndex].subtext}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
