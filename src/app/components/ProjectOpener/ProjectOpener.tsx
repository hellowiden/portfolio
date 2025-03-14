//src/app/components/ProjectOpener/ProjectOpener.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProjectOpenerProps {
  title?: string;
  description?: string;
}

export default function ProjectOpener({
  title = 'My Projects',
  description = 'Take a look at my most recent projects and let that become proof of what you can expect from me.',
}: ProjectOpenerProps) {
  return (
    <section className="border dark:border-light rounded-xl bg-cover bg-center overflow-hidden relative grid">
      <Image
        src="/projectsopener.jpg"
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
            href="/projects"
            className="grid items-center p-2 text-sm border dark:border-zinc-600 rounded transition backdrop-blur-md bg-white dark:bg-black text-black dark:text-white "
          >
            View Projects
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Case Studies
          </h2>
          <p className="opacity-80 tracking-wide max-w-[900px] text-zinc-700 dark:text-zinc-300">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
