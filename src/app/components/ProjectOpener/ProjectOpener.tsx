//src/app/components/ProjectOpener/ProjectOpener.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiFolder } from 'react-icons/fi';

export default function ProjectOpener() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="relative grid h-64 place-items-center border rounded overflow-hidden bg-cover bg-center backdrop-blur-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backgroundImage: "url('/projectsopener.jpg')" }}
    >
      <div className="absolute inset-0 bg-zinc-50/75 dark:bg-zinc-800/75 backdrop-blur-sm" />
      {!isHovered ? (
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 z-10">
          My Projects
        </h1>
      ) : (
        <button
          onClick={() => router.push('/projects')}
          aria-label="View Projects"
          className="flex items-center gap-2 px-4 py-2 text-sm border rounded bg-zinc-100 dark:bg-zinc-700 dark:text-white"
        >
          <FiFolder className="text-lg" /> View Projects
        </button>
      )}
    </section>
  );
}
