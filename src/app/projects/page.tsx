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
      <pre className="grid gap-2 bg-zinc-100 dark:bg-zinc-800 p-4 text-sm border border-light dark:border-dark rounded-xl">
        {projects.map((project, index) => (
          <div key={project.id}>
            <Link
              href={`/projects/${project.id}`}
              className="text-green-600 dark:text-green-400 hover:underline"
            >
              {project.name}
            </Link>
            {index < projects.length - 1 && (
              <hr className="border-light dark:border-dark my-2" />
            )}
          </div>
        ))}
      </pre>
    </div>
  );
}
