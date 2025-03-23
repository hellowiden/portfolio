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

  const extractFirstSentence = (text: string) => {
    const match = text.match(/.*?[.?!](\s|$)/);
    return match ? match[0].trim() : text;
  };

  return (
    <section className="grid gap-6">
      <p className="text-base text-zinc-700 dark:text-zinc-300">
        <strong className="font-semibold">Note:</strong> Due to strict NDAs, I
        cannot disclose specifics of past projects. However, I’ve learned my
        lesson and moving forward, all relevant opportunities will be displayed
        here.
      </p>

      {loading ? (
        <div className="grid place-items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green" />
        </div>
      ) : (
        <div className="grid gap-6">
          <div className="grid gap-6 bg-zinc-100 dark:bg-zinc-900 p-6 border border-zinc-300 dark:border-zinc-700 rounded">
            {sortedProjects.map((project) => (
              <div
                key={project._id}
                className="grid gap-3 border-b last:border-none border-zinc-300 dark:border-zinc-700 pb-4"
              >
                <Link
                  href={`/projects/${project._id}`}
                  className="text-2xl font-semibold hover:underline text-zinc-900 dark:text-zinc-100"
                >
                  {project.name}
                </Link>

                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200 text-sm px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="text-sm text-zinc-600 dark:text-zinc-400">
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
                    className="rounded w-full max-w-xs"
                    layout="responsive"
                  />
                )}

                {project.description && (
                  <p className="text-base text-zinc-700 dark:text-zinc-300">
                    {extractFirstSentence(project.description)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
