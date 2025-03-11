'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const projects = [
  {
    id: 'project-1',
    name: 'Snake Game',
    description:
      'A timeless arcade experience reimagined with cutting-edge web technologies. This interactive Snake Game is developed using HTML, CSS, and JavaScript, where players skillfully navigate a serpent, growing its length as it devours food while meticulously avoiding self-collisions and boundary walls.',
    image: '/snakegame.jpg',
    sourceCode: 'https://github.com/hellowiden/snake-game',
    tags: ['JavaScript', 'Canvas', 'Game'],
  },
  {
    id: 'project-2',
    name: 'E-Commerce Storefront',
    description:
      'A fully functional e-commerce platform featuring dynamic product listings, a user-friendly cart system, and secure payment integration. Built with React and Firebase, it delivers a seamless shopping experience with real-time updates and scalable architecture.',
    image: '/storefront.png',
    sourceCode: 'https://github.com/hellowiden/ecommerce-storefront',
    tags: ['React', 'Firebase', 'Tailwind'],
  },
  {
    id: 'project-3',
    name: 'Personal Portfolio',
    description:
      'A clean and responsive portfolio website designed to showcase projects and skills. Developed using Next.js and Tailwind CSS, this site emphasizes performance and accessibility for users across all devices.',
    image: '/pp.png',
    sourceCode: 'https://github.com/hellowiden/personal-portfolio',
    tags: ['Next.js', 'Tailwind', 'Vercel'],
  },
  {
    id: 'project-4',
    name: 'Weather App',
    description:
      'A sleek and intuitive weather application providing real-time data and forecasts. Leveraging the OpenWeatherMap API, this app is built with Vue.js and integrates geolocation for a personalized user experience.',
    image: '/weather.png',
    sourceCode: 'https://github.com/hellowiden/weather-app',
    tags: ['Vue.js', 'API', 'Geolocation'],
  },
  {
    id: 'project-5',
    name: 'Task Manager',
    description:
      'An efficient task management tool designed to boost productivity. Features include task categorization, deadline tracking, and progress monitoring. Built with Angular and Node.js for robust performance and a clean UI.',
    image: '/taskmanager.png',
    sourceCode: 'https://github.com/hellowiden/task-manager',
    tags: ['Angular', 'Node.js', 'MongoDB'],
  },
  {
    id: 'project-6',
    name: 'Expense Tracker',
    description:
      'A real-time expense tracking application to help users manage their finances. Utilizes React Native for cross-platform compatibility and a SQLite database for local data storage.',
    image: '/expensetracker.png',
    sourceCode: 'https://github.com/hellowiden/expense-tracker',
    tags: ['React Native', 'SQLite', 'Finance'],
  },
  {
    id: 'project-7',
    name: 'Blog CMS',
    description:
      'A Content Management System for bloggers to create, edit, and publish posts effortlessly. Powered by Django and PostgreSQL, it supports media uploads, user authentication, and an intuitive dashboard.',
    image: '/blogcms.png',
    sourceCode: 'https://github.com/hellowiden/blog-cms',
    tags: ['Django', 'PostgreSQL', 'CMS'],
  },
];

interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  sourceCode?: string;
  tags: string[];
}

export default function ProjectDetail() {
  const params = useParams();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (params.slug) {
      const projectId = Array.isArray(params.slug)
        ? params.slug[0]
        : params.slug;
      const project = projects.find((p) => p.id === projectId);
      setSelectedProject(
        project || {
          id: '',
          name: 'Not Found',
          description: '',
          image: '',
          tags: [],
        }
      );
    }
  }, [params.slug]);

  if (!selectedProject)
    return <p className="text-zinc-900 dark:text-zinc-100">Loading...</p>;

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
        <div className="text-xs text-gray-600 dark:text-gray-400">
          {selectedProject?.tags?.length
            ? selectedProject.tags.join(' • ')
            : 'No tags available'}
        </div>
      </div>
      <div className="grid">
        <p className="text-zinc-700 dark:text-zinc-300">
          {selectedProject.description}
        </p>
      </div>
      {selectedProject.sourceCode && (
        <div className="grid">
          <a
            href={selectedProject.sourceCode}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View Source Code
          </a>
        </div>
      )}
    </div>
  );
}
