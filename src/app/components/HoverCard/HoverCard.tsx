// src/app/components/HoverCard/HoverCard.tsx

'use client';

import { useRouter } from 'next/navigation';
import Button from '../Button/Button';

interface HoverCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonRoute: string;
  buttonLabel: string;
}

export default function HoverCard({
  title,
  description,
  icon,
  buttonRoute,
  buttonLabel,
}: HoverCardProps) {
  const router = useRouter();

  return (
    <section
      onClick={() => router.push(buttonRoute)}
      role="button"
      tabIndex={0}
      className="grid gap-2 p-4 w-full h-full bg-white dark:bg-secondary-800 text-black dark:text-white border border-black/10 dark:border-white/10 rounded-md cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="grid grid-cols-[1fr_auto] items-start gap-2">
        <h2 className="text-sm font-semibold">{title}</h2>

        {/* Icon (md and up) */}
        <span className="hidden md:inline text-xl">{icon}</span>

        {/* Button (below md only) */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              router.push(buttonRoute);
            }}
            className="p-2 text-xs"
          >
            {buttonLabel}
          </Button>
        </div>
      </div>

      <p className="text-xs text-black/70 dark:text-white/70 leading-snug">
        {description}
      </p>
    </section>
  );
}
