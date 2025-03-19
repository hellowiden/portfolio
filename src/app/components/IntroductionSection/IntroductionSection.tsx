//src/app/components/IntroductionSection/IntroductionSection.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FiFileText } from 'react-icons/fi';
import Image from 'next/image';
import { brandingMessages } from './../../../data/brandingMessages';

const messages = brandingMessages;

export default function IntroductionSection() {
  const router = useRouter();
  const [messageIndex, setMessageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % brandingMessages.length);
    }, 15000);

    return () => clearInterval(intervalRef.current!);
  }, []);

  return (
    <section id="home" className="grid gap-4">
      <video autoPlay loop muted playsInline className="w-full h-auto">
        <source src="/ads.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="grid gap-4">
        <div className="grid gap-2 grid-cols-[min-content_1fr]">
          <Image
            src="/MW.png"
            alt="Marcus Widén"
            className="rounded-md border-zinc-300 dark:border-zinc-600"
            width={50}
            height={50}
          />
          <h1>Marcus Widén</h1>
        </div>

        <button
          onClick={() => router.push('/about')}
          className="grid grid-cols-[auto_1fr] items-center p-2 text-sm sm:gap-2 border rounded transition text-black bg-zinc-100 hover:bg-zinc-200 border-zinc-300 dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:border-zinc-600"
        >
          <FiFileText />
          <span>About me</span>
        </button>

        <div className="grid gap-2">
          <h2>{messages[messageIndex].heading}</h2>
          <p>{messages[messageIndex].subtext}</p>
        </div>
      </div>
    </section>
  );
}
