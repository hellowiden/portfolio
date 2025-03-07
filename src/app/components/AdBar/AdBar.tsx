'use client';

import { useEffect, useState, useRef } from 'react';

const messages = [
  {
    heading: "Your brand isn't just seen—it should be felt.",
    subtext:
      'I create brands that connect deeply, inspire action, and turn audiences into loyal advocates.',
  },
  {
    heading: "Your brand is your promise—let's make it unforgettable.",
    subtext:
      "I'll help you craft a brand that not only stands out but builds trust and drives real engagement.",
  },
  {
    heading: 'Design with strategy. Brand with impact.',
    subtext:
      "Together, we'll build a brand that fuels growth, attracts the right audience, and delivers results.",
  },
  {
    heading: "Your brand story matters—let's make it resonate.",
    subtext:
      "A compelling brand story builds trust and loyalty. I'll help you craft one that captivates and converts.",
  },
];

export default function AdBar() {
  const [index, setIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
      setProgress(0);
      startTimeRef.current = performance.now();
    }, 60000);

    const animateProgress = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      const elapsed = timestamp - startTimeRef.current;
      const percentage = Math.min((elapsed / 60000) * 100, 100);
      setProgress(percentage);
      requestRef.current = requestAnimationFrame(animateProgress);
    };

    requestRef.current = requestAnimationFrame(animateProgress);

    return () => {
      clearInterval(messageInterval);
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [index]);

  return (
    <div className="grid place-items-center text-white p-6 text-center w-full gap-4">
      <h2 className="text-3xl font-bold">
        &ldquo;{messages[index].heading}&rdquo;
      </h2>
      <p className="text-lg">{messages[index].subtext}</p>
      <div className="w-full max-w-md h-1 bg-zinc-700 rounded-full overflow-hidden">
        <div
          className="w-full h-full bg-white transition-all"
          style={{
            width: `${progress}%`,
            transition: 'width 0.1s linear',
          }}
        ></div>
      </div>
    </div>
  );
}
