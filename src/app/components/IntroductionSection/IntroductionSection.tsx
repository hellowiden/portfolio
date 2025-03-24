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
      className="relative w-full h-[500px] container mx-auto rounded overflow-hidden border border-zinc-300 dark:border-zinc-700"
    >
      <div className="grid w-full h-full grid-rows-[auto_1fr_auto]">
        {/* Background video */}
        <div className="row-span-full col-span-full z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/ads.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Overlay content */}
        <div className="relative z-10 row-span-full col-span-full grid grid-rows-[auto_1fr_auto] bg-white/80 dark:bg-black/70 backdrop-blur-md p-6 text-zinc-900 dark:text-white">
          {/* Top: Profile */}
          <div className="flex items-center gap-4">
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

          {/* Middle: Branding Message */}
          <div className="self-center">
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
              className="opacity-80 tracking-wide max-w-2xl mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              {current.subtext}
            </motion.p>
          </div>

          {/* Bottom: CTA */}
          <div className="self-end mt-4">
            <button
              className="flex items-center gap-2 px-4 py-2 border rounded text-sm bg-zinc-100 hover:bg-zinc-200 text-black border-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:text-white dark:border-zinc-600"
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
        </div>
      </div>
    </section>
  );
}
