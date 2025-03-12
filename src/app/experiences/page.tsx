//src/app/experiences/page.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { CgWorkAlt } from 'react-icons/cg';
import { FaGraduationCap } from 'react-icons/fa';

const experiences = [
  {
    id: 'experience-1',
    title: 'JavaScript Developer',
    location: 'Folkuniversitetet',
    description:
      'Developing expertise in front-end and back-end web development to drive future-proof digital branding strategies and integrate cutting-edge technology into customer engagement solutions.',
    type: 'education',
    icon: React.createElement(FaGraduationCap),
    date: 'August 2023 – June 2025',
    tags: ['Education', 'Front-End', 'Back-End'],
  },
  {
    id: 'experience-2',
    title: 'CMO',
    location: 'Airam Sweden',
    description:
      'Led a critical product launch and brand positioning initiative, driving a 25% increase in brand visibility and a 30% rise in customer engagement across digital channels.',
    type: 'work',
    icon: React.createElement(CgWorkAlt),
    date: 'June 2022 – July 2022 (Contract/Interim Role)',
    tags: ['Marketing', 'Brand Strategy', 'Leadership'],
  },
  {
    id: 'experience-3',
    title: 'Event Coordinator',
    location: 'Yrkeshögskolan i Landskrona',
    description:
      'Completed an Event Coordinator program, where I gained a deep understanding of the event planning and management industry.',
    type: 'education',
    icon: React.createElement(FaGraduationCap),
    date: 'August 2019 – June 2021',
    tags: ['Event Planning', 'Logistics', 'Management'],
  },
  {
    id: 'experience-4',
    title: 'CEO',
    location: 'Adsolutly',
    description:
      'Increased annual revenue by 300% over 5 years, expanding the client portfolio by 40% with tailored branding solutions for global clients.',
    type: 'work',
    icon: React.createElement(CgWorkAlt),
    date: 'August 2014 – September 2019',
    tags: ['Business Growth', 'Brand Development', 'Strategy'],
  },
];

export default function ExperiencesPage() {
  return (
    <div className="grid gap-2 p-6 text-zinc-900 dark:text-zinc-100">
      <div className="grid gap-2 bg-zinc-100 dark:bg-zinc-900 p-4 border border-zinc-300 dark:border-zinc-700 rounded-xl">
        {experiences.map((experience, index) => (
          <div key={experience.id}>
            <Link
              href={`/experiences/${experience.id}`}
              className="text-green-600 dark:text-green-400 hover:underline"
            >
              {experience.title} at {experience.location}
            </Link>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {experience.date} • {experience.tags.join(' • ')}
            </div>
            {index < experiences.length - 1 && (
              <hr className="border-zinc-300 dark:border-zinc-700 my-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
