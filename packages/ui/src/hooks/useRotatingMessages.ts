//src/app/hooks/useRotatingMessages.ts

'use client';

import { useState, useEffect, useRef } from 'react';

type UseRotatingMessagesOptions<T> = {
  getInterval: (msg: T) => number;
  paused: boolean;
};

export default function useRotatingMessages<T>(
  messages: T[],
  options: UseRotatingMessagesOptions<T>
) {
  const { getInterval, paused } = options;
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!messages.length || paused) return;

    const delay = getInterval(messages[index]);

    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, messages, paused, getInterval]);

  return { current: messages[index], index };
}
