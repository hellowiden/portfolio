// src/app/projects/[slug]/page.tsx

'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Project {
  _id: string;
  name: string;
  createdAt: string;
  completedAt?: string;
  image?: string;
  link?: string;
  tags?: string[];
  description?: string;
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${slug}`);
        if (!res.ok) throw new Error('Failed to fetch project');
        const data = await res.json();
        setProject(data.project);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="grid place-items-center h-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green" />
      </div>
    );
  }

  if (!project) {
    return (
      <p className="text-center text-base text-zinc-600">Project not found.</p>
    );
  }

  return (
    <section className="grid gap-6 p-6">
      <div>
        <Image
          src={project.image || '/fallback.jpg'}
          alt={project.name}
          width={800}
          height={400}
          className="w-full h-80 object-cover border dark:border-zinc-700 rounded-xl"
          priority
        />
      </div>

      <div className="grid gap-2">
        <h1 className="text-2xl font-bold">{project.name}</h1>

        <div className="text-sm text-zinc-500">
          Created: {project.createdAt}
          {project.completedAt && ` • Completed: ${project.completedAt}`}
        </div>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200 text-sm px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {project.description && (
        <div>
          <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            {project.description}
          </p>
        </div>
      )}

      {project.link && (
        <div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition hover:underline"
          >
            View more here
          </a>
        </div>
      )}
    </section>
  );
}
