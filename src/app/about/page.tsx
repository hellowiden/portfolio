// src/app/about/page.tsx

'use client';

import { Lightbulb } from 'lucide-react';
import Image from 'next/image';
import Button from '../components/Button/Button';

export default function AboutPage() {
  return (
    <section className="grid gap-6 p-6 w-full bg-white dark:bg-secondary-800 text-primary-900 dark:text-secondary-50 border border-primary-200 dark:border-secondary-700 rounded-md hover:shadow-md hover:ring-1 hover:ring-primary-300 dark:hover:ring-offset-2 hover:ring-offset-2 transition-shadow">
      <div className="grid gap-4 grid-cols-[auto_1fr_auto] items-start">
        <AboutAvatar />

        <div className="grid gap-1">
          <h2 className="text-lg font-bold tracking-tight">Marcus Widén</h2>
          <p className="text-sm opacity-80">
            Brand strategist ・ Full-stack developer
          </p>
        </div>

        <div className="grid gap-2 text-sm">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => (window.location.href = '/contact')}
            className="inline-flex items-center gap-1"
          >
            <Lightbulb size={14} /> Let’s talk strategy
          </Button>
        </div>
      </div>

      <p className="text-sm opacity-80 tracking-wide leading-snug max-w-prose">
        Because clarity is rare, and strategy is everything. I don’t build
        brands to go viral—I build them to endure. With 500+ global projects and
        $7.5B in revenue growth delivered, I focus on what matters: trust,
        influence, and precision.
        <br />
        <br />
        My method is direct: listen, analyze, execute. No fluff. No ego. Just
        results. I shape what’s inevitable—pulling from history, philosophy, and
        human behavior to drive market leadership.
      </p>

      <div className="w-full h-72 relative rounded overflow-hidden border border-primary-100 dark:border-secondary-600">
        <Image
          src="/adventure.jpg"
          alt="Strategic journey imagery"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}

function AboutAvatar() {
  return (
    <div className="w-10 h-10 grid place-items-center rounded-full bg-primary-900 text-white dark:bg-secondary-50 dark:text-secondary-900 font-bold text-sm shadow">
      M
    </div>
  );
}
