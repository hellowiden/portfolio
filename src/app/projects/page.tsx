//src/app/projects/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Project {
  _id: string;
  name: string;
  date: string;
  tags?: string[];
  link?: string;
  image?: string;
  description?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        setProjects(data.projects);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProjects();
  }, []);

  // Sort descending by date
  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section className="grid gap-4">
      <p className="italic">
        <strong>Note:</strong> Due to strict NDAs, I cannot disclose specifics
        of past projects. However, I’ve learned my lesson and moving forward,
        all relevant opportunities will be displayed here.
      </p>
      <div className="grid gap-4 text-zinc-900 dark:text-zinc-100">
        <div className="grid gap-4 bg-zinc-100 dark:bg-zinc-900 p-4 border border-zinc-300 dark:border-zinc-700 rounded-xl">
          {sortedProjects.map((project) => (
            <div
              key={project._id}
              className="border-b last:border-none border-zinc-300 dark:border-zinc-700 pb-2"
            >
              <Link
                href={`/projects/${project._id}`}
                className="text-green-600 dark:text-green-400 hover:underline"
              >
                {project.name}
              </Link>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {project.tags?.join(' • ')}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                {new Date(project.date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
