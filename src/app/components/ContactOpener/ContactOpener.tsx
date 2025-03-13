//src/app/components/ContactOpener/ContactOpener.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ContactOpenerProps {
  title?: string;
  description?: string;
}

export default function ContactOpener({
  title = 'Get in Touch',
  description = 'Reach out to discuss projects, collaborations, or any inquiries.',
}: ContactOpenerProps) {
  return (
    <section className="border dark:border-light rounded-xl bg-cover bg-center overflow-hidden relative grid">
      <Image
        src="/issues.jpg"
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="absolute inset-0 object-cover"
        priority
      />

      <div className="relative bg-zinc-50/75 dark:bg-zinc-800/75 backdrop-blur-sm p-6 text-zinc-900 dark:text-white grid gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
            {title}
          </h1>
          <Link
            href="/contact"
            className="text-sm font-medium text-black/60 dark:text-white/50 hover:text-black dark:hover:text-white transition"
          >
            Contact Me
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Let&apos;s Connect
          </h2>
          <p className="opacity-80 tracking-wide max-w-[900px] text-zinc-700 dark:text-zinc-300">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
