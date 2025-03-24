//src/app/hooks/useRotatingMessages.ts

'use client';

import { useState, useEffect, useRef } from 'react';

export default function useRotatingMessages<T>(messages: T[], delay: number) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!messages.length) return;

    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, delay);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [messages, delay]);

  return { current: messages[index], index };
}
