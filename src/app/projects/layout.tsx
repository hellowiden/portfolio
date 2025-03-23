//src/app/projects/layout.tsx

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
      className="grid grid-cols-[auto_1fr] items-center p-2 sm:gap-2 border rounded transition bg-zinc-100 hover:bg-zinc-200 border-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:border-zinc-600"
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
    <div className="h-full bg-zinc-100 dark:bg-zinc-900 container mx-auto border-x dark:border-light backdrop-blur-md bg-zinc-100/80 dark:bg-zinc-900/80">
      <header className="grid grid-cols-2 items-center p-4 gap-4 border-b border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800">
        <Link href="/projects">Projects</Link>
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
