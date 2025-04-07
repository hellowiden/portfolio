// src/app/about/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '../components/Button/Button';

export default function AboutPage() {
  const router = useRouter();

  return (
    <section
      className="container mx-auto p-6 grid gap-6 bg-white dark:bg-secondary-800 
      text-primary-900 dark:text-secondary-50 border border-primary-200 
      dark:border-secondary-700 rounded-md shadow-sm"
    >
      <div className="w-full h-72 relative rounded overflow-hidden border border-primary-100 dark:border-secondary-600">
        <Image
          src="/adventure.jpg"
          alt="Strategic journey imagery"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="grid gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Why Me?</h1>

        <p className="text-sm opacity-80 leading-relaxed max-w-prose">
          Because clarity is rare, and strategy is everything. I don’t build
          brands to go viral—I build them to endure. With 500+ global projects
          and $7.5B in revenue growth delivered, I focus on what matters: trust,
          influence, and precision.
          <br />
          <br />
          My method is direct: listen, analyze, execute. No fluff. No ego. Just
          results. I shape what’s inevitable—pulling from history, philosophy,
          and human behavior to drive market leadership.
        </p>

        <div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.push('/contact')}
            className="w-fit"
          >
            If you seek strategy, let’s talk.
          </Button>
        </div>
      </div>
    </section>
  );
}
