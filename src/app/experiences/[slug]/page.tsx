'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const experiences = [
  {
    id: 'experience-1',
    title: 'JavaScript Developer',
    location: 'Folkuniversitetet',
    description:
      'Developing expertise in front-end and back-end web development to drive future-proof digital branding strategies and integrate cutting-edge technology into customer engagement solutions.',
    image: '/javascript-developer.jpg',
    tags: ['Education', 'Front-End', 'Back-End'],
    date: 'August 2023 – June 2025',
  },
  {
    id: 'experience-2',
    title: 'CMO',
    location: 'Airam Sweden',
    description:
      'Led a critical product launch and brand positioning initiative, driving a 25% increase in brand visibility and a 30% rise in customer engagement across digital channels.',
    image: '/cmo-airam.jpg',
    tags: ['Marketing', 'Brand Strategy', 'Leadership'],
    date: 'June 2022 – July 2022 (Contract/Interim Role)',
  },
  {
    id: 'experience-3',
    title: 'Event Coordinator',
    location: 'Yrkeshögskolan i Landskrona',
    description:
      'Completed an Event Coordinator program, where I gained a deep understanding of the event planning and management industry.',
    image: '/event-coordinator.jpg',
    tags: ['Event Planning', 'Logistics', 'Management'],
    date: 'August 2019 – June 2021',
  },
  {
    id: 'experience-4',
    title: 'CEO',
    location: 'Adsolutly',
    description:
      'Increased annual revenue by 300% over 5 years, expanding the client portfolio by 40% with tailored branding solutions for global clients.',
    image: '/ceo-adsolutly.jpg',
    tags: ['Business Growth', 'Brand Development', 'Strategy'],
    date: 'August 2014 – September 2019',
  },
];

interface Experience {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  tags: string[];
  date: string;
}

export default function ExperienceDetail() {
  const params = useParams();
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

  useEffect(() => {
    if (params.slug) {
      const experienceId = Array.isArray(params.slug)
        ? params.slug[0]
        : params.slug;
      const experience = experiences.find((e) => e.id === experienceId);
      setSelectedExperience(
        experience || {
          id: '',
          title: 'Not Found',
          location: '',
          description: '',
          image: '',
          tags: [],
          date: '',
        }
      );
    }
  }, [params.slug]);

  if (!selectedExperience)
    return <p className="text-zinc-900 dark:text-zinc-100">Loading...</p>;

  return (
    <div className="grid gap-6 p-6 text-zinc-900 dark:text-zinc-100">
      <div className="grid">
        <Image
          src={selectedExperience.image}
          alt={selectedExperience.title}
          width={800}
          height={400}
          className="w-full h-80 object-cover border dark:border-light rounded-xl"
        />
      </div>
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold">{selectedExperience.title}</h1>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          {selectedExperience.date} • {selectedExperience.location}
        </div>
      </div>
      <div className="grid">
        <p className="text-zinc-700 dark:text-zinc-300">
          {selectedExperience.description}
        </p>
      </div>
    </div>
  );
}
