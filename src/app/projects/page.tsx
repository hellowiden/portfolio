//src/app/projects/page.tsx

'use client';

import Link from 'next/link';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  return (
    <div className="grid gap-4 text-zinc-900 dark:text-zinc-100">
      <div className="grid gap-4 bg-zinc-100 dark:bg-zinc-900 p-4 border border-zinc-300 dark:border-zinc-700 rounded-xl">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border-b last:border-none border-zinc-300 dark:border-zinc-700 pb-2"
          >
            <Link
              href={`/projects/${project.id}`}
              className="text-green-600 dark:text-green-400 hover:underline"
            >
              {project.name}
            </Link>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {project.tags.join(' • ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
