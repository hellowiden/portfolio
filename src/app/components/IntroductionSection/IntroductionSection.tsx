//src/app/components/IntroductionSection/IntroductionSection.tsx

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFileText } from 'react-icons/fi';

function IntroductionSection() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const messages = [{ heading: 'Welcome', subtext: 'Discover more about us.' }];
  const messageIndex = 0;

  return (
    <section className="grid grid-rows-2 w-full h-[500px] rounded-xl text-center overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700">
      {/* Video in the first row */}
      <div className="w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          aria-label="Promotional Video"
        >
          <source src="/ads.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content in the second row */}
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
          <h2 className="text-3xl font-bold">
            {messages[messageIndex].heading}
          </h2>
          <p className="opacity-80 tracking-wide max-w-[900px]">
            {messages[messageIndex].subtext}
          </p>
        </div>
      </div>
    </section>
  );
}

export default IntroductionSection;
