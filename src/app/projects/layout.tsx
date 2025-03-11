'use client';

import { ReactNode } from 'react';
import { useRouter, useParams } from 'next/navigation';

const projects = [
  'project-1',
  'project-2',
  'project-3',
  'project-4',
  'project-5',
  'project-6',
  'project-7',
];

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const isProjectPage = params.slug !== undefined; // Check if a specific project is open
  const currentProjectIndex = projects.indexOf(params.slug as string);

  const handleNext = () => {
    if (currentProjectIndex >= 0 && currentProjectIndex < projects.length - 1) {
      router.push(`/projects/${projects[currentProjectIndex + 1]}`);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 border-x border-zinc-300 dark:border-zinc-700">
      <header className="flex justify-between items-center p-4 border-b border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white">
        <h1 className="text-2xl font-bold">Projects</h1>

        {isProjectPage && (
          <div className="flex space-x-4">
            <button
              onClick={() => router.push('/projects')}
              className="px-4 py-2 bg-blue-600 dark:bg-blue-400 text-white dark:text-zinc-900 rounded"
            >
              Back to Projects
            </button>
            {currentProjectIndex < projects.length - 1 && (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-green-600 dark:bg-green-400 text-white dark:text-zinc-900 rounded"
              >
                Next Project
              </button>
            )}
          </div>
        )}
      </header>

      <main className="container mx-auto p-6">{children}</main>
    </div>
  );
}
