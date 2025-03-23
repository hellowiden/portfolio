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
  tags?: string[];
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
    return (
      <p className="text-center text-base text-zinc-600">
        Experience not found.
      </p>
    );
  }

  return (
    <section className="grid gap-6 p-6">
      <div>
        <Image
          src={experience.image || '/fallback.jpg'}
          alt={experience.title}
          width={800}
          height={400}
          className="w-full h-80 object-cover border dark:border-zinc-700 rounded-xl"
          priority
        />
      </div>

      <div className="grid gap-2">
        <h1 className="text-2xl font-bold">{experience.title}</h1>

        <div className="text-sm text-zinc-500">
          {experience.date} • {experience.location}
        </div>

        {experience.tags && experience.tags.length > 0 && (
          <div className="text-sm text-zinc-500">
            {experience.tags.join(' • ')}
          </div>
        )}
      </div>

      <div>
        <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          {experience.description}
        </p>
      </div>
    </section>
  );
}
