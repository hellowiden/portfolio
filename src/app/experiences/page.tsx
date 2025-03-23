// src/app/experiences/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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
      <p className="text-base text-zinc-700 dark:text-zinc-300">
        <strong className="font-semibold">Note:</strong> This is a curated list
        of experiences spanning work and education. For more context, feel free
        to reach out directly.
      </p>

      {loading ? (
        <div className="grid place-items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green" />
        </div>
      ) : (
        <div className="grid gap-6 bg-zinc-100 dark:bg-zinc-900 p-6 border border-zinc-300 dark:border-zinc-700 rounded">
          {experiences.map((experience) => (
            <div
              key={experience._id}
              className="grid gap-3 border-b last:border-none border-zinc-300 dark:border-zinc-700 pb-4"
            >
              <Link
                href={`/experiences/${experience._id}`}
                className="text-2xl font-semibold hover:underline text-zinc-900 dark:text-zinc-100"
              >
                {experience.title} @ {experience.location}
              </Link>

              <div className="flex flex-wrap gap-2">
                {experience.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200 text-sm px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                {experience.date}
              </div>

              {experience.description && (
                <p className="text-base text-zinc-700 dark:text-zinc-300">
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
