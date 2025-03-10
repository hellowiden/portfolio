'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

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
  const messageIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const rotateMessage = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % messages.length);
  }, []);

  useEffect(() => {
    if (messageIntervalRef.current) clearInterval(messageIntervalRef.current);

    messageIntervalRef.current = setInterval(rotateMessage, 60000);

    return () => {
      if (messageIntervalRef.current) clearInterval(messageIntervalRef.current);
    };
  }, [rotateMessage]);

  return (
    <div className="grid place-items-center text-white p-6 text-center w-full gap-4">
      <h2 className="text-3xl font-bold" aria-live="polite">
        &ldquo;{messages[index].heading}&rdquo;
      </h2>
      <p className="text-lg">{messages[index].subtext}</p>
      <div className="w-full max-w-md h-1 bg-zinc-700 rounded-full overflow-hidden relative">
        <div className="w-full h-full bg-white progress-bar" />
      </div>
      <style jsx>{`
        .progress-bar {
          animation: progressAnimation 60s linear infinite;
        }

        @keyframes progressAnimation {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
