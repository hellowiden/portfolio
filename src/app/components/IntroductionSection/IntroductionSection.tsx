'use client';

import { useState, useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import Image from 'next/image';
import Link from 'next/link';

// Branding messages
const messages = [
  {
    heading: 'Strategic Brands. Intelligent Growth.',
    subtext:
      'Insight-driven branding and market positioning that elevate your business with clarity, creativity, and long-term impact.',
  },
  {
    heading: 'Smart Brands. Sharp Strategies.',
    subtext:
      'I craft branding and positioning that aren’t just memorable—they’re meaningful, data-backed, and built for lasting success.',
  },
  {
    heading: 'Branding with Depth. Strategies with Purpose.',
    subtext:
      'Your brand should do more than stand out—it should stand for something. I create insightful, strategic solutions that inspire trust and drive results.',
  },
  {
    heading: 'Elevate with Strategy. Lead with Wisdom.',
    subtext:
      'Thoughtful branding and positioning that turn businesses into trusted industry leaders.',
  },
  {
    heading: 'Clarity Creates Influence.',
    subtext:
      'I transform businesses with branding and strategy rooted in intelligence, creativity, and meaningful impact.',
  },
  {
    heading: 'Your Brand, Redefined with Purpose.',
    subtext:
      'I craft smart, strategic, and creative brand solutions that help businesses lead, innovate, and grow.',
  },
  {
    heading: 'Smart Brands Win. Let’s Build Yours.',
    subtext:
      'With a blend of strategy, insight, and creativity, I help businesses develop strong, trusted, and influential brands.',
  },
  {
    heading: 'From Vision to Strategy. From Strategy to Legacy.',
    subtext:
      'Intelligent brand-building that turns ideas into impact and businesses into industry leaders.',
  },
  {
    heading: 'Wisdom-Driven Brands. Creative Market Strategies.',
    subtext:
      'I help businesses craft meaningful, future-proof brands that command trust and drive real results.',
  },
  {
    heading: 'Knowledge Builds Brands. Strategy Sustains Them.',
    subtext:
      'I develop brands with intelligence, positioning them for credibility, influence, and long-term success.',
  },
];

export default function IntroductionSection() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="w-full h-[500px] border dark:border-light rounded-xl container mx-auto bg-cover bg-center overflow-hidden flex items-end relative gap-2"
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
            href="#contact"
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
          <h2 className="text-3xl font-bold">
            <Typewriter
              words={messages.map((msg) => msg.heading)}
              loop
              cursor
              cursorStyle="_"
              typeSpeed={80}
              deleteSpeed={80}
              delaySpeed={4000}
            />
          </h2>

          <p className="opacity-80 tracking-wide max-w-[900px]">
            {messages[messageIndex].subtext}
            <Link
              href="/about"
              className="ml-2 text-sm text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition"
            >
              Learn more about me here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
