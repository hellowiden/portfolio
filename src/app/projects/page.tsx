'use client';

import Link from 'next/link';

const projects = [
  { id: 'project-1', name: 'Project One' },
  { id: 'project-2', name: 'Project Two' },
  { id: 'project-3', name: 'Project Three' },
];

export default function ProjectsPage() {
  return (
    <div className="grid gap-2 p-6 text-zinc-900 dark:text-zinc-100">
      <div className="grid gap-2 bg-zinc-100 dark:bg-zinc-900 p-4 text-sm border border-zinc-300 dark:border-zinc-700 rounded-xl">
        {projects.map((project, index) => (
          <div key={project.id}>
            <Link
              href={`/projects/${project.id}`}
              className="text-green-600 dark:text-green-400 hover:underline"
            >
              {project.name}
            </Link>
            {index < projects.length - 1 && (
              <hr className="border-zinc-300 dark:border-zinc-700 my-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
