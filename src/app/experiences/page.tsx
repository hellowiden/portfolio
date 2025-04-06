// src/app/experiences/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <section
              key={experience._id}
              onClick={() => router.push(`/experiences/${experience._id}`)}
              role="button"
              tabIndex={0}
              className="grid gap-3 p-6 w-full h-full bg-white dark:bg-secondary-800 text-primary-900 dark:text-secondary-50 border border-primary-200 dark:border-secondary-700 rounded-md cursor-pointer hover:shadow-md hover:ring-1 hover:ring-primary-300 dark:hover:ring-offset-2 hover:ring-offset-2 transition-shadow"
            >
              <div className="grid grid-cols-[1fr_auto] items-start gap-2">
                <h2 className="text-lg font-bold tracking-tight">
                  {experience.title} @ {experience.location}
                </h2>

                <div className="md:hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/experiences/${experience._id}`);
                    }}
                    className="p-2 text-sm"
                  >
                    View
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
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
                <p className="text-sm opacity-80 tracking-wide leading-snug max-w-prose">
                  {extractFirstSentence(experience.description)}
                </p>
              )}
            </section>
          ))}
        </div>
      )}
    </section>
  );
}
