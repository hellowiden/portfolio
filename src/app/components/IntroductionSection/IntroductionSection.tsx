//src/app/components/IntroductionSection/IntroductionSection.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiFileText } from 'react-icons/fi';
import { brandingMessages } from './../../../data/brandingMessages';

export default function IntroductionSection() {
  const router = useRouter();
  const [messageIndex, setMessageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % brandingMessages.length);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="w-full h-full border border-zinc-300 dark:border-zinc-600 rounded-xl container mx-auto bg-cover bg-center overflow-hidden grid grid-rows-2 gap-4 relative"
    >
      {/* Row 1: Video Background */}
      <div className="grid w-full h-full">
        <video
          autoPlay
          loop
          muted
          className="w-full h-[200px] object-cover row-span-2"
        >
          <source src="/ads.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Row 1 Content: Image & Button */}
      <div className="grid grid-cols-3 gap-4 items-center bg-white/85 dark:bg-zinc-800/85 backdrop-blur-md p-4 w-full">
        {/* Column 1: Image & Name */}
        <div className="grid grid-cols-[auto_1fr] items-center gap-3">
          <Image
            src="/MW.png"
            alt="Marcus Widén"
            width={50}
            height={50}
            className="rounded-xl border border-zinc-300 dark:border-zinc-700"
            priority
          />
          <h1 className="text-xl font-medium text-zinc-900 dark:text-white">
            Marcus Widén
          </h1>
        </div>

        {/* Column 3: Button */}
        <button
          className={`grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2 border rounded transition 
    text-black border-zinc-300 dark:text-white dark:border-zinc-600
    ${
      isHovered
        ? 'bg-zinc-200 dark:bg-zinc-800'
        : 'bg-zinc-100 dark:bg-zinc-700'
    }
  `}
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
          <span>About me</span>
        </button>
      </div>

      {/* Row 2: Main Content */}
      <div className="grid place-items-start bg-white/85 dark:bg-zinc-800/85 backdrop-blur-md p-6 text-zinc-900 dark:text-white">
        <div className="grid gap-4">
          <motion.h2
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {brandingMessages[messageIndex].heading}
          </motion.h2>

          <motion.p
            className="opacity-80 tracking-wide max-w-[900px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {brandingMessages[messageIndex].subtext}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
