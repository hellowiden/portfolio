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

  return (
    <section className="grid gap-6">
      <header className="text-2xl font-bold leading-tight">Experiences</header>

      {loading ? (
        <div className="grid place-items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500" />
        </div>
      ) : (
        <div className="grid gap-6 bg-zinc-100 dark:bg-zinc-900 p-6 border border-zinc-300 dark:border-zinc-700 rounded-xl">
          {experiences.map((experience) => (
            <div
              key={experience._id}
              className="grid gap-3 border-b pb-4 last:border-none border-zinc-300 dark:border-zinc-700"
            >
              <Link
                href={`/experiences/${experience._id}`}
                className="text-xl font-semibold hover:underline"
              >
                {experience.title} @ {experience.location}
              </Link>

              <div className="text-sm text-zinc-500">
                {experience.date} • {experience.tags.join(' • ')}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
