'use client';

import Link from 'next/link';

const experiences = [
  { id: 'experience-1', name: 'Experience One' },
  { id: 'experience-2', name: 'Experience Two' },
  { id: 'experience-3', name: 'Experience Three' },
];

export default function ExperiencesPage() {
  return (
    <div className="grid gap-2 p-6 text-zinc-900 dark:text-zinc-100">
      <div className="grid gap-2 bg-zinc-100 dark:bg-zinc-900 p-4 text-sm border border-zinc-300 dark:border-zinc-700 rounded-xl">
        {experiences.map((experience, index) => (
          <div key={experience.id}>
            <Link
              href={`/experiences/${experience.id}`}
              className="text-green-600 dark:text-green-400 hover:underline"
            >
              {experience.name}
            </Link>
            {index < experiences.length - 1 && (
              <hr className="border-zinc-300 dark:border-zinc-700 my-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
