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
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500" />
      </div>
    );
  }

  if (!project) {
    return <p className="text-center">Project not found.</p>;
  }

  return (
    <div className="grid gap-6 p-6">
      <div className="grid">
        <Image
          src={project.image || '/fallback.jpg'}
          alt={project.name}
          width={800}
          height={400}
          className="w-full h-80 object-cover border dark:border-light rounded"
          priority
        />
      </div>
      <div className="grid gap-2">
        <h1>{project.name}</h1>
        <div>
          Created: {project.createdAt}
          {project.completedAt && ` • Completed: ${project.completedAt}`}
        </div>
        <div>{project.tags?.join(' • ')}</div>
      </div>
      <div className="grid">
        <p>{project.description}</p>
      </div>
      {project.link && (
        <div className="grid">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            View more here
          </a>
        </div>
      )}
    </div>
  );
}
