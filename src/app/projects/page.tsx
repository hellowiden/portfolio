// src/app/projects/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    const getTime = (date?: string) =>
      date ? new Date(date.split('-').reverse().join('-')).getTime() : 0;
    return (
      getTime(b.completedAt) - getTime(a.completedAt) ||
      getTime(b.createdAt) - getTime(a.createdAt)
    );
  });

  const extractFirstSentence = (text: string) =>
    text.match(/.*?[.?!](\s|$)/)?.[0]?.trim() || text;

  return (
    <section className="grid gap-8 p-6 bg-primary-100 dark:bg-secondary-800 rounded border border-primary-200 dark:border-secondary-700">
      <p className="text-base text-primary-900 dark:text-secondary-50">
        <strong className="font-semibold">Note:</strong> Due to strict NDAs,
        specifics of past projects can&apos;t be disclosed. Future projects will
        be displayed here.
      </p>

      {loading ? (
        <div className="grid place-items-center h-32">
          <Button
            disabled
            variant="ghost"
            size="sm"
            className="animate-spin h-12 w-12 rounded-full border-4 border-t-transparent border-primary-900 dark:border-secondary-700 p-0"
          >
            &nbsp;
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {sortedProjects.map((project) => (
            <div
              key={project._id}
              className="grid gap-4 p-4 bg-primary-200 dark:bg-secondary-700 rounded border border-primary-200 dark:border-secondary-600"
            >
              <Link
                href={`/projects/${project._id}`}
                className="text-2xl font-semibold hover:underline text-primary-900 dark:text-secondary-50"
              >
                {project.name}
              </Link>

              {project.tags && (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,auto))] gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 dark:bg-secondary-600 text-primary-900 dark:text-secondary-50 text-sm px-2 py-1 rounded-full text-center"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="grid gap-1 text-sm text-primary-900 dark:text-secondary-50">
                <span>Created: {project.createdAt}</span>
                {project.completedAt && (
                  <span>Completed: {project.completedAt}</span>
                )}
              </div>

              {project.image && (
                <Image
                  src={project.image}
                  alt={project.name}
                  width={500}
                  height={300}
                  layout="responsive"
                  className="rounded w-full max-w-xs"
                />
              )}

              {project.description && (
                <p className="text-base text-primary-900 dark:text-secondary-50">
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
