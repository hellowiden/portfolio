// src/app/projects/layout.tsx

'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Button from '@/app/components/Button/Button';

interface Project {
  _id: string;
  createdAt: string;
}

interface ProjectsResponse {
  projects: Project[];
}

function NavButton({
  direction,
  onClick,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
}) {
  const isPrev = direction === 'prev';
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="sm"
      className="grid grid-cols-[auto_1fr] items-center text-sm sm:gap-2"
    >
      {isPrev && <MotionIcon isPrev />}
      <span className="hidden sm:inline">
        {isPrev ? 'Previous Project' : 'Next Project'}
      </span>
      {!isPrev && <MotionIcon />}
    </Button>
  );
}

function MotionIcon({ isPrev = false }: { isPrev?: boolean }) {
  return (
    <motion.div
      initial={{ rotate: isPrev ? -90 : 90, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {isPrev ? <FaArrowLeft /> : <FaArrowRight />}
    </motion.div>
  );
}

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) throw new Error('Failed to fetch projects');

        const data: ProjectsResponse = await res.json();
        const sortedProjects = data.projects.sort((a, b) => {
          const dateA = new Date(
            a.createdAt.split('-').reverse().join('-')
          ).getTime();
          const dateB = new Date(
            b.createdAt.split('-').reverse().join('-')
          ).getTime();
          return dateB - dateA;
        });

        setProjects(sortedProjects);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProjects();
  }, []);

  const projectIds = projects.map((p) => p._id);
  const currentProjectIndex = projectIds.indexOf(params.slug as string);
  const isProjectPage = currentProjectIndex >= 0;

  const navigateToProject = (direction: 'prev' | 'next') => {
    if (currentProjectIndex < 0) return;
    const newIndex =
      direction === 'prev' ? currentProjectIndex - 1 : currentProjectIndex + 1;
    if (newIndex >= 0 && newIndex < projectIds.length) {
      router.push(`/projects/${projectIds[newIndex]}`);
    }
  };

  return (
    <div className="h-full container mx-auto border-x border-primary-200 dark:border-secondary-700 backdrop-blur-md bg-primary-50 dark:bg-secondary-900 text-primary-900 dark:text-secondary-50 flex flex-col">
      <header className="flex justify-between items-center p-4 border-b border-primary-200 dark:border-secondary-700 bg-primary-200 dark:bg-secondary-800">
        <h1 className="text-2xl font-bold">Projects</h1>
        {isProjectPage && (
          <div className="grid grid-flow-col auto-cols-max gap-4">
            {currentProjectIndex > 0 && (
              <NavButton
                direction="prev"
                onClick={() => navigateToProject('prev')}
              />
            )}
            {currentProjectIndex < projectIds.length - 1 && (
              <NavButton
                direction="next"
                onClick={() => navigateToProject('next')}
              />
            )}
          </div>
        )}
      </header>
      <main className="flex-grow p-6">{children}</main>
    </div>
  );
}
