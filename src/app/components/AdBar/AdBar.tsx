//src/app/components/AdBar/AdBar.tsx

'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { adMessages } from '../../../data/adMessages';

const messages = adMessages;

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
