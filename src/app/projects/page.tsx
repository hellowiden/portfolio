// src/app/projects/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/app/components/Button/Button';

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
      <p className="text-base text-primary-900 dark:text-secondary-50">
        <strong className="font-semibold">Note:</strong> Due to strict NDAs, I
        cannot disclose specifics of past projects. However, I’ve learned my
        lesson and moving forward, all relevant opportunities will be displayed
        here.
      </p>

      {loading ? (
        <div className="grid place-items-center h-32">
          <Button
            disabled
            variant="ghost"
            size="sm"
            className="h-12 w-12 p-0 animate-spin rounded-full border-4 border-t-transparent border-primary-900 dark:border-secondary-700"
          >
            &nbsp;
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 bg-primary-100 dark:bg-secondary-800 p-6 border border-primary-200 dark:border-secondary-700 rounded">
          {sortedProjects.map((project) => (
            <div
              key={project._id}
              className="grid gap-2 border-b last:border-none border-primary-200 dark:border-secondary-700 pb-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-primary-900 dark:text-secondary-50">
                  {project.name}
                </h2>
                <Link
                  href={`/projects/${project._id}`}
                  className="text-sm font-medium text-primary-500 hover:underline"
                >
                  View
                </Link>
              </div>

              <div className="flex gap-2">
                {project.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-primary-200 text-primary-900 dark:bg-secondary-700 dark:text-secondary-50 text-xs px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.description && (
                <p className="text-sm text-primary-500">
                  {extractFirstSentence(project.description)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
