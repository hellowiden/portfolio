'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

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
    <div className="grid place-items-center  text-white p-6 text-center w-full gap-4">
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
