//src/app/projects/[slug]/page.tsx

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

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${slug}`);
        if (!res.ok) throw new Error('Failed to fetch project');
        const data = await res.json();
        setProject(data.project);
      } catch (error) {
        console.error(error);
      }
    }

    if (slug) fetchProject();
  }, [slug]);

  if (!project) {
    return (
      <p className="text-zinc-900 dark:text-zinc-100">Project not found.</p>
    );
  }

  return (
    <div className="grid gap-6 p-6 text-zinc-900 dark:text-zinc-100">
      <div className="grid">
        <Image
          src={project.image || '/fallback.jpg'}
          alt={project.name}
          width={800}
          height={400}
          className="w-full h-80 object-cover border dark:border-light rounded-xl"
          priority
        />
      </div>
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Created: {project.createdAt}
          {project.completedAt && ` • Completed: ${project.completedAt}`}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          {project.tags?.join(' • ')}
        </div>
      </div>
      <div className="grid">
        <p className="text-zinc-700 dark:text-zinc-300">
          {project.description}
        </p>
      </div>
      {project.link && (
        <div className="grid">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View more here
          </a>
        </div>
      )}
    </div>
  );
}
