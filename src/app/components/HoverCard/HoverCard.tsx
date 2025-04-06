// src/app/components/HoverCard/HoverCard.tsx

'use client';

import { useRouter } from 'next/navigation';
import Button from '../Button/Button';

interface HoverCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  buttonLabel: string;
  buttonRoute: string;
}

export default function HoverCard({
  title,
  subtitle,
  description,
  icon,
  buttonLabel,
  buttonRoute,
}: HoverCardProps) {
  const router = useRouter();

  return (
    <section
      className="grid gap-4 p-6 h-full w-full bg-primary-50 dark:bg-secondary-800 text-primary-900 dark:text-secondary-50 border border-primary-200 dark:border-secondary-700 rounded-xl cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => router.push(buttonRoute)}
      role="button"
      tabIndex={0}
    >
      <div className="grid grid-cols-[1fr_auto] items-center gap-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <span className="text-2xl">{icon}</span>
      </div>

      <div className="grid gap-2">
        <h3 className="text-2xl font-semibold">{subtitle}</h3>
        <p className="text-sm opacity-80 leading-relaxed">{description}</p>
      </div>

      <div className="grid">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            router.push(buttonRoute);
          }}
          aria-label={`Navigate to ${buttonLabel}`}
          variant="ghost"
          size="sm"
          className="p-2 text-sm inline-grid grid-flow-col auto-cols-max items-center gap-2"
        >
          {icon}
          <span>{buttonLabel}</span>
        </Button>
      </div>
    </section>
  );
}
