// src/app/projects/layout.tsx

'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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
    <button
      onClick={onClick}
      className="text-sm text-primary-900 hover:text-primary-900/80 dark:text-secondary-50 dark:hover:text-secondary-50/80 transition hover:underline grid grid-cols-[auto_1fr] items-center p-2 sm:gap-2 border rounded bg-primary-100 hover:bg-primary-200 border-primary-200 dark:bg-secondary-700 dark:hover:bg-secondary-800 dark:border-secondary-700"
    >
      {isPrev && <MotionIcon isPrev />}
      <span className="hidden sm:inline">
        {isPrev ? 'Previous Project' : 'Next Project'}
      </span>
      {!isPrev && <MotionIcon />}
    </button>
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
    <div className="h-full bg-primary-100 dark:bg-secondary-800 container mx-auto border-x border-primary-200 dark:border-secondary-700 backdrop-blur-md bg-primary-100/80 dark:bg-secondary-800/80">
      <header className="grid grid-cols-2 items-center px-6 py-4 gap-4 border-b border-primary-200 dark:border-secondary-700 bg-primary-200 dark:bg-secondary-700">
        <Link
          href="/projects"
          className="text-xl font-semibold hover:underline text-primary-900 dark:text-secondary-50"
        >
          Projects
        </Link>
        {isProjectPage && (
          <div className="grid grid-flow-col auto-cols-max gap-4 justify-end">
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

      <main className="container mx-auto grid gap-6 p-6">{children}</main>
    </div>
  );
}
