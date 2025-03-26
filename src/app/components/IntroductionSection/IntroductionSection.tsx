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
    <Shell>
      <VideoRow />
      <ContentRow
        current={current}
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        router={router}
      />
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section
      id="home"
      className="relative w-full h-[500px] backdrop-blur-md bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded container mx-auto overflow-hidden flex items-end text-zinc-900 dark:text-zinc-50"
    >
      <div className="w-full h-full grid">{children}</div>
    </section>
  );
}

function VideoRow() {
  return (
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
  );
}

type ContentProps = {
  current: { heading: string; subtext: string };
  isHovered: boolean;
  setIsHovered: (hover: boolean) => void;
  router: ReturnType<typeof useRouter>;
};

function ContentRow({
  current,
  isHovered,
  setIsHovered,
  router,
}: ContentProps) {
  return (
    <div className="z-10 row-start-1 col-start-1 self-end w-full grid grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-4 bg-zinc-50/85 dark:bg-zinc-800/85 backdrop-blur-md p-6">
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
        className="grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2 border rounded transition bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border-zinc-300 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:border-zinc-600"
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
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '0%', opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {current.heading}
        </motion.h2>

        <motion.p
          key={`subtext-${current.subtext}`}
          className="opacity-80 tracking-wide max-w-[900px]"
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '0%', opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.1 }}
        >
          {current.subtext}
        </motion.p>
      </div>
    </div>
  );
}
