//src/app/components/IntroductionSection/IntroductionSection.tsx

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Branding messages
const messages = [
  {
    id: 1,
    heading: 'strategic branding ⇄ sustainable growth.',
    subtext:
      'I develop branding and market positioning strategies that drive long-term business success through clarity, creativity, and insight.',
  },
  {
    id: 2,
    heading: 'smart branding ⇄ sharp strategy.',
    subtext:
      'I create branding solutions that are not just memorable but also strategically designed, data-driven, and built for sustainable success.',
  },
  {
    id: 3,
    heading: 'branding with insight ⇄ strategy with purpose.',
    subtext:
      'Your brand should not only stand out but also stand for something. I build strategic, insight-driven solutions that foster trust and results.',
  },
  {
    id: 4,
    heading: 'authority through strategy ⇄ confidence in leadership.',
    subtext:
      'Through intelligent branding and positioning, I help businesses establish authority and become trusted industry leaders.',
  },
  {
    id: 5,
    heading: 'clear branding ⇄ strong influence.',
    subtext:
      'I craft branding solutions that are both intelligent and creative, ensuring businesses make a strong and lasting impact in their industry.',
  },
  {
    id: 6,
    heading: 'purposeful branding ⇄ impactful growth.',
    subtext:
      'Branding should be more than aesthetics—it should be smart, strategic, and built for real business growth and leadership.',
  },
  {
    id: 7,
    heading: 'winning brands ⇄ strategic foundations.',
    subtext:
      'With the right balance of insight, strategy, and creativity, I develop strong, influential brands positioned for long-term success.',
  },
  {
    id: 8,
    heading: 'from vision to strategy ⇄ from strategy to legacy.',
    subtext:
      'I transform ideas into impactful brands, ensuring businesses not only grow but also leave a lasting industry legacy.',
  },
  {
    id: 9,
    heading: 'insight-driven branding ⇄ future-proof strategy.',
    subtext:
      'I create brands that are rooted in strategy and insight, ensuring they remain relevant, trusted, and impactful in the long run.',
  },
  {
    id: 10,
    heading: 'smart strategy ⇄ lasting success.',
    subtext:
      'Through intelligent brand positioning and strategy, I help businesses build credibility, influence, and long-term success.',
  },
];

export default function IntroductionSection() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 15000); // Change message every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="w-full h-[500px] border-2 dark:border-light rounded-xl container mx-auto bg-cover bg-center overflow-hidden flex items-end relative gap-2"
    >
      {/* Background Video */}
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

      {/* Content Overlay */}
      <div className="relative w-full grid grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-4 bg-white/75 dark:bg-zinc-800/75 backdrop-blur-md p-6 text-zinc-900 dark:text-white">
        {/* Row 1, Column 1 */}
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

        {/* Row 1, Column 2 */}
        <div className="grid grid-cols-2 gap-4 text-sm items-center">
          <Link
            href="/contact"
            className="grid place-items-center text-black/60 dark:text-white/50 rounded hover:text-opacity-80 dark:hover:text-opacity-80 transition"
          >
            Work with me
          </Link>
          <Link
            href="/resume.pdf"
            download
            className="grid place-items-center text-black/60 dark:text-white/50 rounded hover:text-opacity-80 dark:hover:text-opacity-80 transition"
          >
            Download resume
          </Link>
        </div>

        {/* Row 2, Column 1 (Expanding on Large Screens) */}
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
            <Link
              href="/about"
              className="ml-2 text-sm text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition"
            >
              Learn more about me
            </Link>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
