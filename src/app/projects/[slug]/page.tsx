'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const projects = [
  {
    id: 'project-1',
    name: 'Snake Game',
    description:
      'A modern reimagining of the classic Snake Game, built using HTML, CSS, and JavaScript. This version enhances the nostalgic arcade experience with smooth animations, optimized collision detection, and responsive controls. Players skillfully navigate a growing serpent, consuming food while avoiding self-collisions and boundary walls. Designed for both desktop and mobile, the game offers fluid gameplay and an intuitive interface. The game logic is powered by a structured game loop, ensuring consistent movement and frame rates. Advanced collision handling mechanisms prevent unintended behavior, making the gameplay experience smooth and reliable. Additionally, dynamic difficulty scaling can be implemented to challenge players as they progress. Future enhancements may include multiplayer mode, custom themes, and AI-controlled opponents to further elevate the gaming experience.',
    image: '/snakegame.jpg',
    sourceCode: 'https://github.com/hellowiden/snake-game',
    tags: ['JavaScript', 'Canvas', 'Game'],
  },
  {
    id: 'project-2',
    name: 'E-Commerce Storefront',
    description:
      'A fully functional e-commerce platform built with React and Firebase, designed for scalability and real-time performance. The application features a dynamic product catalog with intuitive browsing, a shopping cart with seamless item management, and a secure payment gateway for transactions. Users can register, manage their accounts, and track orders, while store owners can update inventory in real time. Leveraging Firebase Firestore for a cloud-hosted database, the system supports instant updates across all users. Styled with Tailwind CSS, the UI remains responsive and highly optimized for both desktop and mobile users. Planned future updates include AI-powered product recommendations and personalized user experiences.',
    image: '/storefront.png',
    sourceCode: 'https://github.com/hellowiden/ecommerce-storefront',
    tags: ['React', 'Firebase', 'Tailwind'],
  },
  {
    id: 'project-3',
    name: 'Personal Portfolio',
    description:
      'A modern and responsive portfolio website developed with Next.js and Tailwind CSS, aimed at showcasing skills, projects, and professional experience. The site features an elegant, minimalist design with smooth animations and optimized performance, ensuring fast load times. The projects section dynamically fetches data to display recent work, while an integrated blog allows for content publishing. Contact forms are powered by a secure API, enabling seamless communication. Designed with accessibility in mind, the website adapts to different screen sizes, making it an excellent representation of a developer’s capabilities. Future plans include integrating a CMS for easier content management and expanding SEO functionalities.',
    image: '/pp.png',
    sourceCode: 'https://github.com/hellowiden/personal-portfolio',
    tags: ['Next.js', 'Tailwind', 'Vercel'],
  },
  {
    id: 'project-4',
    name: 'Weather App',
    description:
      'A feature-rich weather application built using Vue.js, designed to provide users with real-time weather updates and forecasts. The app leverages the OpenWeatherMap API to fetch live weather data, including temperature, humidity, wind speed, and extended forecasts. Using geolocation services, the app can automatically detect a user’s location for personalized results. The sleek UI ensures readability and usability, with dark and light mode support for enhanced user experience. Backend caching is implemented to reduce API calls and improve performance. Future improvements may include radar maps, severe weather alerts, and voice command support for a hands-free experience.',
    image: '/weather.png',
    sourceCode: 'https://github.com/hellowiden/weather-app',
    tags: ['Vue.js', 'API', 'Geolocation'],
  },
  {
    id: 'project-5',
    name: 'Task Manager',
    description:
      'A powerful task management web application built with Angular and Node.js, designed to help users efficiently organize tasks, set priorities, and track progress. The app features a sleek and intuitive UI that allows users to create, edit, and delete tasks with ease. Tasks can be categorized, assigned deadlines, and tracked visually with a Kanban-style workflow. Data is stored securely using MongoDB, ensuring seamless synchronization across devices. User authentication and role-based permissions allow for collaboration in team settings. Future updates will include task automation, AI-driven productivity suggestions, and calendar integration for streamlined scheduling.',
    image: '/taskmanager.png',
    sourceCode: 'https://github.com/hellowiden/task-manager',
    tags: ['Angular', 'Node.js', 'MongoDB'],
  },
  {
    id: 'project-6',
    name: 'Expense Tracker',
    description:
      'A real-time expense tracking application built with React Native, providing users with a powerful tool to manage their personal finances. The app enables users to log expenses, categorize transactions, and visualize spending trends through interactive charts. A SQLite database ensures offline functionality, allowing users to track finances even without an internet connection. The UI is designed for clarity, making financial tracking intuitive and accessible. Planned features include bank account synchronization, budgeting recommendations, and AI-powered financial insights to help users make smarter spending decisions.',
    image: '/expensetracker.png',
    sourceCode: 'https://github.com/hellowiden/expense-tracker',
    tags: ['React Native', 'SQLite', 'Finance'],
  },
  {
    id: 'project-7',
    name: 'Blog CMS',
    description:
      'A full-featured Content Management System (CMS) built with Django and PostgreSQL, providing bloggers with a seamless way to create, edit, and publish content. The system supports rich text formatting, media uploads, and categorization, allowing for an organized content structure. User authentication is integrated for multi-author collaborations, while SEO tools help optimize blog posts for search engines. A sleek and intuitive dashboard makes it easy to manage articles, drafts, and comments. Planned enhancements include a recommendation engine for personalized content suggestions, an API for headless CMS functionality, and integrations with third-party analytics tools.',
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
