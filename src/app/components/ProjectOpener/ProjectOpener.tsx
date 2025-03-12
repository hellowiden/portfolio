//src/app/components/ProjectOpener/ProjectOpener.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProjectOpenerProps {
  title?: string;
  description?: string;
  link?: string;
}

function ProjectOpener({
  title = 'My Projects',
  description = 'Take a look at my most recent projects and let that become proof of what you can expect from me',
}: ProjectOpenerProps) {
  return (
    <section className="w-full border dark:border-light rounded-xl container mx-auto bg-cover bg-center overflow-hidden grid grid-cols-1 grid-rows-1 relative">
      {/* Background Image */}
      <Image
        src="/projectsopener.jpg"
        alt={title}
        fill={true}
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: 'cover' }}
        className="absolute top-0 left-0 w-full h-full object-cover"
        priority
      />

      {/* Content Overlay */}
      <div className="relative w-full grid grid-cols-2 grid-rows-[auto_auto] gap-4 bg-zinc-50/75 dark:bg-zinc-800/75 backdrop-blur-sm p-6 text-zinc-900 dark:text-white">
        {/* Project Info */}
        <div className="flex items-center gap-3 col-span-1">
          <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
            {title}
          </h1>
        </div>

        {/* Project Link */}
        <div className="flex justify-end items-center col-span-1">
          <Link
            href="/projects"
            className="flex items-center gap-2 text-sm dark:border-dark  text-black/60 rounded hover:text-black dark:text-white/50  dark:hover:text-white transition hover:text-opacity-80 dark:hover:text-opacity-80"
          >
            View Projects
          </Link>
        </div>

        {/* Project Description */}
        <div className="col-span-2">
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Case Studies
          </div>
          <p className="opacity-80 tracking-wide max-w-[900px] text-zinc-700 dark:text-zinc-300">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProjectOpener;
