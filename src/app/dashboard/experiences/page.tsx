// src/app/dashboard/experiences/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Experience {
  _id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  image: string;
  tags: string[];
  type: 'work' | 'education';
}

export default function ExperiencesDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isAdmin = session?.user?.roles.includes('admin');

  useEffect(() => {
    if (
      status === 'unauthenticated' ||
      (status === 'authenticated' && !isAdmin)
    ) {
      router.replace(status === 'unauthenticated' ? '/login' : '/');
    }
  }, [status, isAdmin, router]);

  const [experiences, setExperiences] = useState<Experience[]>([]);

  const fetchExperiences = useCallback(async () => {
    try {
      const res = await fetch('/api/experiences');
      if (!res.ok) throw new Error('Error fetching experiences');
      const data = await res.json();
      setExperiences(data.experiences);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) fetchExperiences();
  }, [isAdmin, fetchExperiences]);

  if (status === 'loading') return <p>Loading...</p>;
  if (!isAdmin) return <p>Access denied</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Experiences</h1>

      {/* ✅ Display Experiences */}
      {experiences.length > 0 ? (
        <ul className="space-y-4">
          {experiences.map((experience) => (
            <li key={experience._id} className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{experience.title}</h2>
              <p className="text-gray-600">{experience.location}</p>
              <p className="text-sm text-gray-500">{experience.date}</p>
              <p className="mt-2">{experience.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No experiences found.</p>
      )}
    </div>
  );
}
