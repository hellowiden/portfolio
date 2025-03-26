//src/app/components/AdBar/AdBar.tsx

'use client';

import { adMessages } from '../../../data/adMessages';
import useRotatingMessages from '@/hooks/useRotatingMessages';

const INTERVAL = 15000;

export default function AdBar() {
  const { current } = useRotatingMessages(adMessages, INTERVAL);

  if (!current) return null;

  return (
    <div className="grid place-items-center text-[#FFFFFF] p-6 text-center w-full gap-4">
      <h2 className="text-3xl font-bold" aria-live="polite">
        &ldquo;{current.heading || 'Default Heading'}&rdquo;
      </h2>
      <p className="text-lg">{current.subtext || 'Default subtext message'}</p>
      <div className="w-full max-w-md h-1 bg-[#292929] rounded-full overflow-hidden relative">
        <div className="w-full h-full bg-[#FFFFFF] progress-bar" />
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
