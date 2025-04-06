//src/app/components/IntroductionSection/IntroductionSection.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiFileText } from 'react-icons/fi';
import { brandingMessages } from '../../../data/brandingMessages';
import useRotatingMessages from '@/hooks/useRotatingMessages';
import Button from '../Button/Button';

export default function IntroductionSection() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const { current } = useRotatingMessages(brandingMessages, {
    getInterval: () => 15000,
    paused: false,
  });

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
      className="relative w-full h-auto container mx-auto overflow-hidden rounded border backdrop-blur-md
      bg-primary-50 dark:bg-secondary-800 border-primary-200 dark:border-secondary-700 text-primary-900 dark:text-secondary-50"
    >
      <div className="w-full h-full grid grid-rows-[auto_1fr]">{children}</div>
    </section>
  );
}

function VideoRow() {
  return (
    <div className="w-full h-80 rounded-tl rounded-tr overflow-hidden row-start-1 col-start-1">
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
    <div
      className="z-10 row-start-2 col-start-1 grid grid-cols-[auto_1fr_auto] grid-rows-[auto_auto] gap-6 
      p-6 backdrop-blur-md bg-primary-50/85 dark:bg-secondary-800/85"
    >
      {/* Profile Block (Grid-based) */}
      <div className="grid grid-cols-[auto_1fr] gap-3 items-center col-span-2">
        <Image
          src="/MW.png"
          alt="Profile Image"
          width={48}
          height={48}
          className="rounded-full border border-primary-200 dark:border-secondary-700"
          priority
        />
        <div className="grid grid-rows-[auto_auto]">
          <div className="flex items-center space-x-1">
            <span className="font-medium">Marcus Widén</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-blue-500"
            >
              <path
                fillRule="evenodd"
                d="M9.401 20.658 3.7 12.89a1 1 0 0 1 .1-1.294l2.267-2.266a1 1 0 0 1 1.517.137l2.917 4.128 6.717-9.99a1 1 0 0 1 1.605-.1l2.296 2.297a1 1 0 0 1 .087 1.265l-9.767 13.59a1 1 0 0 1-1.068.412z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-sm text-muted-foreground">
            @hellowiden ・ Brand strategist & full-stack developer
          </span>
        </div>
      </div>

      {/* About Me Button */}
      <Button
        onClick={() => router.push('/about')}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="About me"
        variant="ghost"
        size="sm"
        className="grid grid-cols-[auto_1fr] items-center p-2 text-sm gap-2"
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
      </Button>

      {/* Headline + Subtext */}
      <div className="grid grid-rows-[auto_auto] gap-2 col-span-3">
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
