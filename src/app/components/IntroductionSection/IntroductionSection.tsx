//src/app/components/IntroductionSection/IntroductionSection.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiFileText } from 'react-icons/fi';
import { brandingMessages } from './../../../data/brandingMessages';

const messages = brandingMessages;

export default function IntroductionSection() {
  const router = useRouter();
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
      className="grid gap-4 w-full h-[500px] border-2 dark:border-light rounded-xl container mx-auto bg-cover bg-center overflow-hidden"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto object-cover"
      >
        <source src="/ads.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="grid gap-4 p-6 bg-white/85 dark:bg-zinc-800/85 border border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white">
        <div className="grid gap-2 grid-cols-[min-content_1fr] items-center">
          <Image
            src="/MW.png"
            alt="Marcus Widén"
            className="rounded-xl border border-zinc-300 dark:border-zinc-700"
            width={50}
            height={50}
          />
          <h1 className="text-xl font-medium">Marcus Widén</h1>
        </div>

        <button
          onClick={() => router.push('/about')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2 border rounded transition text-black bg-zinc-100 hover:bg-zinc-200 border-zinc-300 dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:border-zinc-600"
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

        <div className="grid gap-2">
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
