'use client';

import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';

export default function IntroductionSection() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleContactClick = useCallback(() => {
    console.log('Contact button clicked');
  }, []);

  const handleDownloadClick = useCallback(() => {
    console.log('Download Resume button clicked');
  }, []);

  if (!isVisible) return null;

  return (
    <section
      id="home"
      className=" w-full grid place-items-center py-6 text-zinc-900 dark:text-zinc-50"
    >
      <div className="grid gap-4 bg-white dark:bg-zinc-800 p-6 rounded border dark:border-dark text-center">
        <div className="grid place-items-center" aria-label="Profile Picture">
          <Image
            src="/MW.png"
            alt="Marcus Widén"
            width={160}
            height={160}
            className="rounded-full border border-zinc-300 dark:border-zinc-700"
          />
        </div>
        <h1 className="text-4xl font-bold">Marcus Widén</h1>
        <p className="text-md tracking-wide font-normal leading-relaxed text-zinc-700 dark:text-zinc-300">
          Hi, I’m Marcus Widén. I’m passionate about helping businesses thrive
          through strategic planning, user-focused design, and creative
          problem-solving. Let’s work together to turn your ideas into impactful
          solutions.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleContactClick}
            className="px-4 py-2 bg-zinc-700 dark:bg-green-600 text-white rounded-lg transition hover:bg-zinc-800 dark:hover:bg-green-700"
          >
            Contact
          </button>
          <button
            onClick={handleDownloadClick}
            className="px-4 py-2 border border-zinc-700 dark:border-green text-zinc-700 dark:text-green-400 rounded-lg transition hover:bg-zinc-700 dark:hover:bg-green-600 hover:text-white dark:hover:text-white"
          >
            Download Resume
          </button>
        </div>
      </div>
    </section>
  );
}
