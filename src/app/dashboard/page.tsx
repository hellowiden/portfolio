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

      const responses = await Promise.all(
        endpoints.map((url: string) => fetch(url))
      );

      if (responses.some((res) => !res.ok))
        throw new Error('Failed to fetch stats');

      const [users, messages, projects, experiences] = await Promise.all(
        responses.map((res) => res.json())
      );

      setStats({
        users: users?.users?.length || 0,
        messages: messages?.messages?.length || 0,
        projects: projects?.projects?.length || 0,
        experiences: experiences?.experiences?.length || 0,
      });
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="w-full grid gap-6 bg-primary-50 text-primary-900 dark:bg-secondary-900 dark:text-secondary-50">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-lg">Welcome to the admin dashboard.</p>

      <Button variant="primary" size="md" onClick={fetchStats}>
        Refresh Stats
      </Button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(stats).map(([key, value]) => (
          <StatCard
            key={key}
            title={`Total ${capitalize(key)}`}
            value={value}
          />
        ))}
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

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
