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
    heading: 'Strategic Branding ⇄ Sustainable Growth',
    subtext:
      'I craft brand strategies that drive lasting success through insight, clarity, and creative intelligence.',
  },
  {
    id: 2,
    heading: 'Smart Brands ⇄ Sharp Strategies',
    subtext:
      'Branding should be both memorable and strategic—data-driven, insightful, and built for long-term impact.',
  },
  {
    id: 3,
    heading: 'Insight-Led Brands ⇄ Purpose-Driven Growth',
    subtext:
      'A brand should stand out and stand for something. I create strategies that build trust and deliver results.',
  },
  {
    id: 4,
    heading: 'Authority Through Strategy ⇄ Trusted Leadership',
    subtext:
      'I position businesses as industry leaders through intelligent branding and strategic market positioning.',
  },
  {
    id: 5,
    heading: 'Clear Positioning ⇄ Strong Influence',
    subtext:
      'I develop brand strategies that combine intelligence and creativity to maximize impact and industry authority.',
  },
  {
    id: 6,
    heading: 'Purpose-Driven Brands ⇄ Lasting Growth',
    subtext:
      'Branding goes beyond visuals—it’s about strategy, leadership, and building sustainable business success.',
  },
  {
    id: 7,
    heading: 'Winning Brands ⇄ Strategic Foundations',
    subtext:
      'By blending insight, strategy, and creativity, I shape brands that are built to influence and thrive long term.',
  },
  {
    id: 8,
    heading: 'Vision Into Strategy ⇄ Strategy Into Legacy',
    subtext:
      'I transform ambitious ideas into impactful brands, ensuring businesses grow and leave a lasting legacy.',
  },
  {
    id: 9,
    heading: 'Insight-Driven Brands ⇄ Future-Proof Strategies',
    subtext:
      'I develop brands rooted in strategy and intelligence, ensuring they remain relevant, trusted, and impactful.',
  },
  {
    id: 10,
    heading: 'Smart Strategy ⇄ Sustainable Success',
    subtext:
      'I create brand positioning strategies that enhance credibility, influence, and long-term market leadership.',
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
