//src/app/projects/[slug]/page.tsx

'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { projects } from '@/data/projects';

export default function ProjectDetail() {
  const { slug } = useParams();
  const selectedProject = projects.find((p) => p.id === slug);

  if (!selectedProject) {
    return (
      <p className="text-zinc-900 dark:text-zinc-100">Project not found.</p>
    );
  }

  return (
    <div className="grid gap-6 p-6 text-zinc-900 dark:text-zinc-100">
      <div className="grid">
        <Image
          src={selectedProject.image}
          alt={selectedProject.name}
          width={800}
          height={400}
          className="w-full h-80 object-cover border dark:border-light rounded-xl"
        />
      </div>
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold">{selectedProject.name}</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(selectedProject.date).toLocaleDateString()}{' '}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          {selectedProject.tags.join(' • ')}
        </div>
      </div>
      <div className="grid">
        <p className="text-zinc-700 dark:text-zinc-300">
          {selectedProject.description}
        </p>
      </div>
      {selectedProject.link && (
        <div className="grid">
          <a
            href={selectedProject.link}
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
