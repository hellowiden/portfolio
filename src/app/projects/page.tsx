'use client';

import Link from 'next/link';

const projects = [
  {
    id: 'project-1',
    name: 'Snake Game',
    tags: ['JavaScript', 'Canvas', 'Game'],
  },
  {
    id: 'project-2',
    name: 'E-Commerce Storefront',
    tags: ['React', 'Firebase', 'Tailwind'],
  },
  {
    id: 'project-3',
    name: 'Personal Portfolio',
    tags: ['Next.js', 'Tailwind', 'Vercel'],
  },
  {
    id: 'project-4',
    name: 'Weather App',
    tags: ['Vue.js', 'API', 'Geolocation'],
  },
  {
    id: 'project-5',
    name: 'Task Manager',
    tags: ['Angular', 'Node.js', 'MongoDB'],
  },
  {
    id: 'project-6',
    name: 'Expense Tracker',
    tags: ['React Native', 'SQLite', 'Finance'],
  },
  { id: 'project-7', name: 'Blog CMS', tags: ['Django', 'PostgreSQL', 'CMS'] },
];

export default function ProjectsPage() {
  return (
    <div className="grid gap-2 p-6 text-zinc-900 dark:text-zinc-100">
      <div className="grid gap-2 bg-zinc-100 dark:bg-zinc-900 p-4 border border-zinc-300 dark:border-zinc-700 rounded-xl">
        {projects.map((project, index) => (
          <div key={project.id}>
            <Link
              href={`/projects/${project.id}`}
              className="text-green-600 dark:text-green-400 hover:underline"
            >
              {project.name}
            </Link>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {project.tags.join(' • ')}
            </div>
            {index < projects.length - 1 && (
              <hr className="border-zinc-300 dark:border-zinc-700 my-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
