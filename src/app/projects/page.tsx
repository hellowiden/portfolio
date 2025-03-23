// src/app/projects/page.tsx

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
    <section className="grid gap-10">
      <header className="text-2xl font-bold leading-tight">Projects</header>

      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
          Note:
        </strong>{' '}
        Due to NDAs, previous project details are withheld. Future projects will
        be transparently displayed here.
      </p>

      {loading ? (
        <div className="grid place-items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500" />
        </div>
      ) : (
        <div className="grid gap-12">
          {sortedProjects.map((project) => (
            <div
              key={project._id}
              className="grid gap-4 bg-zinc-100 dark:bg-zinc-900 p-6 border border-zinc-300 dark:border-zinc-700 rounded-xl shadow-md"
            >
              <Link
                href={`/projects/${project._id}`}
                className="text-2xl font-semibold hover:underline"
              >
                {project.name}
              </Link>

              <div className="text-sm text-zinc-500">
                {project.tags?.join(' • ')}
              </div>

              <div className="text-sm text-zinc-500">
                Created: {project.createdAt}
                {project.completedAt && ` • Completed: ${project.completedAt}`}
              </div>

              {project.image && (
                <Image
                  src={project.image}
                  alt={project.name}
                  width={800}
                  height={450}
                  className="rounded-lg w-full"
                />
              )}

              {project.description && (
                <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {truncateText(project.description)}
                </p>
              )}

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
