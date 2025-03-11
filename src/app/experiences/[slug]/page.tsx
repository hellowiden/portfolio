'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const experiences = [
  { id: 'experience-1', name: 'Experience One' },
  { id: 'experience-2', name: 'Experience Two' },
  { id: 'experience-3', name: 'Experience Three' },
];

export default function ExperienceDetail() {
  const params = useParams();
  const router = useRouter();
  const [selectedExperience, setSelectedExperience] = useState<string | null>(
    null
  );
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (params.slug) {
      const experienceId = Array.isArray(params.slug)
        ? params.slug[0]
        : params.slug;
      const experienceIndex = experiences.findIndex(
        (e) => e.id === experienceId
      );

      if (experienceIndex !== -1) {
        setSelectedExperience(experiences[experienceIndex].name);
        setCurrentExperienceIndex(experienceIndex);
      } else {
        setSelectedExperience('Not Found');
      }
    }
  }, [params.slug]);

  const handleNextExperience = () => {
    if (currentExperienceIndex !== null) {
      const nextIndex = (currentExperienceIndex + 1) % experiences.length;
      router.push(`/experiences/${experiences[nextIndex].id}`);
    }
  };

  if (!selectedExperience)
    return <p className="text-zinc-900 dark:text-zinc-100">Loading...</p>;

  return (
    <div className="p-6 text-zinc-900 dark:text-zinc-100">
      <h1 className="text-2xl font-bold">Experience: {selectedExperience}</h1>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => router.push('/experiences')}
          className="px-4 py-2 bg-blue-600 dark:bg-blue-400 text-white dark:text-zinc-900 rounded"
        >
          Back to Experiences
        </button>
        <button
          onClick={handleNextExperience}
          className="px-4 py-2 bg-green-600 dark:bg-green-400 text-white dark:text-zinc-900 rounded"
        >
          Next Experience
        </button>
      </div>
    </div>
  );
}
