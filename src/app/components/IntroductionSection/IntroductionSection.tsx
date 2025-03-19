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
    <section id="home">
      <video autoPlay loop muted playsInline>
        <source src="/ads.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div>
        <div>
          <Image src="/MW.png" alt="Marcus Widén" width={50} height={50} />
          <h1>Marcus Widén</h1>
        </div>

        <button onClick={() => router.push('/about')}>
          <FiFileText />
          <span>About me</span>
        </button>

        <div>
          <h2>{messages[messageIndex].heading}</h2>
          <p>{messages[messageIndex].subtext}</p>
        </div>
      </div>
    </section>
  );
}
