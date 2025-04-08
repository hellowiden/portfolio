// src/app/experiences/[slug]/page.tsx

'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from '@/app/components/Button/Button';

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
        <Button
          disabled
          variant="ghost"
          size="sm"
          className="h-12 w-12 p-0 animate-spin rounded-full border-4 border-t-transparent border-primary-900 dark:border-secondary-700"
        >
          &nbsp;
        </Button>
      </div>
    );
  }

  if (!experience) {
    return (
      <p className="text-center text-base text-primary-900 dark:text-secondary-50">
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
          className="w-full h-80 object-cover border border-primary-200 dark:border-secondary-700 rounded-xl"
          priority
        />
      </div>

      <div className="grid gap-2">
        <h1 className="text-2xl font-bold text-primary-900 dark:text-secondary-50">
          {experience.title}
        </h1>

        {experience.tags && experience.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {experience.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-primary-200 text-primary-900 dark:bg-secondary-700 dark:text-secondary-50 text-sm px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="text-sm text-primary-900 dark:text-secondary-50">
          {experience.date} • {experience.location}
        </div>
      </div>

      <div>
        <p className="text-base leading-relaxed text-primary-900 dark:text-secondary-50">
          {experience.description}
        </p>
      </div>
    </section>
  );
}
