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
    <section className="grid gap-4">
      <p>
        <strong>Note:</strong> This is a curated list of experiences spanning
        work and education. For more context, feel free to reach out directly.
      </p>

      {loading ? (
        <div className="grid place-items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500" />
        </div>
      ) : (
        <div className="grid gap-4 bg-zinc-100 dark:bg-zinc-900 p-4 border border-zinc-300 dark:border-zinc-700 rounded">
          {experiences.map((experience) => (
            <div
              key={experience._id}
              className="grid gap-2 border-b last:border-none border-zinc-300 dark:border-zinc-700"
            >
              <Link
                href={`/experiences/${experience._id}`}
                className="hover:underline"
              >
                {experience.title} @ {experience.location}
              </Link>
              <div>{experience.tags.join(' • ')}</div>
              <div>{experience.date}</div>
              {experience.description && <p>{experience.description}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
