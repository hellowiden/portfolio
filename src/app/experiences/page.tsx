//src/app/experiences/page.tsx

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
    <div className="grid gap-4 text-zinc-900 dark:text-zinc-100">
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid gap-4 bg-zinc-100 dark:bg-zinc-900 p-4 border border-zinc-300 dark:border-zinc-700 rounded-xl">
          {experiences.map((experience) => (
            <div
              key={experience._id}
              className="border-b last:border-none border-zinc-300 dark:border-zinc-700 pb-2"
            >
              <Link
                href={`/experiences/${experience._id}`}
                className="text-green-600 dark:text-green-400 hover:underline"
              >
                {experience.title} at {experience.location}
              </Link>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {experience.date} • {experience.tags.join(' • ')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
