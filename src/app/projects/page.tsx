//src/app/projects/page.tsx

'use client';

import Link from 'next/link';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  // Sort projects by date in descending order (newest first)
  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <section className="grid gap-4">
        <p className="italic">
          <strong>Note:</strong> The majority of my past projects are protected
          by strict NDAs, preventing any disclosure. However, I’ve learned my
          lesson—moving forward, projects will be less restricted, and I plan to
          showcase them here. If you’d like to discuss how I can bring value to
          your brand, let’s connect.
        </p>
        <div className="grid gap-4 text-zinc-900 dark:text-zinc-100">
          <div className="grid gap-4 bg-zinc-100 dark:bg-zinc-900 p-4 border border-zinc-300 dark:border-zinc-700 rounded-xl">
            {sortedProjects.map((project) => (
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
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {new Date(project.date).toLocaleDateString()}{' '}
                  {/* Formats date */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
