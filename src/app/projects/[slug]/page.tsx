'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const projects = [
  { id: 'project-1', name: 'Project One' },
  { id: 'project-2', name: 'Project Two' },
  { id: 'project-3', name: 'Project Three' },
];

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (params.slug) {
      const projectId = Array.isArray(params.slug)
        ? params.slug[0]
        : params.slug;
      const projectIndex = projects.findIndex((p) => p.id === projectId);

      if (projectIndex !== -1) {
        setSelectedProject(projects[projectIndex].name);
        setCurrentProjectIndex(projectIndex);
      } else {
        setSelectedProject('Not Found');
      }
    }
  }, [params.slug]);

  const handleNextProject = () => {
    if (currentProjectIndex !== null) {
      const nextIndex = (currentProjectIndex + 1) % projects.length;
      router.push(`/projects/${projects[nextIndex].id}`);
    }
  };

  if (!selectedProject)
    return <p className="text-zinc-900 dark:text-zinc-100">Loading...</p>;

  return (
    <div className="p-6 text-zinc-900 dark:text-zinc-100">
      <h1 className="text-2xl font-bold">Project: {selectedProject}</h1>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => router.push('/projects')}
          className="px-4 py-2 bg-blue-600 dark:bg-blue-400 text-white dark:text-zinc-900 rounded"
        >
          Back to Projects
        </button>
        <button
          onClick={handleNextProject}
          className="px-4 py-2 bg-green-600 dark:bg-green-400 text-white dark:text-zinc-900 rounded"
        >
          Next Project
        </button>
      </div>
    </div>
  );
}
