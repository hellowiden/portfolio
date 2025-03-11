// src/app/projects/page.tsx
'use client';

import Link from 'next/link';

const projects = [
  { id: 'project-1', name: 'Project One' },
  { id: 'project-2', name: 'Project Two' },
  { id: 'project-3', name: 'Project Three' },
];

export default function ProjectsPage() {
  return (
    <div className="grid gap-2 p-6">
      <h1 className="text-2xl font-bold">Projects</h1>
      <hr />
      <pre className="grid gap-2 bg-gray-100 p-4 text-sm border dark:border-light rounded-xl">
        {projects.map((project) => (
          <div key={project.id}>
            <Link
              href={`/projects/${project.id}`}
              className="text-blue-600 hover:underline"
            >
              {project.name}
            </Link>
          </div>
        ))}
      </pre>
    </div>
  );
}
