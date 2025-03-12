//src/app/projects/page.tsx

'use client';

import Link from 'next/link';

const projects = [
  {
    id: 'project-1',
    name: 'Green Furniture Concept',
    tags: ['Brand Strategy', 'Sustainability', 'Design'],
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
    name: 'Airam',
    tags: ['Lighting Solutions', 'Brand Identity', 'Marketing'],
  },
  {
    id: 'project-7',
    name: 'Droga5',
    tags: ['Advertising', 'Creative Strategy', 'Brand Positioning'],
  },
];

export default function ProjectsPage() {
  return (
    <div className=" ">
      <div className="grid gap-6 bg-zinc-100 dark:bg-zinc-900 p-4 border border-zinc-300 dark:border-zinc-700 rounded-xl">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border-b last:border-none border-zinc-300 dark:border-zinc-700"
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
