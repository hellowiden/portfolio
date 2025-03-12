//src/app/experiences/[slug]/page.tsx

'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { experiences } from '@/data/experiences';

export default function ExperienceDetail() {
  const { slug } = useParams();
  const selectedExperience = experiences.find((e) => e.id === slug);

  if (!selectedExperience) {
    return (
      <p className="text-zinc-900 dark:text-zinc-100">Experience not found.</p>
    );
  }

  return (
    <div className="grid gap-6 p-6 text-zinc-900 dark:text-zinc-100">
      <div className="grid">
        <Image
          src={selectedExperience.image}
          alt={selectedExperience.title}
          width={800}
          height={400}
          className="w-full h-80 object-cover border dark:border-light rounded-xl"
        />
      </div>
      <h1 className="text-3xl font-bold">{selectedExperience.title}</h1>
      <p className="text-xs text-gray-600 dark:text-gray-400">
        {selectedExperience.date} • {selectedExperience.location}
      </p>
      <p className="text-zinc-700 dark:text-zinc-300">
        {selectedExperience.description}
      </p>
    </div>
  );
}
