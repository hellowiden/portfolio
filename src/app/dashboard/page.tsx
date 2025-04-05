//src/app/dashboard/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Button from '@/app/components/Button/Button';

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    messages: 0,
    projects: 0,
    experiences: 0,
  });

  const fetchStats = async () => {
    try {
      const endpoints = [
        '/api/users',
        '/api/messages',
        '/api/projects',
        '/api/experiences',
      ];
      const [usersRes, messagesRes, projectsRes, experiencesRes] =
        await Promise.all(endpoints.map((url) => fetch(url)));

      if (
        ![usersRes, messagesRes, projectsRes, experiencesRes].every(
          (res) => res.ok
        )
      ) {
        throw new Error('Failed to fetch one or more dashboard stats');
      }

      const [usersData, messagesData, projectsData, experiencesData] =
        await Promise.all([
          usersRes.json(),
          messagesRes.json(),
          projectsRes.json(),
          experiencesRes.json(),
        ]);

      setStats({
        users: usersData?.users?.length ?? 0,
        messages: messagesData?.messages?.length ?? 0,
        projects: projectsData?.projects?.length ?? 0,
        experiences: experiencesData?.experiences?.length ?? 0,
      });
    } catch (err) {
      console.error('Dashboard stats fetch error:', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="w-full grid gap-6 text-primary-900 dark:text-secondary-50">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-lg">
        Welcome to the admin dashboard. Manage your data using the navigation.
      </p>

      <Button variant="primary" size="md" onClick={fetchStats}>
        Refresh Stats
      </Button>

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
  <div className="bg-primary-100 dark:bg-secondary-800 text-primary-900 dark:text-secondary-50 border border-primary-200 dark:border-secondary-700 p-6 rounded grid grid-rows-2 gap-2 place-items-center">
    <h2 className="text-md font-semibold">{title}</h2>
    <p className="text-4xl font-bold">{value}</p>
  </div>
);
