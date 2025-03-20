//src/app/projects/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Project {
  _id: string;
  name: string;
  createdAt: string;
  completedAt?: string;
  tags?: string[];
  link?: string;
  image?: string;
  description?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        setProjects(data.projects);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const sortedProjects = [...projects].sort((a, b) => {
    const dateA = a.completedAt
      ? new Date(a.completedAt.split('-').reverse().join('-')).getTime()
      : 0;
    const dateB = b.completedAt
      ? new Date(b.completedAt.split('-').reverse().join('-')).getTime()
      : 0;
    return (
      dateB - dateA ||
      new Date(b.createdAt.split('-').reverse().join('-')).getTime() -
        new Date(a.createdAt.split('-').reverse().join('-')).getTime()
    );
  });

  const truncateText = (text: string, maxLines: number = 2) => {
    return text.split('\n').slice(0, maxLines).join(' ') + '...';
  };

  return (
    <section className="grid gap-4">
      <p className="italic">
        <strong>Note:</strong> Due to strict NDAs, I cannot disclose specifics
        of past projects. However, I’ve learned my lesson and moving forward,
        all relevant opportunities will be displayed here.
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid gap-4 text-zinc-900 dark:text-zinc-100">
          <div className="grid gap-4 bg-zinc-100 dark:bg-zinc-900 p-4 border border-zinc-300 dark:border-zinc-700 rounded">
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
                  Created: {project.createdAt}
                  {project.completedAt &&
                    ` • Completed: ${project.completedAt}`}
                </div>
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={500}
                    height={300}
                    className="mt-2 rounded w-full max-w-xs"
                    layout="responsive"
                  />
                )}
                {project.description && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    {truncateText(project.description)}
                  </p>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
