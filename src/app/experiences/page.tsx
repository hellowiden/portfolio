// src/app/experiences/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/app/components/Button/Button';

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

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const res = await fetch('/api/experiences');
        if (!res.ok) throw new Error('Failed to fetch experiences');
        const data = await res.json();
        setExperiences(data.experiences);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
  }, []);

  const extractFirstSentence = (text: string) => {
    const match = text.match(/.*?[.?!](\s|$)/);
    return match ? match[0].trim() : text;
  };

  return (
    <section className="grid gap-6">
      <p className="text-base text-primary-900 dark:text-secondary-50">
        <strong className="font-semibold">Note:</strong> This is a curated list
        of experiences spanning work and education. For more context, feel free
        to reach out directly.
      </p>

      {loading ? (
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
      ) : (
        <div className="grid gap-6 bg-primary-100 dark:bg-secondary-800 p-6 border border-primary-200 dark:border-secondary-700 rounded">
          {experiences.map((experience) => (
            <div
              key={experience._id}
              className="grid gap-2 border-b last:border-none border-primary-200 dark:border-secondary-700 pb-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-primary-900 dark:text-secondary-50">
                  {experience.title} @ {experience.location}
                </h2>
                <Link
                  href={`/experiences/${experience._id}`}
                  className="text-sm font-medium text-primary-500 hover:underline"
                >
                  View
                </Link>
              </div>

              <div className="flex gap-2">
                {experience.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-primary-200 text-primary-900 dark:bg-secondary-700 dark:text-secondary-50 text-xs px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {experience.description && (
                <p className="text-sm text-primary-500">
                  {extractFirstSentence(experience.description)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
