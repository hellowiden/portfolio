//src/app/components/AdBar/AdBar.tsx

'use client';

import { adMessages } from '../../../data/adMessages';
import useRotatingMessages from '@/hooks/useRotatingMessages';

const INTERVAL = 15000;

export default function AdBar() {
  const { current } = useRotatingMessages(adMessages, INTERVAL);

  if (!current) return null;

  return (
    <div className="grid place-items-center p-6 text-center w-full gap-4 text-secondary-900 dark:text-secondary-50">
      <h2 className="text-3xl font-bold" aria-live="polite">
        &ldquo;{current.heading || 'Default Heading'}&rdquo;
      </h2>
      <p className="text-lg">{current.subtext || 'Default subtext message'}</p>
      <div className="w-full max-w-md h-1 bg-secondary-700 rounded-full overflow-hidden relative">
        <div className="w-full h-full bg-secondary-50 dark:bg-secondary-900 progress-bar" />
      </div>
      <style jsx>{`
        .progress-bar {
          animation: progressAnimation ${INTERVAL / 1000}s linear infinite;
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
