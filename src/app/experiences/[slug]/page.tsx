// src/app/experiences/[slug]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface IExperience {
  _id: string;
  title: string;
  location: string;
  description: string;
  date: string;
  image: string;
  tags: string[];
  type: 'work' | 'education';
}

export default function ExperienceDetail() {
  const { slug } = useParams();
  const [experience, setExperience] = useState<IExperience | null>(null);

  useEffect(() => {
    async function fetchExperience() {
      try {
        const res = await fetch(`/api/experiences/${slug}`);
        if (!res.ok) throw new Error('Failed to fetch experience');
        const data = await res.json();
        setExperience(data.experience);
      } catch (error) {
        console.error(error);
      }
    }

    if (slug) fetchExperience();
  }, [slug]);

  if (!experience) {
    return (
      <p className="text-zinc-900 dark:text-zinc-100">Experience not found.</p>
    );
  }

  return (
    <div className="grid gap-6 p-6 text-zinc-900 dark:text-zinc-100">
      <div className="grid">
        <Image
          src={experience.image || '/fallback.jpg'}
          alt={experience.title}
          width={800}
          height={400}
          className="w-full h-80 object-cover border dark:border-light rounded-xl"
        />
      </div>
      <h1 className="text-3xl font-bold">{experience.title}</h1>
      <p className="text-xs text-gray-600 dark:text-gray-400">
        {experience.date} • {experience.location}
      </p>
      <p className="text-zinc-700 dark:text-zinc-300">
        {experience.description}
      </p>
    </div>
  );
}
