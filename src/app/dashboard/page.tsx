//src/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
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

  const [stats, setStats] = useState({
    users: 0,
    messages: 0,
    projects: 0,
    experiences: 0,
  });

  useEffect(() => {
    if (!isAdmin) return;

    const fetchStats = async () => {
      try {
        const [usersRes, messagesRes, projectsRes, experiencesRes] =
          await Promise.all([
            fetch('/api/users'),
            fetch('/api/messages'),
            fetch('/api/projects'),
            fetch('/api/experiences'),
          ]);

        if (
          !usersRes.ok ||
          !messagesRes.ok ||
          !projectsRes.ok ||
          !experiencesRes.ok
        ) {
          throw new Error('Failed to fetch dashboard statistics');
        }

        const usersData = await usersRes.json();
        const messagesData = await messagesRes.json();
        const projectsData = await projectsRes.json();
        const experiencesData = await experiencesRes.json();

        setStats({
          users: usersData.users.length || 0,
          messages: messagesData.messages.length || 0,
          projects: projectsData.projects.length || 0,
          experiences: experiencesData.experiences.length || 0,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, [isAdmin]);

  if (status === 'loading') return <p>Loading...</p>;
  if (!isAdmin) return <p>Access denied</p>;

  return (
    <div className="w-full grid gap-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-lg">
        Welcome to the admin dashboard. Manage your data using the navigation.
      </p>

      {/* GRID LAYOUT FOR STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={stats.users} />
        <StatCard title="Total Messages" value={stats.messages} />
        <StatCard title="Total Projects" value={stats.projects} />
        <StatCard title="Total Experiences" value={stats.experiences} />
      </div>
    </div>
  );
}

const StatCard = ({ title, value }: { title: string; value: number }) => (
  <div className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-light dark:border-dark p-6 rounded grid grid-rows-2 gap-2 place-items-center">
    <h2 className="text-md font-semibold">{title}</h2>
    <p className="text-4xl font-bold">{value}</p>
  </div>
);
