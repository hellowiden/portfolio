'use client';

import { useEffect, useState } from 'react';

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
  const [index, setIndex] = useState(0);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
      setCountdown(60);
    }, 60000);

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 60));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-white p-6 text-center">
      <h2 className="text-3xl font-bold">
        &ldquo;{messages[index].heading}&rdquo;
      </h2>
      <p className="mt-4 text-lg">{messages[index].subtext}</p>
      <p className="mt-2 text-sm text-zinc-400">Next message in {countdown}s</p>
    </div>
  );
}
