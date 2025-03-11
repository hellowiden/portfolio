// src/app/projects/[...slug]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const projects = [
  { id: 'project-1', name: 'Project One' },
  { id: 'project-2', name: 'Project Two' },
  { id: 'project-3', name: 'Project Three' },
];

export default function ProjectDetail() {
  const params = useParams(); // ✅ Fetch params properly
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  useEffect(() => {
    if (params.slug) {
      const projectId = Array.isArray(params.slug)
        ? params.slug[0]
        : params.slug;
      const project = projects.find((p) => p.id === projectId);
      setSelectedProject(project ? project.name : 'Not Found');
    }
  }, [params.slug]);

  if (!selectedProject) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Project: {selectedProject}</h1>
      <button
        onClick={() => router.push('/projects')}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Back to Projects
      </button>
    </div>
  );
}
