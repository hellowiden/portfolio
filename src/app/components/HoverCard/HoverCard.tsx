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
      className="grid gap-3 p-6 w-full h-full bg-white dark:bg-secondary-800 text-primary-900 dark:text-secondary-50 border border-primary-200 dark:border-secondary-700 rounded-md cursor-pointer hover:shadow-md hover:ring-1 hover:ring-primary-300 dark:hover:ring-secondary-500 hover:ring-offset-2 transition-shadow"
    >
      <div className="grid grid-cols-[1fr_auto] items-start gap-2">
        <h2 className="text-lg font-bold tracking-tight">{title}</h2>
        <span className="hidden md:inline text-2xl">{icon}</span>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              router.push(buttonRoute);
            }}
            className="p-2 text-sm"
          >
            {buttonLabel}
          </Button>
        </div>
      </div>

      <p className="text-sm opacity-80 tracking-wide leading-snug max-w-prose">
        {description}
      </p>
    </section>
  );
}
