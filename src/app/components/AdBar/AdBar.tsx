//src/app/components/AdBar/AdBar.tsx

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { adMessages } from '../../../data/adMessages';
import useRotatingMessages from '@/hooks/useRotatingMessages';

type AdMessage = {
  id: number;
  heading?: string;
  subtext?: string;
  interval?: number;
};

export default function AdBar() {
  const [hovered, setHovered] = useState(false);

  const { current } = useRotatingMessages<AdMessage>(adMessages, {
    getInterval: (msg) => msg.interval ?? 15000,
    paused: hovered,
  });

  if (!current) return null;

  return (
    <div
      className="grid place-items-center p-6 text-center w-full gap-4 text-secondary-900 dark:text-secondary-50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="space-y-2"
          aria-live="assertive"
        >
          <h2 className="text-3xl font-bold">
            &ldquo;{current.heading || 'Default Heading'}&rdquo;
          </h2>
          <p className="text-lg">
            {current.subtext || 'Default subtext message'}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
