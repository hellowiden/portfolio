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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperience() {
      try {
        const res = await fetch(`/api/experiences/${slug}`);
        if (!res.ok) throw new Error('Failed to fetch experience');
        const data = await res.json();
        setExperience(data.experience);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchExperience();
  }, [slug]);

  if (loading) {
    return (
      <div className="grid place-items-center h-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500" />
      </div>
    );
  }

  if (!experience) {
    return <p className="text-center">Experience not found.</p>;
  }

  return (
    <div className="grid gap-6 p-6">
      <div className="grid">
        <Image
          src={experience.image || '/fallback.jpg'}
          alt={experience.title}
          width={800}
          height={400}
          className="w-full h-80 object-cover border dark:border-light rounded"
        />
      </div>
      <h1>{experience.title}</h1>
      <p>
        {experience.date} • {experience.location}
      </p>
      <p>{experience.description}</p>
    </div>
  );
}
